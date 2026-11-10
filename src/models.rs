use sqlx::FromRow;

/// Minimal user record used for login.
#[derive(Debug, Clone, FromRow)]
pub struct User {
    pub id: i64,
    pub password_hash: String,
}
