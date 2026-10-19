mod api;
mod auth;
mod db;
mod handlers;
mod mail;
mod models;

use axum::http::header::{CACHE_CONTROL, HeaderValue};
use axum::routing::{get, post};
use axum::Router;
use axum::extract::DefaultBodyLimit;
use tower_http::services::ServeDir;
use tower_http::set_header::SetResponseHeaderLayer;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Default level INFO, but never log sqlx query statements: they contain
    // users' messages/posts and would leak them into the server logs.
    let filter = tracing_subscriber::EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info,sqlx::query=off"));
    tracing_subscriber::fmt().with_env_filter(filter).init();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "mysql://kolo:kolo@127.0.0.1:3306/kolo".to_string());
    let pool = db::init(&database_url).await?;

    let app = Router::new()
        .route("/", get(handlers::register_page).post(handlers::register_submit))
        .route("/login", get(handlers::login_page).post(handlers::login_submit))
        .route("/logout", post(handlers::logout))
        .route("/verify-sent", get(handlers::verify_sent_page))
        .route("/verify", get(handlers::verify_link))
        .route("/create_account", get(handlers::create_account_page))
        .route("/resend", post(handlers::resend_verification))
        .route("/app", get(handlers::app_page))
        .route("/api/bootstrap", get(api::bootstrap))
        .route("/api/posts", post(api::create_post))
        .route("/api/posts/:id/vote", post(api::vote))
        .route("/api/posts/:id/save", post(api::toggle_save))
        .route("/api/posts/:id/repost", post(api::repost))
        .route("/api/posts/:id/comments", post(api::add_comment))
        .route("/api/comments/:id/like", post(api::like_comment))
        .route("/api/posts/:id/story", post(api::add_story))
        .route("/api/pages", post(api::create_page))
        .route("/api/pages/:id", get(api::get_page))
        .route("/api/pages/:id/posts", post(api::create_page_post))
        .route("/api/pages/:id/join", post(api::join_community))
        .route("/api/users/:id/follow", post(api::toggle_follow))
        .route("/api/users/:id/block", post(api::toggle_block))
        .route("/api/blocks", get(api::list_blocks))
        .route("/api/users", get(api::list_users))
        .route("/api/search", get(api::search))
        .route("/api/users/:id/profile", get(api::get_user_profile))
        .route("/api/users/check", get(api::check_user))
        .route("/api/profile", post(api::update_profile))
        .route("/api/interests", post(api::save_interests))
        .route("/api/conversations/start", post(api::start_conversation))
        .route("/api/conversations/:id/read", post(api::mark_conversation_read))
        .route("/api/conversations/:id/messages", post(api::send_message))
        .route("/api/conversations/:id/keys", get(api::get_conversation_keys).post(api::upsert_conversation_keys))
        .route("/api/messages/:id/reaction", post(api::set_reaction))
        .route("/api/keys/me", get(api::get_my_key).post(api::upsert_my_key))
        .route("/api/keys/users", get(api::list_user_keys))
        .route("/api/notifications/read", post(api::mark_notifs_read))
        .route("/api/accounts", get(handlers::list_accounts))
        .route("/api/accounts/switch", post(handlers::switch_account))
        .route("/api/accounts/remove", post(handlers::remove_account))
        .nest_service("/static", ServeDir::new("static"))
        .with_state(pool)
        // Never cache HTML/JS/static: the app is redeployed frequently and a
        // stale tap-app.jsx (or styles) is a common source of "updates don't
        // appear". Browsers revalidate on every load.
        .layer(SetResponseHeaderLayer::overriding(
            CACHE_CONTROL,
            HeaderValue::from_static("no-cache"),
        ))
        // Voice messages arrive as base64 data URLs, which can exceed axum's
        // default 2 MB body limit.
        .layer(DefaultBodyLimit::max(12 * 1024 * 1024));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    tracing::info!("tap запущен на http://localhost:3000");
    axum::serve(listener, app).await?;

    Ok(())
}
