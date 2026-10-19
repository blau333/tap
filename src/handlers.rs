use askama_axum::IntoResponse;
use axum::extract::{Form, Json, Query, State};
use axum::http::header::SET_COOKIE;
use axum::http::{HeaderMap, StatusCode};
use axum::response::{Html, Redirect};
use askama::Template;
use chrono::{Duration, NaiveDateTime, Utc};
use rand::RngCore;
use serde::Deserialize;
use serde_json;
use sha2::{Digest, Sha256};
use sqlx::MySqlPool;

use crate::auth::{self, session_user_id, AuthUser};
use crate::models::User;

/// Serves the React single-page app shell. The page requires a session, so
/// unauthenticated visitors are redirected to the login page.
pub async fn app_page(auth: AuthUser) -> impl IntoResponse {
    let _ = auth.user_id();
    match tokio::fs::read_to_string("static/tap.html").await {
        Ok(html) => Html(html).into_response(),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, format!("tap.html: {err}")).into_response(),
    }
}

// ===== Login / Logout =====

#[derive(Template)]
#[template(path = "login.html")]
pub struct LoginTemplate {
    pub error: Option<String>,
    pub email: String,
}

pub async fn login_page(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Query(q): Query<LoginQuery>,
) -> impl IntoResponse {
    if q.add.is_none() && session_user_id(&pool, &headers).await.is_some() {
        return Redirect::to("/app").into_response();
    }
    LoginTemplate { error: None, email: String::new() }.into_response()
}

#[derive(Debug, Deserialize)]
pub struct LoginForm {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginQuery {
    pub add: Option<String>,
}

pub async fn login_submit(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Form(form): Form<LoginForm>,
) -> impl IntoResponse {
    let email = form.email.trim().to_lowercase();

    if email.is_empty() || form.password.is_empty() {
        return LoginTemplate { error: Some("Введите email и пароль.".into()), email }.into_response();
    }

    let user: Option<User> = sqlx::query_as::<_, User>(
        "SELECT id, password_hash, email_verified FROM users WHERE email = ?",
    )
    .bind(&email)
    .fetch_optional(&pool)
    .await
    .ok()
    .flatten();

    match user {
        Some(user) => {
            if user.password_hash != hash_password(&form.password) {
                return LoginTemplate { error: Some("Неверный пароль.".into()), email }.into_response();
            }
            if !user.email_verified {
                return Redirect::to(&format!("/verify-sent?email={}", encode_query(&email))).into_response();
            }
            match auth::create_session(&pool, user.id).await {
                Ok(token) => {
                    let mut accounts = auth::read_accounts(&headers);
                    if !accounts.contains(&token) {
                        accounts.push(token.clone());
                    }
                    let mut resp = Redirect::to("/app").into_response();
                    resp.headers_mut().insert(SET_COOKIE, auth::session_cookie(&token));
                    resp.headers_mut().append(SET_COOKIE, auth::accounts_cookie(&accounts));
                    resp
                }
                Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
            }
        }
        None => {
            LoginTemplate { error: Some("Аккаунт с таким email не найден.".into()), email }
                .into_response()
        }
    }
}

pub async fn logout(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let mut resp = Redirect::to("/login").into_response();
    resp.headers_mut().insert(SET_COOKIE, auth::clear_session_cookie());
    resp.headers_mut().append(SET_COOKIE, auth::clear_accounts_cookie());

    if let Some(token) = auth::session_token_from_headers(&headers) {
        let _ = auth::destroy_session(&pool, &token).await;
        // Drop the just-logged-out account from the remembered list and, if any
        // others remain, make the first of them the active session so the user
        // stays signed in instead of being thrown back to the login screen.
        let mut accounts = auth::read_accounts(&headers);
        accounts.retain(|t| t != &token);
        if let Some(next) = accounts.first().cloned() {
            resp = Redirect::to("/app").into_response();
            resp.headers_mut().insert(SET_COOKIE, auth::session_cookie(&next));
            resp.headers_mut().append(SET_COOKIE, auth::accounts_cookie(&accounts));
        }
    }

    resp
}

// ===== Multi-account switcher =====

#[derive(Debug, Deserialize)]
pub struct AccountAction {
    pub token: String,
}

/// Lists the accounts remembered on this browser, with the active one flagged.
pub async fn list_accounts(
    State(pool): State<MySqlPool>,
    _auth: crate::auth::ApiUser,
    headers: HeaderMap,
) -> impl IntoResponse {
    let current = auth::session_token_from_headers(&headers);
    let tokens = auth::read_accounts(&headers);
    let mut out = Vec::new();
    for token in tokens {
        let row: Option<(i64, String, String, String)> = sqlx::query_as(
            "SELECT u.id, u.name, u.handle, u.avatar_initials
             FROM sessions s JOIN users u ON u.id = s.user_id
             WHERE s.token = ? AND s.expires_at > NOW()",
        )
        .bind(&token)
        .fetch_optional(&pool)
        .await
        .ok()
        .flatten();
        if let Some((id, name, handle, initials)) = row {
            out.push(serde_json::json!({
                "id": id,
                "name": name,
                "handle": handle,
                "avatar_initials": initials,
                "token": token,
                "current": current.as_deref() == Some(token.as_str()),
            }));
        }
    }
    (StatusCode::OK, axum::Json(serde_json::json!(out))).into_response()
}

/// Switches the active session to a remembered account. Only tokens that are
/// actually in the browser's accounts list can be selected.
pub async fn switch_account(
    State(pool): State<MySqlPool>,
    _auth: crate::auth::ApiUser,
    headers: HeaderMap,
    Json(body): Json<AccountAction>,
) -> impl IntoResponse {
    let mut accounts = auth::read_accounts(&headers);
    if !accounts.contains(&body.token) {
        return (StatusCode::FORBIDDEN, "unknown account").into_response();
    }

    let valid: Option<i64> = sqlx::query_scalar(
        "SELECT user_id FROM sessions WHERE token = ? AND expires_at > NOW()",
    )
    .bind(&body.token)
    .fetch_optional(&pool)
    .await
    .ok()
    .flatten();

    match valid {
        Some(_) => {
            let mut resp = (StatusCode::OK, axum::Json(serde_json::json!({ "ok": true }))).into_response();
            resp.headers_mut().insert(SET_COOKIE, auth::session_cookie(&body.token));
            resp.headers_mut().append(SET_COOKIE, auth::accounts_cookie(&accounts));
            resp
        }
        None => {
            accounts.retain(|t| t != &body.token);
            let mut resp = (
                StatusCode::OK,
                axum::Json(serde_json::json!({ "ok": false, "removed": true })),
            )
                .into_response();
            resp.headers_mut().insert(SET_COOKIE, auth::accounts_cookie(&accounts));
            resp
        }
    }
}

/// Removes an account from the remembered list. If it was the active one, the
/// session falls back to the next remembered account (or clears entirely).
pub async fn remove_account(
    State(pool): State<MySqlPool>,
    _auth: crate::auth::ApiUser,
    headers: HeaderMap,
    Json(body): Json<AccountAction>,
) -> impl IntoResponse {
    let current = auth::session_token_from_headers(&headers);
    let _ = auth::destroy_session(&pool, &body.token).await;

    let mut accounts = auth::read_accounts(&headers);
    accounts.retain(|t| t != &body.token);

    let mut resp = (StatusCode::OK, axum::Json(serde_json::json!({ "ok": true }))).into_response();
    resp.headers_mut().insert(SET_COOKIE, auth::accounts_cookie(&accounts));

    if current.as_deref() == Some(body.token.as_str()) {
        if let Some(next) = accounts.first().cloned() {
            resp.headers_mut().append(SET_COOKIE, auth::session_cookie(&next));
        } else {
            resp.headers_mut().append(SET_COOKIE, auth::clear_session_cookie());
        }
    }
    resp
}

// ===== Registration (entry page) =====

#[derive(Template)]
#[template(path = "register.html")]
pub struct RegisterTemplate {
    pub error: Option<String>,
    pub name: String,
    pub email: String,
}

impl Default for RegisterTemplate {
    fn default() -> Self {
        RegisterTemplate { error: None, name: String::new(), email: String::new() }
    }
}

pub async fn register_page(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Query(q): Query<LoginQuery>,
) -> impl IntoResponse {
    if q.add.is_none() && session_user_id(&pool, &headers).await.is_some() {
        return Redirect::to("/app").into_response();
    }
    RegisterTemplate::default().into_response()
}

#[derive(Debug, Deserialize)]
pub struct RegisterForm {
    pub name: String,
    pub email: String,
    pub password: String,
    pub password_confirm: String,
}

/// Turns a full name into avatar initials, e.g. "Анна Ким" -> "АК".
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

/// Simple SHA-256 hash so we never store passwords in plain text.
/// For a production system, use a proper password hashing algorithm
/// with per-user salt, such as argon2.
fn hash_password(password: &str) -> String {
    let digest = Sha256::digest(password.as_bytes());
    format!("{digest:x}")
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

pub async fn register_submit(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Form(form): Form<RegisterForm>,
) -> impl IntoResponse {
    let name = form.name.trim().to_string();
    let email = form.email.trim().to_lowercase();

    let render_error = |msg: &str, name: &str, email: &str| {
        RegisterTemplate {
            error: Some(msg.to_string()),
            name: name.to_string(),
            email: email.to_string(),
        }
        .into_response()
    };

    if name.is_empty() || email.is_empty() {
        return render_error("Заполните имя и email.", &name, &email);
    }
    if !is_latin_name(&name) {
        return render_error(
            "Имя должно быть на английском: только латинские буквы, цифры, пробелы и символы «- _ . '».",
            &name,
            &email,
        );
    }
    if form.password.len() < 6 {
        return render_error("Пароль должен быть не короче 6 символов.", &name, &email);
    }
    if form.password != form.password_confirm {
        return render_error("Пароли не совпадают.", &name, &email);
    }

    let handle = format!("@{}", email.split('@').next().unwrap_or("user"));

    // Canonical key for the display name: lowercase, all spaces removed.
    // This rejects exact and similar duplicates like "Olga Lis" / "olga lis" / "Olga  Lis".
    let name_key = name.replace(' ', "").to_lowercase();

    let existing_email: Result<i64, _> =
        sqlx::query_scalar("SELECT COUNT(*) FROM users WHERE email = ?")
            .bind(&email)
            .fetch_one(&pool)
            .await;

    match existing_email {
        Ok(count) if count > 0 => {
            return render_error("Аккаунт с таким email уже существует.", &name, &email);
        }
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
        _ => {}
    }

    let similar_name: Result<i64, _> = sqlx::query_scalar(
        "SELECT COUNT(*) FROM users WHERE LOWER(REPLACE(name, ' ', '')) = ?",
    )
    .bind(&name_key)
    .fetch_one(&pool)
    .await;

    match similar_name {
        Ok(count) if count > 0 => {
            return render_error(
                "Такое имя уже занято. Придумайте другое — похожие имена в tap не допускаются.",
                &name,
                &email,
            );
        }
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
        _ => {}
    }

    let existing_handle: Result<i64, _> =
        sqlx::query_scalar("SELECT COUNT(*) FROM users WHERE LOWER(handle) = LOWER(?)")
            .bind(&handle)
            .fetch_one(&pool)
            .await;

    match existing_handle {
        Ok(count) if count > 0 => {
            return render_error("Этот ник уже занят, попробуйте другой email.", &name, &email);
        }
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
        _ => {}
    }

    let password_hash = hash_password(&form.password);
    let initials = initials_from_name(&name);
    let token = generate_token();
    let expires = Utc::now() + Duration::hours(24);

    let insert = sqlx::query(
        "INSERT INTO users (name, email, handle, avatar_initials, bio, friends, password_hash,
                           email_verified, verify_token, verify_expires_at)
         VALUES (?, ?, ?, ?, ?, 0, ?, 0, ?, ?)",
    )
    .bind(&name)
    .bind(&email)
    .bind(&handle)
    .bind(&initials)
    .bind("Новый участник tap.")
    .bind(&password_hash)
    .bind(&token)
    .bind(expires.naive_utc())
    .execute(&pool)
    .await;

    match insert {
        Ok(_) => {
            let origin = request_origin(&headers);
            let url = format!("http://{origin}/verify?token={token}");
            tokio::spawn(send_verification_email(email.clone(), url));
            Redirect::to(&format!("/verify-sent?email={}", encode_query(&email))).into_response()
        }
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
    }
}

// ===== Account created =====

#[derive(Template)]
#[template(path = "create_account.html")]
pub struct CreateAccountTemplate {
    pub handle: String,
}

/// The "Аккаунт подтверждён" page. Reached right after the verification link
/// from the email is followed (see verify_link); the session cookie is already
/// set, so the CTA button drops the user straight into the app.
pub async fn create_account_page(
    State(pool): State<MySqlPool>,
    auth: AuthUser,
) -> impl IntoResponse {
    let handle: Result<Option<String>, _> =
        sqlx::query_scalar("SELECT handle FROM users WHERE id = ?")
            .bind(auth.user_id())
            .fetch_optional(&pool)
            .await;

    match handle {
        Ok(Some(handle)) => CreateAccountTemplate { handle }.into_response(),
        _ => Redirect::to("/login").into_response(),
    }
}

// ===== Email verification =====

/// 24 random bytes hex-encoded -> a 48-char verification token.
fn generate_token() -> String {
    let mut bytes = [0u8; 24];
    rand::thread_rng().fill_bytes(&mut bytes);
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}

/// Host header is used to build the absolute verification link sent by mail.
fn request_origin(headers: &HeaderMap) -> String {
    headers
        .get("host")
        .and_then(|h| h.to_str().ok())
        .filter(|h| !h.trim().is_empty())
        .map(str::to_string)
        .unwrap_or_else(|| "localhost:3000".to_string())
}

/// Minimal percent-encoding for emails in query strings.
fn encode_query(s: &str) -> String {
    let mut out = String::new();
    for b in s.bytes() {
        match b {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' | b'@' => {
                out.push(b as char)
            }
            b' ' => out.push('+'),
            _ => out.push_str(&format!("%{b:02X}")),
        }
    }
    out
}

/// Sends the confirmation email via SMTP when configured; otherwise the
/// link is printed to the log so the flow stays testable locally.
async fn send_verification_email(email: String, url: String) {
    match crate::mail::config_from_env() {
        Some(config) => {
            if let Err(err) = crate::mail::send_verification(&email, &url, &config).await {
                tracing::warn!("не удалось отправить письмо на {email}: {err}");
                tracing::warn!("ссылка для подтверждения: {url}");
            }
        }
        None => {
            tracing::warn!("SMTP не настроен — ссылка для подтверждения: {url}");
        }
    }
}

#[derive(Template)]
#[template(path = "verify_sent.html")]
pub struct VerifySentTemplate {
    pub email: String,
    pub show_gmail: bool,
    pub show_yandex: bool,
}

#[derive(Debug, Deserialize)]
pub struct VerifySentQuery {
    pub email: Option<String>,
}

/// Detects which mailbox buttons to show on the "check your email" page so
/// they match the address the user actually registered with. For unknown
/// providers both buttons are shown as generic mailbox entries.
fn email_providers(email: &str) -> (bool, bool) {
    let domain = email.rsplit('@').next().unwrap_or("").to_lowercase();
    let gmail = domain == "gmail.com" || domain == "googlemail.com";
    let yandex = matches!(
        domain.as_str(),
        "yandex.ru" | "yandex.by" | "yandex.kz" | "yandex.com" | "yandex.ua" | "ya.ru"
    );
    match (gmail, yandex) {
        (true, false) => (true, false),
        (false, true) => (false, true),
        _ => (true, true),
    }
}

pub async fn verify_sent_page(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Query(q): Query<VerifySentQuery>,
) -> impl IntoResponse {
    if session_user_id(&pool, &headers).await.is_some() {
        return Redirect::to("/app").into_response();
    }
    let email = q.email.unwrap_or_default();
    let (show_gmail, show_yandex) = email_providers(&email);
    VerifySentTemplate {
        email,
        show_gmail,
        show_yandex,
    }
    .into_response()
}

#[derive(Debug, Deserialize)]
pub struct VerifyQuery {
    pub token: Option<String>,
}

#[derive(Template)]
#[template(path = "verify_error.html")]
pub struct VerifyErrorTemplate {
    pub detail: String,
}

pub async fn verify_link(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Query(q): Query<VerifyQuery>,
) -> impl IntoResponse {
    let Some(token) = q.token.filter(|t| !t.is_empty()) else {
        return VerifyErrorTemplate {
            detail: "Ссылка не содержит кода подтверждения.".to_string(),
        }
        .into_response();
    };

    let row: Option<(i64, Option<NaiveDateTime>)> = sqlx::query_as(
        "SELECT id, verify_expires_at FROM users WHERE verify_token = ?",
    )
    .bind(&token)
    .fetch_optional(&pool)
    .await
    .ok()
    .flatten();

    let Some((user_id, expires)) = row else {
        return VerifyErrorTemplate {
            detail: "Ссылка недействительна — возможно, она уже была использована или изменена."
                .to_string(),
        }
        .into_response();
    };

    if let Some(exp) = expires {
        if exp < Utc::now().naive_utc() {
            let _ = sqlx::query("UPDATE users SET verify_token = '', verify_expires_at = NULL WHERE id = ?")
                .bind(user_id)
                .execute(&pool)
                .await;
            return VerifyErrorTemplate {
                detail: "Ссылка устарела. Запросите новое письмо с подтверждением — введите email ниже."
                    .to_string(),
            }
            .into_response();
        }
    }

    let update = sqlx::query(
        "UPDATE users SET email_verified = 1, verify_token = '', verify_expires_at = NULL WHERE id = ?",
    )
    .bind(user_id)
    .execute(&pool)
    .await;

    match update {
        Ok(_) => match auth::create_session(&pool, user_id).await {
            Ok(token) => {
                let mut accounts = auth::read_accounts(&headers);
                if !accounts.contains(&token) {
                    accounts.push(token.clone());
                }
                let mut resp = Redirect::to("/create_account").into_response();
                resp.headers_mut().insert(SET_COOKIE, auth::session_cookie(&token));
                resp.headers_mut().append(SET_COOKIE, auth::accounts_cookie(&accounts));
                resp
            }
            Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
        },
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
    }
}

#[derive(Debug, Deserialize)]
pub struct ResendForm {
    pub email: String,
}

pub async fn resend_verification(
    State(pool): State<MySqlPool>,
    headers: HeaderMap,
    Form(form): Form<ResendForm>,
) -> impl IntoResponse {
    let email = form.email.trim().to_lowercase();
    if email.is_empty() {
        return Redirect::to("/login").into_response();
    }

    let row: Option<(i64, bool)> = sqlx::query_as("SELECT id, email_verified FROM users WHERE email = ?")
        .bind(&email)
        .fetch_optional(&pool)
        .await
        .ok()
        .flatten();

    let Some((user_id, verified)) = row else {
        return Redirect::to(&format!("/verify-sent?email={}", encode_query(&email))).into_response();
    };

    if verified {
        return Redirect::to("/login").into_response();
    }

    let token = generate_token();
    let expires = Utc::now() + Duration::hours(24);
    let _ = sqlx::query("UPDATE users SET verify_token = ?, verify_expires_at = ? WHERE id = ?")
        .bind(&token)
        .bind(expires.naive_utc())
        .bind(user_id)
        .execute(&pool)
        .await;

    let origin = request_origin(&headers);
    let url = format!("http://{origin}/verify?token={token}");
    tokio::spawn(send_verification_email(email.clone(), url));

    Redirect::to(&format!("/verify-sent?email={}", encode_query(&email))).into_response()
}
