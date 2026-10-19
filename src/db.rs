use sqlx::mysql::{MySqlPool, MySqlPoolOptions};

/// Connects to MariaDB/MySQL, applies the schema, and seeds demo data
/// on first run (when the `posts` table is empty).
pub async fn init(database_url: &str) -> anyhow::Result<MySqlPool> {
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(database_url)
        .await?;

    for statement in SCHEMA.split(';').map(str::trim).filter(|s| !s.is_empty()) {
        sqlx::query(statement).execute(&pool).await?;
    }

    migrate(&pool).await?;

    seed_page_posts(&pool).await?;

    sqlx::query("DELETE FROM sessions WHERE expires_at < NOW()")
        .execute(&pool)
        .await?;

    let post_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM posts")
        .fetch_one(&pool)
        .await?;

    if post_count == 0 {
        seed(&pool).await?;
    }

    seed_stories(&pool).await?;

    Ok(pool)
}

const SCHEMA: &str = r#"
CREATE TABLE IF NOT EXISTS users (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(120) NOT NULL,
    email           VARCHAR(120) NOT NULL DEFAULT '',
    handle          VARCHAR(120) NOT NULL,
    avatar_initials VARCHAR(8) NOT NULL,
    bio             TEXT NOT NULL,
    interests       VARCHAR(255) NOT NULL DEFAULT '',
    friends         INT NOT NULL DEFAULT 0,
    password_hash   VARCHAR(64) NOT NULL DEFAULT '',
    email_verified  TINYINT NOT NULL DEFAULT 0,
    verify_token    VARCHAR(64) NOT NULL DEFAULT '',
    verify_expires_at DATETIME NULL DEFAULT NULL,
    last_seen       DATETIME NULL DEFAULT NULL,
    FULLTEXT KEY ft_users_name_handle (name, handle)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sessions (
    token       VARCHAR(64) PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at  TIMESTAMP NOT NULL,
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS communities (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    members     INT NOT NULL DEFAULT 0,
    accent      VARCHAR(16) NOT NULL,
    accent2     VARCHAR(16) NOT NULL,
    icon_key    VARCHAR(32) NOT NULL,
    icon_emoji  VARCHAR(8) NOT NULL DEFAULT '',
    interest    VARCHAR(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id     BIGINT NOT NULL,
    category    VARCHAR(80) NOT NULL,
    accent      VARCHAR(16) NOT NULL,
    accent2     VARCHAR(16) NOT NULL,
    icon_key    VARCHAR(32) NOT NULL,
    title       VARCHAR(160) NOT NULL DEFAULT '',
    body        TEXT NOT NULL,
    media_url   TEXT NOT NULL DEFAULT '',
    media_type  VARCHAR(8) NOT NULL DEFAULT '',
    likes       INT NOT NULL DEFAULT 0,
    comments    INT NOT NULL DEFAULT 0,
    time_label  VARCHAR(32) NOT NULL DEFAULT '',
    author_sub  VARCHAR(160) NOT NULL DEFAULT '',
    repost_of_id BIGINT NULL DEFAULT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FULLTEXT KEY ft_posts_title_body (title, body),
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS conversations (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_user_id   BIGINT NOT NULL DEFAULT 0,
    peer_user_id    BIGINT NOT NULL DEFAULT 0,
    peer_name       VARCHAR(160) NOT NULL,
    avatar_initials VARCHAR(8) NOT NULL,
    last_message    TEXT NOT NULL,
    time_label      VARCHAR(32) NOT NULL DEFAULT '',
    unread          INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_conversations_owner FOREIGN KEY (owner_user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS comments (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id     BIGINT NOT NULL,
    user_id     BIGINT NOT NULL,
    body        TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS messages (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender_user_id  BIGINT NOT NULL,
    body            TEXT NOT NULL,
    encrypted       TINYINT NOT NULL DEFAULT 0,
    nonce           VARCHAR(32) NOT NULL DEFAULT '',
    reaction        VARCHAR(16) NOT NULL DEFAULT '',
    media_type      VARCHAR(64) NOT NULL DEFAULT '',
    media_url       TEXT NOT NULL DEFAULT '',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_messages_sender FOREIGN KEY (sender_user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_keys (
    user_id      BIGINT PRIMARY KEY,
    identity_pub TEXT NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_keys_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS conversation_keys (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    user_id         BIGINT NOT NULL,
    sender_user_id  BIGINT NOT NULL,
    wrapped_key     TEXT NOT NULL,
    wrap_nonce      VARCHAR(32) NOT NULL,
    wrap_eph        TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_convo_user (conversation_id, user_id),
    CONSTRAINT fk_convo_keys_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    CONSTRAINT fk_convo_keys_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notifications (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id     BIGINT NOT NULL,
    notif_type  VARCHAR(16) NOT NULL,
    text        TEXT NOT NULL,
    time_label  VARCHAR(32) NOT NULL DEFAULT '',
    unread      TINYINT NOT NULL DEFAULT 1,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS votes (
    post_id   BIGINT NOT NULL,
    user_id   BIGINT NOT NULL,
    direction VARCHAR(4) NOT NULL,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT fk_votes_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_votes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS saved_posts (
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT fk_saved_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS community_members (
    community_id BIGINT NOT NULL,
    user_id      BIGINT NOT NULL,
    PRIMARY KEY (community_id, user_id),
    CONSTRAINT fk_members_community FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE,
    CONSTRAINT fk_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS follows (
    follower_user_id BIGINT NOT NULL,
    followee_user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_user_id, followee_user_id),
    CONSTRAINT fk_follows_follower FOREIGN KEY (follower_user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_follows_followee FOREIGN KEY (followee_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blocks (
    blocker_user_id BIGINT NOT NULL,
    blocked_user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blocker_user_id, blocked_user_id),
    CONSTRAINT fk_blocks_blocker FOREIGN KEY (blocker_user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_blocks_blocked FOREIGN KEY (blocked_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS post_stories (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id         BIGINT NOT NULL,
    author_user_id  BIGINT NOT NULL,
    media_url       TEXT NOT NULL,
    media_type      VARCHAR(8) NOT NULL DEFAULT 'image',
    caption         TEXT NOT NULL DEFAULT '',
    frame_order     INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_stories_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_stories_author FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
"#;

async fn ensure_column(
    pool: &MySqlPool,
    table: &str,
    column: &str,
    ddl: &str,
) -> anyhow::Result<bool> {
    let count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
    )
    .bind(table)
    .bind(column)
    .fetch_one(pool)
    .await?;

    if count == 0 {
        sqlx::query(&format!("ALTER TABLE {table} ADD COLUMN {ddl}"))
            .execute(pool)
            .await?;
        return Ok(true);
    }

    Ok(false)
}

async fn ensure_fulltext(
    pool: &MySqlPool,
    table: &str,
    index: &str,
    columns: &str,
) -> anyhow::Result<()> {
    let count: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?",
    )
    .bind(table)
    .bind(index)
    .fetch_one(pool)
    .await?;

    if count == 0 {
        sqlx::query(&format!("ALTER TABLE {table} ADD FULLTEXT KEY {index} {columns}"))
            .execute(pool)
            .await?;
    }

    Ok(())
}

async fn migrate(pool: &MySqlPool) -> anyhow::Result<()> {
    ensure_column(pool, "users", "email", "email VARCHAR(120) NOT NULL DEFAULT '' AFTER name").await?;

    ensure_column(pool, "users", "email_verified", "email_verified TINYINT NOT NULL DEFAULT 0 AFTER password_hash").await?;
    ensure_column(pool, "users", "verify_token", "verify_token VARCHAR(64) NOT NULL DEFAULT '' AFTER email_verified").await?;
    ensure_column(pool, "users", "verify_expires_at", "verify_expires_at DATETIME NULL DEFAULT NULL AFTER verify_token").await?;

    // Backfill existing accounts as verified, but only when the columns were
    // just added (they predate email confirmation).
    if ensure_column(pool, "users", "email_verified", "email_verified TINYINT NOT NULL DEFAULT 0 AFTER password_hash").await? {
        sqlx::query("UPDATE users SET email_verified = 1 WHERE email != ''")
            .execute(pool)
            .await?;
    }

    ensure_column(pool, "posts", "title", "title VARCHAR(160) NOT NULL DEFAULT '' AFTER icon_key").await?;
    ensure_column(pool, "posts", "media_url", "media_url TEXT NOT NULL AFTER body").await?;
    ensure_column(pool, "posts", "media_type", "media_type VARCHAR(8) NOT NULL DEFAULT '' AFTER media_url").await?;

    // Rewrite legacy picsum.photos image links (unreachable from some networks)
    // to locally bundled photos.
    sqlx::query(
        "UPDATE posts
         SET media_url = CONCAT('/static/media/', SUBSTRING_INDEX(SUBSTRING_INDEX(media_url, '/seed/', -1), '/', 1), '.jpg')
         WHERE media_url LIKE 'https://picsum.photos/seed/%'",
    )
    .execute(pool)
    .await?;

    ensure_column(pool, "communities", "icon_emoji", "icon_emoji VARCHAR(8) NOT NULL DEFAULT '' AFTER icon_key").await?;
    ensure_column(pool, "communities", "owner_user_id", "owner_user_id BIGINT NOT NULL DEFAULT 0 AFTER id").await?;
    ensure_column(pool, "posts", "page_id", "page_id BIGINT NULL DEFAULT NULL AFTER category").await?;
    ensure_column(pool, "posts", "repost_of_id", "repost_of_id BIGINT NULL DEFAULT NULL AFTER page_id").await?;

    // Interests: page topics + the user's chosen interests (comma-joined).
    ensure_column(pool, "communities", "interest", "interest VARCHAR(32) NOT NULL DEFAULT '' AFTER icon_emoji").await?;
    ensure_column(pool, "users", "interests", "interests VARCHAR(255) NOT NULL DEFAULT '' AFTER bio").await?;

    // Presence: last time the user was active on the app.
    ensure_column(pool, "users", "last_seen", "last_seen DATETIME NULL DEFAULT NULL AFTER verify_expires_at").await?;

    // Pages seeded before interests existed get their topic retroactively.
    sqlx::query("UPDATE communities SET interest = 'Технологии' WHERE name = 'Код и кофе' AND interest = ''").execute(pool).await?;
    sqlx::query("UPDATE communities SET interest = 'Искусство' WHERE name = 'Пиксель' AND interest = ''").execute(pool).await?;
    sqlx::query("UPDATE communities SET interest = 'Путешествия' WHERE name = 'Дорога зовёт' AND interest = ''").execute(pool).await?;
    sqlx::query("UPDATE communities SET interest = 'Спорт' WHERE name = 'Бег по утрам' AND interest = ''").execute(pool).await?;

    // Full-text indexes for server-side search (posts + users).
    ensure_fulltext(pool, "posts", "ft_posts_title_body", "(title, body)").await?;
    ensure_fulltext(pool, "users", "ft_users_name_handle", "(name, handle)").await?;

    // Pages seeded before this feature existed have no owner; hand them to the
    // demo account so the "Страницы" view shows an administrator.
    sqlx::query(
        "UPDATE communities c
         SET c.owner_user_id = COALESCE((SELECT id FROM users WHERE handle = '@marina.k' LIMIT 1), 0)
         WHERE c.owner_user_id = 0",
    )
    .execute(pool)
    .await?;

    ensure_column(pool, "conversations", "owner_user_id", "owner_user_id BIGINT NOT NULL DEFAULT 0 AFTER id").await?;
    ensure_column(pool, "conversations", "peer_user_id", "peer_user_id BIGINT NOT NULL DEFAULT 0 AFTER owner_user_id").await?;
    ensure_column(pool, "conversations", "created_at", "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER unread").await?;

    // Per-participant unread for shared (two-sided) conversations.
    // Legacy single `unread` column was the owner's unread marker.
    if     ensure_column(pool, "conversations", "unread_owner", "unread_owner TINYINT NOT NULL DEFAULT 0 AFTER unread").await? {
        sqlx::query("UPDATE conversations SET unread_owner = unread")
            .execute(pool)
            .await?;
    }
    ensure_column(pool, "conversations", "unread_peer", "unread_peer TINYINT NOT NULL DEFAULT 0 AFTER unread_owner").await?;

    // E2EE support: encrypted messages store ciphertext + nonce, plaintext
    // legacy messages keep the empty marker so nothing is lost on migration.
    ensure_column(pool, "messages", "encrypted", "encrypted TINYINT NOT NULL DEFAULT 0 AFTER body").await?;
    ensure_column(pool, "messages", "nonce", "nonce VARCHAR(32) NOT NULL DEFAULT '' AFTER encrypted").await?;
    ensure_column(pool, "messages", "media_type", "media_type VARCHAR(64) NOT NULL DEFAULT '' AFTER reaction").await?;
    ensure_column(pool, "messages", "media_url", "media_url TEXT NOT NULL DEFAULT '' AFTER media_type").await?;
    ensure_column(pool, "conversations", "last_nonce", "last_nonce VARCHAR(32) NOT NULL DEFAULT '' AFTER last_message").await?;

    // Widen media_type so it can hold full MIME strings ("audio/webm;codecs=opus").
    sqlx::query("ALTER TABLE messages MODIFY COLUMN media_type VARCHAR(64) NOT NULL DEFAULT ''")
        .execute(pool)
        .await?;

    sqlx::query(
        "UPDATE users SET email = CONCAT(REPLACE(handle, '@', ''), '@kolo.demo') WHERE email = ''",
    )
    .execute(pool)
    .await?;

    sqlx::query("UPDATE users SET password_hash = ? WHERE password_hash = ''")
        .bind(DEMO_PASSWORD_HASH)
        .execute(pool)
        .await?;

    // Old conversations without an owner belong to the demo user.
    sqlx::query(
        "UPDATE conversations SET owner_user_id = (SELECT id FROM users WHERE handle = '@marina.k' LIMIT 1)
         WHERE owner_user_id = 0",
    )
    .execute(pool)
    .await?;

    // Old conversations may reference peers that no longer exist (e.g. communities).
    // The JOIN only matches real users, so unresolved rows keep peer_user_id = 0.
    sqlx::query(
        "UPDATE conversations c
         JOIN users u ON u.name = c.peer_name
         SET c.peer_user_id = u.id
         WHERE c.peer_user_id = 0",
    )
    .execute(pool)
    .await?;

    // Drop legacy conversations whose peer could not be resolved to a user.
    sqlx::query("DELETE FROM conversations WHERE peer_user_id = 0 AND peer_name != ''")
        .execute(pool)
        .await?;

    // Seed demo follow relationships when the table is empty (existing DBs).
    let follows_count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM follows")
        .fetch_one(pool)
        .await?;
    if follows_count == 0 {
        seed_follows(pool).await?;
    }

    // Comments become first-class, likeable units: a like counter, an optional
    // parent (for threaded replies) and a dedicated like table.
    ensure_column(pool, "comments", "likes", "likes INT NOT NULL DEFAULT 0 AFTER body").await?;
    ensure_column(pool, "comments", "parent_comment_id", "parent_comment_id BIGINT NULL DEFAULT NULL AFTER likes").await?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS comment_likes (
            comment_id BIGINT NOT NULL,
            user_id    BIGINT NOT NULL,
            PRIMARY KEY (comment_id, user_id),
            CONSTRAINT fk_comment_likes_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
            CONSTRAINT fk_comment_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    )
    .execute(pool)
    .await?;

    Ok(())
}

/// Creates the demo follow graph: Marina follows four people,
/// and six people follow Marina back.
async fn seed_follows(pool: &MySqlPool) -> anyhow::Result<()> {
    let pairs = [
        ("@marina.k", "@olalis"),
        ("@marina.k", "@denwolf"),
        ("@marina.k", "@sorokina"),
        ("@marina.k", "@krylova.run"),
        ("@olalis", "@marina.k"),
        ("@denwolf", "@marina.k"),
        ("@sorokina", "@marina.k"),
        ("@vinylig", "@marina.k"),
        ("@batyrov.design", "@marina.k"),
        ("@krylova.run", "@marina.k"),
    ];
    for (follower, followee) in pairs {
        sqlx::query(
            "INSERT IGNORE INTO follows (follower_user_id, followee_user_id)
             SELECT f.id, t.id FROM users f, users t WHERE f.handle = ? AND t.handle = ?",
        )
        .bind(follower)
        .bind(followee)
        .execute(pool)
        .await?;
    }
    Ok(())
}

/// Fills each page with a few posts so the "Страницы" view is alive even on
/// databases that were seeded before the pages feature existed. Runs on every
/// boot but is idempotent: it does nothing once any post has a page_id.
async fn seed_page_posts(pool: &MySqlPool) -> anyhow::Result<()> {
    let existing: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM posts WHERE page_id IS NOT NULL")
        .fetch_one(pool)
        .await?;
    if existing > 0 {
        return Ok(());
    }

    let page_ids: Vec<i64> = sqlx::query_scalar("SELECT id FROM communities ORDER BY id LIMIT 4")
        .fetch_all(pool)
        .await?;
    if page_ids.is_empty() {
        return Ok(());
    }

    let user_ids: Vec<i64> = sqlx::query_scalar("SELECT id FROM users ORDER BY id").fetch_all(pool).await?;
    if user_ids.len() < 7 {
        return Ok(());
    }

    // (page_idx, user_idx, title, body, minutes_ago)
    let page_posts = [
        (0, 0, "Зачем мы собираемся по четвергам",
         "Раз в неделю разбираем чужие проекты за чашкой эспрессо. Приходите с чем угодно — от домашней страницы до CLI-утилиты.",
         90),
        (0, 1, "Доклад: асинхронный бэкенд за один вечер",
         "На прошлой встрече переписали старый скрипт на асинхронные запросы. Запись и слайды уже в комментариях.",
         45),
        (1, 5, "Палитра недели: тёплый октябрь",
         "Собрали пять палитр, которые зацепили нас на этой неделе. Источник — фотографии рынка и закатов.",
         70),
        (1, 6, "Кисти, которыми пользуюсь каждый день",
         "Мой минимальный набор для растровой графики. Меньше кистей — больше решений.",
         30),
        (2, 0, "Горы в октябре: маршрут на три дня",
         "42 километра, ночёвки на турбазах и закаты над перевалом. Детальный маршрут с точками в комментариях.",
         120),
        (2, 2, "Чемодан путешественника: что всегда со мной",
         "Список вещей, которые переезжают вместе со мной в любой город. Без них ни одна поездка не начинается.",
         55),
        (3, 4, "Вторая неделя ранних пробежек",
         "Спойлер: я всё ещё не бегу с утра, но уже хожу в темпе. Прогресс есть, осталось немного терпения.",
         80),
    ];

    for (page_idx, user_idx, title, body, minutes) in page_posts {
        sqlx::query(
            "INSERT INTO posts (user_id, page_id, category, accent, accent2, icon_key, title, body, media_url, media_type, likes, comments, time_label, author_sub, created_at)
             VALUES (?, ?, 'Пост', '#E8B04B', '#C0603A', 'community', ?, ?, '', '', 3, 0, '', '', DATE_SUB(NOW(), INTERVAL ? MINUTE))",
        )
        .bind(user_ids[user_idx])
        .bind(page_ids[page_idx])
        .bind(title)
        .bind(body)
        .bind(minutes)
        .execute(pool)
        .await?;
    }

    Ok(())
}

/// Attaches mini-story frames to existing posts that carry media, so every
/// post card with an image/video gets a story sticker. Runs on every boot but
/// is idempotent: it does nothing once any story frame exists.
async fn seed_stories(pool: &MySqlPool) -> anyhow::Result<()> {
    let existing: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM post_stories")
        .fetch_one(pool)
        .await?;
    if existing > 0 {
        return Ok(());
    }

    // (post_id, author_user_id, title, media_url, media_type)
    let rows: Vec<(i64, i64, String, String, String)> = sqlx::query_as(
        "SELECT p.id, p.user_id, p.title, p.media_url, p.media_type
         FROM posts p
         WHERE p.media_url != '' AND p.page_id IS NULL
         ORDER BY p.id",
    )
    .fetch_all(pool)
    .await?;

    // Second frames for local photos, so some stories get a multi-frame look.
    let followup: &[(&str, &str, &str)] = &[
        ("/static/media/tbilisi.jpg", "/static/media/syrniki.jpg", "Продолжение в посте"),
        ("/static/media/syrniki.jpg", "/static/media/run10.jpg", "Уже готово к подаче"),
        ("/static/media/run10.jpg", "/static/media/palitra.jpg", "Небольшая пауза на закат"),
        ("/static/media/palitra.jpg", "/static/media/nas.jpg", "Параллельная история"),
        ("/static/media/nas.jpg", "/static/media/tbilisi.jpg", "И снова дорога"),
    ];

    for (post_id, author_id, title, media_url, media_type) in rows {
        sqlx::query(
            "INSERT INTO post_stories (post_id, author_user_id, media_url, media_type, caption, frame_order)
             VALUES (?, ?, ?, ?, ?, 0)",
        )
        .bind(post_id)
        .bind(author_id)
        .bind(&media_url)
        .bind(&media_type)
        .bind(&title)
        .execute(pool)
        .await?;

        if let Some((follow_url, caption)) = followup
            .iter()
            .find(|(src, _, _)| *src == media_url)
            .map(|(_, follow, caption)| (*follow, *caption))
        {
            sqlx::query(
                "INSERT INTO post_stories (post_id, author_user_id, media_url, media_type, caption, frame_order)
                 VALUES (?, ?, ?, 'image', ?, 1)",
            )
            .bind(post_id)
            .bind(author_id)
            .bind(follow_url)
            .bind(caption)
            .execute(pool)
            .await?;
        }
    }

    Ok(())
}

/// SHA-256 of "kolo123" — the shared password of all seeded demo accounts.
const DEMO_PASSWORD_HASH: &str = "3411b3ee48daf3b99cd312b15e64bb75f2c6e2f85540050f6afedce857ee76ad";

async fn seed(pool: &MySqlPool) -> anyhow::Result<()> {
    let users = [
        ("Olga Lis", "olalis@kolo.demo", "@olalis", "OL", "Люблю дороги и хинкали.", 214),
        ("Denis Volk", "denwolf@kolo.demo", "@denwolf", "DV", "Пишу код по вечерам.", 132),
        ("Nastya Sorokina", "sorokina@kolo.demo", "@sorokina", "NS", "Готовлю то, что не готовят другие.", 301),
        ("Igor Petrov", "vinylig@kolo.demo", "@vinylig", "IP", "Собираю пластинки.", 88),
        ("Elena Krylova", "krylova.run@kolo.demo", "@krylova.run", "EK", "Бегаю, потому что могу.", 176),
        ("Timur Batyrov", "batyrov.design@kolo.demo", "@batyrov.design", "TB", "Дизайн из подручных материалов.", 245),
        ("Marina Kim", "marina.k@kolo.demo", "@marina.k", "MK", "Смотрю на мир и записываю.", 128),
    ];

    let mut user_ids = Vec::new();
    for (name, email, handle, initials, bio, friends) in users {
        let result = sqlx::query(
            "INSERT INTO users (name, email, handle, avatar_initials, bio, friends, password_hash, email_verified)
             VALUES (?, ?, ?, ?, ?, ?, ?, 1)",
        )
        .bind(name)
        .bind(email)
        .bind(handle)
        .bind(initials)
        .bind(bio)
        .bind(friends)
        .bind(DEMO_PASSWORD_HASH)
        .execute(pool)
        .await?;
        user_ids.push(result.last_insert_id());
    }

    seed_follows(pool).await?;

    // (user_idx, title, body, media_url, media_type, likes, minutes_ago)
    let posts = [
        (0, "Кафе, где хинкали лепят прямо у окна",
         "Нашла кафе в Тбилиси, где хинкали лепят прямо у окна. Осталась там на три часа вместо запланированных тридцати минут.",
         "/static/media/tbilisi.jpg", "image", 128, 120),
        (1, "Скрипт стал в 10 раз быстрее",
         "Переписал старый скрипт на асинхронные запросы — время загрузки упало с 4 секунд до 400 миллисекунд. Мелочь, а приятно.",
         "", "", 76, 240),
        (2, "Секрет пышных сырников",
         "Творог протереть через сито, а не взбивать блендером. Проверено сегодня утром на семье.",
         "/static/media/syrniki.jpg", "image", 214, 300),
        (3, "Виниловый проигрыватель за копейки",
         "Нашёл виниловый проигрыватель на блошином рынке за копейки. Дома ждёт ремонт иглы, но звук уже почти живой.",
         "", "", 92, 420),
        (4, "Пробежала первую десятку",
         "Впервые пробежала десятку без остановки. Ноги гудят, но внутри включился режим «а слабо полумарафон».",
         "/static/media/run10.jpg", "image", 341, 540),
        (5, "Палитра из осеннего рынка",
         "Собрал палитру для нового проекта из фотографий осеннего рынка. Иногда лучший источник цвета — это прогулка, а не Pinterest.",
         "/static/media/palitra.jpg", "image", 158, 660),
        (6, "Первая запись",
         "Завела эту ленту, чтобы не терять мысли между городами. Первая запись — всегда самая честная.",
         "", "", 64, 1560),
        (0, "Три часа на рынке",
         "Рынок — лучший музей города. Сегодня насчитала семь видов специй, о которых раньше не знала.",
         "", "", 55, 1800),
        (2, "Пицца на козьем сыре",
         "Тесто на двадцатичетырёхчасовой расстойке и козий сыр с мёдом. Домашняя пицца перестала быть компромиссом.",
         "", "", 89, 2040),
        (4, "Вечерняя пробежка по набережной",
         "Солнце, ветер и дорога вдоль воды. Иногда бег — это не тренировка, а способ подумать.",
         "", "", 42, 2880),
        (3, "Концерт на даче",
         "Собрали друзей, вытащили колонки на крыльцо и играли до трёх ночи. Соседская собака в итоге подпевала.",
         "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", "video", 71, 3120),
        (1, "Домашний NAS из старого ПК",
         "Собрал файловое хранилище из старого компьютера за выходные. Вся семья теперь скидывает фото в одно место.",
         "/static/media/nas.jpg", "image", 120, 3600),
    ];

    let mut post_ids = Vec::new();
    for (user_idx, title, body, media_url, media_type, likes, minutes) in posts {
        let result = sqlx::query(
            "INSERT INTO posts (user_id, category, accent, accent2, icon_key, title, body, media_url, media_type, likes, comments, time_label, author_sub, created_at)
             VALUES (?, 'Пост', '#E8B04B', '#C0603A', 'community', ?, ?, ?, ?, ?, 0, '', '', DATE_SUB(NOW(), INTERVAL ? MINUTE))",
        )
        .bind(user_ids[user_idx])
        .bind(title)
        .bind(body)
        .bind(media_url)
        .bind(media_type)
        .bind(likes)
        .bind(minutes)
        .execute(pool)
        .await?;
        post_ids.push(result.last_insert_id());
    }

    // (post_idx, user_idx, text, minutes_ago)
    let comments = [
        (0, 1, "Теперь хочу в Тбилиси. Сохраняю адрес!", 60),
        (0, 6, "Кафе влюбляет в город быстрее музеев.", 40),
        (2, 6, "Обязательно попробую на выходных!", 180),
        (2, 5, "Спасибо за совет, сырники уже на сковороде.", 120),
        (4, 3, "Сильная воля! Я до трёх километров дожимаю с трудом.", 360),
        (1, 5, "400 мс — отличный результат, красивая оптимизация.", 180),
        (5, 2, "Цвета тёплые, как в октябре.", 480),
        (3, 6, "Ждём репортаж о ремонте иглы.", 300),
    ];
    for (post_idx, user_idx, text, minutes) in comments {
        sqlx::query(
            "INSERT INTO comments (post_id, user_id, body, created_at)
             VALUES (?, ?, ?, DATE_SUB(NOW(), INTERVAL ? MINUTE))",
        )
        .bind(post_ids[post_idx])
        .bind(user_ids[user_idx])
        .bind(text)
        .bind(minutes)
        .execute(pool)
        .await?;
    }

    let communities = [
        ("Код и кофе", "Для тех, кто пишет по ночам и пьёт эспрессо", 2140, "#4ECDC4", "#3D8BFD", "tech", "👨‍💻", "Технологии"),
        ("Пиксель", "Сообщество дизайнеров и иллюстраторов", 3860, "#A78BFA", "#FF6B4A", "design", "🎨", "Искусство"),
        ("Дорога зовёт", "Истории и советы от путешественников", 5920, "#FF6B4A", "#FFC857", "travel", "🧭", "Путешествия"),
        ("Бег по утрам", "Клуб для тех, кто встаёт до будильника", 1470, "#4ECDC4", "#A78BFA", "sport", "🏃", "Спорт"),
    ];
    let mut community_ids = Vec::new();
    for (name, description, members, accent, accent2, icon_key, icon_emoji, interest) in communities {
        let result = sqlx::query(
            "INSERT INTO communities (name, description, members, accent, accent2, icon_key, icon_emoji, interest)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(name)
        .bind(description)
        .bind(members)
        .bind(accent)
        .bind(accent2)
        .bind(icon_key)
        .bind(icon_emoji)
        .bind(interest)
        .execute(pool)
        .await?;
        community_ids.push(result.last_insert_id());
    }

    // Marina joins a few communities (Код и кофе, Дорога зовёт, Бег по утрам).
    for &community_idx in &[0usize, 2, 3] {
        sqlx::query("INSERT INTO community_members (community_id, user_id) VALUES (?, ?)")
            .bind(community_ids[community_idx])
            .bind(user_ids[6])
            .execute(pool)
            .await?;
    }

    // Conversations belong to Marina (user index 6). Each message is
    // (peer_sender_bool, text, minutes_ago, reaction).
    let conversations = [
        (0, vec![
            (true, "Скинь адрес того кафе в Тбилиси!", 180, ""),
            (false, "Сейчас найду в закладках", 160, ""),
            (true, "Буду ждать, спасибо!", 140, "👍"),
        ], 1),
        (1, vec![
            (true, "Гляну код вечером, отпишусь", 360, ""),
            (false, "Спасибо! Не спешу", 320, ""),
        ], 0),
        (2, vec![
            (true, "Рецепт сырников уже в закладках 😍", 180, ""),
            (false, "Приезжай на дегустацию в субботу", 150, ""),
        ], 0),
        (4, vec![
            (true, "В воскресенье бежим 10 км по набережной?", 480, ""),
            (false, "Я за. Во сколько старт?", 430, ""),
            (true, "В 7:00 у причала", 400, "❤️"),
        ], 0),
    ];

    let mut conversation_ids = Vec::new();
    for (peer_idx, msgs, unread) in conversations {
        let peer_name = users[peer_idx].0;
        let peer_initials = users[peer_idx].3;
        let last_text = msgs.last().map(|m| m.1).unwrap_or("");
        let last_minutes = msgs.last().map(|m| m.2).unwrap_or(0);

        let result = sqlx::query(
            "INSERT INTO conversations (owner_user_id, peer_user_id, peer_name, avatar_initials, last_message, time_label, unread_owner, unread_peer, created_at)
             VALUES (?, ?, ?, ?, ?, '', ?, 0, DATE_SUB(NOW(), INTERVAL ? MINUTE))",
        )
        .bind(user_ids[6])
        .bind(user_ids[peer_idx])
        .bind(peer_name)
        .bind(peer_initials)
        .bind(last_text)
        .bind(unread)
        .bind(last_minutes)
        .execute(pool)
        .await?;
        let conversation_id = result.last_insert_id();

        for (peer_sender, text, minutes, reaction) in msgs {
            let sender = if peer_sender { user_ids[peer_idx] } else { user_ids[6] };
            sqlx::query(
                "INSERT INTO messages (conversation_id, sender_user_id, body, reaction, created_at)
                 VALUES (?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL ? MINUTE))",
            )
            .bind(conversation_id)
            .bind(sender)
            .bind(text)
            .bind(reaction)
            .bind(minutes)
            .execute(pool)
            .await?;
        }

        conversation_ids.push(conversation_id);
    }

    // (type, text, minutes_ago, unread)
    let notifications = [
        ("upvote", "Olga Lis поставила лайк вашему посту", 10, 1),
        ("comment", "Denis Volk прокомментировал ваш пост", 45, 1),
        ("follow", "Elena Krylova подписалась на вас", 180, 1),
        ("upvote", "Nastya Sorokina поставила лайк вашему посту", 300, 0),
        ("comment", "Igor Petrov ответил на ваш комментарий", 1560, 0),
    ];
    for (notif_type, text, minutes, unread) in notifications {
        sqlx::query(
            "INSERT INTO notifications (user_id, notif_type, text, time_label, unread, created_at)
             VALUES (?, ?, ?, '', ?, DATE_SUB(NOW(), INTERVAL ? MINUTE))",
        )
        .bind(user_ids[6])
        .bind(notif_type)
        .bind(text)
        .bind(unread)
        .bind(minutes)
        .execute(pool)
        .await?;
    }

    let _ = conversation_ids;
    Ok(())
}
