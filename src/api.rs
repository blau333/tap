use std::collections::{HashMap, HashSet};

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::Json;
use chrono::{NaiveDateTime, Utc};
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::MySqlPool;

use crate::auth::ApiUser;

type ApiResult = Result<Json<Value>, (StatusCode, String)>;

fn err<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

/// Turns a free-form query into a BOOLEAN MODE full-text term. Words become
/// prefix terms (`rust*`) so partial matches rank, and non-alphanumeric
/// characters are dropped (in BOOLEAN MODE `-`, `+`, `"`, ... are operators).
/// Tokens shorter than `innodb_ft_min_token_size` (3) are simply ignored by
/// the full-text engine, so the LIKE fallback in the query covers those.
fn search_boolean_terms(q: &str) -> String {
    q.split(|c: char| !c.is_alphanumeric())
        .filter(|w| !w.is_empty())
        .map(|w| format!("{w}*"))
        .collect::<Vec<_>>()
        .join(" ")
}

/// Escapes a query into a `LIKE` pattern that matches substrings anywhere.
/// Used alongside full-text to catch short queries and exact fragments that
/// the tokenizer would skip.
fn like_pattern(q: &str) -> String {
    let escaped = q.replace('\\', "\\\\").replace('%', "\\%").replace('_', "\\_");
    format!("%{escaped}%")
}

/// Classic Levenshtein distance over Unicode characters (works for Cyrillic).
fn edit_distance(a: &str, b: &str) -> usize {
    let a: Vec<char> = a.chars().collect();
    let b: Vec<char> = b.chars().collect();
    let mut prev: Vec<usize> = (0..=b.len()).collect();
    let mut curr = vec![0; b.len() + 1];
    for i in 1..=a.len() {
        curr[0] = i;
        for j in 1..=b.len() {
            let cost = usize::from(a[i - 1] != b[j - 1]);
            curr[j] = (prev[j] + 1).min(curr[j - 1] + 1).min(prev[j - 1] + cost);
        }
        std::mem::swap(&mut prev, &mut curr);
    }
    prev[b.len()]
}

/// "Did you mean?" — finds corpus words that are close to the query.
/// A single-word query returns up to three nearest candidates; a multi-word
/// query returns one corrected query string. Close means the Levenshtein
/// distance is at most ~1/3 of the longer word's length (minimum 1 edit).
fn spell_suggest(q: &str, words: &HashSet<String>) -> Vec<String> {
    let q_words: Vec<String> = q
        .to_lowercase()
        .split(|c: char| !c.is_alphanumeric())
        .filter(|w| !w.is_empty())
        .map(|w| w.to_string())
        .collect();
    if q_words.is_empty() {
        return Vec::new();
    }

    fn close_enough(word: &str, cand: &str) -> Option<usize> {
        let d = edit_distance(word, cand);
        let threshold = (word.chars().count().max(cand.chars().count()) / 3).max(1);
        if d > 0 && d <= threshold { Some(d) } else { None }
    }

    if q_words.len() == 1 {
        let word = &q_words[0];
        if word.chars().count() < 2 {
            return Vec::new();
        }
        let mut scored: Vec<(usize, String)> = Vec::new();
        for cand in words {
            if cand.chars().count() < 2 {
                continue;
            }
            if let Some(d) = close_enough(word, cand) {
                scored.push((d, cand.clone()));
            }
        }
        scored.sort_by(|a, b| a.0.cmp(&b.0).then_with(|| a.1.cmp(&b.1)));
        scored.into_iter().take(3).map(|(_, s)| s).collect()
    } else {
        let mut corrected: Vec<String> = Vec::with_capacity(q_words.len());
        let mut changed = false;
        for word in &q_words {
            let mut best: Option<(usize, &str)> = None;
            for cand in words {
                if cand.chars().count() < 2 {
                    continue;
                }
                if let Some(d) = close_enough(word, cand) {
                    if best.map_or(true, |(bd, _)| d < bd) {
                        best = Some((d, cand.as_str()));
                    }
                }
            }
            match best {
                Some((_, cand)) => {
                    corrected.push(cand.to_string());
                    changed = true;
                }
                None => corrected.push(word.clone()),
            }
        }
        if changed { vec![corrected.join(" ")] } else { Vec::new() }
    }
}

fn time_label(dt: NaiveDateTime) -> String {
    let now = Utc::now().naive_utc();
    let secs = (now - dt).num_seconds().max(0);
    if secs < 60 {
        "только что".to_string()
    } else if secs < 3600 {
        format!("{} мин", secs / 60)
    } else if secs < 86400 {
        format!("{} ч", secs / 3600)
    } else {
        format!("{} д", secs / 86400)
    }
}

/// Rough HTML → plain text used only for fallback titles: drops tags and
/// decodes the few entities Quill emits for special characters.
fn strip_html(html: &str) -> String {
    let mut out = String::new();
    let mut in_tag = false;
    for c in html.chars() {
        match c {
            '<' => in_tag = true,
            '>' => in_tag = false,
            _ if !in_tag => out.push(c),
            _ => {}
        }
    }
    out.replace("&nbsp;", " ")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&#39;", "'")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

#[derive(sqlx::FromRow)]
struct PostApiRow {
    id: i64,
    user_id: i64,
    title: String,
    body: String,
    media_url: String,
    media_type: String,
    score: i64,
    created_at: NaiveDateTime,
    author_name: String,
    author_handle: String,
    avatar_initials: String,
    repost_of_id: Option<i64>,
    orig_author_name: Option<String>,
    orig_author_handle: Option<String>,
}

#[derive(sqlx::FromRow)]
struct CommentApiRow {
    post_id: i64,
    id: i64,
    text: String,
    created_at: NaiveDateTime,
    author: String,
    user_id: i64,
    author_handle: String,
    avatar_initials: String,
    likes: i64,
    parent_comment_id: Option<i64>,
}

#[derive(sqlx::FromRow)]
struct StoryFrameApiRow {
    post_id: i64,
    media_url: String,
    media_type: String,
    caption: String,
    author: String,
}

#[derive(sqlx::FromRow)]
struct CommunityApiRow {
    id: i64,
    name: String,
    icon_emoji: String,
    description: String,
    members: i64,
    owner_user_id: i64,
    owner_name: String,
    owner_handle: String,
    joined: i8,
    interest: String,
}

#[derive(sqlx::FromRow)]
struct ConversationApiRow {
    id: i64,
    owner_user_id: i64,
    peer_user_id: i64,
    owner_name: String,
    owner_initials: String,
    peer_name: String,
    peer_initials: String,
    unread_owner: i64,
    unread_peer: i64,
    owner_last_seen: Option<NaiveDateTime>,
    peer_last_seen: Option<NaiveDateTime>,
    created_at: NaiveDateTime,
}

#[derive(sqlx::FromRow)]
struct MessageApiRow {
    id: i64,
    sender_user_id: i64,
    body: String,
    reaction: String,
    encrypted: i64,
    nonce: String,
    media_url: String,
    media_type: String,
    created_at: NaiveDateTime,
}

#[derive(sqlx::FromRow)]
struct NotificationApiRow {
    id: i64,
    notif_type: String,
    text: String,
    unread: i8,
    created_at: NaiveDateTime,
}

async fn load_author(pool: &MySqlPool, user_id: i64) -> Result<(String, String), (StatusCode, String)> {
    sqlx::query_as::<_, (String, String)>(
        "SELECT name, avatar_initials FROM users WHERE id = ?",
    )
    .bind(user_id)
    .fetch_one(pool)
    .await
    .map_err(err)
}

async fn build_posts(
    pool: &MySqlPool,
    user_id: i64,
    page_id: Option<i64>,
    author_id: Option<i64>,
) -> Result<Vec<Value>, (StatusCode, String)> {
    // Three feed modes: the main feed (personal posts only), a page's posts,
    // and a user's own posts (all of them, including page posts).
    let rows = match (page_id, author_id) {
        (Some(pid), None) => sqlx::query_as::<_, PostApiRow>(
            "SELECT p.id, p.user_id, p.title, p.body, p.media_url, p.media_type, p.likes AS score,
                    CAST(p.created_at AS DATETIME) AS created_at, u.name AS author_name, u.handle AS author_handle, u.avatar_initials,
                    p.repost_of_id, ou.name AS orig_author_name, ou.handle AS orig_author_handle
             FROM posts p JOIN users u ON u.id = p.user_id
             LEFT JOIN posts o ON o.id = p.repost_of_id
             LEFT JOIN users ou ON ou.id = o.user_id
             WHERE p.page_id = ?
             ORDER BY p.created_at DESC, p.id DESC",
        )
        .bind(pid)
        .fetch_all(pool)
        .await
        .map_err(err)?,
        (None, Some(uid)) => sqlx::query_as::<_, PostApiRow>(
            "SELECT p.id, p.user_id, p.title, p.body, p.media_url, p.media_type, p.likes AS score,
                    CAST(p.created_at AS DATETIME) AS created_at, u.name AS author_name, u.handle AS author_handle, u.avatar_initials,
                    p.repost_of_id, ou.name AS orig_author_name, ou.handle AS orig_author_handle
             FROM posts p JOIN users u ON u.id = p.user_id
             LEFT JOIN posts o ON o.id = p.repost_of_id
             LEFT JOIN users ou ON ou.id = o.user_id
             WHERE p.user_id = ?
             ORDER BY p.created_at DESC, p.id DESC",
        )
        .bind(uid)
        .fetch_all(pool)
        .await
        .map_err(err)?,
        (None, None) => sqlx::query_as::<_, PostApiRow>(
            "SELECT p.id, p.user_id, p.title, p.body, p.media_url, p.media_type, p.likes AS score,
                    CAST(p.created_at AS DATETIME) AS created_at, u.name AS author_name, u.handle AS author_handle, u.avatar_initials,
                    p.repost_of_id, ou.name AS orig_author_name, ou.handle AS orig_author_handle
             FROM posts p JOIN users u ON u.id = p.user_id
             LEFT JOIN posts o ON o.id = p.repost_of_id
             LEFT JOIN users ou ON ou.id = o.user_id
             WHERE p.page_id IS NULL
               AND u.id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
             ORDER BY p.created_at DESC, p.id DESC",
        )
        .bind(user_id)
        .fetch_all(pool)
        .await
        .map_err(err)?,
        _ => return Err((StatusCode::INTERNAL_SERVER_ERROR, "invalid post filter".to_string())),
    };

    enrich_posts(pool, user_id, rows).await
}

/// Decorates raw post rows with per-user state (votes, saves, follows,
/// comments) and shapes them into the API JSON both the feed and search render.
async fn enrich_posts(
    pool: &MySqlPool,
    user_id: i64,
    rows: Vec<PostApiRow>,
) -> Result<Vec<Value>, (StatusCode, String)> {
    let votes: HashMap<i64, String> = sqlx::query_as::<_, (i64, String)>(
        "SELECT post_id, direction FROM votes WHERE user_id = ?",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?
    .into_iter()
    .collect();

    let saves: HashSet<i64> = sqlx::query_as::<_, (i64,)>(
        "SELECT post_id FROM saved_posts WHERE user_id = ?",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?
    .into_iter()
    .map(|(id,)| id)
    .collect();

    let following: HashSet<i64> = sqlx::query_as::<_, (i64,)>(
        "SELECT followee_user_id FROM follows WHERE follower_user_id = ?",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?
    .into_iter()
    .map(|(id,)| id)
    .collect();

    let repost_counts: HashMap<i64, i64> = sqlx::query_as::<_, (i64, i64)>(
        "SELECT repost_of_id, COUNT(*) FROM posts WHERE repost_of_id IS NOT NULL GROUP BY repost_of_id",
    )
    .fetch_all(pool)
    .await
    .map_err(err)?
    .into_iter()
    .collect();

    let my_reposts: HashSet<i64> = sqlx::query_as::<_, (i64,)>(
        "SELECT repost_of_id FROM posts WHERE user_id = ? AND repost_of_id IS NOT NULL",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?
    .into_iter()
    .map(|(id,)| id)
    .collect();

    let comment_rows = sqlx::query_as::<_, CommentApiRow>(
        "SELECT c.post_id, c.id, c.body AS text, CAST(c.created_at AS DATETIME) AS created_at,
                u.name AS author, u.id AS user_id, u.handle AS author_handle,
                u.avatar_initials AS avatar_initials, c.likes, c.parent_comment_id
         FROM comments c JOIN users u ON u.id = c.user_id
         ORDER BY c.created_at ASC, c.id ASC",
    )
    .fetch_all(pool)
    .await
    .map_err(err)?;

    let liked_comment_ids: Vec<i64> = sqlx::query_scalar(
        "SELECT comment_id FROM comment_likes WHERE user_id = ?",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?;
    let liked_comments: std::collections::HashSet<i64> = liked_comment_ids.into_iter().collect();

    let mut comments_by_post: HashMap<i64, Vec<Value>> = HashMap::new();
    for c in comment_rows {
        comments_by_post.entry(c.post_id).or_default().push(json!({
            "id": c.id,
            "author": c.author,
            "authorId": c.user_id,
            "authorHandle": c.author_handle,
            "avatarInitials": c.avatar_initials,
            "time": time_label(c.created_at),
            "text": c.text,
            "likes": c.likes,
            "liked": liked_comments.contains(&c.id),
            "parentId": c.parent_comment_id,
        }));
    }

    let story_rows = sqlx::query_as::<_, StoryFrameApiRow>(
        "SELECT s.post_id, s.media_url, s.media_type, s.caption, u.name AS author
         FROM post_stories s JOIN users u ON u.id = s.author_user_id
         ORDER BY s.post_id, s.frame_order ASC, s.id ASC",
    )
    .fetch_all(pool)
    .await
    .map_err(err)?;

    let mut stories_by_post: HashMap<i64, Vec<Value>> = HashMap::new();
    for s in story_rows {
        stories_by_post.entry(s.post_id).or_default().push(json!({
            "type": s.media_type,
            "url": s.media_url,
            "author": s.author,
            "caption": s.caption,
        }));
    }

    let mut posts = Vec::with_capacity(rows.len());
    for r in rows {
        posts.push(json!({
            "id": r.id,
            "authorId": r.user_id,
            "author": r.author_name,
            "authorHandle": r.author_handle,
            "avatarInitials": r.avatar_initials,
            "followed": following.contains(&r.user_id),
            "isMine": r.user_id == user_id,
            "time": time_label(r.created_at),
            "createdAt": r.created_at.and_utc().timestamp(),
            "title": r.title,
            "body": r.body,
            "media": if r.media_type.is_empty() {
                Value::Null
            } else {
                json!({ "type": r.media_type, "url": r.media_url })
            },
            "score": r.score,
            "voted": votes.get(&r.id),
            "saved": saves.contains(&r.id),
            "comments": comments_by_post.remove(&r.id).unwrap_or_default(),
            "story": stories_by_post.remove(&r.id).map(|frames| json!({ "frames": frames })),
            "reposts": repost_counts.get(&r.id).copied().unwrap_or(0),
            "reposted": my_reposts.contains(&r.id),
            "repostOf": r.repost_of_id,
            "origAuthorName": r.orig_author_name.as_deref().unwrap_or(""),
            "origAuthorHandle": r.orig_author_handle.as_deref().unwrap_or(""),
        }));
    }
    Ok(posts)
}

async fn build_pages(pool: &MySqlPool, user_id: i64) -> Result<Vec<Value>, (StatusCode, String)> {
    let rows = sqlx::query_as::<_, CommunityApiRow>(
        "SELECT c.id, c.name, c.icon_emoji, c.description, c.members, c.owner_user_id,
                COALESCE(o.name, '') AS owner_name, COALESCE(o.handle, '') AS owner_handle,
                EXISTS(SELECT 1 FROM community_members m
                       WHERE m.community_id = c.id AND m.user_id = ?) AS joined,
                c.interest
         FROM communities c LEFT JOIN users o ON o.id = c.owner_user_id
         ORDER BY c.members DESC",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?;

    Ok(rows
        .into_iter()
        .map(|r| {
            json!({
                "id": r.id,
                "name": r.name,
                "icon": r.icon_emoji,
                "desc": r.description,
                "members": r.members,
                "joined": r.joined == 1,
                "owner": { "id": r.owner_user_id, "name": r.owner_name, "handle": r.owner_handle },
                "interest": r.interest,
            })
        })
        .collect())
}

async fn build_conversation(
    pool: &MySqlPool,
    user_id: i64,
    convo_id: i64,
) -> Result<Value, (StatusCode, String)> {
    let r: Option<ConversationApiRow> = sqlx::query_as::<_, ConversationApiRow>(
        "SELECT c.id, c.owner_user_id, c.peer_user_id,
                COALESCE(ou.name, '') AS owner_name, COALESCE(ou.avatar_initials, '') AS owner_initials,
                COALESCE(pu.name, c.peer_name) AS peer_name,
                COALESCE(pu.avatar_initials, c.avatar_initials) AS peer_initials,
                c.unread_owner, c.unread_peer,
                ou.last_seen AS owner_last_seen, pu.last_seen AS peer_last_seen,
                CAST(c.created_at AS DATETIME) AS created_at
         FROM conversations c
         LEFT JOIN users ou ON ou.id = c.owner_user_id
         LEFT JOIN users pu ON pu.id = c.peer_user_id
         WHERE c.id = ? AND (c.owner_user_id = ? OR c.peer_user_id = ?)",
    )
    .bind(convo_id)
    .bind(user_id)
    .bind(user_id)
    .fetch_optional(pool)
    .await
    .map_err(err)?;

    let Some(r) = r else {
        return Err((StatusCode::NOT_FOUND, "conversation not found".to_string()));
    };

    let i_am_owner = r.owner_user_id == user_id;
    let peer_name = if i_am_owner { r.peer_name } else { r.owner_name };
    let peer_initials = if i_am_owner { r.peer_initials } else { r.owner_initials };
    let unread = if i_am_owner { r.unread_owner } else { r.unread_peer };
    let peer_last_seen = if i_am_owner { r.peer_last_seen } else { r.owner_last_seen };
    let peer_user = if i_am_owner { r.peer_user_id } else { r.owner_user_id };

    let blocked_by_me: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks WHERE blocker_user_id = ? AND blocked_user_id = ?",
    )
    .bind(user_id)
    .bind(peer_user)
    .fetch_one(pool)
    .await
    .map_err(err)?;
    let blocked_me: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks WHERE blocker_user_id = ? AND blocked_user_id = ?",
    )
    .bind(peer_user)
    .bind(user_id)
    .fetch_one(pool)
    .await
    .map_err(err)?;

    let msgs = sqlx::query_as::<_, MessageApiRow>(
        "SELECT id, sender_user_id, body, reaction, encrypted, nonce, media_url, media_type,
                CAST(created_at AS DATETIME) AS created_at
         FROM messages WHERE conversation_id = ?
         ORDER BY created_at ASC, id ASC",
    )
    .bind(r.id)
    .fetch_all(pool)
    .await
    .map_err(err)?;

    let messages: Vec<Value> = msgs
        .into_iter()
        .map(|m| {
            json!({
                "id": m.id,
                "from": if m.sender_user_id == user_id { "you" } else { "them" },
                "text": m.body,
                "time": time_label(m.created_at),
                "encrypted": m.encrypted == 1,
                "nonce": m.nonce,
                "reaction": if m.reaction.is_empty() {
                    Value::Null
                } else {
                    Value::String(m.reaction)
                },
                "media": if m.media_type.is_empty() && m.media_url.is_empty() {
                    Value::Null
                } else {
                    json!({ "type": m.media_type, "url": m.media_url })
                },
            })
        })
        .collect();

    Ok(json!({
        "id": r.id,
        "name": peer_name,
        "avatarInitials": peer_initials,
        "peerUserId": if i_am_owner { r.peer_user_id } else { r.owner_user_id },
        "time": time_label(r.created_at),
        "unread": unread > 0,
        "lastSeen": peer_last_seen.map(|t| t.and_utc().timestamp()),
        "blockedByMe": blocked_by_me > 0,
        "blockedMe": blocked_me > 0,
        "messages": messages,
    }))
}

async fn build_conversations(pool: &MySqlPool, user_id: i64) -> Result<Vec<Value>, (StatusCode, String)> {
    let ids: Vec<i64> = sqlx::query_scalar(
        "SELECT id FROM conversations WHERE owner_user_id = ? OR peer_user_id = ?
         ORDER BY created_at DESC, id DESC",
    )
    .bind(user_id)
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?;

    let mut out = Vec::with_capacity(ids.len());
    for id in ids {
        // A single broken conversation must not take down the whole bootstrap.
        if let Ok(c) = build_conversation(pool, user_id, id).await {
            out.push(c);
        }
    }
    Ok(out)
}

async fn build_notifications(pool: &MySqlPool, user_id: i64) -> Result<Vec<Value>, (StatusCode, String)> {
    let rows = sqlx::query_as::<_, NotificationApiRow>(
        "SELECT id, notif_type, text, unread, CAST(created_at AS DATETIME) AS created_at FROM notifications
         WHERE user_id = ? ORDER BY created_at DESC, id DESC",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
    .map_err(err)?;

    Ok(rows
        .into_iter()
        .map(|r| {
            json!({
                "id": r.id,
                "type": r.notif_type,
                "text": r.text,
                "time": time_label(r.created_at),
                "unread": r.unread == 1,
            })
        })
        .collect())
}

// ===== Handlers =====

pub async fn bootstrap(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    let me: Option<(String, String, String, String, String)> =
        sqlx::query_as::<_, (String, String, String, String, String)>(
            "SELECT name, avatar_initials, handle, bio, interests FROM users WHERE id = ?",
        )
        .bind(user.user_id())
        .fetch_optional(&pool)
        .await
        .map_err(err)?;

    let Some((name, initials, handle, bio, interests)) = me else {
        return Err((StatusCode::UNAUTHORIZED, "user not found".to_string()));
    };

    let following: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM follows WHERE follower_user_id = ?",
    )
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let observers: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM follows WHERE followee_user_id = ?",
    )
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let blocked_users: Vec<Value> = sqlx::query_as::<_, (i64, String, String, String)>(
        "SELECT u.id, u.name, u.handle, u.avatar_initials
         FROM blocks b JOIN users u ON u.id = b.blocked_user_id
         WHERE b.blocker_user_id = ?
         ORDER BY b.created_at DESC",
    )
    .bind(user.user_id())
    .fetch_all(&pool)
    .await
    .map_err(err)?
    .into_iter()
    .map(|(id, name, handle, initials)| json!({ "id": id, "name": name, "handle": handle, "avatarInitials": initials }))
    .collect();

    Ok(Json(json!({
        "me": {
            "id": user.user_id(), "name": name, "initials": initials, "handle": handle, "bio": bio,
            "interests": interests.split(',').filter(|s| !s.is_empty()).collect::<Vec<_>>(),
            "following": following,
            "observers": observers,
        },
        "blockedUsers": blocked_users,
        "posts": build_posts(&pool, user.user_id(), None, None).await?,
        "pages": build_pages(&pool, user.user_id()).await?,
        "conversations": build_conversations(&pool, user.user_id()).await?,
        "notifications": build_notifications(&pool, user.user_id()).await?,
    })))
}

#[derive(Deserialize)]
pub struct CreatePostPayload {
    pub title: String,
    #[serde(default)]
    pub body: String,
    #[serde(default)]
    pub media_url: String,
    #[serde(default)]
    pub media_type: String,
}

pub async fn create_post(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<CreatePostPayload>,
) -> ApiResult {
    let title = payload.title.trim().to_string();
    let body = payload.body.trim().to_string();

    if title.is_empty() && body.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "post body required".to_string()));
    }

    // Rich-text editors send HTML in `body`; when the caller didn't provide a
    // title we derive one from the plain text so cards/search keep working.
    let title = if title.is_empty() {
        let plain = strip_html(&body);
        let mut t: String = plain.chars().take(120).collect();
        t = t.trim().to_string();
        if t.is_empty() {
            "Новый пост".to_string()
        } else {
            t
        }
    } else {
        title
    };

    let (author, initials) = load_author(&pool, user.user_id()).await?;

    let result = sqlx::query(
        "INSERT INTO posts (user_id, category, accent, accent2, icon_key, title, body, media_url, media_type, likes, comments, time_label, author_sub)
         VALUES (?, 'Пост', '#E8B04B', '#C0603A', 'community', ?, ?, ?, ?, 1, 0, 'только что', 'опубликовал(а) в tap')",
    )
    .bind(user.user_id())
    .bind(&title)
    .bind(&body)
    .bind(&payload.media_url)
    .bind(&payload.media_type)
    .execute(&pool)
    .await
    .map_err(err)?;

    let new_id = result.last_insert_id() as i64;

    // The author's first post auto-gets an upvote from its author.
    sqlx::query(
        "INSERT INTO votes (post_id, user_id, direction) VALUES (?, ?, 'up')
         ON DUPLICATE KEY UPDATE direction = 'up'",
    )
    .bind(new_id)
    .bind(user.user_id())
    .execute(&pool)
    .await
    .map_err(err)?;

    // Notify everyone who follows the author about the new post.
    sqlx::query(
        "INSERT INTO notifications (user_id, notif_type, text, created_at)
         SELECT follower_user_id, 'post', CONCAT(?, ' опубликовал(а) новый пост'), NOW()
         FROM follows WHERE followee_user_id = ?",
    )
    .bind(&author)
    .bind(user.user_id())
    .execute(&pool)
    .await
    .map_err(err)?;

    let now = Utc::now().naive_utc();

    Ok(Json(json!({
        "post": {
            "id": new_id,
            "author": author,
            "avatarInitials": initials,
            "isMine": true,
            "time": "только что",
            "createdAt": now.and_utc().timestamp(),
            "title": title,
            "body": body,
            "media": if payload.media_type.is_empty() {
                Value::Null
            } else {
                json!({ "type": payload.media_type, "url": payload.media_url })
            },
            "score": 1,
            "voted": "up",
            "saved": false,
            "comments": [],
        }
    })))
}

#[derive(Deserialize)]
pub struct AddStoryPayload {
    pub media_url: String,
    #[serde(default)]
    pub media_type: String,
    #[serde(default)]
    pub caption: String,
}

/// Adds a story frame to one of the caller's own posts and returns the
/// post's full story, so the card sticker updates immediately.
pub async fn add_story(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(id): Path<i64>,
    Json(payload): Json<AddStoryPayload>,
) -> ApiResult {
    let media_url = payload.media_url.trim().to_string();
    let media_type = payload.media_type.trim().to_string();
    let media_type = if media_type.is_empty() { "image".to_string() } else { media_type };
    let caption = payload.caption.trim().to_string();

    if media_url.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "медиа-файл обязателен".to_string()));
    }
    if media_type != "image" && media_type != "video" {
        return Err((StatusCode::BAD_REQUEST, "media_type должен быть image или video".to_string()));
    }

    let owner: Option<i64> = sqlx::query_scalar("SELECT user_id FROM posts WHERE id = ?")
        .bind(id)
        .fetch_optional(&pool)
        .await
        .map_err(err)?;

    let Some(owner) = owner else {
        return Err((StatusCode::NOT_FOUND, "пост не найден".to_string()));
    };
    if owner != user.user_id() {
        return Err((StatusCode::FORBIDDEN, "историю можно добавлять только к своим постам".to_string()));
    }

    let next_order: i64 = sqlx::query_scalar(
        "SELECT COALESCE(MAX(frame_order), -1) + 1 FROM post_stories WHERE post_id = ?",
    )
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    sqlx::query(
        "INSERT INTO post_stories (post_id, author_user_id, media_url, media_type, caption, frame_order)
         VALUES (?, ?, ?, ?, ?, ?)",
    )
    .bind(id)
    .bind(user.user_id())
    .bind(&media_url)
    .bind(&media_type)
    .bind(&caption)
    .bind(next_order)
    .execute(&pool)
    .await
    .map_err(err)?;

    let frames = sqlx::query_as::<_, StoryFrameApiRow>(
        "SELECT s.post_id, s.media_url, s.media_type, s.caption, u.name AS author
         FROM post_stories s JOIN users u ON u.id = s.author_user_id
         WHERE s.post_id = ?
         ORDER BY s.frame_order ASC, s.id ASC",
    )
    .bind(id)
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    let frames: Vec<Value> = frames
        .into_iter()
        .map(|s| {
            json!({
                "type": s.media_type,
                "url": s.media_url,
                "author": s.author,
                "caption": s.caption,
            })
        })
        .collect();

    Ok(Json(json!({ "post_id": id, "story": { "frames": frames } })))
}

#[derive(Deserialize)]
pub struct CreatePagePayload {
    pub name: String,
    #[serde(default)]
    pub description: String,
}

pub async fn create_page(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<CreatePagePayload>,
) -> ApiResult {
    let name = payload.name.trim().to_string();
    if name.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "название страницы обязательно".to_string()));
    }
    let description = payload.description.trim().to_string();

    let result = sqlx::query(
        "INSERT INTO communities (name, description, members, accent, accent2, icon_key, icon_emoji, owner_user_id)
         VALUES (?, ?, 1, '#E8B04B', '#C0603A', 'community', '', ?)",
    )
    .bind(&name)
    .bind(&description)
    .bind(user.user_id())
    .execute(&pool)
    .await
    .map_err(err)?;

    let new_id = result.last_insert_id() as i64;

    // The creator is automatically subscribed to their own page.
    sqlx::query("INSERT INTO community_members (community_id, user_id) VALUES (?, ?)")
        .bind(new_id)
        .bind(user.user_id())
        .execute(&pool)
        .await
        .map_err(err)?;

    let (owner_name, owner_handle): (String, String) =
        sqlx::query_as("SELECT name, handle FROM users WHERE id = ?")
            .bind(user.user_id())
            .fetch_one(&pool)
            .await
            .map_err(err)?;

    Ok(Json(json!({
        "page": {
            "id": new_id,
            "name": name,
            "icon": "",
            "desc": description,
            "members": 1,
            "joined": true,
            "owner": { "id": user.user_id(), "name": owner_name, "handle": owner_handle },
        }
    })))
}

pub async fn get_page(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(page_id): Path<i64>,
) -> ApiResult {
    let r: Option<CommunityApiRow> = sqlx::query_as::<_, CommunityApiRow>(
        "SELECT c.id, c.name, c.icon_emoji, c.description, c.members, c.owner_user_id,
                COALESCE(o.name, '') AS owner_name, COALESCE(o.handle, '') AS owner_handle,
                EXISTS(SELECT 1 FROM community_members m
                       WHERE m.community_id = c.id AND m.user_id = ?) AS joined
         FROM communities c LEFT JOIN users o ON o.id = c.owner_user_id
         WHERE c.id = ?",
    )
    .bind(user.user_id())
    .bind(page_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    let Some(r) = r else {
        return Err((StatusCode::NOT_FOUND, "страница не найдена".to_string()));
    };

    let posts = build_posts(&pool, user.user_id(), Some(page_id), None).await?;

    Ok(Json(json!({
        "page": {
            "id": r.id,
            "name": r.name,
            "icon": r.icon_emoji,
            "desc": r.description,
            "members": r.members,
            "joined": r.joined == 1,
            "owner": { "id": r.owner_user_id, "name": r.owner_name, "handle": r.owner_handle },
        },
        "posts": posts,
    })))
}

#[derive(Deserialize)]
pub struct CreatePagePostPayload {
    pub title: String,
    #[serde(default)]
    pub body: String,
}

pub async fn create_page_post(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(page_id): Path<i64>,
    Json(payload): Json<CreatePagePostPayload>,
) -> ApiResult {
    let exists: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM communities WHERE id = ?")
        .bind(page_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;
    if exists == 0 {
        return Err((StatusCode::NOT_FOUND, "страница не найдена".to_string()));
    }

    let title = payload.title.trim().to_string();
    let body = payload.body.trim().to_string();
    if title.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "заголовок обязателен".to_string()));
    }

    let (author, initials) = load_author(&pool, user.user_id()).await?;

    let result = sqlx::query(
        "INSERT INTO posts (user_id, page_id, category, accent, accent2, icon_key, title, body, media_url, media_type, likes, comments, time_label, author_sub)
         VALUES (?, ?, 'Пост', '#E8B04B', '#C0603A', 'community', ?, ?, '', '', 1, 0, 'только что', 'на странице')",
    )
    .bind(user.user_id())
    .bind(page_id)
    .bind(&title)
    .bind(&body)
    .execute(&pool)
    .await
    .map_err(err)?;

    let new_id = result.last_insert_id() as i64;

    // The author's page post auto-gets an upvote from its author.
    sqlx::query(
        "INSERT INTO votes (post_id, user_id, direction) VALUES (?, ?, 'up')
         ON DUPLICATE KEY UPDATE direction = 'up'",
    )
    .bind(new_id)
    .bind(user.user_id())
    .execute(&pool)
    .await
    .map_err(err)?;

    let now = Utc::now().naive_utc();

    Ok(Json(json!({
        "post": {
            "id": new_id,
            "authorId": user.user_id(),
            "author": author,
            "authorHandle": "",
            "avatarInitials": initials,
            "followed": false,
            "isMine": true,
            "time": "только что",
            "createdAt": now.and_utc().timestamp(),
            "title": title,
            "body": body,
            "media": Value::Null,
            "score": 1,
            "voted": "up",
            "saved": false,
            "comments": [],
        }
    })))
}

#[derive(Deserialize)]
pub struct VotePayload {
    pub direction: String,
}

pub async fn vote(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(post_id): Path<i64>,
    Json(payload): Json<VotePayload>,
) -> ApiResult {
    let dir = payload.direction;
    if dir != "up" && dir != "down" {
        return Err((StatusCode::BAD_REQUEST, "direction must be up or down".to_string()));
    }

    let current: Option<String> = sqlx::query_scalar(
        "SELECT direction FROM votes WHERE post_id = ? AND user_id = ?",
    )
    .bind(post_id)
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    let new_dir: Option<String> = match (current.as_deref(), dir.as_str()) {
        (Some("up"), "up") | (Some("down"), "down") => None,
        _ => Some(dir.clone()),
    };

    match (current.as_deref(), dir.as_str()) {
        (Some(c), d) if c == d => {
            // Undo an existing vote.
            sqlx::query("DELETE FROM votes WHERE post_id = ? AND user_id = ?")
                .bind(post_id)
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
        }
        (Some(_), d) => {
            // Switch direction.
            sqlx::query("UPDATE votes SET direction = ? WHERE post_id = ? AND user_id = ?")
                .bind(d)
                .bind(post_id)
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
        }
        (None, d) => {
            sqlx::query("INSERT INTO votes (post_id, user_id, direction) VALUES (?, ?, ?)")
                .bind(post_id)
                .bind(user.user_id())
                .bind(d)
                .execute(&pool)
                .await
                .map_err(err)?;
        }
    }

    // Recompute the score from the votes table so it stays consistent.
    let score: i64 = sqlx::query_scalar(
        "SELECT CAST(COALESCE(SUM(CASE direction WHEN 'up' THEN 1 ELSE -1 END), 0) AS SIGNED)
         FROM votes WHERE post_id = ?",
    )
    .bind(post_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    sqlx::query("UPDATE posts SET likes = ? WHERE id = ?")
        .bind(score)
        .bind(post_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "score": score, "voted": new_dir })))
}

pub async fn toggle_save(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(post_id): Path<i64>,
) -> ApiResult {
    let exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM saved_posts WHERE post_id = ? AND user_id = ?",
    )
    .bind(post_id)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let saved = if exists > 0 {
        sqlx::query("DELETE FROM saved_posts WHERE post_id = ? AND user_id = ?")
            .bind(post_id)
            .bind(user.user_id())
            .execute(&pool)
            .await
            .map_err(err)?;
        false
    } else {
        sqlx::query("INSERT INTO saved_posts (post_id, user_id) VALUES (?, ?)")
            .bind(post_id)
            .bind(user.user_id())
            .execute(&pool)
            .await
            .map_err(err)?;
        true
    };

    Ok(Json(json!({ "saved": saved })))
}

/// Toggles a repost: creates a new feed post wrapping the original (or, if the
/// target is itself a repost, wrapping its original) and notifies the author.
/// Reposting again removes the wrapper.
pub async fn repost(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(post_id): Path<i64>,
) -> ApiResult {
    let target: Option<(i64, i64, Option<i64>)> = sqlx::query_as(
        "SELECT id, user_id, repost_of_id FROM posts WHERE id = ?",
    )
    .bind(post_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    let Some((requested_id, _, repost_of)) = target else {
        return Err((StatusCode::NOT_FOUND, "пост не найден".to_string()));
    };

    // Reposting a repost shares the original post instead of nesting wrappers.
    let original_id = repost_of.unwrap_or(requested_id);

    if original_id == user.user_id() {
        return Err((StatusCode::BAD_REQUEST, "нельзя репостить свой пост".to_string()));
    }

    let (title, body, media_url, media_type, owner_id): (String, String, String, String, i64) =
        sqlx::query_as("SELECT title, body, media_url, media_type, user_id FROM posts WHERE id = ?")
            .bind(original_id)
            .fetch_one(&pool)
            .await
            .map_err(err)?;

    // Toggle off: remove my existing repost of the original.
    let mine: Option<i64> = sqlx::query_scalar(
        "SELECT id FROM posts WHERE user_id = ? AND repost_of_id = ? LIMIT 1",
    )
    .bind(user.user_id())
    .bind(original_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    if let Some(repost_id) = mine {
        sqlx::query("DELETE FROM posts WHERE id = ?")
            .bind(repost_id)
            .execute(&pool)
            .await
            .map_err(err)?;

        let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM posts WHERE repost_of_id = ?")
            .bind(original_id)
            .fetch_one(&pool)
            .await
            .map_err(err)?;

        return Ok(Json(json!({ "reposted": false, "reposts": count, "repostId": repost_id })));
    }

    let (my_name, my_initials, my_handle): (String, String, String) =
        sqlx::query_as("SELECT name, avatar_initials, handle FROM users WHERE id = ?")
            .bind(user.user_id())
            .fetch_one(&pool)
            .await
            .map_err(err)?;

    let result = sqlx::query(
        "INSERT INTO posts (user_id, category, accent, accent2, icon_key, title, body, media_url, media_type, likes, comments, time_label, author_sub, repost_of_id)
         VALUES (?, 'Пост', '#E8B04B', '#C0603A', 'community', ?, ?, ?, ?, 0, 0, 'только что', 'сделал(а) репост', ?)",
    )
    .bind(user.user_id())
    .bind(&title)
    .bind(&body)
    .bind(&media_url)
    .bind(&media_type)
    .bind(original_id)
    .execute(&pool)
    .await
    .map_err(err)?;

    let new_id = result.last_insert_id() as i64;

    let (orig_name, orig_handle): (String, String) =
        sqlx::query_as("SELECT name, handle FROM users WHERE id = ?")
            .bind(owner_id)
            .fetch_one(&pool)
            .await
            .map_err(err)?;

    let preview: String = if title.is_empty() { body.chars().take(60).collect() } else { title.chars().take(60).collect() };
    sqlx::query(
        "INSERT INTO notifications (user_id, notif_type, text, created_at)
         VALUES (?, 'repost', CONCAT(?, ' сделал(а) репост: ', ?), NOW())",
    )
    .bind(owner_id)
    .bind(&my_name)
    .bind(&preview)
    .execute(&pool)
    .await
    .map_err(err)?;

    let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM posts WHERE repost_of_id = ?")
        .bind(original_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;

    let now = Utc::now().naive_utc();

    Ok(Json(json!({
        "reposted": true,
        "reposts": count,
        "repostId": new_id,
        "post": {
            "id": new_id,
            "authorId": user.user_id(),
            "author": my_name,
            "authorHandle": my_handle,
            "avatarInitials": my_initials,
            "isMine": true,
            "time": "только что",
            "createdAt": now.and_utc().timestamp(),
            "title": title,
            "body": body,
            "media": if media_type.is_empty() {
                Value::Null
            } else {
                json!({ "type": media_type, "url": media_url })
            },
            "score": 0,
            "voted": null,
            "saved": false,
            "comments": [],
            "reposts": 0,
            "reposted": false,
            "repostOf": original_id,
            "origAuthorName": orig_name,
            "origAuthorHandle": orig_handle,
        }
    })))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CommentPayload {
    text: String,
    parent_comment_id: Option<i64>,
}

pub async fn add_comment(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(post_id): Path<i64>,
    Json(payload): Json<CommentPayload>,
) -> ApiResult {
    let text = payload.text.trim().to_string();
    if text.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "text required".to_string()));
    }

    let (author, initials) = load_author(&pool, user.user_id()).await?;

    let result = sqlx::query(
        "INSERT INTO comments (post_id, user_id, body, parent_comment_id) VALUES (?, ?, ?, ?)",
    )
    .bind(post_id)
    .bind(user.user_id())
    .bind(&text)
    .bind(payload.parent_comment_id)
    .execute(&pool)
    .await
    .map_err(err)?;

    sqlx::query("UPDATE posts SET comments = comments + 1 WHERE id = ?")
        .bind(post_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({
        "comment": {
            "id": result.last_insert_id() as i64,
            "author": author,
            "authorId": user.user_id(),
            "authorHandle": "",
            "avatarInitials": initials,
            "time": "только что",
            "text": text,
            "likes": 0,
            "liked": false,
            "parentId": payload.parent_comment_id,
        }
    })))
}

/// Toggles the current user's like on a comment. Returns the new like count
/// and whether the comment is now liked by this user.
pub async fn like_comment(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(comment_id): Path<i64>,
) -> ApiResult {
    let exists: Option<i64> = sqlx::query_scalar(
        "SELECT 1 FROM comment_likes WHERE comment_id = ? AND user_id = ?",
    )
    .bind(comment_id)
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?
    .flatten();

    let liked = match exists {
        Some(_) => {
            sqlx::query("DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?")
                .bind(comment_id)
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
            sqlx::query("UPDATE comments SET likes = likes - 1 WHERE id = ? AND likes > 0")
                .bind(comment_id)
                .execute(&pool)
                .await
                .map_err(err)?;
            false
        }
        None => {
            sqlx::query("INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)")
                .bind(comment_id)
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
            sqlx::query("UPDATE comments SET likes = likes + 1 WHERE id = ?")
                .bind(comment_id)
                .execute(&pool)
                .await
                .map_err(err)?;
            true
        }
    };

    let likes: i64 = sqlx::query_scalar("SELECT likes FROM comments WHERE id = ?")
        .bind(comment_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "likes": likes, "liked": liked })))
}

pub async fn join_community(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(community_id): Path<i64>,
) -> ApiResult {
    let exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM community_members WHERE community_id = ? AND user_id = ?",
    )
    .bind(community_id)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let joined = if exists > 0 {
        sqlx::query("DELETE FROM community_members WHERE community_id = ? AND user_id = ?")
            .bind(community_id)
            .bind(user.user_id())
            .execute(&pool)
            .await
            .map_err(err)?;
        false
    } else {
        sqlx::query("INSERT INTO community_members (community_id, user_id) VALUES (?, ?)")
            .bind(community_id)
            .bind(user.user_id())
            .execute(&pool)
            .await
            .map_err(err)?;
        true
    };

    let members: i64 = sqlx::query_scalar(
        "SELECT members FROM communities WHERE id = ?",
    )
    .bind(community_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let members = if joined { members + 1 } else { members - 1 };
    sqlx::query("UPDATE communities SET members = ? WHERE id = ?")
        .bind(members)
        .bind(community_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "joined": joined, "members": members })))
}

#[derive(Deserialize)]
pub struct MessagePayload {
    pub text: Option<String>,
    #[serde(default)]
    pub encrypted: bool,
    pub cipher_text: Option<String>,
    pub nonce: Option<String>,
    #[serde(default)]
    pub media_url: String,
    #[serde(default)]
    pub media_type: String,
}

pub async fn send_message(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(conversation_id): Path<i64>,
    Json(payload): Json<MessagePayload>,
) -> ApiResult {
    let (body, encrypted, nonce, media_url, media_type) = match payload {
        // E2EE message: body is base64 AES-GCM ciphertext (text or audio),
        // the plaintext never reaches the server.
        MessagePayload {
            encrypted: true,
            cipher_text: Some(c),
            nonce: Some(n),
            media_type,
            ..
        } if !c.trim().is_empty() && !n.trim().is_empty() => {
            (c.trim().to_string(), 1, n.trim().to_string(), String::new(), media_type.trim().to_string())
        }
        // Voice message: audio lives in media_url, body is a friendly label.
        MessagePayload { media_url: m, media_type, text, .. } if !m.trim().is_empty() => {
            let label = text.map(|t| t.trim().to_string()).filter(|t| !t.is_empty())
                .unwrap_or_else(|| "🎤 Голосовое сообщение".to_string());
            let mt = media_type.trim().to_string();
            (label, 0, String::new(), m.trim().to_string(), if mt.is_empty() { "audio".to_string() } else { mt })
        }
        // Legacy plaintext message (also used when the peer has no identity key yet).
        MessagePayload {
            encrypted: false,
            text: Some(t),
            ..
        } => {
            let t = t.trim().to_string();
            if t.is_empty() {
                return Err((StatusCode::BAD_REQUEST, "text required".to_string()));
            }
            (t, 0, String::new(), String::new(), String::new())
        }
        _ => return Err((StatusCode::BAD_REQUEST, "invalid message payload".to_string())),
    };

    let participants: Option<(i64, i64)> = sqlx::query_as::<_, (i64, i64)>(
        "SELECT owner_user_id, peer_user_id FROM conversations WHERE id = ?",
    )
    .bind(conversation_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    let Some((owner_id, peer_id)) = participants else {
        return Err((StatusCode::NOT_FOUND, "conversation not found".to_string()));
    };

    if owner_id != user.user_id() && peer_id != user.user_id() {
        return Err((StatusCode::NOT_FOUND, "conversation not found".to_string()));
    }

    // Blocked users can't message each other (either direction).
    let block_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks
         WHERE (blocker_user_id = ? AND blocked_user_id = ?)
            OR (blocker_user_id = ? AND blocked_user_id = ?)",
    )
    .bind(user.user_id())
    .bind(if owner_id == user.user_id() { peer_id } else { owner_id })
    .bind(if owner_id == user.user_id() { peer_id } else { owner_id })
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if block_count > 0 {
        return Err((StatusCode::FORBIDDEN, "сообщение не отправлено: пользователь заблокирован".to_string()));
    }

    let result = sqlx::query(
        "INSERT INTO messages (conversation_id, sender_user_id, body, encrypted, nonce, media_type, media_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(conversation_id)
    .bind(user.user_id())
    .bind(&body)
    .bind(encrypted)
    .bind(&nonce)
    .bind(&media_type)
    .bind(&media_url)
    .execute(&pool)
    .await
    .map_err(err)?;

    let i_am_owner = owner_id == user.user_id();
    sqlx::query(
        "UPDATE conversations
         SET last_message = ?, last_nonce = ?, created_at = NOW(),
             unread_owner = unread_owner + IF(? = 1, 0, 1),
             unread_peer = unread_peer + IF(? = 1, 1, 0)
         WHERE id = ?",
    )
    .bind(&body)
    .bind(&nonce)
    .bind(if i_am_owner { 1i64 } else { 0i64 })
    .bind(if i_am_owner { 1i64 } else { 0i64 })
    .bind(conversation_id)
    .execute(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "message": {
            "id": result.last_insert_id() as i64,
            "from": "you",
            "text": body,
            "time": "только что",
            "encrypted": encrypted == 1,
            "nonce": nonce,
            "reaction": Value::Null,
            "media": if media_type.is_empty() && media_url.is_empty() {
                Value::Null
            } else {
                json!({ "type": media_type, "url": media_url })
            },
        }
    })))
}

#[derive(Deserialize)]
pub struct ReactionPayload {
    pub emoji: String,
}

pub async fn list_users(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    let rows = sqlx::query_as::<_, (i64, String, String, String, Option<NaiveDateTime>)>(
        "SELECT id, name, handle, avatar_initials, last_seen FROM users
         WHERE id != ?
           AND id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
         ORDER BY name ASC",
    )
    .bind(user.user_id())
    .bind(user.user_id())
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "users": rows
            .into_iter()
            .map(|(id, name, handle, initials, last_seen)| json!({
                "id": id,
                "name": name,
                "handle": handle,
                "avatarInitials": initials,
                "lastSeen": last_seen.map(|t| t.and_utc().timestamp()),
            }))
            .collect::<Vec<_>>()
    })))
}

#[derive(Deserialize)]
pub struct SearchParams {
    pub q: String,
}

/// Collects a small corpus of searchable words (post titles, user names and
/// handles) used only for spell-correction when a query finds nothing.
async fn load_search_corpus(pool: &MySqlPool) -> Result<HashSet<String>, (StatusCode, String)> {
    let mut words = HashSet::new();
    let sources: [(&str, &str, usize); 4] = [
        ("posts", "title", 200),
        ("posts", "body", 100),
        ("users", "name", 200),
        ("users", "handle", 200),
    ];
    for (table, col, limit) in sources {
        let sql = format!("SELECT {col} FROM {table} WHERE {col} != '' LIMIT {limit}");
        let rows: Vec<String> = sqlx::query_scalar(&sql).fetch_all(pool).await.map_err(err)?;
        for row in rows {
            for w in row.split(|c: char| !c.is_alphanumeric()) {
                if w.chars().count() >= 2 {
                    words.insert(w.to_lowercase());
                }
            }
        }
    }
    Ok(words)
}

pub async fn search(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Query(params): Query<SearchParams>,
) -> ApiResult {
    let q = params.q.trim();

    let mut users = Vec::new();
    let mut posts: Vec<Value> = Vec::new();
    let mut suggestions = Vec::new();

    if !q.is_empty() {
        let like = like_pattern(q);
        // When a query is all punctuation the boolean term is empty, and
        // `AGAINST('')` misbehaves across MySQL/MariaDB — fall back to LIKE.
        let bt = search_boolean_terms(q);

        let user_rows = if bt.is_empty() {
            sqlx::query_as::<_, (i64, String, String, String, String)>(
                "SELECT id, name, handle, avatar_initials, bio FROM users
                 WHERE id != ?
                   AND id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
                   AND (name LIKE ? OR handle LIKE ?)
                 ORDER BY name ASC
                 LIMIT 20",
            )
            .bind(user.user_id())
            .bind(user.user_id())
            .bind(&like)
            .bind(&like)
            .fetch_all(&pool)
            .await
            .map_err(err)?
            .into_iter()
            .map(|(id, name, handle, initials, bio)| (id, name, handle, initials, bio, 0.0))
            .collect::<Vec<_>>()
        } else {
            sqlx::query_as::<_, (i64, String, String, String, String, f64)>(
                "SELECT id, name, handle, avatar_initials, bio,
                        MATCH(name, handle) AGAINST (? IN BOOLEAN MODE) AS rel
                 FROM users
                 WHERE id != ?
                   AND id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
                   AND (MATCH(name, handle) AGAINST (? IN BOOLEAN MODE)
                     OR name LIKE ? OR handle LIKE ?)
                 ORDER BY rel DESC, name ASC
                 LIMIT 20",
            )
            .bind(&bt)
            .bind(user.user_id())
            .bind(&bt)
            .bind(&like)
            .bind(&like)
            .fetch_all(&pool)
            .await
            .map_err(err)?
        };

        users = user_rows
            .into_iter()
            .map(|(id, name, handle, initials, bio, _rel)| {
                json!({
                    "id": id,
                    "name": name,
                    "handle": handle,
                    "avatarInitials": initials,
                    "bio": bio,
                })
            })
            .collect();

        let post_rows = if bt.is_empty() {
            sqlx::query_as::<_, (i64, i64, String, String, String, String, i64, NaiveDateTime, String, String, String, Option<i64>, Option<String>, Option<String>, f64)>(
                "SELECT p.id, p.user_id, p.title, p.body, p.media_url, p.media_type, p.likes AS score,
                        CAST(p.created_at AS DATETIME) AS created_at, u.name AS author_name,
                        u.handle AS author_handle, u.avatar_initials, p.repost_of_id,
                        ou.name AS orig_author_name, ou.handle AS orig_author_handle, 0 AS rel
                 FROM posts p JOIN users u ON u.id = p.user_id
                 LEFT JOIN posts o ON o.id = p.repost_of_id
                 LEFT JOIN users ou ON ou.id = o.user_id
                 WHERE (p.title LIKE ? OR p.body LIKE ?)
                   AND u.id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
                 ORDER BY p.created_at DESC, p.id DESC
                 LIMIT 50",
            )
            .bind(&like)
            .bind(&like)
            .bind(user.user_id())
            .fetch_all(&pool)
            .await
            .map_err(err)?
        } else {
            sqlx::query_as::<_, (i64, i64, String, String, String, String, i64, NaiveDateTime, String, String, String, Option<i64>, Option<String>, Option<String>, f64)>(
                "SELECT p.id, p.user_id, p.title, p.body, p.media_url, p.media_type, p.likes AS score,
                        CAST(p.created_at AS DATETIME) AS created_at, u.name AS author_name,
                        u.handle AS author_handle, u.avatar_initials, p.repost_of_id,
                        ou.name AS orig_author_name, ou.handle AS orig_author_handle,
                        MATCH(p.title, p.body) AGAINST (? IN BOOLEAN MODE) AS rel
                 FROM posts p JOIN users u ON u.id = p.user_id
                 LEFT JOIN posts o ON o.id = p.repost_of_id
                 LEFT JOIN users ou ON ou.id = o.user_id
                 WHERE (MATCH(p.title, p.body) AGAINST (? IN BOOLEAN MODE)
                     OR p.title LIKE ? OR p.body LIKE ?)
                   AND u.id NOT IN (SELECT blocked_user_id FROM blocks WHERE blocker_user_id = ?)
                 ORDER BY rel DESC, p.created_at DESC, p.id DESC
                 LIMIT 50",
            )
            .bind(&bt)
            .bind(&bt)
            .bind(&like)
            .bind(&like)
            .bind(user.user_id())
            .fetch_all(&pool)
            .await
            .map_err(err)?
        };

        let rows: Vec<PostApiRow> = post_rows
            .into_iter()
            .map(|(id, user_id, title, body, media_url, media_type, score, created_at, author_name, author_handle, avatar_initials, repost_of_id, orig_author_name, orig_author_handle, _rel)| {
                PostApiRow {
                    id,
                    user_id,
                    title,
                    body,
                    media_url,
                    media_type,
                    score,
                    created_at,
                    author_name,
                    author_handle,
                    avatar_initials,
                    repost_of_id,
                    orig_author_name,
                    orig_author_handle,
                }
            })
            .collect();

        posts = enrich_posts(&pool, user.user_id(), rows).await?;
    }

    // Nothing matched: suggest close alternatives from the searchable corpus
    // ("Кофе" → "Возможно, вы имели в виду: кафе").
    if users.is_empty() && posts.is_empty() && !q.is_empty() {
        if let Ok(corpus) = load_search_corpus(&pool).await {
            suggestions = spell_suggest(q, &corpus);
        }
    }

    Ok(Json(json!({ "query": q, "users": users, "posts": posts, "suggestions": suggestions })))
}

pub async fn get_user_profile(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(target_id): Path<i64>,
) -> ApiResult {
    let target: Option<(String, String, String, String, i64)> =
        sqlx::query_as::<_, (String, String, String, String, i64)>(
            "SELECT name, handle, avatar_initials, bio, friends FROM users WHERE id = ?",
        )
        .bind(target_id)
        .fetch_optional(&pool)
        .await
        .map_err(err)?;

    let Some((name, handle, initials, bio, friends)) = target else {
        return Err((StatusCode::NOT_FOUND, "пользователь не найден".to_string()));
    };

    let followed: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM follows WHERE follower_user_id = ? AND followee_user_id = ?",
    )
    .bind(user.user_id())
    .bind(target_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let following: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM follows WHERE follower_user_id = ?",
    )
    .bind(target_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let blocked_by_me: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks WHERE blocker_user_id = ? AND blocked_user_id = ?",
    )
    .bind(user.user_id())
    .bind(target_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let post_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM posts WHERE user_id = ?")
        .bind(target_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({
        "user": {
            "id": target_id,
            "name": name,
            "handle": handle,
            "initials": initials,
            "bio": bio,
            "friends": friends,
            "followed": followed > 0,
            "following": following,
            "observers": friends,
            "blockedByMe": blocked_by_me > 0,
            "isMine": target_id == user.user_id(),
            "postCount": post_count,
        }
    })))
}

#[derive(Deserialize)]
pub struct StartConversationPayload {
    pub user_id: i64,
}

pub async fn start_conversation(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<StartConversationPayload>,
) -> ApiResult {
    if payload.user_id == user.user_id() {
        return Err((StatusCode::BAD_REQUEST, "нельзя начать диалог с самим собой".to_string()));
    }

    let peer: Option<(String, String)> = sqlx::query_as::<_, (String, String)>(
        "SELECT name, avatar_initials FROM users WHERE id = ?",
    )
    .bind(payload.user_id)
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    let Some((peer_name, peer_initials)) = peer else {
        return Err((StatusCode::NOT_FOUND, "user not found".to_string()));
    };

    let block_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks
         WHERE (blocker_user_id = ? AND blocked_user_id = ?)
            OR (blocker_user_id = ? AND blocked_user_id = ?)",
    )
    .bind(user.user_id())
    .bind(payload.user_id)
    .bind(payload.user_id)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if block_count > 0 {
        return Err((StatusCode::FORBIDDEN, "нельзя начать диалог с заблокированным пользователем".to_string()));
    }

    let existing: Option<i64> = sqlx::query_scalar(
        "SELECT id FROM conversations
         WHERE (owner_user_id = ? AND peer_user_id = ?)
            OR (owner_user_id = ? AND peer_user_id = ?)",
    )
    .bind(user.user_id())
    .bind(payload.user_id)
    .bind(payload.user_id)
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?
    .flatten();

    let convo_id = match existing {
        Some(id) => id,
        None => {
            let result = sqlx::query(
                "INSERT INTO conversations (owner_user_id, peer_user_id, peer_name, avatar_initials, last_message, time_label, unread)
                 VALUES (?, ?, ?, ?, '', '', 0)",
            )
            .bind(user.user_id())
            .bind(payload.user_id)
            .bind(&peer_name)
            .bind(&peer_initials)
            .execute(&pool)
            .await
            .map_err(err)?;
            result.last_insert_id() as i64
        }
    };

    let conversation = build_conversation(&pool, user.user_id(), convo_id).await?;
    Ok(Json(json!({ "conversation": conversation })))
}

pub async fn mark_conversation_read(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(conversation_id): Path<i64>,
) -> ApiResult {
    sqlx::query(
        "UPDATE conversations
         SET unread_owner = IF(owner_user_id = ?, 0, unread_owner),
             unread_peer = IF(peer_user_id = ?, 0, unread_peer)
         WHERE id = ?",
    )
    .bind(user.user_id())
    .bind(user.user_id())
    .bind(conversation_id)
    .execute(&pool)
    .await
    .map_err(err)?;
    Ok(Json(json!({ "ok": true })))
}

pub async fn set_reaction(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(message_id): Path<i64>,
    Json(payload): Json<ReactionPayload>,
) -> ApiResult {
    let owned: Option<i64> = sqlx::query_scalar(
        "SELECT m.id FROM messages m
         JOIN conversations c ON c.id = m.conversation_id
         WHERE m.id = ? AND (c.owner_user_id = ? OR c.peer_user_id = ?)",
    )
    .bind(message_id)
    .bind(user.user_id())
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?
    .flatten();

    if owned.is_none() {
        return Err((StatusCode::NOT_FOUND, "message not found".to_string()));
    }

    let current: String = sqlx::query_scalar("SELECT reaction FROM messages WHERE id = ?")
        .bind(message_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;

    let new = if current == payload.emoji {
        String::new()
    } else {
        payload.emoji
    };

    sqlx::query("UPDATE messages SET reaction = ? WHERE id = ?")
        .bind(&new)
        .bind(message_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    let reaction = if new.is_empty() {
        Value::Null
    } else {
        Value::String(new)
    };
    Ok(Json(json!({ "reaction": reaction })))
}

pub async fn mark_notifs_read(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    sqlx::query("UPDATE notifications SET unread = 0 WHERE user_id = ?")
        .bind(user.user_id())
        .execute(&pool)
        .await
        .map_err(err)?;
    Ok(Json(json!({ "ok": true })))
}

pub async fn toggle_follow(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(target_id): Path<i64>,
) -> ApiResult {
    if target_id == user.user_id() {
        return Err((StatusCode::BAD_REQUEST, "нельзя подписаться на самого себя".to_string()));
    }

    // Can't follow someone you (or they) have blocked.
    let block_count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks
         WHERE (blocker_user_id = ? AND blocked_user_id = ?)
            OR (blocker_user_id = ? AND blocked_user_id = ?)",
    )
    .bind(user.user_id())
    .bind(target_id)
    .bind(target_id)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;
    if block_count > 0 {
        return Err((StatusCode::FORBIDDEN, "нельзя подписаться на заблокированного пользователя".to_string()));
    }

    let exists: Option<i64> = sqlx::query_scalar("SELECT id FROM users WHERE id = ?")
        .bind(target_id)
        .fetch_optional(&pool)
        .await
        .map_err(err)?
        .flatten();
    if exists.is_none() {
        return Err((StatusCode::NOT_FOUND, "user not found".to_string()));
    }

    let count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM follows WHERE follower_user_id = ? AND followee_user_id = ?",
    )
    .bind(user.user_id())
    .bind(target_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    let following = if count > 0 {
        sqlx::query("DELETE FROM follows WHERE follower_user_id = ? AND followee_user_id = ?")
            .bind(user.user_id())
            .bind(target_id)
            .execute(&pool)
            .await
            .map_err(err)?;
        false
    } else {
        sqlx::query("INSERT INTO follows (follower_user_id, followee_user_id) VALUES (?, ?)")
            .bind(user.user_id())
            .bind(target_id)
            .execute(&pool)
            .await
            .map_err(err)?;
        true
    };

    let delta: i64 = if following { 1 } else { -1 };
    sqlx::query("UPDATE users SET friends = GREATEST(friends + ?, 0) WHERE id = ?")
        .bind(delta)
        .bind(target_id)
        .execute(&pool)
        .await
        .map_err(err)?;

    let followers: i64 = sqlx::query_scalar("SELECT friends FROM users WHERE id = ?")
        .bind(target_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;

    if following {
        let (name,): (String,) =
            sqlx::query_as("SELECT name FROM users WHERE id = ?")
                .bind(user.user_id())
                .fetch_one(&pool)
                .await
                .map_err(err)?;
        sqlx::query(
            "INSERT INTO notifications (user_id, notif_type, text, created_at)
             VALUES (?, 'follow', CONCAT(?, ' подписался(ась) на вас'), NOW())",
        )
        .bind(target_id)
        .bind(&name)
        .execute(&pool)
        .await
        .map_err(err)?;
    }

    Ok(Json(json!({ "following": following, "followers": followers })))
}

/// Toggle a block: blocked users can't message you, appear in your feeds or
/// be followed. Blocking also dissolves any follow relationship both ways.
pub async fn toggle_block(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(target_id): Path<i64>,
) -> ApiResult {
    if target_id == user.user_id() {
        return Err((StatusCode::BAD_REQUEST, "нельзя заблокировать самого себя".to_string()));
    }

    let exists: Option<i64> = sqlx::query_scalar("SELECT id FROM users WHERE id = ?")
        .bind(target_id)
        .fetch_optional(&pool)
        .await
        .map_err(err)?
        .flatten();
    if exists.is_none() {
        return Err((StatusCode::NOT_FOUND, "user not found".to_string()));
    }

    let blocked: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM blocks WHERE blocker_user_id = ? AND blocked_user_id = ?",
    )
    .bind(user.user_id())
    .bind(target_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    if blocked > 0 {
        sqlx::query("DELETE FROM blocks WHERE blocker_user_id = ? AND blocked_user_id = ?")
            .bind(user.user_id())
            .bind(target_id)
            .execute(&pool)
            .await
            .map_err(err)?;
    } else {
        sqlx::query("INSERT INTO blocks (blocker_user_id, blocked_user_id) VALUES (?, ?)")
            .bind(user.user_id())
            .bind(target_id)
            .execute(&pool)
            .await
            .map_err(err)?;
        // Blocking dissolves follow relationships in both directions.
        let i_follow: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM follows WHERE follower_user_id = ? AND followee_user_id = ?",
        )
        .bind(user.user_id())
        .bind(target_id)
        .fetch_one(&pool)
        .await
        .map_err(err)?;
        let they_follow: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM follows WHERE follower_user_id = ? AND followee_user_id = ?",
        )
        .bind(target_id)
        .bind(user.user_id())
        .fetch_one(&pool)
        .await
        .map_err(err)?;
        if i_follow > 0 {
            sqlx::query("DELETE FROM follows WHERE follower_user_id = ? AND followee_user_id = ?")
                .bind(user.user_id())
                .bind(target_id)
                .execute(&pool)
                .await
                .map_err(err)?;
            sqlx::query("UPDATE users SET friends = GREATEST(friends - 1, 0) WHERE id = ?")
                .bind(target_id)
                .execute(&pool)
                .await
                .map_err(err)?;
        }
        if they_follow > 0 {
            sqlx::query("DELETE FROM follows WHERE follower_user_id = ? AND followee_user_id = ?")
                .bind(target_id)
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
            sqlx::query("UPDATE users SET friends = GREATEST(friends - 1, 0) WHERE id = ?")
                .bind(user.user_id())
                .execute(&pool)
                .await
                .map_err(err)?;
        }
    }

    Ok(Json(json!({ "blocked": blocked == 0 })))
}

/// The current user's blacklist: [{ id, name, handle, avatarInitials }].
pub async fn list_blocks(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    let rows: Vec<(i64, String, String, String)> = sqlx::query_as(
        "SELECT u.id, u.name, u.handle, u.avatar_initials
         FROM blocks b JOIN users u ON u.id = b.blocked_user_id
         WHERE b.blocker_user_id = ?
         ORDER BY b.created_at DESC",
    )
    .bind(user.user_id())
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "users": rows
            .into_iter()
            .map(|(id, name, handle, initials)| json!({
                "id": id,
                "name": name,
                "handle": handle,
                "avatarInitials": initials,
            }))
            .collect::<Vec<_>>()
    })))
}

// ===== E2EE keys =====

pub async fn get_my_key(State(pool): State<MySqlPool>, user: ApiUser) -> ApiResult {
    let row: Option<(String,)> = sqlx::query_as(
        "SELECT identity_pub FROM user_keys WHERE user_id = ?",
    )
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({ "identityPub": row.map(|r| r.0) })))
}

#[derive(Deserialize)]
pub struct MyKeyPayload {
    pub identity_pub: String,
}

pub async fn upsert_my_key(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<MyKeyPayload>,
) -> ApiResult {
    let pub_key = payload.identity_pub.trim().to_string();
    if pub_key.is_empty() || pub_key.len() > 4096 {
        return Err((StatusCode::BAD_REQUEST, "invalid identity key".to_string()));
    }

    sqlx::query(
        "INSERT INTO user_keys (user_id, identity_pub)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE identity_pub = VALUES(identity_pub)",
    )
    .bind(user.user_id())
    .bind(&pub_key)
    .execute(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({ "ok": true })))
}

pub async fn list_user_keys(State(pool): State<MySqlPool>, _user: ApiUser) -> ApiResult {
    let rows = sqlx::query_as::<_, (i64, String)>(
        "SELECT user_id, identity_pub FROM user_keys ORDER BY user_id",
    )
    .fetch_all(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "users": rows
            .into_iter()
            .map(|(user_id, identity_pub)| json!({
                "userId": user_id,
                "identityPub": identity_pub,
            }))
            .collect::<Vec<_>>()
    })))
}

async fn is_conversation_participant(
    pool: &MySqlPool,
    conversation_id: i64,
    user_id: i64,
) -> Result<bool, (StatusCode, String)> {
    let row: Option<(i64, i64)> = sqlx::query_as::<_, (i64, i64)>(
        "SELECT owner_user_id, peer_user_id FROM conversations WHERE id = ?",
    )
    .bind(conversation_id)
    .fetch_optional(pool)
    .await
    .map_err(err)?;

    Ok(match row {
        Some((owner_id, peer_id)) => owner_id == user_id || peer_id == user_id,
        None => false,
    })
}

pub async fn get_conversation_keys(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(conversation_id): Path<i64>,
) -> ApiResult {
    if !is_conversation_participant(&pool, conversation_id, user.user_id()).await? {
        return Err((StatusCode::NOT_FOUND, "conversation not found".to_string()));
    }

    let row: Option<(String, String, String)> = sqlx::query_as::<_, (String, String, String)>(
        "SELECT wrapped_key, wrap_nonce, wrap_eph
         FROM conversation_keys WHERE conversation_id = ? AND user_id = ?",
    )
    .bind(conversation_id)
    .bind(user.user_id())
    .fetch_optional(&pool)
    .await
    .map_err(err)?;

    Ok(Json(json!({
        "key": row.map(|(wrapped_key, wrap_nonce, wrap_eph)| json!({
            "wrapped": wrapped_key,
            "nonce": wrap_nonce,
            "ephPub": wrap_eph,
        }))
    })))
}

#[derive(Deserialize)]
pub struct WrappedKeyPayload {
    pub user_id: i64,
    pub wrapped_key: String,
    pub wrap_nonce: String,
    pub wrap_eph: String,
}

#[derive(Deserialize)]
pub struct ConversationKeysPayload {
    #[serde(default)]
    pub wrapped_keys: Vec<WrappedKeyPayload>,
}

pub async fn upsert_conversation_keys(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Path(conversation_id): Path<i64>,
    Json(payload): Json<ConversationKeysPayload>,
) -> ApiResult {
    if !is_conversation_participant(&pool, conversation_id, user.user_id()).await? {
        return Err((StatusCode::NOT_FOUND, "conversation not found".to_string()));
    }

    let participants: (i64, i64) = sqlx::query_as::<_, (i64, i64)>(
        "SELECT owner_user_id, peer_user_id FROM conversations WHERE id = ?",
    )
    .bind(conversation_id)
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    for w in &payload.wrapped_keys {
        // Only wrap for the two participants of this conversation.
        if w.user_id != participants.0 && w.user_id != participants.1 {
            return Err((StatusCode::BAD_REQUEST, "invalid key recipient".to_string()));
        }
        if w.wrapped_key.is_empty() || w.wrap_nonce.is_empty() || w.wrap_eph.is_empty() {
            return Err((StatusCode::BAD_REQUEST, "invalid wrapped key".to_string()));
        }
        if w.wrapped_key.len() > 4096 || w.wrap_eph.len() > 4096 {
            return Err((StatusCode::BAD_REQUEST, "invalid wrapped key".to_string()));
        }
    }

    for w in &payload.wrapped_keys {
        sqlx::query(
            "INSERT INTO conversation_keys (conversation_id, user_id, sender_user_id, wrapped_key, wrap_nonce, wrap_eph)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE wrapped_key = VALUES(wrapped_key),
                                     wrap_nonce = VALUES(wrap_nonce),
                                     wrap_eph = VALUES(wrap_eph)",
        )
        .bind(conversation_id)
        .bind(w.user_id)
        .bind(user.user_id())
        .bind(&w.wrapped_key)
        .bind(&w.wrap_nonce)
        .bind(&w.wrap_eph)
        .execute(&pool)
        .await
        .map_err(err)?;
    }

    Ok(Json(json!({ "ok": true })))
}

fn initials_from_name(name: &str) -> String {
    let initials: String = name
        .split_whitespace()
        .filter_map(|word| word.chars().next())
        .take(2)
        .collect::<String>()
        .to_uppercase();

    if initials.is_empty() {
        "??".to_string()
    } else {
        initials
    }
}

/// Usernames in tap are Latin-only: letters, digits, spaces
/// and a few safe separators. Cyrillic and other scripts are rejected.
fn is_latin_name(name: &str) -> bool {
    !name.is_empty()
        && name.chars().all(|c| {
            c.is_ascii_alphabetic()
                || c.is_ascii_digit()
                || c == ' '
                || c == '-'
                || c == '_'
                || c == '\''
                || c == '.'
        })
}

fn is_valid_handle(handle: &str) -> bool {
    if handle.len() < 2 || handle.len() > 120 || !handle.starts_with('@') {
        return false;
    }
    let body = &handle[1..];
    if body.is_empty() || body.starts_with('.') || body.ends_with('.') {
        return false;
    }
    let mut prev_dot = false;
    for c in body.chars() {
        if !(c.is_ascii_alphanumeric() || c == '_' || c == '.' || c == '-') {
            return false;
        }
        if c == '.' {
            if prev_dot {
                return false;
            }
            prev_dot = true;
        } else {
            prev_dot = false;
        }
    }
    true
}

#[derive(Deserialize)]
pub struct UpdateProfilePayload {
    pub name: String,
    #[serde(default)]
    pub handle: String,
    #[serde(default)]
    pub bio: String,
}

pub async fn update_profile(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<UpdateProfilePayload>,
) -> ApiResult {
    let name = payload.name.trim().to_string();
    let handle = payload.handle.trim().to_string();
    let bio = payload.bio.trim().to_string();

    if name.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Имя не может быть пустым".to_string()));
    }
    if name.len() > 120 {
        return Err((StatusCode::BAD_REQUEST, "Имя слишком длинное".to_string()));
    }
    if !is_latin_name(&name) {
        return Err((
            StatusCode::BAD_REQUEST,
            "Имя должно быть на английском: только латинские буквы, цифры, пробелы и символы «- _ . '».".to_string(),
        ));
    }

    if handle.is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Ник не может быть пустым".to_string()));
    }
    if !is_valid_handle(&handle) {
        return Err((
            StatusCode::BAD_REQUEST,
            "Ник должен начинаться с @ и содержать только латинские буквы, цифры и символы «_ . -».".to_string(),
        ));
    }

    let handle_taken: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM users WHERE LOWER(handle) = LOWER(?) AND id != ?",
    )
    .bind(&handle)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    if handle_taken > 0 {
        return Err((StatusCode::CONFLICT, "Этот ник уже занят".to_string()));
    }

    let name_key = name.replace(' ', "").to_lowercase();
    let name_taken: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM users WHERE LOWER(REPLACE(name, ' ', '')) = ? AND id != ?",
    )
    .bind(&name_key)
    .bind(user.user_id())
    .fetch_one(&pool)
    .await
    .map_err(err)?;

    if name_taken > 0 {
        return Err((
            StatusCode::CONFLICT,
            "Такое имя уже занято. Похожие имена в tap не допускаются.".to_string(),
        ));
    }

    let initials = initials_from_name(&name);

    sqlx::query("UPDATE users SET name = ?, handle = ?, bio = ?, avatar_initials = ? WHERE id = ?")
        .bind(&name)
        .bind(&handle)
        .bind(&bio)
        .bind(&initials)
        .bind(user.user_id())
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({
        "me": { "id": user.user_id(), "name": name, "handle": handle, "initials": initials, "bio": bio },
    })))
}

pub const INTERESTS: &[&str] = &[
    "Спорт", "Технологии", "Искусство", "Путешествия", "Музыка", "Еда", "Игры", "Кино", "Наука", "Мода",
];

#[derive(Deserialize)]
pub struct SaveInterestsPayload {
    #[serde(default)]
    pub interests: Vec<String>,
}

pub async fn save_interests(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Json(payload): Json<SaveInterestsPayload>,
) -> ApiResult {
    let mut chosen = Vec::new();
    for raw in payload.interests {
        let value = raw.trim().to_string();
        if value.is_empty() {
            continue;
        }
        if !INTERESTS.contains(&value.as_str()) {
            return Err((StatusCode::BAD_REQUEST, "Неизвестный интерес".to_string()));
        }
        if !chosen.contains(&value) {
            chosen.push(value);
        }
    }
    if chosen.len() > INTERESTS.len() {
        return Err((StatusCode::BAD_REQUEST, "Слишком много интересов".to_string()));
    }

    sqlx::query("UPDATE users SET interests = ? WHERE id = ?")
        .bind(chosen.join(","))
        .bind(user.user_id())
        .execute(&pool)
        .await
        .map_err(err)?;

    Ok(Json(json!({ "interests": chosen })))
}

#[derive(Deserialize)]
pub struct CheckUserPayload {
    pub field: String,
    pub value: String,
}

pub async fn check_user(
    State(pool): State<MySqlPool>,
    user: ApiUser,
    Query(q): Query<CheckUserPayload>,
) -> ApiResult {
    let value = q.value.trim().to_string();

    let taken = match q.field.as_str() {
        "handle" => {
            if value.is_empty() || !is_valid_handle(&value) {
                return Err((StatusCode::BAD_REQUEST, "invalid handle".to_string()));
            }
            let n: i64 = sqlx::query_scalar(
                "SELECT COUNT(*) FROM users WHERE LOWER(handle) = LOWER(?) AND id != ?",
            )
            .bind(&value)
            .bind(user.user_id())
            .fetch_one(&pool)
            .await
            .map_err(err)?;
            n > 0
        }
        "name" => {
            if value.is_empty() {
                return Err((StatusCode::BAD_REQUEST, "invalid name".to_string()));
            }
            let key = value.replace(' ', "").to_lowercase();
            let n: i64 = sqlx::query_scalar(
                "SELECT COUNT(*) FROM users WHERE LOWER(REPLACE(name, ' ', '')) = ? AND id != ?",
            )
            .bind(&key)
            .bind(user.user_id())
            .fetch_one(&pool)
            .await
            .map_err(err)?;
            n > 0
        }
        _ => return Err((StatusCode::BAD_REQUEST, "unknown field".to_string())),
    };

    Ok(Json(json!({ "available": !taken })))
}
