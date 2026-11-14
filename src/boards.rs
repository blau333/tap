use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::Json;
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::MySqlPool;

use crate::auth::ApiUser;

type ApiResult = Result<Json<Value>, (StatusCode, String)>;

fn err(error: impl std::fmt::Display) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, error.to_string())
}

async fn board_role(
    pool: &MySqlPool,
    board_id: i64,
    user_id: i64,
) -> Result<Option<&'static str>, (StatusCode, String)> {
    let row: Option<(i64, Option<i8>)> = sqlx::query_as(
        "SELECT b.owner_user_id, bm.can_post
         FROM boards b
         LEFT JOIN board_members bm ON bm.board_id = b.id AND bm.user_id = ?
         WHERE b.id = ?",
    )
    .bind(user_id)
    .bind(board_id)
    .fetch_optional(pool)
    .await
    .map_err(err)?;

    Ok(row.and_then(|(owner_id, can_post)| {
        if owner_id == user_id {
            Some("owner")
        } else if can_post.unwrap_or(0) != 0 {
            Some("can_post")
        } else {
            None
        }
    }))
}

async fn require_owner(
    pool: &MySqlPool,
    board_id: i64,
    user_id: i64,
) -> Result<(), (StatusCode, String)> {
    match board_role(pool, board_id, user_id).await? {
        Some("owner") => Ok(()),
        Some(_) => Err((StatusCode::FORBIDDEN, "board owner required".to_string())),
        None => Err((StatusCode::NOT_FOUND, "board not found".to_string())),
    }
}

fn valid_cipher(value: &str, max_len: usize) -> bool {
    !value.is_empty() && value.len() <= max_len && value.starts_with("e1:")
}

fn valid_position(x: f64, y: f64) -> bool {
    x.is_finite() && y.is_finite() && x.abs() <= 1_000_000.0 && y.abs() <= 1_000_000.0
}

pub async fn list(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    let rows: Vec<(i64, String, String, String, i8, i64, i64, String)> = sqlx::query_as(
        "SELECT b.id, b.icon_emoji, b.name_cipher, b.desc_cipher, b.is_public,
                (SELECT COUNT(*) FROM board_posts p WHERE p.board_id = b.id),
                (SELECT COUNT(*) FROM board_members bm2 WHERE bm2.board_id = b.id),
                IF(b.owner_user_id = ?, 'owner', 'can_post')
         FROM boards b
         JOIN board_members bm ON bm.board_id = b.id
         WHERE bm.user_id = ?
         ORDER BY b.created_at DESC",
    )
    .bind(user.user_id())
    .bind(user.user_id())
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "boards": rows.into_iter().map(
            |(id, icon, name_cipher, desc_cipher, is_public, posts, members, role)| json!({
                "id": id,
                "icon": icon,
                "nameCipher": name_cipher,
                "descCipher": desc_cipher,
                "encrypted": true,
                "isPublic": is_public != 0,
                "posts": posts,
                "members": members,
                "role": role,
            })
        ).collect::<Vec<_>>()
    })))
}

#[derive(Deserialize)]
pub struct CreateBoardPayload {
    #[serde(default)]
    pub icon_emoji: String,
    pub name_cipher: String,
    pub desc_cipher: String,
    pub wrapped_key: String,
    pub wrap_nonce: String,
    pub wrap_eph: String,
}

pub async fn create(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<CreateBoardPayload>,
) -> ApiResult {
    if !valid_cipher(&payload.name_cipher, 8192)
        || !valid_cipher(&payload.desc_cipher, 32768)
        || payload.icon_emoji.chars().count() > 4
        || payload.wrapped_key.is_empty()
        || payload.wrapped_key.len() > 4096
        || payload.wrap_nonce.is_empty()
        || payload.wrap_nonce.len() > 128
        || payload.wrap_eph.is_empty()
        || payload.wrap_eph.len() > 4096
    {
        return Err((StatusCode::BAD_REQUEST, "invalid board payload".to_string()));
    }

    let mut tx = pool.begin().await.map_err(err)?;
    let result = sqlx::query(
        "INSERT INTO boards (owner_user_id, icon_emoji, name_cipher, desc_cipher)
         VALUES (?, ?, ?, ?)",
    )
    .bind(user.user_id())
    .bind(&payload.icon_emoji)
    .bind(&payload.name_cipher)
    .bind(&payload.desc_cipher)
    .execute(&mut *tx)
    .await
    .map_err(err)?;
    let board_id = result.last_insert_id() as i64;

    sqlx::query("INSERT INTO board_members (board_id, user_id, can_post) VALUES (?, ?, 1)")
        .bind(board_id)
        .bind(user.user_id())
        .execute(&mut *tx)
        .await
        .map_err(err)?;
    sqlx::query(
        "INSERT INTO board_keys (board_id, user_id, sender_user_id, wrapped_key, wrap_nonce, wrap_eph)
         VALUES (?, ?, ?, ?, ?, ?)",
    )
    .bind(board_id)
    .bind(user.user_id())
    .bind(user.user_id())
    .bind(&payload.wrapped_key)
    .bind(&payload.wrap_nonce)
    .bind(&payload.wrap_eph)
    .execute(&mut *tx)
    .await
    .map_err(err)?;
    tx.commit().await.map_err(err)?;

    Ok(Json(json!({
        "board": {
            "id": board_id,
            "icon": payload.icon_emoji,
            "nameCipher": payload.name_cipher,
            "descCipher": payload.desc_cipher,
            "encrypted": true,
            "isPublic": false,
            "posts": 0,
            "members": 1,
            "role": "owner",
        }
    })))
}

pub async fn get(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(board_id): Path<i64>,
) -> ApiResult {
    let role = board_role(&pool, board_id, user.user_id())
        .await?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "board not found".to_string()))?;

    let board: Option<(i64, String, String, String, i8)> = sqlx::query_as(
        "SELECT id, icon_emoji, name_cipher, desc_cipher, is_public
         FROM boards WHERE id = ?",
    )
    .bind(board_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;
    let (id, icon, name_cipher, desc_cipher, is_public) =
        board.ok_or_else(|| (StatusCode::NOT_FOUND, "board not found".to_string()))?;

    let posts: Vec<(
        i64,
        i64,
        String,
        String,
        String,
        String,
        String,
        String,
        f64,
        f64,
    )> = sqlx::query_as(
        "SELECT p.id, p.author_user_id, u.name, u.avatar_initials, p.title, p.body,
                p.media_url, p.media_type, p.x, p.y
         FROM board_posts p
         JOIN users u ON u.id = p.author_user_id
         WHERE p.board_id = ?
         ORDER BY p.created_at, p.id",
    )
    .bind(board_id)
    .fetch_all(&pool)
    .await
    .map_err(err)?;
    let members: Vec<(i64, String, String, String)> = sqlx::query_as(
        "SELECT u.id, u.name, u.handle, u.avatar_initials
         FROM board_members bm
         JOIN users u ON u.id = bm.user_id
         WHERE bm.board_id = ?
         ORDER BY bm.created_at, u.id",
    )
    .bind(board_id)
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "board": {
            "id": id,
            "icon": icon,
            "nameCipher": name_cipher,
            "descCipher": desc_cipher,
            "encrypted": true,
            "isPublic": is_public != 0,
            "myId": user.user_id(),
        },
        "role": role,
        "myId": user.user_id(),
        "posts": posts.into_iter().map(
            |(post_id, author_id, author, initials, title, body, media_url, media_type, x, y)| json!({
                "id": post_id,
                "authorId": author_id,
                "author": author,
                "avatarInitials": initials,
                "title": title,
                "body": body,
                "media": if media_url.is_empty() {
                    Value::Null
                } else {
                    json!({ "url": media_url, "type": media_type })
                },
                "x": x,
                "y": y,
            })
        ).collect::<Vec<_>>(),
        "members": members.into_iter().map(
            |(id, name, handle, initials)| json!({
                "id": id,
                "name": name,
                "handle": handle,
                "avatarInitials": initials,
            })
        ).collect::<Vec<_>>(),
    })))
}

#[derive(Deserialize)]
pub struct CreateBoardPostPayload {
    pub title_cipher: String,
    pub body_cipher: String,
    #[serde(default)]
    pub media_cipher: String,
    #[serde(default)]
    pub media_type: String,
    #[serde(default)]
    pub x: f64,
    #[serde(default)]
    pub y: f64,
}

pub async fn create_post(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(board_id): Path<i64>,
    Json(payload): Json<CreateBoardPostPayload>,
) -> ApiResult {
    let role = board_role(&pool, board_id, user.user_id())
        .await?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "board not found".to_string()))?;
    if role != "owner" && role != "can_post" {
        return Err((StatusCode::FORBIDDEN, "cannot post to board".to_string()));
    }
    if !valid_cipher(&payload.title_cipher, 8192)
        || !valid_cipher(&payload.body_cipher, 32768)
        || (!payload.media_cipher.is_empty()
            && !valid_cipher(&payload.media_cipher, 12 * 1024 * 1024))
        || !matches!(payload.media_type.as_str(), "" | "image" | "video")
        || (payload.media_cipher.is_empty() != payload.media_type.is_empty())
        || !valid_position(payload.x, payload.y)
    {
        return Err((StatusCode::BAD_REQUEST, "invalid board post".to_string()));
    }

    let result = sqlx::query(
        "INSERT INTO board_posts
            (board_id, author_user_id, title, body, media_url, media_type, x, y)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(board_id)
    .bind(user.user_id())
    .bind(&payload.title_cipher)
    .bind(&payload.body_cipher)
    .bind(&payload.media_cipher)
    .bind(&payload.media_type)
    .bind(payload.x)
    .bind(payload.y)
    .execute(&pool)
    .await
    .map_err(err)?;
    let post_id = result.last_insert_id() as i64;

    let (author, initials): (String, String) =
        sqlx::query_as("SELECT name, avatar_initials FROM users WHERE id = ?")
            .bind(user.user_id())
            .fetch_one(&pool)
            .await
            .map_err(err)?;

    Ok(Json(json!({
        "post": {
            "id": post_id,
            "authorId": user.user_id(),
            "author": author,
            "avatarInitials": initials,
            "x": payload.x,
            "y": payload.y,
        }
    })))
}

#[derive(Deserialize)]
pub struct InvitePayload {
    pub handle: String,
}

pub async fn invite(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(board_id): Path<i64>,
    Json(payload): Json<InvitePayload>,
) -> ApiResult {
    require_owner(&pool, board_id, user.user_id()).await?;
    let handle = payload.handle.trim();
    let handle = if handle.starts_with('@') {
        handle.to_string()
    } else {
        format!("@{handle}")
    };
    if handle.len() < 2 || handle.len() > 120 {
        return Err((StatusCode::BAD_REQUEST, "invalid handle".to_string()));
    }

    let member: Option<(i64, String, String, String)> =
        sqlx::query_as("SELECT id, name, handle, avatar_initials FROM users WHERE handle = ?")
            .bind(&handle)
            .fetch_optional(&pool)
            .await
            .map_err(err)?;
    let (member_id, name, member_handle, initials) =
        member.ok_or_else(|| (StatusCode::NOT_FOUND, "user not found".to_string()))?;
    if member_id == user.user_id() {
        return Err((
            StatusCode::BAD_REQUEST,
            "cannot invite yourself".to_string(),
        ));
    }

    let blocked: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks
         WHERE (blocker_user_id = ? AND blocked_user_id = ?)
            OR (blocker_user_id = ? AND blocked_user_id = ?)",
    )
    .bind(user.user_id())
    .bind(member_id)
    .bind(member_id)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if blocked != 0 {
        return Err((StatusCode::FORBIDDEN, "user is blocked".to_string()));
    }

    let already_member: bool = sqlx::query_scalar(
        "SELECT EXISTS(SELECT 1 FROM board_members WHERE board_id = ? AND user_id = ?)",
    )
    .bind(board_id)
    .bind(member_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if already_member {
        return Err((
            StatusCode::CONFLICT,
            "user is already a board member".to_string(),
        ));
    }

    sqlx::query("INSERT INTO board_members (board_id, user_id, can_post) VALUES (?, ?, 1)")
        .bind(board_id)
        .bind(member_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({
        "member": {
            "id": member_id,
            "name": name,
            "handle": member_handle,
            "avatarInitials": initials,
        }
    })))
}

pub async fn remove_member(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path((board_id, member_id)): Path<(i64, i64)>,
) -> ApiResult {
    require_owner(&pool, board_id, user.user_id()).await?;
    if member_id == user.user_id() {
        return Err((
            StatusCode::BAD_REQUEST,
            "cannot remove board owner".to_string(),
        ));
    }

    let mut tx = pool.begin().await.map_err(err)?;
    let result = sqlx::query("DELETE FROM board_members WHERE board_id = ? AND user_id = ?")
        .bind(board_id)
        .bind(member_id)
        .execute(&mut *tx)
        .await
        .map_err(err)?;
    if result.rows_affected() == 0 {
        return Err((StatusCode::NOT_FOUND, "board member not found".to_string()));
    }
    sqlx::query("DELETE FROM board_keys WHERE board_id = ? AND user_id = ?")
        .bind(board_id)
        .bind(member_id)
        .execute(&mut *tx)
        .await
        .map_err(err)?;
    tx.commit().await.map_err(err)?;

    Ok(Json(json!({ "ok": true })))
}

pub async fn remove_post(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path((board_id, post_id)): Path<(i64, i64)>,
) -> ApiResult {
    let role = board_role(&pool, board_id, user.user_id())
        .await?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "board not found".to_string()))?;
    let author_id: Option<i64> =
        sqlx::query_scalar("SELECT author_user_id FROM board_posts WHERE board_id = ? AND id = ?")
            .bind(board_id)
            .bind(post_id)
            .fetch_optional(&pool)
            .await
            .map_err(err)?;
    let author_id =
        author_id.ok_or_else(|| (StatusCode::NOT_FOUND, "post not found".to_string()))?;
    if role != "owner" && author_id != user.user_id() {
        return Err((StatusCode::FORBIDDEN, "cannot remove this post".to_string()));
    }

    sqlx::query("DELETE FROM board_posts WHERE board_id = ? AND id = ?")
        .bind(board_id)
        .bind(post_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "ok": true })))
}

#[derive(Deserialize)]
pub struct MovePostPayload {
    pub x: f64,
    pub y: f64,
}

pub async fn move_post(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path((board_id, post_id)): Path<(i64, i64)>,
    Json(payload): Json<MovePostPayload>,
) -> ApiResult {
    let role = board_role(&pool, board_id, user.user_id())
        .await?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "board not found".to_string()))?;
    if !valid_position(payload.x, payload.y) {
        return Err((
            StatusCode::BAD_REQUEST,
            "invalid board position".to_string(),
        ));
    }

    let author_id: Option<i64> =
        sqlx::query_scalar("SELECT author_user_id FROM board_posts WHERE board_id = ? AND id = ?")
            .bind(board_id)
            .bind(post_id)
            .fetch_optional(&pool)
            .await
            .map_err(err)?;
    let author_id =
        author_id.ok_or_else(|| (StatusCode::NOT_FOUND, "post not found".to_string()))?;
    if role != "owner" && author_id != user.user_id() {
        return Err((StatusCode::FORBIDDEN, "cannot move this post".to_string()));
    }

    sqlx::query("UPDATE board_posts SET x = ?, y = ? WHERE board_id = ? AND id = ?")
        .bind(payload.x)
        .bind(payload.y)
        .bind(board_id)
        .bind(post_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "x": payload.x, "y": payload.y })))
}

pub async fn get_key(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(board_id): Path<i64>,
) -> ApiResult {
    if board_role(&pool, board_id, user.user_id()).await?.is_none() {
        return Err((StatusCode::NOT_FOUND, "board not found".to_string()));
    }
    let row: Option<(String, String, String)> = sqlx::query_as(
        "SELECT wrapped_key, wrap_nonce, wrap_eph
         FROM board_keys WHERE board_id = ? AND user_id = ?",
    )
    .bind(board_id)
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "key": row.map(|(wrapped, nonce, eph_pub)| json!({
            "wrapped": wrapped,
            "nonce": nonce,
            "ephPub": eph_pub,
        }))
    })))
}

#[derive(Deserialize)]
pub struct UpsertKeyPayload {
    pub user_id: i64,
    pub wrapped_key: String,
    pub wrap_nonce: String,
    pub wrap_eph: String,
}

pub async fn upsert_key(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(board_id): Path<i64>,
    Json(payload): Json<UpsertKeyPayload>,
) -> ApiResult {
    require_owner(&pool, board_id, user.user_id()).await?;
    if payload.wrapped_key.is_empty()
        || payload.wrapped_key.len() > 4096
        || payload.wrap_nonce.is_empty()
        || payload.wrap_nonce.len() > 128
        || payload.wrap_eph.is_empty()
        || payload.wrap_eph.len() > 4096
    {
        return Err((StatusCode::BAD_REQUEST, "invalid wrapped key".to_string()));
    }
    let is_member: bool = sqlx::query_scalar(
        "SELECT EXISTS(SELECT 1 FROM board_members WHERE board_id = ? AND user_id = ?)",
    )
    .bind(board_id)
    .bind(payload.user_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if !is_member {
        return Err((
            StatusCode::BAD_REQUEST,
            "key recipient is not a board member".to_string(),
        ));
    }

    sqlx::query(
        "INSERT INTO board_keys (board_id, user_id, sender_user_id, wrapped_key, wrap_nonce, wrap_eph)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE sender_user_id = VALUES(sender_user_id),
                                 wrapped_key = VALUES(wrapped_key),
                                 wrap_nonce = VALUES(wrap_nonce),
                                 wrap_eph = VALUES(wrap_eph)",
    )
    .bind(board_id)
    .bind(payload.user_id)
    .bind(user.user_id())
    .bind(&payload.wrapped_key)
    .bind(&payload.wrap_nonce)
    .bind(&payload.wrap_eph)
    .execute(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({ "ok": true })))
}

pub async fn list_following(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(user_id): Path<i64>,
) -> ApiResult {
    if user_id != user.user_id() {
        return Err((
            StatusCode::FORBIDDEN,
            "can only list your own following".to_string(),
        ));
    }
    let rows: Vec<(i64, String, String, String)> = sqlx::query_as(
        "SELECT u.id, u.name, u.handle, u.avatar_initials
         FROM follows f
         JOIN users u ON u.id = f.followee_user_id
         WHERE f.follower_user_id = ?
           AND NOT EXISTS (
               SELECT 1 FROM blocks b
               WHERE (b.blocker_user_id = ? AND b.blocked_user_id = u.id)
                  OR (b.blocker_user_id = u.id AND b.blocked_user_id = ?)
           )
         ORDER BY u.name",
    )
    .bind(user.user_id())
    .bind(user.user_id())
    .bind(user.user_id())
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "users": rows.into_iter().map(
            |(id, name, handle, initials)| json!({
                "id": id,
                "name": name,
                "handle": handle,
                "avatarInitials": initials,
            })
        ).collect::<Vec<_>>()
    })))
}
