use sqlx::FromRow;

/// Minimal user record used for login: id + password hash + verification flag.
#[derive(Debug, Clone, FromRow)]
pub struct User {
    pub id: i64,
    pub password_hash: String,
    pub email_verified: bool,
}
