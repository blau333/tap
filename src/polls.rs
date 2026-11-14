use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::{MySql, MySqlPool, Transaction};

use crate::auth::ApiUser;

type ApiResult = Result<Json<Value>, (StatusCode, String)>;

fn err<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

#[derive(Clone, Deserialize)]
pub struct PollDraft {
    pub question: String,
    pub options: Vec<String>,
    #[serde(default)]
    pub multiple: bool,
}

#[derive(Deserialize)]
pub struct ChatPollMeta {
    pub multiple: bool,
    pub option_count: usize,
}

#[derive(Deserialize)]
pub struct VotePayload {
    pub option_ids: Vec<i64>,
}

pub fn validate_draft(draft: &PollDraft) -> Result<(), (StatusCode, String)> {
    if draft.question.trim().is_empty() || draft.question.chars().count() > 140 {
        return Err((
            StatusCode::BAD_REQUEST,
            "question must be 1-140 characters".into(),
        ));
    }
    if !(2..=6).contains(&draft.options.len()) {
        return Err((StatusCode::BAD_REQUEST, "poll needs 2-6 options".into()));
    }
    let mut seen = std::collections::HashSet::new();
    for option in &draft.options {
        let text = option.trim();
        if text.is_empty() || text.chars().count() > 80 || !seen.insert(text.to_lowercase()) {
            return Err((
                StatusCode::BAD_REQUEST,
                "poll options must be distinct and 1-80 characters".into(),
            ));
        }
    }
    Ok(())
}

pub async fn insert_poll(
    tx: &mut Transaction<'_, MySql>,
    author_id: i64,
    conversation_id: Option<i64>,
    question: Option<&str>,
    multiple: bool,
    encrypted: bool,
    options: &[String],
) -> Result<i64, (StatusCode, String)> {
    if !(2..=6).contains(&options.len()) {
        return Err((StatusCode::BAD_REQUEST, "poll needs 2-6 options".into()));
    }
    let result = sqlx::query(
        "INSERT INTO polls (author_id, conversation_id, question, multiple, encrypted)
         VALUES (?, ?, ?, ?, ?)",
    )
    .bind(author_id)
    .bind(conversation_id)
    .bind(question)
    .bind(if multiple { 1i64 } else { 0i64 })
    .bind(if encrypted { 1i64 } else { 0i64 })
    .execute(&mut **tx)
    .await
    .map_err(err)?;
    let poll_id = result.last_insert_id() as i64;

    for (position, text) in options.iter().enumerate() {
        sqlx::query("INSERT INTO poll_options (poll_id, position, text) VALUES (?, ?, ?)")
            .bind(poll_id)
            .bind(position as i64)
            .bind(text.trim())
            .execute(&mut **tx)
            .await
            .map_err(err)?;
    }
    Ok(poll_id)
}

struct PollAuth {
    question: Option<String>,
    multiple: bool,
    encrypted: bool,
    conversation_id: Option<i64>,
}

async fn authorize_poll(
    pool: &MySqlPool,
    user_id: i64,
    poll_id: i64,
) -> Result<PollAuth, (StatusCode, String)> {
    let row: Option<(Option<String>, i64, i64, Option<i64>)> = sqlx::query_as(
        "SELECT question, multiple, encrypted, conversation_id FROM polls WHERE id = ?",
    )
    .bind(poll_id)
    .fetch_optional(pool)
    .await
    .map_err(err)?;
    let Some((question, multiple, encrypted, conversation_id)) = row else {
        return Err((StatusCode::NOT_FOUND, "poll not found".into()));
    };

    if let Some(conversation_id) = conversation_id {
        let participant: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM conversations
             WHERE id = ? AND (owner_user_id = ? OR peer_user_id = ?)",
        )
        .bind(conversation_id)
        .bind(user_id)
        .bind(user_id)
        .fetch_one(pool)
        .await
        .map_err(err)?;
        if participant == 0 {
            return Err((StatusCode::NOT_FOUND, "poll not found".into()));
        }
    } else {
        let linked: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM posts p
             WHERE p.poll_id = ?
               AND NOT EXISTS (
                   SELECT 1 FROM blocks b
                   WHERE (b.blocker_user_id = ? AND b.blocked_user_id = p.user_id)
                      OR (b.blocker_user_id = p.user_id AND b.blocked_user_id = ?)
               )",
        )
        .bind(poll_id)
        .bind(user_id)
        .bind(user_id)
        .fetch_one(pool)
        .await
        .map_err(err)?;
        if linked == 0 {
            return Err((StatusCode::NOT_FOUND, "poll not found".into()));
        }
    }

    Ok(PollAuth {
        question,
        multiple: multiple != 0,
        encrypted: encrypted != 0,
        conversation_id,
    })
}

async fn load_poll(
    pool: &MySqlPool,
    user_id: i64,
    poll_id: i64,
) -> Result<Value, (StatusCode, String)> {
    let auth = authorize_poll(pool, user_id, poll_id).await?;
    let options = sqlx::query_as::<_, (i64, String, i64, i64)>(
        "SELECT o.id, o.text, COUNT(v.user_id) AS votes,
                COALESCE(MAX(v.user_id = ?), 0) AS mine
         FROM poll_options o
         LEFT JOIN poll_votes v ON v.option_id = o.id
         WHERE o.poll_id = ?
         GROUP BY o.id, o.position, o.text
         ORDER BY o.position ASC, o.id ASC",
    )
    .bind(user_id)
    .bind(poll_id)
    .fetch_all(pool)
    .await
    .map_err(err)?;
    let voters: i64 =
        sqlx::query_scalar("SELECT COUNT(DISTINCT user_id) FROM poll_votes WHERE poll_id = ?")
            .bind(poll_id)
            .fetch_one(pool)
            .await
            .map_err(err)?;
    let voted = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM poll_votes WHERE poll_id = ? AND user_id = ?",
    )
    .bind(poll_id)
    .bind(user_id)
    .fetch_one(pool)
    .await
    .map_err(err)?
        > 0;

    let options: Vec<Value> = options
        .into_iter()
        .map(|(id, text, votes, mine)| {
            json!({
                "id": id,
                "text": if auth.encrypted { "" } else { text.as_str() },
                "votes": votes,
                "mine": mine > 0,
            })
        })
        .collect();
    let mut poll = json!({
        "id": poll_id,
        "question": auth.question.unwrap_or_default(),
        "multiple": auth.multiple,
        "encrypted": auth.encrypted,
        "options": options,
        "voters": voters,
        "voted": voted,
    });

    if auth.encrypted {
        let conversation_id = auth.conversation_id.ok_or_else(|| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                "encrypted poll has no conversation".into(),
            )
        })?;
        let message: Option<(i64, String, String)> = sqlx::query_as(
            "SELECT id, body, nonce FROM messages WHERE poll_id = ? AND conversation_id = ?",
        )
        .bind(poll_id)
        .bind(conversation_id)
        .fetch_optional(pool)
        .await
        .map_err(err)?;
        let Some((message_id, cipher, nonce)) = message else {
            return Err((StatusCode::NOT_FOUND, "poll message not found".into()));
        };
        let key: Option<(String, String, String)> = sqlx::query_as(
            "SELECT wrapped_key, wrap_nonce, wrap_eph FROM message_keys
             WHERE message_id = ? AND user_id = ?",
        )
        .bind(message_id)
        .bind(user_id)
        .fetch_optional(pool)
        .await
        .map_err(err)?;
        let msg_key = key.map(|(wrapped, wrap_nonce, eph_pub)| {
            json!({
                "wrapped": wrapped,
                "nonce": wrap_nonce,
                "ephPub": eph_pub,
            })
        });
        poll["cipher"] = json!(cipher);
        poll["nonce"] = json!(nonce);
        poll["messageId"] = json!(message_id);
        poll["msgKey"] = msg_key.map_or(Value::Null, |v| v);
    }

    Ok(poll)
}

pub async fn get(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(poll_id): Path<i64>,
) -> ApiResult {
    Ok(Json(load_poll(&pool, user.user_id(), poll_id).await?))
}

pub async fn vote(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(poll_id): Path<i64>,
    Json(payload): Json<VotePayload>,
) -> ApiResult {
    let auth = authorize_poll(&pool, user.user_id(), poll_id).await?;
    let mut ids = payload.option_ids;
    ids.sort_unstable();
    ids.dedup();
    if ids.is_empty() || ids.len() > 6 || (!auth.multiple && ids.len() != 1) {
        return Err((StatusCode::BAD_REQUEST, "invalid option selection".into()));
    }

    let mut tx = pool.begin().await.map_err(err)?;
    let locked_poll: Option<i64> =
        sqlx::query_scalar("SELECT id FROM polls WHERE id = ? FOR UPDATE")
            .bind(poll_id)
            .fetch_optional(&mut *tx)
            .await
            .map_err(err)?;
    if locked_poll.is_none() {
        return Err((StatusCode::NOT_FOUND, "poll not found".into()));
    }
    let existing: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM poll_votes WHERE poll_id = ? AND user_id = ?")
            .bind(poll_id)
            .bind(user.user_id())
            .fetch_one(&mut *tx)
            .await
            .map_err(err)?;
    if existing > 0 {
        return Err((StatusCode::CONFLICT, "already voted".into()));
    }

    for option_id in &ids {
        let belongs: i64 =
            sqlx::query_scalar("SELECT COUNT(*) FROM poll_options WHERE id = ? AND poll_id = ?")
                .bind(option_id)
                .bind(poll_id)
                .fetch_one(&mut *tx)
                .await
                .map_err(err)?;
        if belongs == 0 {
            return Err((StatusCode::BAD_REQUEST, "invalid poll option".into()));
        }
        sqlx::query("INSERT INTO poll_votes (poll_id, option_id, user_id) VALUES (?, ?, ?)")
            .bind(poll_id)
            .bind(option_id)
            .bind(user.user_id())
            .execute(&mut *tx)
            .await
            .map_err(err)?;
    }
    tx.commit().await.map_err(err)?;
    Ok(Json(load_poll(&pool, user.user_id(), poll_id).await?))
}

#[cfg(test)]
mod tests {
    use super::{validate_draft, PollDraft};

    #[test]
    fn accepts_valid_poll_draft() {
        let draft = PollDraft {
            question: "Where to meet?".into(),
            options: vec!["Cafe".into(), "Park".into()],
            multiple: false,
        };
        assert!(validate_draft(&draft).is_ok());
    }

    #[test]
    fn rejects_duplicate_options_after_trimming_and_case_folding() {
        let draft = PollDraft {
            question: "Where to meet?".into(),
            options: vec!["Cafe".into(), " cafe ".into()],
            multiple: false,
        };
        assert!(validate_draft(&draft).is_err());
    }
}
