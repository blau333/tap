use axum::extract::FromRequestParts;
use axum::http::header::COOKIE;
use axum::http::request::Parts;
use axum::http::{HeaderMap, HeaderValue};
use axum::response::Redirect;
use chrono::Duration;
use rand::Rng;
use sqlx::MySqlPool;

pub const SESSION_COOKIE: &str = "kolo_session";
const SESSION_TTL_DAYS: i64 = 30;
const SESSION_TTL_SECONDS: i64 = SESSION_TTL_DAYS * 86400;

/// Returns the current user id for the request, if the session cookie is
/// valid (not expired). Used to decide whether to redirect already-logged-in
/// visitors away from the login/registration pages.
pub async fn session_user_id(pool: &MySqlPool, headers: &HeaderMap) -> Option<i64> {
    let token = session_token_from_headers(headers)?;
    sqlx::query_scalar("SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()")
        .bind(&token)
        .fetch_optional(pool)
        .await
        .ok()
        .flatten()
}

/// Extends the session lifetime so that active users are never logged out.
async fn renew_session(pool: &MySqlPool, token: &str) {
    let _ = sqlx::query(
        "UPDATE sessions SET expires_at = DATE_ADD(NOW(), INTERVAL ? SECOND) WHERE token = ?",
    )
    .bind(SESSION_TTL_SECONDS)
    .bind(token)
    .execute(pool)
    .await;
}

/// Generates a random session token (64 hex chars).
fn session_token() -> String {
    let bytes: [u8; 32] = rand::thread_rng().gen();
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}

/// Extracts our session token from the Cookie request header.
pub fn session_token_from_headers(headers: &HeaderMap) -> Option<String> {
    let cookie = headers.get(COOKIE)?.to_str().ok()?;
    for part in cookie.split(';') {
        let part = part.trim();
        if let Some((name, value)) = part.split_once('=') {
            if name.trim() == SESSION_COOKIE {
                return Some(value.trim().to_string());
            }
        }
    }
    None
}

pub fn session_cookie(token: &str) -> HeaderValue {
    HeaderValue::from_str(&format!(
        "{SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age={}",
        SESSION_TTL_DAYS * 86400
    ))
    .unwrap()
}

pub fn clear_session_cookie() -> HeaderValue {
    HeaderValue::from_str(&format!("{SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"))
        .unwrap()
}

/// Name of the cookie that stores the list of "added" account session tokens
/// for this browser. The active account is still tracked by `kolo_session`;
/// this cookie just remembers the others so the user can switch between them.
pub const ACCOUNTS_COOKIE: &str = "kolo_accounts";

/// Reads the list of added account tokens from the `kolo_accounts` cookie.
/// Returns an empty vector when the cookie is missing or not valid JSON.
pub fn read_accounts(headers: &HeaderMap) -> Vec<String> {
    let cookie = match headers.get(COOKIE).and_then(|c| c.to_str().ok()) {
        Some(c) => c,
        None => return Vec::new(),
    };
    for part in cookie.split(';') {
        let part = part.trim();
        if let Some((name, value)) = part.split_once('=') {
            if name.trim() == ACCOUNTS_COOKIE {
                return serde_json::from_str::<Vec<String>>(value.trim()).unwrap_or_default();
            }
        }
    }
    Vec::new()
}

/// Builds the `Set-Cookie` header for the accounts list (a JSON array of
/// session tokens). HttpOnly, same 30-day lifetime as the session cookie.
pub fn accounts_cookie(tokens: &[String]) -> HeaderValue {
    let body = serde_json::json!(tokens).to_string();
    HeaderValue::from_str(&format!(
        "{ACCOUNTS_COOKIE}={body}; Path=/; HttpOnly; SameSite=Lax; Max-Age={}",
        SESSION_TTL_DAYS * 86400
    ))
    .unwrap()
}

pub fn clear_accounts_cookie() -> HeaderValue {
    HeaderValue::from_str(&format!("{ACCOUNTS_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"))
        .unwrap()
}

/// Creates a new session for the user and returns its token.
pub async fn create_session(pool: &MySqlPool, user_id: i64) -> anyhow::Result<String> {
    let token = session_token();
    let expires_at = chrono::Utc::now().naive_utc() + Duration::days(SESSION_TTL_DAYS);

    sqlx::query("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
        .bind(&token)
        .bind(user_id)
        .bind(expires_at)
        .execute(pool)
        .await?;

    Ok(token)
}

pub async fn destroy_session(pool: &MySqlPool, token: &str) -> anyhow::Result<()> {
    sqlx::query("DELETE FROM sessions WHERE token = ?")
        .bind(token)
        .execute(pool)
        .await?;
    Ok(())
}

/// Extractor that resolves the session cookie into the authenticated user id.
/// Unauthenticated requests are redirected to the login page.
pub struct AuthUser(pub i64);

#[async_trait::async_trait]
impl FromRequestParts<MySqlPool> for AuthUser {
    type Rejection = Redirect;

    async fn from_request_parts(
        parts: &mut Parts,
        pool: &MySqlPool,
    ) -> Result<Self, Self::Rejection> {
        let token = session_token_from_headers(&parts.headers)
            .ok_or_else(|| Redirect::to("/login"))?;

        let user_id: Option<i64> = sqlx::query_scalar(
            "SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()",
        )
        .bind(&token)
        .fetch_optional(pool)
        .await
        .ok()
        .flatten();

        match user_id {
            Some(id) => {
                renew_session(pool, &token).await;
                Ok(AuthUser(id))
            }
            None => Err(Redirect::to("/login")),
        }
    }
}

impl AuthUser {
    pub fn user_id(&self) -> i64 {
        self.0
    }
}

/// Like `AuthUser`, but for JSON API routes: unauthenticated requests get a
/// `401 Unauthorized` response instead of a redirect.
pub struct ApiUser(pub i64);

#[async_trait::async_trait]
impl FromRequestParts<MySqlPool> for ApiUser {
    type Rejection = (axum::http::StatusCode, axum::Json<serde_json::Value>);

    async fn from_request_parts(
        parts: &mut Parts,
        pool: &MySqlPool,
    ) -> Result<Self, Self::Rejection> {
        let token = session_token_from_headers(&parts.headers)
            .unwrap_or_default();

        let user_id: Option<i64> = sqlx::query_scalar(
            "SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()",
        )
        .bind(&token)
        .fetch_optional(pool)
        .await
        .ok()
        .flatten();

        match user_id {
            Some(id) => {
                renew_session(pool, &token).await;
                // Presence: mark the user active, but throttle to at most one
                // write per 60s so frequent API calls don't hammer the DB.
                sqlx::query(
                    "UPDATE users SET last_seen = NOW()
                     WHERE id = ? AND (last_seen IS NULL OR last_seen < NOW() - INTERVAL 60 SECOND)",
                )
                .bind(id)
                .execute(pool)
                .await
                .ok();
                Ok(ApiUser(id))
            }
            None => Err((
                axum::http::StatusCode::UNAUTHORIZED,
                axum::Json(serde_json::json!({ "error": "unauthorized" })),
            )),
        }
    }
}

impl ApiUser {
    pub fn user_id(&self) -> i64 {
        self.0
    }
}
