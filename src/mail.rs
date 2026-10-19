use lettre::{
    message::{header::ContentType, Mailbox, Message},
    transport::smtp::authentication::Credentials,
    transport::smtp::client::{Tls, TlsParameters},
    AsyncSmtpTransport, AsyncTransport, Tokio1Executor,
};

/// SMTP settings read from environment variables. Returns None when
/// SMTP is not configured — the caller then falls back to logging.
#[derive(Debug, Clone)]
pub struct SmtpConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub from: String,
    pub tls_mode: String,
}

pub fn config_from_env() -> Option<SmtpConfig> {
    let host = std::env::var("SMTP_HOST").ok()?;
    if host.trim().is_empty() {
        return None;
    }
    Some(SmtpConfig {
        host,
        port: std::env::var("SMTP_PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(587),
        username: std::env::var("SMTP_USERNAME").unwrap_or_default(),
        password: std::env::var("SMTP_PASSWORD").unwrap_or_default(),
        from: std::env::var("SMTP_FROM")
            .ok()
            .filter(|s| !s.trim().is_empty())
            .unwrap_or_else(|| "tap@kolo.demo".to_string()),
        tls_mode: std::env::var("SMTP_TLS").unwrap_or_else(|_| "starttls".to_string()),
    })
}

/// Sends the registration confirmation email with the verification link.
pub async fn send_verification(email: &str, url: &str, config: &SmtpConfig) -> anyhow::Result<()> {
    let body = format!(
        "Здравствуйте!\n\nВы зарегистрировались в tap. Чтобы подтвердить адрес электронной почты, \
         перейдите по ссылке:\n\n{url}\n\nЕсли вы не регистрировались, просто проигнорируйте это письмо.\n\n— tap"
    );

    let message = Message::builder()
        .from(config.from.parse::<Mailbox>()?)
        .to(email.parse::<Mailbox>()?)
        .subject("tap — подтверждение регистрации")
        .header(ContentType::TEXT_PLAIN)
        .body(body)?;

    let tls_params = TlsParameters::new(config.host.clone())?;
    let tls = match config.tls_mode.as_str() {
        "none" => Tls::None,
        "required" | "implicit" | "ssl" => Tls::Required(tls_params),
        _ => Tls::Opportunistic(tls_params),
    };

    let mut builder = AsyncSmtpTransport::<Tokio1Executor>::builder_dangerous(&config.host)
        .port(config.port)
        .tls(tls);
    if !config.username.is_empty() {
        builder = builder.credentials(Credentials::new(config.username.clone(), config.password.clone()));
    }

    let mailer = builder.build();
    match tokio::time::timeout(std::time::Duration::from_secs(15), mailer.send(message)).await {
        Ok(Ok(_)) => {
            tracing::info!("отправлено письмо с подтверждением на {email}");
            Ok(())
        }
        Ok(Err(err)) => Err(anyhow::anyhow!("SMTP: {err}")),
        Err(_) => Err(anyhow::anyhow!("таймаут отправки письма на {email}")),
    }
}
