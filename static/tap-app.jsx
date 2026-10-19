const { useState, useMemo, useEffect, useLayoutEffect, useRef } = React;

function makeIcon(pathNodes) {
  return function Icon(props) {
    const { size = 16, fill = "none", color, style } = props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
        fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={color ? { ...style, color } : style}>
        {pathNodes}
      </svg>
    );
  };
}

const ArrowBigUp = makeIcon(<path d="M12 4l7.5 10h-15L12 4Z" />);
const ArrowBigDown = makeIcon(<path d="M12 20l7.5-10h-15L12 20Z" />);
const MessageCircle = makeIcon(<path d="M7.9 20A9 9 0 1 0 4 16.1L3 21l4.9-1Z" />);
const Share2 = makeIcon(
  <React.Fragment>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </React.Fragment>
);
const Bookmark = makeIcon(<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />);
const Film = makeIcon(
  <React.Fragment>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 3v18" />
    <path d="M17 3v18" />
    <path d="M3 8h4M3 13h4M3 18h4" />
    <path d="M17 8h4M17 13h4M17 18h4" />
  </React.Fragment>
);
const Repeat = makeIcon(
  <React.Fragment>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </React.Fragment>
);
const Search = makeIcon(
  <React.Fragment>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </React.Fragment>
);
const Plus = makeIcon(
  <React.Fragment>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </React.Fragment>
);
const X = makeIcon(
  <React.Fragment>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </React.Fragment>
);
const Flame = makeIcon(
  <path d="M12 2c1 3 4 5.5 4 9a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5C10.5 8.5 11 7 12 2Z" />
);
const Clock = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </React.Fragment>
);
const TrendingUp = makeIcon(
  <React.Fragment>
    <path d="m22 7-8.5 8.5-5-5L2 17" />
    <path d="M16 7h6v6" />
  </React.Fragment>
);
const Sparkles = makeIcon(
  <path d="M12 3l1.9 5.8 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.8-5.8-1.9 5.8-1.9L12 3Z" />
);
const Home = makeIcon(
  <React.Fragment>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="M9 22V12h6v10" />
  </React.Fragment>
);
const Bell = makeIcon(
  <React.Fragment>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </React.Fragment>
);
const User = makeIcon(
  <React.Fragment>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </React.Fragment>
);
const Send = makeIcon(
  <React.Fragment>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </React.Fragment>
);
const Mic = makeIcon(
  <React.Fragment>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </React.Fragment>
);
const Pause = makeIcon(
  <React.Fragment>
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </React.Fragment>
);
const Square = makeIcon(<rect x="6" y="6" width="12" height="12" rx="2" />);
const ArrowLeft = makeIcon(
  <React.Fragment>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </React.Fragment>
);
const Heart = makeIcon(
  <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7Z" />
);
const UserPlus = makeIcon(
  <React.Fragment>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6" />
    <path d="M22 11h-6" />
  </React.Fragment>
);
const Users = makeIcon(
  <React.Fragment>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </React.Fragment>
);
const Check = makeIcon(<path d="M20 6 9 17l-5-5" />);
const Ban = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </React.Fragment>
);
const PenLine = makeIcon(
  <React.Fragment>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />
  </React.Fragment>
);
const Image = makeIcon(
  <React.Fragment>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </React.Fragment>
);
const Settings = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </React.Fragment>
);
const Sun = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </React.Fragment>
);
const Moon = makeIcon(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />);
const LogOut = makeIcon(
  <React.Fragment>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </React.Fragment>
);
const Play = makeIcon(<path d="M6 4l14 8-14 8V4Z" />);
const StoryIcon = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 9l5 3-5 3V9Z" />
  </React.Fragment>
);
const RefreshCw = makeIcon(
  <React.Fragment>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </React.Fragment>
);

const PALETTE = [
  ["#E8B04B", "#C0603A"],
  ["#4F9C8C", "#2E6B60"],
  ["#5C86A8", "#33526B"],
  ["#8C7FB0", "#5A4F7D"],
  ["#C0603A", "#8C4128"],
  ["#4F9C8C", "#E8B04B"],
];

function hash(seed) {
  const str = String(seed == null ? "" : seed);
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}
function gradientFor(seed) {
  const pair = PALETTE[hash(seed) % PALETTE.length];
  return `linear-gradient(150deg, ${pair[0]}, ${pair[1]})`;
}
function solidFor(seed) {
  return PALETTE[hash(seed) % PALETTE.length][0];
}
function formatScore(n) {
  const x = Number(n) || 0;
  if (x >= 1000) return (x / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(x);
}
function safeStr(v) {
  return v == null ? "" : String(v);
}
function escapeHtml(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
// Rich-text bodies produced by the Quill editor arrive as HTML; legacy bodies
// are plain text. `htmlLike` tells the two apart so we only ever parse as HTML
// what Quill actually generated.
function htmlLike(v) {
  return /<(?:p|h[1-6]|ul|ol|li|b|strong|i|em|u|s|a|img|blockquote|pre|code|br)[\s>]/i.test(String(v || ""));
}
// Render-only sanitizer: drops unknown tags and anything except safe attrs.
function sanitizeHtml(html) {
  const allowed = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "BR", "UL", "OL", "LI", "B", "STRONG", "I", "EM", "U", "S", "A", "IMG", "BLOCKQUOTE", "PRE", "CODE", "DIV", "SPAN"];
  try {
    const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    [...doc.body.querySelectorAll("*")].forEach((el) => {
      if (!allowed.includes(el.tagName)) {
        el.replaceWith(document.createTextNode(el.textContent || ""));
        return;
      }
      [...el.attributes].forEach((at) => {
        const keep =
          (el.tagName === "A" && at.name === "href" && /^(https?:|mailto:|tel:)/i.test(at.value)) ||
          (el.tagName === "A" && (at.name === "target" || at.name === "rel")) ||
          (el.tagName === "IMG" && at.name === "src" && /^(https?:|data:image\/(png|jpe?g|gif|webp);base64,)/i.test(at.value)) ||
          (el.tagName === "IMG" && at.name === "alt");
        if (!keep) el.removeAttribute(at.name);
      });
      if (el.tagName === "A") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });
    return doc.body.innerHTML;
  } catch (e) {
    return "";
  }
}
function bodyContent(body) {
  return htmlLike(body) ? sanitizeHtml(body) : escapeHtml(body);
}
function stripHtml(v) {
  try {
    const d = new DOMParser().parseFromString(String(v || ""), "text/html");
    return (d.body.textContent || "").replace(/\s+/g, " ");
  } catch (e) {
    return String(v || "");
  }
}
// Extend Quill's built-in font dropdown with the app's font stack. Runs once —
// `Font.whitelist` controls which entries appear in the `font` picker.
function initQuillFonts() {
  if (!window.Quill || window.Quill.__fontsReady) return;
  const Font = window.Quill.import("attributors/style/font");
  Font.whitelist = [false, "serif", "monospace", "courier"];
  window.Quill.register(Font, true);
  window.Quill.__fontsReady = true;
}
// Normalize API data so a single malformed field can't crash rendering.
function normalizePosts(posts, drafts) {
  return (posts || []).map((p) => ({
    ...p,
    title: safeStr(p.title),
    body: safeStr(p.body),
    author: safeStr(p.author),
    authorHandle: safeStr(p.authorHandle),
    comments: Array.isArray(p.comments) ? p.comments : [],
    commentDraft: (drafts && drafts[p.id]) || "",
    reposts: Number(p.reposts) || 0,
    reposted: !!p.reposted,
    repostOf: p.repostOf != null ? p.repostOf : null,
    origAuthorName: safeStr(p.origAuthorName),
    origAuthorHandle: safeStr(p.origAuthorHandle),
  }));
}
function normalizePages(list) {
  return (list || []).map((c) => ({
    ...c,
    name: safeStr(c.name),
    desc: safeStr(c.desc),
    icon: safeStr(c.icon),
    members: Number(c.members) || 0,
    interest: safeStr(c.interest),
    owner: (c.owner && typeof c.owner === "object")
      ? { name: safeStr(c.owner.name), handle: safeStr(c.owner.handle) }
      : { name: "", handle: "" },
  }));
}

// Interest topics shown on the "Страницы" onboarding screen.
const INTERESTS = [
  { id: "Спорт", icon: "🏃" },
  { id: "Технологии", icon: "💻" },
  { id: "Искусство", icon: "🎨" },
  { id: "Путешествия", icon: "🧭" },
  { id: "Музыка", icon: "🎵" },
  { id: "Еда", icon: "🍜" },
  { id: "Игры", icon: "🎮" },
  { id: "Кино", icon: "🎬" },
  { id: "Наука", icon: "🔬" },
  { id: "Мода", icon: "👗" },
];

const REACTIONS = ["❤️", "😂", "👍", "😮", "😢", "🙏"];

// Context-aware chat suggestions: quick replies adapt to the latest message
// from the peer instead of staying static.
function suggestReplies(convo) {
  if (!convo || !convo.messages || convo.messages.length === 0) {
    return ["Привет!", "Как дела?", "Давай знакомиться 😊"];
  }

  let lastThem = null;
  for (let i = convo.messages.length - 1; i >= 0; i--) {
    if (convo.messages[i].from === "them") { lastThem = convo.messages[i].text; break; }
  }
  if (!lastThem) {
    return ["👍 Звучит хорошо", "Спасибо!", "Понял(а), договорились", "Дай посмотрю и отпишусь"];
  }

  // Can't read the peer's message (failed decryption) — keep generic replies.
  if (typeof lastThem !== "string" || lastThem.indexOf("🔒") !== -1) {
    return ["Спасибо!", "Понял(а)", "Перепишусь чуть позже"];
  }

  const text = " " + lastThem.toLowerCase() + " ";
  const has = (...words) => words.some((w) => text.indexOf(w) !== -1);

  if (has("привет", "здравствуй", "здравствуйте", "доброе утро", "добрый день", "добрый вечер", "хай", "приветик", "салют")) {
    return ["Привет! Как дела?", "👋 Рад(а) тебя видеть!", "Спасибо, отлично! А у тебя?"];
  }
  if (has("спасибо", "благодарю", "сябки", "благодар")) {
    return ["Пожалуйста!", "Всегда пожалуйста 😊", "Не за что!"];
  }
  if (has("как дела", "как ты", "как жизнь", "как сам", "как настроение", "как оно")) {
    return ["Отлично, спасибо!", "Нормально, а у тебя?", "Всё по плану 🙂"];
  }
  if (has("где", "куда", "адрес", "локац", "геолокац", "точку")) {
    return ["Встретимся в центре?", "Скину точку на карте", "У меня на работе", "Давай у метро"];
  }
  if (has("встретимся", "встретиться", "пойдём", "пойдем", "встреча", "сходим", "увидимся")) {
    return ["Давай в 18:00!", "Давай сегодня вечером", "Завтра удобнее?", "Где встретимся?"];
  }
  if (has("во сколько", "когда удобно", "в какое время", "сколько времени", "когда будешь")) {
    return ["В 19:00 подойдёт?", "Могу в 12:00", "Сейчас удобно?", "Давай ближе к вечеру"];
  }
  if (has("купить", "заказать", "доставк", "магазин", "сколько стоит")) {
    return ["Сколько стоит?", "Есть в наличии?", "Оформи заказ", "Скинь ссылку"];
  }
  if (lastThem.trim().endsWith("?")) {
    return ["Да, конечно!", "Нет, пока 🙈", "Сейчас уточню и напишу", "Хороший вопрос 🙂"];
  }
  if (has("ок", "хорошо", "договорились", "ладно", "давай", "согласен", "отлично", "супер")) {
    return ["Договорились! 👍", "Отлично!", "Начинаем 🚀"];
  }

  return ["👍 Звучит хорошо", "Спасибо!", "Понял(а), договорились", "Дай посмотрю и отпишусь"];
}

const SORTS = [
  { id: "hot", label: "Горячее", icon: Flame },
  { id: "new", label: "Новые", icon: Clock },
  { id: "top", label: "Топ", icon: TrendingUp },
  { id: "rising", label: "Растущие", icon: Sparkles },
];

const LANGUAGES = [
  { id: "de", label: "Deutsch", short: "DE" },
  { id: "en", label: "English", short: "EN" },
  { id: "ru", label: "Русский", short: "RU" },
];

const UI_TRANSLATIONS = {
  ru: {
    "Share": "Поделиться", "Reply": "Ответить", "No comments yet. Be the first to say something.": "Пока нет комментариев. Напишите первым."
  },
  en: {
    "Спорт": "Sports", "Технологии": "Technology", "Искусство": "Art", "Путешествия": "Travel", "Музыка": "Music", "Еда": "Food", "Игры": "Games", "Кино": "Movies", "Наука": "Science", "Мода": "Fashion",
    "Привет!": "Hi!", "Как дела?": "How are you?", "Давай знакомиться 😊": "Let's get acquainted 😊", "👍 Звучит хорошо": "👍 Sounds good", "Спасибо!": "Thanks!", "Понял(а), договорились": "Got it, agreed", "Дай посмотрю и отпишусь": "Let me check and get back to you", "Перепишусь чуть позже": "I'll message a bit later", "Привет! Как дела?": "Hi! How are you?", "👋 Рад(а) тебя видеть!": "👋 Good to see you!", "Спасибо, отлично! А у тебя?": "Thanks, great! And you?", "Пожалуйста!": "You're welcome!", "Всегда пожалуйста 😊": "Anytime 😊", "Не за что!": "No problem!", "Отлично, спасибо!": "Great, thanks!", "Нормально, а у тебя?": "Fine, and you?", "Всё по плану 🙂": "All according to plan 🙂", "Встретимся в центре?": "Meet downtown?", "Скину точку на карте": "I'll send a map pin", "У меня на работе": "At my work", "Давай у метро": "Let's meet by the metro", "Давай в 18:00!": "Let's do 18:00!", "Давай сегодня вечером": "Let's do tonight", "Завтра удобнее?": "Is tomorrow better?", "Где встретимся?": "Where should we meet?", "В 19:00 подойдёт?": "Does 19:00 work?", "Могу в 12:00": "I can do 12:00", "Сейчас удобно?": "Is now convenient?", "Давай ближе к вечеру": "Let's do later in the evening", "Сколько стоит?": "How much is it?", "Есть в наличии?": "Is it available?", "Оформи заказ": "Place the order", "Скинь ссылку": "Send the link", "Да, конечно!": "Yes, of course!", "Нет, пока 🙈": "No, not yet 🙈", "Сейчас уточню и напишу": "I'll check and write back", "Хороший вопрос 🙂": "Good question 🙂", "Договорились! 👍": "Agreed! 👍", "Отлично!": "Great!", "Начинаем 🚀": "Let's start 🚀",
    "Горячее": "Hot", "Новые": "New", "Топ": "Top", "Растущие": "Rising", "Главная": "Home", "Страницы": "Pages", "Сообщения": "Messages", "Уведомления": "Notifications", "Профиль": "Profile",
    "Что-то пошло не так": "Something went wrong", "Остальная часть приложения продолжает работать. Нажмите кнопку, чтобы продолжить.": "The rest of the app is still running. Press the button to continue.", "Перезагрузить": "Reload", "Повторить": "Retry",
    "в сети": "online", "был недавно": "seen recently", "не в сети": "offline", "только что": "just now", "Пост": "Post", "Репост": "Repost", "от": "from",
    "Не удалось расшифровать аудио": "Could not decrypt audio", "Запись голосовых недоступна в этом браузере": "Voice recording is unavailable in this browser", "Не удалось получить доступ к микрофону": "Could not access the microphone", "Нельзя отправить: пользователь заблокирован": "Cannot send: user is blocked", "Не удалось отправить голосовое сообщение": "Could not send voice message", "Не удалось зашифровать голосовое сообщение": "Could not encrypt voice message", "Новый пост в ленте": "New post in the feed", "Новые посты в ленте": "New posts in the feed", "🔒 не удалось расшифровать": "🔒 could not decrypt",
    "Сохранено": "Saved", "Убрано из сохранённых": "Removed from saved", "Нельзя репостить свой пост": "You cannot repost your own post", "Репост опубликован": "Repost published", "Репост удалён": "Repost removed", "Не удалось сделать репост": "Could not repost", "Пользователь заблокирован": "User blocked", "Пользователь разблокирован": "User unblocked", "Не удалось изменить блокировку": "Could not update block", "Не удалось отправить комментарий": "Could not send comment", "Выберите файл с фото или видео": "Choose a photo or video file", "Новый пост": "New post", "Не удалось опубликовать": "Could not publish", "Не удалось загрузить пользователей": "Could not load users", "Не удалось начать диалог": "Could not start chat", "Не удалось отправить сообщение": "Could not send message", "Не удалось выполнить действие": "Could not complete action", "Интересы сохранены": "Interests saved", "Страницы без фильтра по интересам": "Pages without interest filtering", "Не удалось сохранить интересы": "Could not save interests", "Не удалось открыть страницу": "Could not open page", "Не удалось открыть профиль": "Could not open profile",
    "Имя слишком длинное": "Name is too long", "Имя — только латинские буквы, цифры, пробелы и «- _ . '»": "Name can contain only Latin letters, numbers, spaces and \"- _ . '\"", "Проверяем имя…": "Checking name...", "Имя свободно": "Name is available", "Это имя уже занято": "This name is already taken", "Ник начинается с @, например @marina.k": "Handle starts with @, for example @marina.k", "Ник — только латинские буквы, цифры и «_ . -»": "Handle can contain only Latin letters, numbers and \"_ . -\"", "Проверяем ник…": "Checking handle...", "Ник свободен": "Handle is available", "Этот ник уже занят": "This handle is already taken", "Заполните имя и ник": "Fill in name and handle", "Профиль обновлён": "Profile updated", "Не удалось сохранить профиль": "Could not save profile", "Укажите название страницы": "Enter a page name", "Страница создана": "Page created", "Не удалось создать страницу": "Could not create page", "Укажите заголовок": "Enter a title", "Опубликовано на странице": "Published to page", "Сначала создайте пост": "Create a post first", "Выберите пост и медиа-файл": "Choose a post and media file", "История добавлена": "Story added", "Не удалось добавить историю": "Could not add story",
    "На главную": "Home", "Поиск людей и постов": "Search people and posts", "Очистить поиск": "Clear search", "Очистить": "Clear", "Недавние запросы": "Recent searches", "Удалить запрос": "Remove query", "Удалить": "Remove", "Напишите пост…": "Write a post...", "Добавьте описание (необязательно)": "Add a description (optional)", "Фото или видео": "Photo or video", "Отмена": "Cancel", "Опубликовать": "Publish", "Лента обновляется автоматически": "Feed updates automatically", "Обновление...": "Refreshing...", "Обновить": "Refresh", "Лента пуста — напишите первый пост": "The feed is empty - write the first post", "Листайте дальше": "Keep scrolling", "Вы всё прочитали": "You're all caught up", "Название страницы": "Page name", "О чём эта страница? (необязательно)": "What is this page about? (optional)", "Создать": "Create", "Что вам интересно?": "What are you interested in?", "Выберите темы — и мы подберём страницы по вашим интересам": "Choose topics and we'll suggest pages for your interests", "Пропустить": "Skip", "Сохраняем…": "Saving...", "Продолжить": "Continue", "Мои интересы:": "My interests:", "не выбраны": "not selected", "Изменить": "Edit", "Все": "All", "Страниц пока нет — создайте первую": "No pages yet - create the first one", "подписчиков": "followers", "Вы подписаны": "Following", "Подписаться": "Follow", "Администратор:": "Administrator:", "Новый пост на страницу": "New page post", "Лента страницы": "Page feed", "Загружаем страницу…": "Loading page...", "Здесь пока нет постов — станьте первым": "No posts here yet - be the first",
    "Ошибка в разделе сообщений": "Messages section error", "Никого нет — зарегистрируйте второго пользователя": "No one here - register a second user", "Нет сообщений": "No messages", "🔒 Зашифровано": "🔒 Encrypted", "Открытый диалог": "Open chat", "Пока нет сообщений": "No messages yet", "Напишите первым и поприветствуйте собеседника": "Write first and say hello", "Вы заблокировали этого пользователя": "You blocked this user", "Пользователь вас заблокировал": "This user blocked you", "Сообщение": "Message", "Голосовое сообщение": "Voice message", "Нету новых уведомлений.": "No new notifications.", "Но вы можете подписаться на эти «страницы»:": "But you can follow these pages:",
    "Настройки": "Settings", "Посты": "Posts", "Наблюдатели": "Observers", "Подписки": "Following", "Настройки профиля": "Profile settings", "Имя": "Name", "Ник": "Handle", "О себе": "About", "Несколько слов о себе": "A few words about yourself", "Сохранить": "Save", "Репосты": "Reposts", "Сохранённые посты": "Saved posts", "У вас пока нет постов": "You don't have posts yet", "Здесь появятся ваши репосты. Нажмите на иконку репоста у поста, чтобы поделиться им.": "Your reposts will appear here. Press the repost icon on a post to share it.", "Пока ничего не сохранено. Нажмите на закладку у поста, чтобы добавить его сюда.": "Nothing saved yet. Press the bookmark on a post to add it here.", "Загружаем профиль…": "Loading profile...", "Наблюдаете": "Observing", "Наблюдать": "Observe", "Разблокировать": "Unblock", "Заблокировать": "Block", "Посты пользователя": "User posts", "У пользователя пока нет постов": "This user has no posts yet", "Поиск…": "Searching...", "Возможно, вы имели в виду:": "Did you mean:", "Люди": "People", "Видео": "Video", "Видео лента": "Video feed", "Открыть видео ленту": "Open video feed", "Видео лента пока пуста": "Video feed is empty", "Смотреть пост": "Open post",
    "Смена темы": "Theme", "Светлая или тёмная тема оформления": "Light or dark appearance", "Светлая": "Light", "Тёмная": "Dark", "Язык": "Language", "Немецкий, английский или русский": "German, English or Russian", "Выбор языка": "Language selection", "Чёрный список": "Blacklist", "Открыть": "Open", "Аккаунт": "Account", "Завершить сессию и вернуться к окну входа": "End the session and return to login", "Выйти": "Log out", "Список пуст — вы никого не блокировали": "The list is empty - you haven't blocked anyone", "Репост сделан": "Reposted", "Добавить комментарий": "Add a comment", "Закрыть": "Close", "Назад": "Back", "Вперёд": "Forward", "Новая история": "New story", "К какому посту прикрепить": "Attach to which post", "Подпись": "Caption", "Необязательно": "Optional", "Добавляем…": "Adding...", "Добавить историю": "Add story", "Скрыть": "Hide", "Share": "Share", "Reply": "Reply", "No comments yet. Be the first to say something.": "No comments yet. Be the first to say something."
  },
  de: {
    "Спорт": "Sport", "Технологии": "Technologie", "Искусство": "Kunst", "Путешествия": "Reisen", "Музыка": "Musik", "Еда": "Essen", "Игры": "Spiele", "Кино": "Filme", "Наука": "Wissenschaft", "Мода": "Mode",
    "Привет!": "Hallo!", "Как дела?": "Wie geht's?", "Давай знакомиться 😊": "Lass uns kennenlernen 😊", "👍 Звучит хорошо": "👍 Klingt gut", "Спасибо!": "Danke!", "Понял(а), договорились": "Verstanden, abgemacht", "Дай посмотрю и отпишусь": "Ich schaue nach und melde mich", "Перепишусь чуть позже": "Ich schreibe etwas später", "Привет! Как дела?": "Hallo! Wie geht's?", "👋 Рад(а) тебя видеть!": "👋 Schön, dich zu sehen!", "Спасибо, отлично! А у тебя?": "Danke, super! Und dir?", "Пожалуйста!": "Gern geschehen!", "Всегда пожалуйста 😊": "Immer gern 😊", "Не за что!": "Kein Problem!", "Отлично, спасибо!": "Super, danke!", "Нормально, а у тебя?": "Gut, und dir?", "Всё по плану 🙂": "Alles nach Plan 🙂", "Встретимся в центре?": "Treffen wir uns im Zentrum?", "Скину точку на карте": "Ich sende dir einen Standort", "У меня на работе": "Bei mir auf der Arbeit", "Давай у метро": "Treffen wir uns an der Metro", "Давай в 18:00!": "Machen wir 18:00!", "Давай сегодня вечером": "Machen wir heute Abend", "Завтра удобнее?": "Ist morgen besser?", "Где встретимся?": "Wo treffen wir uns?", "В 19:00 подойдёт?": "Passt 19:00?", "Могу в 12:00": "Ich kann um 12:00", "Сейчас удобно?": "Passt es jetzt?", "Давай ближе к вечеру": "Lieber später am Abend", "Сколько стоит?": "Wie viel kostet es?", "Есть в наличии?": "Ist es verfügbar?", "Оформи заказ": "Bestellung aufgeben", "Скинь ссылку": "Schick den Link", "Да, конечно!": "Ja, natürlich!", "Нет, пока 🙈": "Nein, noch nicht 🙈", "Сейчас уточню и напишу": "Ich prüfe es und schreibe dir", "Хороший вопрос 🙂": "Gute Frage 🙂", "Договорились! 👍": "Abgemacht! 👍", "Отлично!": "Super!", "Начинаем 🚀": "Los geht's 🚀",
    "Горячее": "Heiß", "Новые": "Neu", "Топ": "Top", "Растущие": "Aufsteigend", "Главная": "Start", "Страницы": "Seiten", "Сообщения": "Nachrichten", "Уведомления": "Benachrichtigungen", "Профиль": "Profil",
    "Что-то пошло не так": "Etwas ist schiefgelaufen", "Остальная часть приложения продолжает работать. Нажмите кнопку, чтобы продолжить.": "Der Rest der App läuft weiter. Drücke die Taste, um fortzufahren.", "Перезагрузить": "Neu laden", "Повторить": "Wiederholen",
    "в сети": "online", "был недавно": "kürzlich gesehen", "не в сети": "offline", "только что": "gerade eben", "Пост": "Beitrag", "Репост": "Repost", "от": "von",
    "Не удалось расшифровать аудио": "Audio konnte nicht entschlüsselt werden", "Запись голосовых недоступна в этом браузере": "Sprachaufnahme ist in diesem Browser nicht verfügbar", "Не удалось получить доступ к микрофону": "Kein Zugriff auf das Mikrofon", "Нельзя отправить: пользователь заблокирован": "Senden nicht möglich: Nutzer ist blockiert", "Не удалось отправить голосовое сообщение": "Sprachnachricht konnte nicht gesendet werden", "Не удалось зашифровать голосовое сообщение": "Sprachnachricht konnte nicht verschlüsselt werden", "Новый пост в ленте": "Neuer Beitrag im Feed", "Новые посты в ленте": "Neue Beiträge im Feed", "🔒 не удалось расшифровать": "🔒 konnte nicht entschlüsselt werden",
    "Сохранено": "Gespeichert", "Убрано из сохранённых": "Aus Gespeichert entfernt", "Нельзя репостить свой пост": "Du kannst deinen eigenen Beitrag nicht reposten", "Репост опубликован": "Repost veröffentlicht", "Репост удалён": "Repost entfernt", "Не удалось сделать репост": "Repost fehlgeschlagen", "Пользователь заблокирован": "Nutzer blockiert", "Пользователь разблокирован": "Nutzer entsperrt", "Не удалось изменить блокировку": "Blockierung konnte nicht geändert werden", "Не удалось отправить комментарий": "Kommentar konnte nicht gesendet werden", "Выберите файл с фото или видео": "Wähle eine Foto- oder Videodatei", "Новый пост": "Neuer Beitrag", "Не удалось опубликовать": "Veröffentlichen fehlgeschlagen", "Не удалось загрузить пользователей": "Nutzer konnten nicht geladen werden", "Не удалось начать диалог": "Chat konnte nicht gestartet werden", "Не удалось отправить сообщение": "Nachricht konnte nicht gesendet werden", "Не удалось выполнить действие": "Aktion konnte nicht ausgeführt werden", "Интересы сохранены": "Interessen gespeichert", "Страницы без фильтра по интересам": "Seiten ohne Interessenfilter", "Не удалось сохранить интересы": "Interessen konnten nicht gespeichert werden", "Не удалось открыть страницу": "Seite konnte nicht geöffnet werden", "Не удалось открыть профиль": "Profil konnte nicht geöffnet werden",
    "Имя слишком длинное": "Name ist zu lang", "Имя — только латинские буквы, цифры, пробелы и «- _ . '»": "Name darf nur lateinische Buchstaben, Zahlen, Leerzeichen und \"- _ . '\" enthalten", "Проверяем имя…": "Name wird geprüft...", "Имя свободно": "Name ist verfügbar", "Это имя уже занято": "Dieser Name ist bereits vergeben", "Ник начинается с @, например @marina.k": "Handle beginnt mit @, z. B. @marina.k", "Ник — только латинские буквы, цифры и «_ . -»": "Handle darf nur lateinische Buchstaben, Zahlen und \"_ . -\" enthalten", "Проверяем ник…": "Handle wird geprüft...", "Ник свободен": "Handle ist verfügbar", "Этот ник уже занят": "Dieser Handle ist bereits vergeben", "Заполните имя и ник": "Name und Handle ausfüllen", "Профиль обновлён": "Profil aktualisiert", "Не удалось сохранить профиль": "Profil konnte nicht gespeichert werden", "Укажите название страницы": "Seitennamen eingeben", "Страница создана": "Seite erstellt", "Не удалось создать страницу": "Seite konnte nicht erstellt werden", "Укажите заголовок": "Titel eingeben", "Опубликовано на странице": "Auf der Seite veröffentlicht", "Сначала создайте пост": "Erstelle zuerst einen Beitrag", "Выберите пост и медиа-файл": "Beitrag und Mediendatei wählen", "История добавлена": "Story hinzugefügt", "Не удалось добавить историю": "Story konnte nicht hinzugefügt werden",
    "На главную": "Zur Startseite", "Поиск людей и постов": "Personen und Beiträge suchen", "Очистить поиск": "Suche löschen", "Очистить": "Löschen", "Недавние запросы": "Letzte Suchen", "Удалить запрос": "Suchanfrage entfernen", "Удалить": "Entfernen", "Напишите пост…": "Schreibe einen Beitrag...", "Добавьте описание (необязательно)": "Beschreibung hinzufügen (optional)", "Фото или видео": "Foto oder Video", "Отмена": "Abbrechen", "Опубликовать": "Veröffentlichen", "Лента обновляется автоматически": "Feed wird automatisch aktualisiert", "Обновление...": "Aktualisierung...", "Обновить": "Aktualisieren", "Лента пуста — напишите первый пост": "Der Feed ist leer - schreibe den ersten Beitrag", "Листайте дальше": "Weiter scrollen", "Вы всё прочитали": "Du bist auf dem neuesten Stand", "Название страницы": "Seitenname", "О чём эта страница? (необязательно)": "Worum geht es auf dieser Seite? (optional)", "Создать": "Erstellen", "Что вам интересно?": "Was interessiert dich?", "Выберите темы — и мы подберём страницы по вашим интересам": "Wähle Themen, und wir schlagen passende Seiten vor", "Пропустить": "Überspringen", "Сохраняем…": "Speichern...", "Продолжить": "Weiter", "Мои интересы:": "Meine Interessen:", "не выбраны": "nicht gewählt", "Изменить": "Ändern", "Все": "Alle", "Страниц пока нет — создайте первую": "Noch keine Seiten - erstelle die erste", "подписчиков": "Follower", "Вы подписаны": "Folge ich", "Подписаться": "Folgen", "Администратор:": "Administrator:", "Новый пост на страницу": "Neuer Seitenbeitrag", "Лента страницы": "Seitenfeed", "Загружаем страницу…": "Seite wird geladen...", "Здесь пока нет постов — станьте первым": "Hier gibt es noch keine Beiträge - sei der Erste",
    "Ошибка в разделе сообщений": "Fehler im Nachrichtenbereich", "Никого нет — зарегистрируйте второго пользователя": "Niemand da - registriere einen zweiten Nutzer", "Нет сообщений": "Keine Nachrichten", "🔒 Зашифровано": "🔒 Verschlüsselt", "Открытый диалог": "Offener Chat", "Пока нет сообщений": "Noch keine Nachrichten", "Напишите первым и поприветствуйте собеседника": "Schreibe zuerst und begrüße dein Gegenüber", "Вы заблокировали этого пользователя": "Du hast diesen Nutzer blockiert", "Пользователь вас заблокировал": "Dieser Nutzer hat dich blockiert", "Сообщение": "Nachricht", "Голосовое сообщение": "Sprachnachricht", "Нету новых уведомлений.": "Keine neuen Benachrichtigungen.", "Но вы можете подписаться на эти «страницы»:": "Du kannst aber diesen Seiten folgen:",
    "Настройки": "Einstellungen", "Посты": "Beiträge", "Наблюдатели": "Beobachter", "Подписки": "Folge ich", "Настройки профиля": "Profileinstellungen", "Имя": "Name", "Ник": "Handle", "О себе": "Über mich", "Несколько слов о себе": "Ein paar Worte über dich", "Сохранить": "Speichern", "Репосты": "Reposts", "Сохранённые посты": "Gespeicherte Beiträge", "У вас пока нет постов": "Du hast noch keine Beiträge", "Здесь появятся ваши репосты. Нажмите на иконку репоста у поста, чтобы поделиться им.": "Deine Reposts erscheinen hier. Drücke das Repost-Symbol an einem Beitrag, um ihn zu teilen.", "Пока ничего не сохранено. Нажмите на закладку у поста, чтобы добавить его сюда.": "Noch nichts gespeichert. Drücke das Lesezeichen an einem Beitrag, um ihn hier hinzuzufügen.", "Загружаем профиль…": "Profil wird geladen...", "Наблюдаете": "Beobachtest du", "Наблюдать": "Beobachten", "Разблокировать": "Entsperren", "Заблокировать": "Blockieren", "Посты пользователя": "Beiträge des Nutzers", "У пользователя пока нет постов": "Dieser Nutzer hat noch keine Beiträge", "Поиск…": "Suche...", "Возможно, вы имели в виду:": "Meintest du:", "Люди": "Personen", "Видео": "Video", "Видео лента": "Video-Feed", "Открыть видео ленту": "Video-Feed öffnen", "Видео лента пока пуста": "Video-Feed ist leer", "Смотреть пост": "Beitrag öffnen",
    "Смена темы": "Design", "Светлая или тёмная тема оформления": "Helles oder dunkles Erscheinungsbild", "Светлая": "Hell", "Тёмная": "Dunkel", "Язык": "Sprache", "Немецкий, английский или русский": "Deutsch, Englisch oder Russisch", "Выбор языка": "Sprachauswahl", "Чёрный список": "Blacklist", "Открыть": "Öffnen", "Аккаунт": "Konto", "Завершить сессию и вернуться к окну входа": "Sitzung beenden und zum Login zurückkehren", "Выйти": "Abmelden", "Список пуст — вы никого не блокировали": "Die Liste ist leer - du hast niemanden blockiert", "Репост сделан": "Repost erstellt", "Добавить комментарий": "Kommentar hinzufügen", "Закрыть": "Schließen", "Назад": "Zurück", "Вперёд": "Vorwärts", "Новая история": "Neue Story", "К какому посту прикрепить": "An welchen Beitrag anhängen", "Подпись": "Bildunterschrift", "Необязательно": "Optional", "Добавляем…": "Hinzufügen...", "Добавить историю": "Story hinzufügen", "Скрыть": "Ausblenden", "Share": "Teilen", "Reply": "Antworten", "No comments yet. Be the first to say something.": "Noch keine Kommentare. Schreib als Erste/r."
  },
};

const I18N_ATTRS = ["placeholder", "title", "aria-label"];

function translateUiText(value, lang) {
  if (value == null) return value;
  const text = String(value);
  const trimmed = text.trim();
  if (!trimmed) return text;
  const leading = text.match(/^\s*/)[0];
  const trailing = text.match(/\s*$/)[0];
  const dict = UI_TRANSLATIONS[lang] || {};
  let translated = dict[trimmed];
  if (!translated && lang !== "ru") {
    const copied = trimmed.match(/^Ссылка скопирована: (.+)$/);
    const updated = trimmed.match(/^Обновлено (.+)$/);
    const loadError = trimmed.match(/^Ошибка загрузки: (.+)$/);
    const blocked = trimmed.match(/^Заблокированные пользователи: (.+)$/);
    const foundNothing = trimmed.match(/^Ничего не найдено по запросу «(.+)»$/);
    const wasAt = trimmed.match(/^был в (.+)$/);
    const wasYesterday = trimmed.match(/^был вчера в (.+)$/);
    const wasDate = trimmed.match(/^был (.+) в (.+)$/);
    const minutesAgo = trimmed.match(/^(\d+) мин$/);
    const hoursAgo = trimmed.match(/^(\d+) ч$/);
    const daysAgo = trimmed.match(/^(\d+) д$/);
    const joined = trimmed.match(/^Подписались на (.+)$/);
    const left = trimmed.match(/^Отписались от (.+)$/);
    if (copied) translated = (lang === "de" ? "Link kopiert: " : "Link copied: ") + copied[1];
    else if (updated) translated = (lang === "de" ? "Aktualisiert " : "Updated ") + updated[1];
    else if (loadError) translated = (lang === "de" ? "Ladefehler: " : "Loading error: ") + loadError[1];
    else if (blocked) translated = (lang === "de" ? "Blockierte Nutzer: " : "Blocked users: ") + blocked[1];
    else if (foundNothing) translated = (lang === "de" ? "Nichts gefunden für \"" : "Nothing found for \"") + foundNothing[1] + "\"";
    else if (wasAt) translated = (lang === "de" ? "gesehen um " : "seen at ") + wasAt[1];
    else if (wasYesterday) translated = (lang === "de" ? "gestern gesehen um " : "seen yesterday at ") + wasYesterday[1];
    else if (wasDate) translated = (lang === "de" ? "gesehen am " : "seen on ") + wasDate[1] + (lang === "de" ? " um " : " at ") + wasDate[2];
    else if (minutesAgo) translated = lang === "de" ? minutesAgo[1] + " Min." : minutesAgo[1] + " min";
    else if (hoursAgo) translated = lang === "de" ? hoursAgo[1] + " Std." : hoursAgo[1] + " h";
    else if (daysAgo) translated = lang === "de" ? daysAgo[1] + " T." : daysAgo[1] + " d";
    else if (joined) translated = (lang === "de" ? "Du folgst " : "Followed ") + joined[1];
    else if (left) translated = (lang === "de" ? "Du folgst nicht mehr " : "Unfollowed ") + left[1];
  }
  return translated ? leading + translated + trailing : text;
}

function matchesKnownTranslation(current, original) {
  return current === original || LANGUAGES.some((lang) => translateUiText(original, lang.id) === current);
}

function applyUiTranslations(lang) {
  if (typeof document === "undefined") return;
  const root = document.getElementById("root");
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const current = node.nodeValue || "";
    if (!current.trim()) continue;
    let original = node.__tapI18nOriginal || current;
    if (!matchesKnownTranslation(current, original)) original = current;
    node.__tapI18nOriginal = original;
    const translated = translateUiText(original, lang);
    if (current !== translated) node.nodeValue = translated;
  }
  root.querySelectorAll("input, textarea, button, [title], [aria-label]").forEach((el) => {
    I18N_ATTRS.forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      const current = el.getAttribute(attr) || "";
      const key = "tapI18nOriginal" + attr.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
      let original = el.dataset[key] || current;
      if (!matchesKnownTranslation(current, original)) original = current;
      el.dataset[key] = original;
      const translated = translateUiText(original, lang);
      if (current !== translated) el.setAttribute(attr, translated);
    });
  });
}

const BATCH_SIZE = 6;
const REFRESH_MS = 30000;
const TABS = [
  { id: "home", label: "Главная", icon: Home },
  { id: "pages", label: "Страницы", icon: Users },
  { id: "messages", label: "Сообщения", icon: MessageCircle },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "profile", label: "Профиль", icon: User },
];

// Error boundary: keeps the app usable if one part crashes. Nested boundaries
// isolate sections (e.g. messages) so a bug there can't kill the whole SPA.
class AppBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  componentDidCatch(err, info) {
    if (typeof console !== "undefined" && console.error) {
      console.error("kolo: UI crash isolated", err, info);
    }
  }
  render() {
    if (this.state.err) {
      return (
        <div className="t-boundary">
          <div className="t-boundary-card">
            <div className="t-boundary-title">{this.props.title || "Что-то пошло не так"}</div>
            <div className="t-boundary-sub">
              Остальная часть приложения продолжает работать. Нажмите кнопку, чтобы продолжить.
            </div>
            <button className="t-boundary-btn" onClick={() => window.location.reload()}>Перезагрузить</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function TapApp() {
  const [me, setMe] = useState(null);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("tap:theme") === "light" ? "light" : "dark"; } catch (e) { return "dark"; }
  });
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("tap:language");
      return LANGUAGES.some((lang) => lang.id === saved) ? saved : "ru";
    } catch (e) {
      return "ru";
    }
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("home");
  const [sort, setSort] = useState("hot");
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tap:recent-searches") || "[]").slice(0, 8); } catch (e) { return []; }
  });
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composer, setComposer] = useState({ title: "", body: "", mediaUrl: "", mediaType: null, mediaName: "" });
  const composerEditorRef = useRef(null);
  const quillRef = useRef(null);
  const [toasts, setToasts] = useState([]);
  const toastSeq = useRef(0);
  const [openPostId, setOpenPostId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [videoFeed, setVideoFeed] = useState(null);
  const [videoFeedIdx, setVideoFeedIdx] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", handle: "", bio: "" });
  const [editCheck, setEditCheck] = useState({ handle: null, name: null });
  const [editSaving, setEditSaving] = useState(false);
  const [profileTab, setProfileTab] = useState("posts");
  const editTimer = useRef(null);

  const [story, setStory] = useState(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const [storyComposerOpen, setStoryComposerOpen] = useState(false);
  const [storyForm, setStoryForm] = useState({ postId: "", mediaUrl: "", mediaType: null, mediaName: "", caption: "" });
  const [storySaving, setStorySaving] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [openConvoId, setOpenConvoId] = useState(null);
  // Unsent message drafts are kept per conversation (id → text) and persisted
  // to localStorage, so switching chats or reloading never loses typing.
  const [msgDrafts, setMsgDrafts] = useState({});
  const draftMsg = (openConvoId != null && msgDrafts[openConvoId]) || "";
  const [reactionPicker, setReactionPicker] = useState(null);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [userList, setUserList] = useState([]);
  // Presence: bump this every 30s so "в сети / был недавно / был в …" recompute.
  const [, setPresenceTick] = useState(0);

  function presenceInfo(lastSeenSecs) {
    if (lastSeenSecs == null) return { online: false, label: "" };
    const now = Date.now() / 1000;
    const diff = now - lastSeenSecs;
    if (diff < 90) return { online: true, label: "в сети" };
    if (diff < 3600) return { online: false, label: "был недавно" };
    const d = new Date(lastSeenSecs * 1000);
    const pad = (n) => String(n).padStart(2, "0");
    const hm = pad(d.getHours()) + ":" + pad(d.getMinutes());
    const today = new Date();
    const sameDay = d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
    if (sameDay) return { online: false, label: "был в " + hm };
    const yest = new Date(today.getTime() - 86400000);
    const wasYest = d.getFullYear() === yest.getFullYear() && d.getMonth() === yest.getMonth() && d.getDate() === yest.getDate();
    if (wasYest) return { online: false, label: "был вчера в " + hm };
    return { online: false, label: "был " + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + " в " + hm };
  }

  // Voice messages: MediaRecorder state + the currently playing audio.
  const [recording, setRecording] = useState(false);
  const [recSec, setRecSec] = useState(0);
  const [voicePlayId, setVoicePlayId] = useState(null);
  const mediaRecRef = useRef(null);
  const recChunksRef = useRef([]);
  const recSecRef = useRef(0);
  const recTimerRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const voiceObjUrlRef = useRef(null);

  function fmtDur(s) {
    const secs = Math.max(0, Math.round(s || 0));
    const m = Math.floor(secs / 60);
    const r = secs % 60;
    return (m > 0 ? m + ":" : "") + (m > 0 ? String(r).padStart(2, "0") : String(r).padStart(2, "0"));
  }

  function voiceDurFromText(text) {
    const m = /(\d+):(\d{2})$/.exec(text || "");
    if (m) return Number(m[1]) * 60 + Number(m[2]);
    return 0;
  }

  function stopVoicePlayback() {
    if (voiceAudioRef.current) {
      try { voiceAudioRef.current.pause(); } catch (e) {}
      voiceAudioRef.current = null;
    }
    if (voiceObjUrlRef.current) {
      try { URL.revokeObjectURL(voiceObjUrlRef.current); } catch (e) {}
      voiceObjUrlRef.current = null;
    }
    setVoicePlayId(null);
  }

  async function toggleVoicePlay(m) {
    if (voicePlayId === m.id && voiceAudioRef.current) {
      stopVoicePlayback();
      return;
    }
    stopVoicePlayback();
    let url = m.media && m.media.url;
    if (!url && m.audioCipher && openConvoId != null && me) {
      const key = await ensureConvKey(openConvoId, me.id);
      if (key) {
        const buf = await KoloE2EE.decryptData(key, m.audioCipher, m.nonce);
        if (buf) {
          url = URL.createObjectURL(new Blob([buf], { type: (m.media && m.media.type) || "audio/webm" }));
          voiceObjUrlRef.current = url;
        }
      }
    }
    if (!url) { setToast("Не удалось расшифровать аудио"); return; }
    const a = new Audio(url);
    voiceAudioRef.current = a;
    a.play().catch(() => {});
    a.onended = () => { if (voiceAudioRef.current === a) { voiceAudioRef.current = null; } setVoicePlayId(null); };
    setVoicePlayId(m.id);
  }

  function startVoice() {
    if (recording) return;
    if (!navigator.mediaDevices || !window.MediaRecorder) { setToast("Запись голосовых недоступна в этом браузере"); return; }
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const rec = new MediaRecorder(stream);
        recChunksRef.current = [];
        rec.ondataavailable = (e) => { if (e.data && e.data.size > 0) recChunksRef.current.push(e.data); };
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          const type = rec.mimeType || "audio/webm";
          const blob = new Blob(recChunksRef.current, { type });
          recChunksRef.current = [];
          if (recTimerRef.current) { clearInterval(recTimerRef.current); recTimerRef.current = null; }
          setRecording(false);
          if (blob.size > 0) sendVoice(blob, recSecRef.current);
        };
        mediaRecRef.current = rec;
        rec.start();
        recSecRef.current = 0;
        setRecSec(0);
        setRecording(true);
        recTimerRef.current = setInterval(() => { recSecRef.current += 1; setRecSec(recSecRef.current); }, 1000);
      })
      .catch(() => setToast("Не удалось получить доступ к микрофону"));
  }

  function stopVoice() {
    const rec = mediaRecRef.current;
    if (rec && rec.state !== "inactive") { try { rec.stop(); } catch (e) {} }
  }

  function cancelVoice() {
    const rec = mediaRecRef.current;
    if (rec) { rec.onstop = null; try { rec.stop(); } catch (e) {} }
    mediaRecRef.current = null;
    if (recTimerRef.current) { clearInterval(recTimerRef.current); recTimerRef.current = null; }
    setRecording(false);
    setRecSec(0);
  }

  async function sendVoice(blob, secs) {
    if (openConvoId == null) return;
    const convo = conversations.find((c) => c.id === openConvoId);
    if (convo && (convo.blockedByMe || convo.blockedMe)) { setToast("Нельзя отправить: пользователь заблокирован"); return; }
    const peerId = convo ? convo.peerUserId : null;
    const mime = blob.type || "audio/webm";
    const label = "🎤 " + fmtDur(secs);
    const appendMsg = (msg, convKey) => setConversations((prev) => prev.map((c) => (c.id === openConvoId ? { ...c, messages: [...c.messages, msg], time: "только что", e2ee: c.e2ee || !!convKey } : c)));
    let convKey = null;
    if (e2eeReady() && me) {
      convKey = await getOrCreateConvKey(openConvoId, peerId, me.id);
    }
    if (convKey) {
      try {
        const enc = await KoloE2EE.encryptData(convKey, await blob.arrayBuffer());
        api(`/api/conversations/${openConvoId}/messages`, { encrypted: true, cipher_text: enc.cipher, nonce: enc.nonce, media_type: mime, text: label })
          .then((r) => appendMsg({ ...r.message, text: label }, convKey))
          .catch(() => setToast("Не удалось отправить голосовое сообщение"));
      } catch (e) {
        setToast("Не удалось зашифровать голосовое сообщение");
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      api(`/api/conversations/${openConvoId}/messages`, { text: label, media_url: dataUrl, media_type: mime })
        .then((r) => appendMsg(r.message, null))
        .catch(() => setToast("Не удалось отправить голосовое сообщение"));
    };
    reader.readAsDataURL(blob);
  }

  const [notifications, setNotifications] = useState([]);
  const [pages, setPages] = useState([]);
  const [openPageId, setOpenPageId] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [pageFeed, setPageFeed] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageDraft, setPageDraft] = useState({ title: "", body: "" });
  const pageEditorRef = useRef(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [pageComposerOpen, setPageComposerOpen] = useState(false);
  const [newPage, setNewPage] = useState({ name: "", desc: "" });
  const [interests, setInterests] = useState([]);
  const [interestPickerOpen, setInterestPickerOpen] = useState(false);
  const [draftInterests, setDraftInterests] = useState([]);
  const [interestSaving, setInterestSaving] = useState(false);
  const [pageFilter, setPageFilter] = useState("all");
  const [interestsSeen, setInterestsSeen] = useState(() => {
    try { return localStorage.getItem("tap:interests-seen") === "1"; } catch (e) { return false; }
  });

  const [viewUserId, setViewUserId] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [uiLoaded, setUiLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const postsRef = useRef([]);
  useEffect(() => { postsRef.current = posts; }, [posts]);

  // Search-result posts live in a separate array, so actions that mutate a
  // post (vote/save/draft/comment) must know how to find it in either place.
  function findPost(id) {
    return posts.find((p) => p.id === id) || searchPosts.find((p) => p.id === id) || null;
  }
  function applyToPost(id, fn) {
    setPosts((prev) => prev.map((p) => (p.id === id ? fn(p) : p)));
    setSearchPosts((prev) => prev.map((p) => (p.id === id ? fn(p) : p)));
  }

  useEffect(() => {
    fetch("/api/bootstrap", { credentials: "same-origin" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          throw new Error("auth");
        }
        if (!r.ok) throw new Error("bootstrap " + r.status);
        return r.json();
      })
      .then((data) => {
        setMe(data.me);
        setPosts(normalizePosts(data.posts));
        setPages(normalizePages(data.pages || data.communities));
        setNotifications(data.notifications || []);
        setBlockedUsers(data.blockedUsers || []);
        setInterests(data.me.interests || []);
        let savedPageId = null, savedConvoId = null, savedUserId = null;
        try {
          const saved = JSON.parse(localStorage.getItem("tap:ui:" + data.me.id) || "null");
          if (saved) {
            if (TABS.some((t) => t.id === saved.tab)) setTab(saved.tab);
            if (SORTS.some((s) => s.id === saved.sort)) setSort(saved.sort);
            if (typeof saved.query === "string") setQuery(saved.query);
            if (saved.composer) {
              setComposer((c) => ({ ...c, title: saved.composer.title || "", body: saved.composer.body || "" }));
            }
            if (saved.msgDrafts && typeof saved.msgDrafts === "object") {
              setMsgDrafts(saved.msgDrafts);
            }
            // Resume exactly where the user left off: an open page, a
            // conversation thread, or someone's profile, not just the tab.
            if (saved.tab === "pages" && typeof saved.openPageId === "number") savedPageId = saved.openPageId;
            if (saved.tab === "messages" && typeof saved.openConvoId === "number") savedConvoId = saved.openConvoId;
            if (saved.tab === "profile" && typeof saved.viewUserId === "number") savedUserId = saved.viewUserId;
          }
        } catch (e) {}
        return initMessaging(data).then(() => ({ savedPageId, savedConvoId, savedUserId }));
      })
      .then(({ savedPageId, savedConvoId, savedUserId }) => {
        setUiLoaded(true);
        setLoading(false);
        if (savedPageId) openPage(savedPageId);
        else if (savedConvoId) openConvo(savedConvoId);
        else if (savedUserId) openProfile(savedUserId);
      })
      .catch((e) => {
        if (e.message !== "auth") {
          setApiError(String(e));
          setLoading(false);
        }
      });
  }, []);

  // Persist the user's UI state (tab, sort, search, draft, open page/thread)
  // per account so the next visit resumes exactly where they left off.
  useEffect(() => {
    if (!me || !uiLoaded) return;
    try {
      localStorage.setItem("tap:ui:" + me.id, JSON.stringify({
        tab, sort, query,
        composer: { title: composer.title, body: composer.body },
        msgDrafts,
        openPageId, openConvoId, viewUserId,
      }));
    } catch (e) {}
  }, [me, uiLoaded, tab, sort, query, composer, msgDrafts, openPageId, openConvoId, viewUserId]);

  // Mount the Quill rich-text editor whenever the post composer opens and keep
  // composer.body in sync with the editor's HTML (empty editor → empty body).
  useEffect(() => {
    if (!composerOpen || !window.Quill || !composerEditorRef.current) return;
    initQuillFonts();
    const q = new window.Quill(composerEditorRef.current, {
      theme: "snow",
      placeholder: "Напишите пост…",
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "clean"],
        ],
      },
    });
    if (composer.body) q.clipboard.dangerouslyPasteHTML(composer.body);
    q.on("text-change", () => {
      setComposer((c) => ({ ...c, body: q.getText().trim() ? q.root.innerHTML : "" }));
    });
    quillRef.current = q;
    return () => {
      quillRef.current = null;
    };
  }, [composerOpen]);

  // Same rich-text editor for the page/community post composer.
  useEffect(() => {
    if (!pageComposerOpen || !window.Quill || !pageEditorRef.current) return;
    initQuillFonts();
    const q = new window.Quill(pageEditorRef.current, {
      theme: "snow",
      placeholder: "Напишите пост…",
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "clean"],
        ],
      },
    });
    if (pageDraft.body) q.clipboard.dangerouslyPasteHTML(pageDraft.body);
    q.on("text-change", () => {
      setPageDraft((d) => ({ ...d, body: q.getText().trim() ? q.root.innerHTML : "" }));
    });
  }, [pageComposerOpen]);

  // Re-fetches the feed data and merges it into the UI without reloading the
  // page. Preserves per-post comment drafts and any locally applied actions.
  async function refreshFeed() {
    if (document.hidden) return;
    setRefreshing(true);
    try {
      const res = await fetch("/api/bootstrap", { credentials: "same-origin" });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) throw new Error("refresh " + res.status);
      const data = await res.json();

      const known = new Set(postsRef.current.map((p) => p.id));
      const drafts = new Map(postsRef.current.map((p) => [p.id, p.commentDraft || ""]));
      const newCount = data.posts.filter((p) => !known.has(p.id)).length;

      setPosts(normalizePosts(data.posts, drafts));
      setPages(normalizePages(data.pages || data.communities));
      setConversations(await decryptConvosList(data.conversations, me && me.id));
      setNotifications(data.notifications || []);
      setBlockedUsers(data.blockedUsers || []);
      if (newCount > 0) setToast(newCount === 1 ? "Новый пост в ленте" : "Новые посты в ленте");
      setLastUpdated(new Date());
    } catch (e) {
      // Transient poll errors are silent — the next tick will retry.
    } finally {
      setRefreshing(false);
    }
  }

  // Poll for new posts while the app is open.
  useEffect(() => {
    const t = setInterval(refreshFeed, REFRESH_MS);
    return () => clearInterval(t);
  }, []);

  // Recompute online/offline labels every 30s without a network call.
  useEffect(() => {
    const t = setInterval(() => setPresenceTick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  async function api(path, body) {
    const res = await fetch(path, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) {
      window.location.href = "/login";
      throw new Error("auth");
    }
    if (!res.ok) {
      let msg = "";
      try {
        msg = await res.text();
      } catch (e) {
        msg = "";
      }
      const e = new Error(msg || path + " " + res.status);
      e.status = res.status;
      throw e;
    }
    return res.json();
  }

  // Animate the tab pane when the active tab changes. Direction follows the
  // order in TABS: forward (right->left) or backward (left->right). The
  // distance is stored too so far jumps flip pages fast with an overshoot.
  const prevTabRef = useRef(tab);
  const [tabAnim, setTabAnim] = useState({ dir: 1, n: 0, dist: 1 });
  useEffect(() => {
    if (prevTabRef.current === tab) return;
    const order = TABS.map((t) => t.id);
    const prev = order.indexOf(prevTabRef.current);
    const next = order.indexOf(tab);
    const dir = next >= prev ? 1 : -1;
    const dist = Math.abs(next - prev);
    prevTabRef.current = tab;
    if (dragRef.current && dragRef.current.active) return; // dragging: swap panes instantly, no slide
    setTabAnim((s) => ({ dir, n: s.n + 1, dist }));
  }, [tab]);

  // Bottom-nav slider: a spring-loaded pill that glides to the active tab and
  // can be grabbed and dragged to flick between tabs quickly.
  const pillRef = useRef(null);
  const tabBtnRefs = useRef({});
  const sliderRef = useRef(null);
  const dragRef = useRef(null);
  const tabRef = useRef(tab);
  useEffect(() => { tabRef.current = tab; }, [tab]);

  function slideTabTo(id) {
    const btn = tabBtnRefs.current[id];
    const pill = pillRef.current;
    const slider = sliderRef.current;
    if (!btn || !pill || !slider) return;
    const br = btn.getBoundingClientRect();
    const pr = pill.getBoundingClientRect();
    slider.style.transform = "translateX(" + (br.left - pr.left) + "px)";
    slider.style.width = br.width + "px";
  }

  useLayoutEffect(() => { slideTabTo(tab); }, [tab]);

  // Reposition the slider if the pill resizes (window/device change).
  useEffect(() => {
    const onResize = () => slideTabTo(tabRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function pillDragStart(e) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragRef.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, active: false };
    const move = (ev) => {
      const d = dragRef.current;
      if (!d || ev.pointerId !== d.id) return;
      if (!d.active) {
        const dx = ev.clientX - d.sx, dy = ev.clientY - d.sy;
        if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return;
        d.active = true;
        document.body.classList.add("t-dragging");
      }
      let next = null;
      TABS.forEach((t) => {
        const btn = tabBtnRefs.current[t.id];
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        if (ev.clientX >= r.left && ev.clientX <= r.right) next = t.id;
      });
      if (next && next !== tabRef.current) setTab(next);
    };
    const up = (ev) => {
      const d = dragRef.current;
      dragRef.current = null;
      document.body.classList.remove("t-dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (d && d.active) {
        // If released over empty pill space no click fires, so finalize here;
        // otherwise the button's onClick already calls openTab.
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        if (!el || !el.closest(".t-tab-btn")) openTab(tabRef.current);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  // Persist the chosen theme and keep the page background in sync so the
  // light theme has no dark edges.
  useEffect(() => {
    try { localStorage.setItem("tap:theme", theme); } catch (e) {}
    const bg = theme === "light" ? "#F7F5EC" : "#14140F";
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("tap:language", language); } catch (e) {}
    document.documentElement.lang = language;
    const run = () => applyUiTranslations(language);
    run();
    const raf = requestAnimationFrame(run);
    const root = document.getElementById("root");
    const observer = root ? new MutationObserver(run) : null;
    if (observer && root) {
      observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: I18N_ATTRS });
    }
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [language]);

  function doLogout() {
    setSettingsOpen(false);
    try { localStorage.removeItem("tap:ui:" + (me && me.id)); } catch (e) {}
    fetch("/logout", { method: "POST", credentials: "same-origin", redirect: "follow" })
      .catch(() => {})
      .finally(() => { window.location.href = "/app"; });
  }

  // ---- Multi-account switcher ----
  async function loadAccounts() {
    try {
      const res = await fetch("/api/accounts", { credentials: "same-origin" });
      if (res.ok) setAccounts(await res.json());
    } catch (e) { /* ignore */ }
  }

  async function switchAccount(token) {
    try {
      const res = await fetch("/api/accounts/switch", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) window.location.reload();
    } catch (e) { /* ignore */ }
  }

  async function removeAccount(token) {
    try {
      const res = await fetch("/api/accounts/remove", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) window.location.reload();
    } catch (e) { /* ignore */ }
  }

  function addAccount() {
    window.location.href = "/login?add=1";
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    setReplyTo(null);
  }, [openPostId]);

  // ---- E2EE helpers (client-side encryption for direct messages) ----
  const keyUsersRef = useRef({});

  function e2eeReady() {
    return typeof KoloE2EE !== "undefined" && KoloE2EE.available();
  }

  async function ensureIdentity(userId) {
    if (!e2eeReady()) return false;
    try {
      let ident = await KoloE2EE.getIdentity(userId);
      if (!ident) {
        ident = await KoloE2EE.generateIdentity();
        await KoloE2EE.setIdentity(userId, ident);
      }
      await fetch("/api/keys/me", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_pub: ident.pubB64 }),
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async function refreshKeyUsers() {
    if (!e2eeReady()) return;
    try {
      const res = await fetch("/api/keys/users", { credentials: "same-origin" });
      if (!res.ok) return;
      const d = await res.json();
      const m = {};
      (d.users || []).forEach((u) => { m[u.userId] = u.identityPub; });
      keyUsersRef.current = m;
    } catch (e) {}
  }

  async function ensureConvKey(convoId, userId) {
    if (!e2eeReady()) return null;
    let key = await KoloE2EE.getConvKey(convoId);
    if (key) return key;
    try {
      const res = await fetch(`/api/conversations/${convoId}/keys`, { credentials: "same-origin" });
      if (!res.ok) return null;
      const d = await res.json();
      if (d.key) {
        const ident = await KoloE2EE.getIdentity(userId);
        if (!ident) return null;
        const k = await KoloE2EE.unwrapConversationKey(ident.privJwk, d.key.wrapped, d.key.nonce, d.key.ephPub);
        await KoloE2EE.setConvKey(convoId, k);
        return k;
      }
    } catch (e) {}
    return null;
  }

  async function getOrCreateConvKey(convoId, peerId, userId) {
    let key = await ensureConvKey(convoId, userId);
    if (key) return key;
    if (peerId == null) return null;
    try {
      const ident = await KoloE2EE.getIdentity(userId);
      const peerPub = keyUsersRef.current[peerId];
      if (!ident || !peerPub) return null;
      const newKey = KoloE2EE.newConversationKey();
      const [mine, theirs] = await Promise.all([
        KoloE2EE.wrapConversationKey(ident.pubB64, newKey),
        KoloE2EE.wrapConversationKey(peerPub, newKey),
      ]);
      const res = await fetch(`/api/conversations/${convoId}/keys`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wrapped_keys: [
            { user_id: userId, wrapped_key: mine.wrapped, wrap_nonce: mine.nonce, wrap_eph: mine.ephPub },
            { user_id: peerId, wrapped_key: theirs.wrapped, wrap_nonce: theirs.nonce, wrap_eph: theirs.ephPub },
          ],
        }),
      });
      if (!res.ok) return null;
      await KoloE2EE.setConvKey(convoId, newKey);
      return newKey;
    } catch (e) {
      return null;
    }
  }

  async function decryptConvosList(convos, userId) {
    if (!convos) return [];
    if (!e2eeReady() || !userId) return convos.map((c) => ({ ...c, messages: c.messages || [], e2ee: false }));
    const out = [];
    for (const c of convos) {
      const msgs = c.messages || [];
      const key = await ensureConvKey(c.id, userId);
      if (key) {
        let ok = true;
        const decrypted = [];
        for (const m of msgs) {
          if (m.encrypted && m.media && m.media.type && m.media.type.indexOf("audio") === 0) {
            const plain = await KoloE2EE.decryptMessage(key, m.text, m.nonce);
            if (plain == null) ok = false;
            decrypted.push({ ...m, text: plain != null ? plain : "🎤", audioCipher: m.text, decrypted: plain != null });
          } else if (m.encrypted) {
            const plain = await KoloE2EE.decryptMessage(key, m.text, m.nonce);
            if (plain == null) ok = false;
            decrypted.push({ ...m, text: plain != null ? plain : "🔒 не удалось расшифровать", decrypted: plain != null });
          } else {
            decrypted.push({ ...m, text: safeStr(m.text) });
          }
        }
        out.push({ ...c, messages: decrypted, e2ee: true, decryptOk: ok });
      } else {
        out.push({ ...c, messages: msgs.map((m) => ({ ...m, text: safeStr(m.text) })), e2ee: false });
      }
    }
    return out;
  }

  async function initMessaging(data) {
    if (!data) return;
    if (!e2eeReady() || !data.me || !data.me.id) {
      setConversations((data && data.conversations) || []);
      return;
    }
    await ensureIdentity(data.me.id);
    await refreshKeyUsers();
    const convs = await decryptConvosList(data.conversations || [], data.me.id);
    setConversations(convs);
  }

  useEffect(() => setVisibleCount(BATCH_SIZE), [sort, query]);

  // Server-side search (posts + users) with debounce. Queries of 1 char still
  // work because the API falls back to LIKE for short tokens.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchUsers([]);
      setSearchPosts([]);
      setSearchSuggestions([]);
      setSearchDone(false);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const t = setTimeout(() => {
      fetch("/api/search?q=" + encodeURIComponent(q), { credentials: "same-origin" })
        .then((r) => r.json())
        .then((d) => {
          setSearchUsers(d.users || []);
          setSearchPosts(normalizePosts(d.posts || []));
          setSearchSuggestions(d.suggestions || []);
          setSearchDone(true);
        })
        .catch(() => { setSearchUsers([]); setSearchPosts([]); setSearchSuggestions([]); setSearchDone(true); })
        .finally(() => setSearchLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  // Toast notifications: stacked bottom-right, each with a shrinking timeline
  // and an exit animation once its time runs out. Errors and successes are
  // detected from the message text so the old setToast(msg) calls keep working.
  function detectToastKind(msg) {
    if (/^(Не удалось|Укажите|Заполните|Выберите|Сначала|Ошибка|Слишком|Такое имя|Этот ник|Неизвестный)/.test(msg)) return "error";
    if (/^(Сохранено|Убрано из|Подписались|Отписались|Профиль обновлён|Интересы сохранены|История добавлена|Ссылка скопирована|Опубликовано|Страница создана|Posted|Новый пост|Новые посты)/.test(msg)) return "success";
    return "info";
  }
  function dismissToast(id) {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 260);
  }
  function setToast(text, type) {
    const msg = String(text);
    if (!msg) return;
    const id = ++toastSeq.current;
    const kind = type || detectToastKind(msg);
    const duration = kind === "error" ? 5200 : kind === "success" ? 3200 : 4200;
    setToasts((prev) => [...prev.slice(-3), { id, msg, kind }]);
    window.setTimeout(() => dismissToast(id), duration);
  }

  function saveRecentSearch(q) {
    const s = q.trim();
    if (s.length < 2) return;
    setRecentSearches((prev) => {
      const next = [s, ...prev.filter((x) => x !== s)].slice(0, 8);
      try { localStorage.setItem("tap:recent-searches", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }
  function removeRecentSearch(q) {
    setRecentSearches((prev) => {
      const next = prev.filter((x) => x !== q);
      try { localStorage.setItem("tap:recent-searches", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }
  function clearRecentSearches() {
    setRecentSearches([]);
    try { localStorage.setItem("tap:recent-searches", "[]"); } catch (e) {}
  }

  function handleBodyScroll(e) {
    if (tab !== "home") return;
    const el = e.target;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
      setVisibleCount((v) => Math.min(v + BATCH_SIZE, filtered.length));
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts;
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q) || stripHtml(p.body).toLowerCase().includes(q));
    const arr = [...list];
    if (sort === "hot") arr.sort((a, b) => b.score + b.comments.length * 2 - (a.score + a.comments.length * 2));
    if (sort === "new") arr.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "top") arr.sort((a, b) => b.score - a.score);
    if (sort === "rising") arr.sort((a, b) => b.comments.length - a.comments.length);
    return arr;
  }, [posts, sort, query]);

  const pagePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const homeVideos = filtered.filter((p) => p.media && p.media.type === "video");
  const openPost = findPost(openPostId);
  const savedPosts = posts.filter((p) => p.saved);
  const repostPosts = posts.filter((p) => p.isMine && p.repostOf);
  const searchActive = query.trim().length >= 2;
  const unreadMsgCount = conversations.filter((c) => c.unread).length;
  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  function vote(id, dir) {
    const p = findPost(id);
    if (!p) return;
    let delta = 0, voted = p.voted;
    if (dir === "up") { if (p.voted === "up") { delta = -1; voted = null; } else if (p.voted === "down") { delta = 2; voted = "up"; } else { delta = 1; voted = "up"; } }
    else { if (p.voted === "down") { delta = 1; voted = null; } else if (p.voted === "up") { delta = -2; voted = "down"; } else { delta = -1; voted = "down"; } }
    applyToPost(id, (x) => ({ ...x, score: x.score + delta, voted }));
    api(`/api/posts/${id}/vote`, { direction: dir })
      .then((r) => applyToPost(id, (x) => ({ ...x, score: r.score, voted: r.voted })))
      .catch(() => {});
  }
  function toggleSave(id) {
    const p = findPost(id);
    if (!p) return;
    const saved = !p.saved;
    setToast(saved ? "Сохранено" : "Убрано из сохранённых");
    applyToPost(id, (x) => ({ ...x, saved }));
    api(`/api/posts/${id}/save`)
      .then((r) => applyToPost(id, (x) => ({ ...x, saved: r.saved })))
      .catch(() => {});
  }
  function toggleRepost(id) {
    const p = findPost(id);
    if (!p) return;
    if (p.isMine) { setToast("Нельзя репостить свой пост"); return; }
    const wasReposted = p.reposted;
    const wasCount = p.reposts;
    applyToPost(id, (x) => ({ ...x, reposted: !wasReposted, reposts: Math.max(0, (x.reposts || 0) + (wasReposted ? -1 : 1)) }));
    if (!wasReposted) {
      const temp = {
        id: -Date.now(), authorId: me.id, author: me.name, authorHandle: me.handle,
        avatarInitials: me.initials, isMine: true, time: "только что",
        createdAt: Date.now() / 1000, title: p.title, body: p.body, media: p.media,
        score: 0, voted: null, saved: false, comments: [], commentDraft: "",
        reposts: 0, reposted: false, repostOf: id,
        origAuthorName: p.author, origAuthorHandle: p.authorHandle,
      };
      setPosts((prev) => [temp, ...prev]);
    } else {
      setPosts((prev) => prev.filter((x) => !(x.repostOf === id && x.isMine)));
    }
    api(`/api/posts/${id}/repost`)
      .then((r) => {
        applyToPost(id, (x) => ({ ...x, reposted: r.reposted, reposts: r.reposts }));
        if (r.reposted) {
          setPosts((prev) => prev.map((x) => (x.repostOf === id && x.isMine ? { ...r.post, commentDraft: "" } : x)));
          setToast("Репост опубликован");
        } else {
          setPosts((prev) => prev.filter((x) => !(x.repostOf === id && x.isMine)));
          setToast("Репост удалён");
        }
      })
      .catch(() => {
        applyToPost(id, (x) => ({ ...x, reposted: wasReposted, reposts: wasCount }));
        if (!wasReposted) setPosts((prev) => prev.filter((x) => x.repostOf !== id));
        setToast("Не удалось сделать репост");
      });
  }
  function toggleFollow(authorId) {
    if (authorId === me.id) return;
    const syncView = (v) => (v && v.id === authorId ? { ...v, followed: !v.followed } : v);
    setViewUser(syncView);
    setPosts((prev) => prev.map((p) => (p.authorId === authorId ? { ...p, followed: !p.followed } : p)));
    api(`/api/users/${authorId}/follow`)
      .then((r) => {
        setPosts((prev) => prev.map((p) => (p.authorId === authorId ? { ...p, followed: r.following } : p)));
        setViewUser((v) => (v && v.id === authorId ? { ...v, followed: r.following } : v));
        setMe((m) => ({ ...m, following: Math.max(0, (m.following || 0) + (r.following ? 1 : -1)) }));
      })
      .catch(() => {
        setPosts((prev) => prev.map((p) => (p.authorId === authorId ? { ...p, followed: !p.followed } : p)));
        setViewUser(syncView);
      });
  }
  function toggleBlock(userId) {
    const target = (viewUser && viewUser.id === userId) ? viewUser : blockedUsers.find((u) => u.id === userId);
    const wasFollowing = !!(viewUser && viewUser.id === userId && viewUser.followed);
    api(`/api/users/${userId}/block`)
      .then((r) => {
        setBlockedUsers((prev) => {
          if (r.blocked) {
            if (prev.some((u) => u.id === userId)) return prev;
            return [...prev, { id: userId, name: (target && target.name) || "", handle: (target && target.handle) || "", avatarInitials: (target && target.avatarInitials) || "" }];
          }
          return prev.filter((u) => u.id !== userId);
        });
        setViewUser((v) => (v && v.id === userId ? { ...v, blockedByMe: r.blocked, followed: r.blocked ? false : v.followed } : v));
        setPosts((prev) => prev.map((p) => (p.authorId === userId ? { ...p, followed: r.blocked ? false : p.followed } : p)));
        setConversations((prev) => prev.map((c) => (c.peerUserId === userId ? { ...c, blockedByMe: r.blocked } : c)));
        if (r.blocked && wasFollowing) setMe((m) => ({ ...m, following: Math.max(0, (m.following || 0) - 1) }));
        setToast(r.blocked ? "Пользователь заблокирован" : "Пользователь разблокирован");
      })
      .catch(() => setToast("Не удалось изменить блокировку"));
  }
  function setDraft(id, val) { applyToPost(id, (p) => ({ ...p, commentDraft: val })); }
  function submitComment(id, parentId) {
    const p = findPost(id);
    const text = p ? p.commentDraft.trim() : "";
    if (!text) return;
    api(`/api/posts/${id}/comments`, { text, parentCommentId: parentId || null })
      .then((r) => {
        applyToPost(id, (x) => ({ ...x, comments: [...x.comments, r.comment], commentDraft: "" }));
        setReplyTo(null);
      })
      .catch(() => setToast("Не удалось отправить комментарий"));
  }
  function toggleCommentLike(postId, commentId) {
    api(`/api/comments/${commentId}/like`, {})
      .then((r) => {
        applyToPost(postId, (x) => ({
          ...x,
          comments: x.comments.map((c) => (c.id === commentId ? { ...c, likes: r.likes, liked: r.liked } : c)),
        }));
      })
      .catch(() => {});
  }
  function share(title) { setToast("Ссылка скопирована: \u201c" + title.slice(0, 26) + (title.length > 26 ? "\u2026" : "") + "\u201d"); }
  function handleMediaFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : null;
    if (!type) { setToast("Выберите файл с фото или видео"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setComposer((c) => ({ ...c, mediaUrl: reader.result, mediaType: type, mediaName: file.name }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function clearMedia() { setComposer((c) => ({ ...c, mediaUrl: "", mediaType: null, mediaName: "" })); }

  function imgErr(e) {
    if (!e.currentTarget.src.endsWith("/static/media/fallback.svg")) {
      e.currentTarget.src = "/static/media/fallback.svg";
    }
  }
  function submitPost(e) {
    e.preventDefault();
    const bodyText = stripHtml(composer.body).replace(/\s+/g, " ").trim();
    if (!bodyText && !composer.mediaUrl) return;
    const derivedTitle = (bodyText.slice(0, 120)) || "Новый пост";
    const payload = { title: derivedTitle, body: composer.body.trim() };
    if (composer.mediaUrl) {
      payload.media_url = composer.mediaUrl;
      payload.media_type = composer.mediaType;
    }
    api("/api/posts", payload)
      .then((r) => {
        setPosts((prev) => [{ ...r.post, commentDraft: "" }, ...prev]);
        setComposer({ title: "", body: "", mediaUrl: "", mediaType: null, mediaName: "" });
        setComposerOpen(false);
        setSort("new");
        setVisibleCount(BATCH_SIZE);
        setToast("Posted");
      })
      .catch(() => setToast("Не удалось опубликовать"));
  }
  function openConvo(id) {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
    setOpenConvoId(id);
    setReactionPicker(null);
    api(`/api/conversations/${id}/read`).catch(() => {});
  }
  function openUserPicker() {
    if (userList.length === 0) {
      fetch("/api/users", { credentials: "same-origin" })
        .then((r) => r.json())
        .then((d) => setUserList(d.users || []))
        .catch(() => setToast("Не удалось загрузить пользователей"));
    }
    setShowNewMsg(true);
  }
  function startChat(userId) {
    api("/api/conversations/start", { user_id: userId })
      .then((r) => {
        setConversations((prev) => (prev.some((c) => c.id === r.conversation.id) ? prev : [...prev, r.conversation]));
        setShowNewMsg(false);
        setOpenConvoId(r.conversation.id);
        setReactionPicker(null);
      })
      .catch(() => setToast("Не удалось начать диалог"));
  }
  function toggleReactionPicker(index) {
    setReactionPicker((cur) => (cur === index ? null : index));
  }
  function setReaction(index, emoji) {
    const convo = conversations.find((c) => c.id === openConvoId);
    if (!convo) return;
    const msg = convo.messages[index];
    if (!msg || msg.id == null) return;
    const current = msg.reaction === emoji ? "" : emoji;
    setConversations((prev) => prev.map((c) => {
      if (c.id !== openConvoId) return c;
      return { ...c, messages: c.messages.map((m, i) => (i === index ? { ...m, reaction: current } : m)) };
    }));
    api(`/api/messages/${msg.id}/reaction`, { emoji })
      .then((r) => setConversations((prev) => prev.map((c) => {
        if (c.id !== openConvoId) return c;
        return { ...c, messages: c.messages.map((m, i) => (i === index ? { ...m, reaction: r.reaction } : m)) };
      })))
      .catch(() => {});
  }
  function setConvoDraft(id, val) {
    if (id == null) return;
    setMsgDrafts((prev) => {
      const next = { ...prev };
      if (val) next[id] = val;
      else delete next[id];
      return next;
    });
  }
  async function sendMessage(templateText) {
    const text = (templateText !== undefined ? templateText : draftMsg).trim();
    if (!text || openConvoId == null) return;
    const convo = conversations.find((c) => c.id === openConvoId);
    if (convo && (convo.blockedByMe || convo.blockedMe)) { setToast("Нельзя отправить: пользователь заблокирован"); return; }
    const peerId = convo ? convo.peerUserId : null;
    let payload;
    let convKey = null;
    if (e2eeReady() && me) {
      convKey = await getOrCreateConvKey(openConvoId, peerId, me.id);
    }
    if (convKey) {
      const enc = await KoloE2EE.encryptMessage(convKey, text);
      payload = { encrypted: true, cipher_text: enc.cipher, nonce: enc.nonce };
    } else {
      payload = { text };
    }
    api(`/api/conversations/${openConvoId}/messages`, payload)
      .then((r) => {
        const msg = convKey ? { ...r.message, text, encrypted: false } : r.message;
        setConversations((prev) => prev.map((c) => (c.id === openConvoId ? { ...c, messages: [...c.messages, msg], time: "только что", e2ee: c.e2ee || !!convKey } : c)));
        if (templateText === undefined) setConvoDraft(openConvoId, "");
      })
      .catch(() => setToast("Не удалось отправить сообщение"));
  }
  function markAllNotifsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    api("/api/notifications/read", {}).catch(() => {});
  }
  function toggleJoin(id) {
    api(`/api/pages/${id}/join`)
      .then((r) => {
        setPages((prev) => prev.map((c) => (c.id === id ? { ...c, joined: r.joined, members: r.members } : c)));
        if (pageInfo && pageInfo.id === id) {
          setPageInfo((prev) => ({ ...prev, joined: r.joined, members: r.members }));
        }
        const c = pages.find((x) => x.id === id);
        setToast((r.joined ? "Подписались на " : "Отписались от ") + (c ? c.name : "страницу"));
      })
      .catch(() => setToast("Не удалось выполнить действие"));
  }

  function openInterestPicker() {
    setDraftInterests(interests);
    setInterestPickerOpen(true);
  }
  function toggleDraftInterest(id) {
    setDraftInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function saveInterests(list) {
    setInterestSaving(true);
    fetch("/api/interests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ interests: list }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("interests " + r.status);
        return r.json();
      })
      .then((data) => {
        setInterests(data.interests || list);
        setInterestPickerOpen(false);
        setPageFilter("all");
        try { localStorage.setItem("tap:interests-seen", "1"); } catch (e) {}
        setInterestsSeen(true);
        setToast(list.length ? "Интересы сохранены" : "Страницы без фильтра по интересам");
      })
      .catch(() => setToast("Не удалось сохранить интересы"))
      .finally(() => setInterestSaving(false));
  }
  function skipInterestPicker() {
    setInterestPickerOpen(false);
    try { localStorage.setItem("tap:interests-seen", "1"); } catch (e) {}
    setInterestsSeen(true);
    setPageFilter("all");
  }
  function openPage(id) {
    setOpenPageId(id);
    setPageComposerOpen(false);
    setPageLoading(true);
    setPageInfo(null);
    setPageFeed([]);
    fetch(`/api/pages/${id}`, { credentials: "same-origin" })
      .then((r) => {
        if (r.status === 401) { window.location.href = "/login"; throw new Error("auth"); }
        if (!r.ok) throw new Error("page " + r.status);
        return r.json();
      })
      .then((data) => {
        setPageInfo(data.page);
        setPageFeed(normalizePosts(data.posts));
        setPageLoading(false);
      })
      .catch(() => {
        setPageLoading(false);
        setOpenPageId(null);
        setPageInfo(null);
        setPageFeed([]);
        setToast("Не удалось открыть страницу");
      });
  }
  function closePage() {
    setOpenPageId(null);
    setPageInfo(null);
    setPageFeed([]);
    setPageComposerOpen(false);
  }
  function openProfile(id) {
    setTab("profile");
    setViewUserId(id);
    setViewUser(null);
    setOpenPostId(null);
    setOpenConvoId(null);
    fetch(`/api/users/${id}/profile`, { credentials: "same-origin" })
      .then((r) => {
        if (r.status === 401) { window.location.href = "/login"; throw new Error("auth"); }
        if (r.status === 404) { setViewUserId(null); throw new Error("notfound"); }
        if (!r.ok) throw new Error("profile " + r.status);
        return r.json();
      })
      .then((data) => setViewUser(data.user))
      .catch((e) => { if (e.message !== "auth") setToast("Не удалось открыть профиль"); });
  }
  function closeProfile() {
    setViewUserId(null);
    setViewUser(null);
  }
  function openEdit() {
    setEditForm({ name: me.name, handle: me.handle, bio: me.bio || "" });
    setEditCheck({ handle: null, name: null });
    setEditOpen(true);
  }
  function cancelEdit() {
    setEditOpen(false);
    setEditCheck({ handle: null, name: null });
    if (editTimer.current) clearTimeout(editTimer.current);
  }
  function checkName(value) {
    const v = value.trim();
    if (!v) { setEditCheck((c) => ({ ...c, name: null })); return; }
    if (v.length > 120) { setEditCheck((c) => ({ ...c, name: { status: "invalid", msg: "Имя слишком длинное" } })); return; }
    if (!/^[A-Za-z0-9 _\-.']+$/.test(v)) {
      setEditCheck((c) => ({ ...c, name: { status: "invalid", msg: "Имя — только латинские буквы, цифры, пробелы и «- _ . '»" } }));
      return;
    }
    setEditCheck((c) => ({ ...c, name: { status: "checking", msg: "Проверяем имя…" } }));
    if (editTimer.current) clearTimeout(editTimer.current);
    editTimer.current = setTimeout(() => {
      fetch(`/api/users/check?field=name&value=${encodeURIComponent(v)}`, { credentials: "same-origin" })
        .then((r) => { if (!r.ok) throw new Error("check"); return r.json(); })
        .then((d) => setEditCheck((c) => ({ ...c, name: d.available ? { status: "ok", msg: "Имя свободно" } : { status: "taken", msg: "Это имя уже занято" } })))
        .catch(() => setEditCheck((c) => ({ ...c, name: null })));
    }, 400);
  }
  function checkHandle(value) {
    const v = value.trim();
    if (!v) { setEditCheck((c) => ({ ...c, handle: null })); return; }
    if (!v.startsWith("@") || v.length < 2) {
      setEditCheck((c) => ({ ...c, handle: { status: "invalid", msg: "Ник начинается с @, например @marina.k" } }));
      return;
    }
    if (!/^@[A-Za-z0-9._-]+$/.test(v)) {
      setEditCheck((c) => ({ ...c, handle: { status: "invalid", msg: "Ник — только латинские буквы, цифры и «_ . -»" } }));
      return;
    }
    setEditCheck((c) => ({ ...c, handle: { status: "checking", msg: "Проверяем ник…" } }));
    if (editTimer.current) clearTimeout(editTimer.current);
    editTimer.current = setTimeout(() => {
      fetch(`/api/users/check?field=handle&value=${encodeURIComponent(v)}`, { credentials: "same-origin" })
        .then((r) => { if (!r.ok) throw new Error("check"); return r.json(); })
        .then((d) => setEditCheck((c) => ({ ...c, handle: d.available ? { status: "ok", msg: "Ник свободен" } : { status: "taken", msg: "Этот ник уже занят" } })))
        .catch(() => setEditCheck((c) => ({ ...c, handle: null })));
    }, 400);
  }
  function onEditName(e) {
    const v = e.target.value;
    setEditForm((f) => ({ ...f, name: v }));
    checkName(v);
  }
  function onEditHandle(e) {
    const v = e.target.value;
    setEditForm((f) => ({ ...f, handle: v }));
    checkHandle(v);
  }
  function submitProfile(e) {
    e.preventDefault();
    if (editSaving) return;
    const name = editForm.name.trim();
    const handle = editForm.handle.trim();
    const bio = editForm.bio.trim();
    if (!name || !handle.startsWith("@")) { setToast("Заполните имя и ник"); return; }
    setEditSaving(true);
    api("/api/profile", { name, handle, bio })
      .then((r) => {
        setMe(r.me);
        setEditOpen(false);
        setEditCheck({ handle: null, name: null });
        setToast("Профиль обновлён");
        setPosts((prev) => prev.map((p) => (p.isMine ? { ...p, author: r.me.name, authorHandle: r.me.handle, avatarInitials: r.me.initials } : p)));
        setViewUser((v) => (v && v.isMine ? { ...v, name: r.me.name, handle: r.me.handle, initials: r.me.initials, bio: r.me.bio } : v));
      })
      .catch((err) => setToast(err.status === 400 || err.status === 409 ? err.message : "Не удалось сохранить профиль"))
      .finally(() => setEditSaving(false));
  }
  const editCanSave =
    editForm.name.trim().length > 0 &&
    editForm.handle.trim().length >= 2 && editForm.handle.trim().startsWith("@") &&
    (!editCheck.handle || (editCheck.handle.status !== "taken" && editCheck.handle.status !== "invalid" && editCheck.handle.status !== "checking")) &&
    (!editCheck.name || (editCheck.name.status !== "taken" && editCheck.name.status !== "invalid" && editCheck.name.status !== "checking"));
  function submitNewPage(e) {
    e.preventDefault();
    if (!newPage.name.trim()) { setToast("Укажите название страницы"); return; }
    api("/api/pages", { name: newPage.name, description: newPage.desc })
      .then((r) => {
        setPages((prev) => [r.page, ...prev]);
        setCreateOpen(false);
        setNewPage({ name: "", desc: "" });
        setToast("Страница создана");
      })
      .catch(() => setToast("Не удалось создать страницу"));
  }
  function submitPagePost(e) {
    e.preventDefault();
    if (!pageDraft.title.trim() || !openPageId) { setToast("Укажите заголовок"); return; }
    api(`/api/pages/${openPageId}/posts`, { title: pageDraft.title, body: pageDraft.body })
      .then((r) => {
        setPageFeed((prev) => [r.post, ...prev]);
        setPageDraft({ title: "", body: "" });
        setPageComposerOpen(false);
        setToast("Опубликовано на странице");
      })
      .catch(() => setToast("Не удалось опубликовать"));
  }
  function openTab(id) {
    setTab(id);
    setOpenPostId(null);
    setVideoFeed(null);
    setOpenConvoId(null);
    setOpenPageId(null);
    setComposerOpen(false);
    setCreateOpen(false);
    setPageComposerOpen(false);
    setShowNewMsg(false);
    setStoryComposerOpen(false);
    if (id === "profile") { setViewUserId(null); setViewUser(null); }
    if (id === "notifications") markAllNotifsRead();
  }

  // The "+" button by the tab bar creates something different per tab:
  // home -> post, pages list -> page, open page -> post to it,
  // messages -> new chat, profile -> story.
  function toggleFab() {
    if (tab === "home") {
      setComposerOpen((v) => !v);
    } else if (tab === "pages") {
      if (openPageId) setPageComposerOpen((v) => !v);
      else setCreateOpen((v) => !v);
    } else if (tab === "messages") {
      if (showNewMsg) setShowNewMsg(false);
      else {
        if (openConvoId) setOpenConvoId(null);
        openUserPicker();
      }
    } else if (tab === "profile" && !viewUserId) {
      if (storyComposerOpen) setStoryComposerOpen(false);
      else openStoryComposer();
    }
  }

  const fabAvailable = tab === "home" || tab === "pages" || tab === "messages" || (tab === "profile" && !viewUserId);
  const fabOpen =
    (tab === "home" && composerOpen) ||
    (tab === "pages" && (openPageId ? pageComposerOpen : createOpen)) ||
    (tab === "messages" && showNewMsg) ||
    (tab === "profile" && storyComposerOpen);

  const openConvo_ = conversations.find((c) => c.id === openConvoId) || null;

  function openVideoFeed(postId) {
    const videos = homeVideos.length ? homeVideos : posts.filter((p) => p.media && p.media.type === "video");
    if (videos.length === 0) return;
    const idx = Math.max(0, videos.findIndex((p) => p.id === postId));
    setOpenPostId(null);
    setVideoFeedIdx(idx);
    setVideoFeed({ videos, start: idx });
  }
  function openVideoFeedFromStart() {
    const videos = homeVideos.length ? homeVideos : posts.filter((p) => p.media && p.media.type === "video");
    if (videos.length === 0) { setToast("Видео лента пока пуста"); return; }
    setOpenPostId(null);
    setVideoFeedIdx(0);
    setVideoFeed({ videos, start: 0 });
  }
  function closeVideoFeed() {
    setVideoFeed(null);
  }
  function stepVideoFeed(dir) {
    if (!videoFeed) return;
    setVideoFeedIdx((i) => Math.min(videoFeed.videos.length - 1, Math.max(0, i + dir)));
  }
  useEffect(() => {
    if (!videoFeed) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeVideoFeed();
      else if (e.key === "ArrowLeft") stepVideoFeed(-1);
      else if (e.key === "ArrowRight") stepVideoFeed(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoFeed]);

  function openStory(frames) {
    setStory(frames || []);
    setStoryIdx(0);
  }
  function closeStory() {
    setStory(null);
    setStoryIdx(0);
  }
  function stepStory(d) {
    if (!story) return;
    const next = storyIdx + d;
    if (next < 0 || next >= story.length) { closeStory(); return; }
    setStoryIdx(next);
  }
  // Image frames auto-advance like a real story; videos play on their own.
  useEffect(() => {
    if (!story || !story[storyIdx] || story[storyIdx].type === "video") return;
    const t = setTimeout(() => stepStory(1), 4000);
    return () => clearTimeout(t);
  }, [story, storyIdx]);
  useEffect(() => {
    if (!story) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowLeft") stepStory(-1);
      if (e.key === "ArrowRight") stepStory(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [story, storyIdx]);

  function openStoryComposer() {
    const mine = posts.filter((p) => p.isMine);
    if (mine.length === 0) { setToast("Сначала создайте пост"); return; }
    setStoryForm({ postId: String(mine[0].id), mediaUrl: "", mediaType: null, mediaName: "", caption: "" });
    setStoryComposerOpen(true);
  }
  function handleStoryMedia(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : null;
    if (!type) { setToast("Выберите файл с фото или видео"); return; }
    const reader = new FileReader();
    reader.onload = () => setStoryForm((f) => ({ ...f, mediaUrl: reader.result, mediaType: type, mediaName: file.name }));
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function submitStory(e) {
    e.preventDefault();
    const pid = Number(storyForm.postId);
    if (!pid || !storyForm.mediaUrl) { setToast("Выберите пост и медиа-файл"); return; }
    setStorySaving(true);
    api(`/api/posts/${pid}/story`, { media_url: storyForm.mediaUrl, media_type: storyForm.mediaType, caption: storyForm.caption.trim() })
      .then((r) => {
        applyToPost(pid, (x) => ({ ...x, story: r.story }));
        setStoryComposerOpen(false);
        setStoryForm({ postId: "", mediaUrl: "", mediaType: null, mediaName: "", caption: "" });
        setToast("История добавлена");
      })
      .catch(() => setToast("Не удалось добавить историю"))
      .finally(() => setStorySaving(false));
  }

  function renderCard(p) {
    const isText = !p.media;
    const hasStory = p.story && p.story.frames && p.story.frames.length > 0;
    const storyBtn = hasStory ? (
      <button className="t-card-story" onClick={(e) => { e.stopPropagation(); openStory(p.story.frames); }} aria-label="Открыть историю">
        <StoryIcon size={14} />
      </button>
    ) : null;
    const saveBtn = (
      <button className={"t-card-save" + (p.saved ? " saved" : "")} onClick={(e) => { e.stopPropagation(); toggleSave(p.id); }}>
        <Bookmark size={13} fill={p.saved ? "currentColor" : "none"} />
      </button>
    );
    const actions = (
      <div className="t-card-actions">
        <button className={"t-card-act up" + (p.voted === "up" ? " active" : "")} onClick={(e) => { e.stopPropagation(); vote(p.id, "up"); }}>
          <ArrowBigUp size={14} fill={p.voted === "up" ? "currentColor" : "none"} />{formatScore(p.score)}
        </button>
        <button className={"t-card-act down" + (p.voted === "down" ? " active" : "")} onClick={(e) => { e.stopPropagation(); vote(p.id, "down"); }}>
          <ArrowBigDown size={14} fill={p.voted === "down" ? "currentColor" : "none"} />
        </button>
        {!p.isMine && (
          <button className={"t-card-act repost" + (p.reposted ? " active" : "")} onClick={(e) => { e.stopPropagation(); toggleRepost(p.id); }}>
            <Repeat size={13} />{p.reposts}
          </button>
        )}
        <button className="t-card-act comment" onClick={(e) => { e.stopPropagation(); setOpenPostId(p.id); }}>
          <MessageCircle size={12} />{p.comments.length}
        </button>
      </div>
    );
    const repostBanner = p.repostOf ? (
      <div className="t-card-repost-banner">
        <Repeat size={12} />
        <span>Репост</span>
        <span className="t-card-repost-orig" onClick={(e) => { e.stopPropagation(); openProfile(p.authorId); }}>от {p.origAuthorHandle || p.origAuthorName}</span>
      </div>
    ) : null;
    return (
      <div key={p.id} className={"t-card" + (isText ? " t-card-text" : "")} onClick={() => setOpenPostId(p.id)}>
        {isText ? (
          <div className="t-card-text">
            <div className="t-card-text-head">
              <span className="t-card-nick" onClick={(e) => { e.stopPropagation(); openProfile(p.authorId); }}>{p.authorHandle || p.author}</span>
              {storyBtn}
              {saveBtn}
            </div>
            {repostBanner}
            <div className="t-card-text-body">
              <div className="t-card-text-title">{p.title}</div>
              {p.body && <div className={"t-card-text-preview" + (htmlLike(p.body) ? " html" : "")} dangerouslySetInnerHTML={{ __html: bodyContent(p.body) }} />}
            </div>
            {actions}
          </div>
        ) : (
          <React.Fragment>
            <div className="t-card-media">
              {p.media.type === "video" ? (
                <button className="t-card-video-open" onClick={(e) => { e.stopPropagation(); openVideoFeed(p.id); }} aria-label="Открыть видео ленту" title="Открыть видео ленту">
                  <video src={p.media.url} muted loop playsInline autoPlay />
                  <div className="t-card-play"><span><Play size={14} fill="currentColor" /></span></div>
                </button>
              ) : (
                <img src={p.media.url} alt="" onError={imgErr} />
              )}
              {saveBtn}
              {storyBtn}
            </div>
            <div className="t-card-footer">
              {repostBanner}
              <div className="t-card-title">{p.title}</div>
              {actions}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  // Tab flip animation: farther jumps travel further, run faster and
  // overshoot past the target like a quick page flip.
  const paneAnimStyle = (() => {
    const d = Math.max(1, tabAnim.dist || 1);
    const fwd = tabAnim.dir >= 0;
    const travel = (90 + d * 90) * (fwd ? 1 : -1);
    const over = -(14 + d * 8) * (fwd ? 1 : -1);
    const dur = Math.max(0.18, 0.32 - (d - 1) * 0.05);
    return { animationDuration: dur + "s", "--tx-in": travel + "px", "--tx-over": over + "px" };
  })();

  return (
    <div className={"tap-root" + (theme === "light" ? " light" : "")}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .tap-root {
          --bg: #14140F; --surface: #1D1E17; --surface-hover: #262719; --card: #1F2018;
          --border: #2E3024; --text: #EDEAE0; --text-dim: #9A9C8C; --text-faint: #6C6E60;
          --gold: #4F9C8C; --teal: #4F9C8C; --rust: #2E6B60;
          --header-bg: rgba(20,20,15,0.94);
          background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif;
          height: 100dvh; overflow: hidden;
          position: relative; display: flex; flex-direction: column;
        }
        .tap-root.light {
          --bg: #F7F5EC; --surface: #FFFFFF; --surface-hover: #EFEDE1; --card: #FFFFFF;
          --border: #E6E3D4; --text: #1D1E17; --text-dim: #61635A; --text-faint: #A0A293;
          --gold: #3E8B7A; --teal: #3E8B7A; --rust: #2E6B60;
          --header-bg: rgba(247,245,236,0.92);
        }
        .tap-root * { box-sizing: border-box; }
        .tap-serif { font-family: 'Fraunces', serif; }
        .tap-mono { font-family: 'JetBrains Mono', monospace; }

        .t-header { position: sticky; top: 0; z-index: 20; background: var(--header-bg); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 14px 20px; flex-shrink: 0; box-shadow: 0 10px 30px -14px rgba(0,0,0,0.45); }
        .t-header::after { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 22px; pointer-events: none; z-index: 19; background: linear-gradient(to bottom, var(--header-bg), rgba(0,0,0,0)); }
        .t-header-row { display: flex; align-items: center; gap: 12px; width: 100%; }
        .t-brand { display: flex; align-items: center; flex-shrink: 0; cursor: pointer; user-select: none; }
        .t-brand-name { font-family: 'Body Grotesque Large', 'Body Grotesque', 'Inter', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0; line-height: 1; }
        .t-search { flex: 1; display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 8px 14px; transition: border-color .15s; position: relative; }
        .t-search:focus-within { border-color: var(--gold); }
        .t-search input { background: none; border: none; outline: none; color: var(--text); font-size: 13.5px; width: 100%; font-family: 'Inter', sans-serif; }
        .t-search input::placeholder { color: var(--text-faint); }
        .t-search-clear { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: var(--surface-hover); border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; border-radius: 50%; flex-shrink: 0; padding: 0; transition: all .15s; }
        .t-search-clear:hover { color: #17170F; background: var(--gold); border-color: var(--gold); }
        .t-search-recent { position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 30; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.35); padding: 8px; animation: t-tab-in-fwd 0.15s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-search-recent-head { display: flex; align-items: center; justify-content: space-between; padding: 4px 8px 8px; font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
        .t-search-recent-clear { background: none; border: none; color: var(--text-dim); font-size: 11.5px; cursor: pointer; font-family: 'Inter', sans-serif; padding: 0; }
        .t-search-recent-clear:hover { color: #E0604E; }
        .t-search-recent-item { display: flex; align-items: center; gap: 9px; padding: 8px 9px; border-radius: 9px; cursor: pointer; color: var(--text-dim); transition: background .12s, color .12s; }
        .t-search-recent-item:hover { background: var(--surface-hover); color: var(--text); }
        .t-search-recent-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
        .t-search-recent-x { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: none; border: none; color: var(--text-faint); cursor: pointer; border-radius: 50%; padding: 0; flex-shrink: 0; }
        .t-search-recent-x:hover { color: #E0604E; background: var(--surface-hover); }

        .t-search-results { animation: t-tab-in-fwd 0.22s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-sr-label { font-size: 12px; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.06em; margin: 16px 0 8px; }
        .t-sr-label:first-child { margin-top: 0; }
        .t-search-results .t-grid { margin-top: 6px; }
        .t-search-results .t-community-row { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 8px; padding: 10px 12px; }
        .t-search-results .t-community-row:hover { border-color: var(--gold); }
        .t-search-results .t-community-name { font-size: 14px; font-weight: 600; }
        .t-search-results .t-community-desc { font-size: 12px; color: var(--text-dim); margin-top: 2px; line-height: 1.4; word-break: break-word; }

        .t-suggest { margin-top: 14px; }
        .t-suggest-label { font-size: 12.5px; color: var(--text-dim); margin-bottom: 10px; }
        .t-suggest-list { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .t-suggest-btn { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 7px 15px; border-radius: 999px; font-size: 13px; cursor: pointer; transition: all .15s; font-family: 'Inter', sans-serif; }
        .t-suggest-btn:hover { border-color: var(--gold); color: var(--gold); }
        .t-new-btn { display: flex; align-items: center; gap: 6px; background: var(--gold); color: #17170F; border: none; padding: 8px 14px; border-radius: 999px; font-weight: 600; font-size: 13px; cursor: pointer; flex-shrink: 0; transition: transform .12s, filter .12s; font-family: 'Inter', sans-serif; }
        .t-new-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .t-screen-title { font-size: 19px; font-weight: 700; font-family: 'Fraunces', serif; }

        .t-body { flex: 1; width: 100%; padding: 18px 20px 20px; overflow-y: auto; }

        .t-composer { background: var(--surface); border: 1px solid var(--gold); border-radius: 16px; padding: 16px; margin-bottom: 16px; }
        .t-composer-head { font-size: 12px; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
        .t-composer input, .t-composer textarea { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 9px 11px; font-size: 13.5px; margin-bottom: 8px; font-family: 'Inter', sans-serif; outline: none; }
        .t-composer input:focus, .t-composer textarea:focus { border-color: var(--gold); }
        .t-composer textarea { resize: vertical; min-height: 60px; }
        .t-composer .ql-toolbar { background: var(--bg); border: 1px solid var(--border); border-radius: 10px 10px 0 0; border-bottom: none; padding: 6px 8px; }
        .t-composer .ql-container { border: 1px solid var(--border); border-radius: 0 0 10px 10px; background: var(--bg); font-family: 'Inter', sans-serif; font-size: 13.5px; margin-bottom: 8px; }
        .t-composer .ql-editor { min-height: 96px; max-height: 260px; color: var(--text); padding: 10px 11px; }
        .t-composer .ql-editor.ql-blank::before { color: var(--text-faint); font-style: normal; }
        .t-composer .ql-toolbar .ql-stroke { stroke: var(--text-dim); }
        .t-composer .ql-toolbar .ql-fill { fill: var(--text-dim); }
        .t-composer .ql-toolbar button:hover .ql-stroke, .t-composer .ql-toolbar button.ql-active .ql-stroke { stroke: var(--gold); }
        .t-composer .ql-toolbar button:hover .ql-fill, .t-composer .ql-toolbar button.ql-active .ql-fill { fill: var(--gold); }
        .t-composer .ql-toolbar .ql-picker { color: var(--text-dim); }
        .t-composer .ql-toolbar .ql-picker-label:hover, .t-composer .ql-toolbar .ql-picker-label.ql-active { color: var(--gold); }
        .t-composer .ql-editor h1, .t-composer .ql-editor h2, .t-composer .ql-editor h3 { color: var(--text); margin: 8px 0 6px; }
        .t-composer .ql-editor h1 { font-size: 20px; } .t-composer .ql-editor h2 { font-size: 17px; } .t-composer .ql-editor h3 { font-size: 15px; }
        .t-composer .ql-editor p { margin: 0 0 8px; }
        .t-composer .ql-editor a { color: var(--teal); }
        .t-composer .ql-editor blockquote { border-left: 3px solid var(--gold); padding-left: 10px; color: var(--text-dim); }
        .t-composer .ql-editor pre { background: rgba(255,255,255,0.06); border-radius: 8px; padding: 8px 10px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; }
        .t-composer .ql-editor ul, .t-composer .ql-editor ol { padding-left: 20px; margin: 0 0 8px; }
        .t-composer .ql-editor .ql-font-serif, .t-page-composer .ql-editor .ql-font-serif { font-family: 'Fraunces', Georgia, serif !important; }
        .t-composer .ql-editor .ql-font-monospace, .t-page-composer .ql-editor .ql-font-monospace { font-family: 'JetBrains Mono', monospace !important; }
        .t-composer .ql-editor .ql-font-courier, .t-page-composer .ql-editor .ql-font-courier { font-family: 'Courier New', Courier, monospace !important; }
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="courier"]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="courier"]::before { content: "Courier"; font-family: 'Courier New', Courier, monospace; }
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before { content: "Fraunces"; font-family: 'Fraunces', Georgia, serif; }
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before { content: "Mono"; font-family: 'JetBrains Mono', monospace; }
        .t-composer .ql-toolbar .ql-picker.ql-font .ql-picker-label:not([data-value])::before,
        .t-page-composer .ql-toolbar .ql-picker.ql-font .ql-picker-label:not([data-value])::before { content: "Inter"; font-family: 'Inter', sans-serif; }
        .t-composer .ql-toolbar .ql-picker-options, .t-page-composer .ql-toolbar .ql-picker-options { background: var(--surface); border: 1px solid var(--border); color: var(--text); }
        .t-composer .ql-toolbar .ql-picker-options .ql-picker-item, .t-page-composer .ql-toolbar .ql-picker-options .ql-picker-item { color: var(--text-dim); }
        .t-composer .ql-toolbar .ql-picker-options .ql-picker-item:hover, .t-composer .ql-toolbar .ql-picker-options .ql-picker-item.ql-selected,
        .t-page-composer .ql-toolbar .ql-picker-options .ql-picker-item:hover, .t-page-composer .ql-toolbar .ql-picker-options .ql-picker-item.ql-selected { color: var(--gold); }
        .t-composer-actions { display: flex; justify-content: flex-end; gap: 8px; }
        .t-media-btn { display: flex; align-items: center; gap: 7px; width: fit-content; background: var(--bg); border: 1px dashed var(--border); color: var(--text-dim); padding: 8px 13px; border-radius: 10px; font-size: 12.5px; cursor: pointer; margin-bottom: 10px; transition: border-color .12s, color .12s; }
        .t-media-btn:hover { border-color: var(--gold); color: var(--text); }
        .t-media-preview { position: relative; width: 100%; max-height: 220px; border-radius: 10px; overflow: hidden; margin-bottom: 10px; background: var(--bg); border: 1px solid var(--border); }
        .t-media-preview img { width: 100%; max-height: 220px; object-fit: contain; display: block; }
        .t-media-preview video { width: 100%; max-height: 220px; display: block; }
        .t-media-remove { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.55); border: none; color: #fff; border-radius: 999px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .t-btn-ghost { background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 7px 14px; border-radius: 999px; font-size: 13px; cursor: pointer; font-family: 'Inter', sans-serif; }
        .t-btn-solid { background: var(--gold); border: none; color: #17170F; font-weight: 600; padding: 7px 16px; border-radius: 999px; font-size: 13px; cursor: pointer; font-family: 'Inter', sans-serif; }
        .t-btn-solid:disabled { opacity: 0.4; cursor: not-allowed; }

        .t-sorts { display: flex; gap: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 4px; width: fit-content; margin-bottom: 16px; }
        .t-refresh-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .t-refresh-time { font-size: 11px; color: var(--text-faint); }
        .t-refresh-btn { display: flex; align-items: center; gap: 5px; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: 'Inter', sans-serif; }
        .t-refresh-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--text); }
        .t-refresh-btn:disabled { opacity: 0.5; cursor: default; }
        .t-sort-btn { display: flex; align-items: center; gap: 5px; background: transparent; border: none; color: var(--text-dim); padding: 6px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: 'Inter', sans-serif; }
        .t-sort-btn:hover { color: var(--text); }
        .t-sort-btn.active { background: var(--gold); color: #17170F; }

        .t-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
        .t-card { position: relative; aspect-ratio: 1 / 1; border-radius: 16px; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 8px 18px -14px rgba(0,0,0,0.7); transition: transform .15s, box-shadow .15s, border-color .15s; }
        .t-card:hover { transform: translateY(-3px); box-shadow: 0 4px 10px rgba(0,0,0,0.3), 0 16px 28px -16px rgba(0,0,0,0.8); border-color: #3a3c2c; }
        .t-card-media { position: relative; flex: 1; min-height: 0; background: var(--surface); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .t-card-media img, .t-card-media video { width: 100%; height: 100%; object-fit: cover; }
        .t-card-text { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 14px; }
        .t-card-text-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-shrink: 0; }
        .t-card-text-head .t-card-save { position: static; }
        .t-card-nick { font-size: 12px; font-weight: 600; color: var(--gold); font-family: 'JetBrains Mono', monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-card-text-body { flex: 1; min-height: 0; overflow: hidden; margin: 4px 0 10px; }
        .t-card-text-title { font-size: 17px; font-weight: 700; line-height: 1.35; font-family: 'Fraunces', serif; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
        .t-card-text-preview { margin-top: 8px; font-size: 13px; line-height: 1.5; color: var(--text-dim); display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
        .t-card-text-preview.html { display: block; max-height: 150px; overflow: hidden; }
        .t-card-text-preview.html p, .t-card-text-preview.html h1, .t-card-text-preview.html h2, .t-card-text-preview.html h3, .t-card-text-preview.html ul, .t-card-text-preview.html ol { margin: 0 0 6px; }
        .t-card-text-preview.html p:last-child { margin-bottom: 0; }
        .t-card-text-preview a { color: var(--teal); }
        .t-card-text .t-card-actions { margin-top: auto; }
        .t-card-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.15); pointer-events: none; }
        .t-card-play span { width: 30px; height: 30px; border-radius: 50%; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; color: #fff; }
        .t-card-save { position: absolute; top: 7px; right: 7px; background: rgba(0,0,0,0.4); border: none; border-radius: 999px; padding: 5px; display: flex; color: #fff; cursor: pointer; z-index: 2; }
        .t-card-save.saved { background: #17170F; color: var(--gold); }
        .t-card-story { position: absolute; top: 7px; left: 7px; width: 30px; height: 30px; border-radius: 10px; background: linear-gradient(150deg, var(--gold), var(--rust)); border: none; color: #17170F; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; box-shadow: 0 2px 8px rgba(0,0,0,0.35); transition: transform .15s; }
        .t-card-story:hover { transform: scale(1.08); }
        .t-card-text-head .t-card-story { position: static; margin-left: auto; }
        .t-card-footer { padding: 9px 10px 8px; flex-shrink: 0; }
        .t-card-title { font-size: 12.5px; font-weight: 600; line-height: 1.3; color: var(--text); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 7px; }
        .t-card-actions { display: flex; align-items: center; gap: 2px; }
        .t-card-act { display: flex; align-items: center; gap: 3px; background: none; border: none; color: var(--text-faint); font-size: 10.5px; font-weight: 600; padding: 3px 5px; border-radius: 6px; cursor: pointer; transition: color .12s, background .12s; font-family: 'JetBrains Mono', monospace; }
        .t-card-act:hover { background: var(--surface-hover); color: var(--text); }
        .t-card-act.up.active { color: var(--gold); }
        .t-card-act.down.active { color: var(--teal); }
        .t-card-act.repost.active { color: var(--gold); }
        .t-card-act.comment { margin-left: auto; font-family: 'Inter', sans-serif; }
        .t-card-repost-banner { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 600; color: var(--text-dim); background: var(--surface); border: 1px dashed var(--border); border-radius: 8px; padding: 4px 8px; margin: 2px 0 6px; overflow: hidden; white-space: nowrap; }
        .t-card-repost-banner .t-card-repost-orig { margin-left: auto; color: var(--gold); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
        .t-modal-repost-banner { margin: 0 0 10px; }
        .t-card-footer .t-card-repost-banner { margin: 0 0 6px; }

        .t-empty { text-align: center; padding: 50px 20px; color: var(--text-faint); }

        /* Fullscreen story viewer */
        .t-story-viewer { position: absolute; inset: 0; background: rgba(8,8,6,0.86); backdrop-filter: blur(4px); z-index: 60; display: flex; align-items: center; justify-content: center; animation: t-fade-in .18s ease-out; }
        @keyframes t-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .t-story-card { position: relative; width: min(92vw, 380px); aspect-ratio: 9 / 16; border-radius: 16px; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
        .t-story-card img, .t-story-card video { width: 100%; height: 100%; object-fit: cover; }
        .t-story-progress { position: absolute; top: 8px; left: 8px; right: 8px; display: flex; gap: 4px; z-index: 2; }
        .t-story-seg { flex: 1; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.35); overflow: hidden; }
        .t-story-seg span { display: block; height: 100%; width: 0%; background: #fff; }
        .t-story-seg.done span { width: 100%; }
        .t-story-seg.active span { animation: t-story-progress 4s linear forwards; }
        @keyframes t-story-progress { from { width: 0%; } to { width: 100%; } }
        .t-story-author { position: absolute; top: 20px; left: 12px; right: 12px; display: flex; align-items: center; gap: 8px; z-index: 2; color: #fff; font-size: 13px; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
        .t-story-close { position: absolute; top: 16px; right: 12px; z-index: 3; width: 28px; height: 28px; border-radius: 50%; background: rgba(0,0,0,0.35); color: #fff; border: none; cursor: pointer; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center; }
        .t-story-nav { position: absolute; top: 0; bottom: 0; width: 40%; z-index: 2; background: none; border: none; cursor: pointer; }
        .t-story-nav--prev { left: 0; }
        .t-story-nav--next { right: 0; }
        .t-story-caption { position: absolute; bottom: 16px; left: 12px; right: 12px; color: #fff; font-size: 13px; text-shadow: 0 1px 3px rgba(0,0,0,0.5); z-index: 2; }

        .t-video-feed { position: absolute; inset: 0; background: rgba(8,8,6,0.9); backdrop-filter: blur(4px); z-index: 70; display: flex; align-items: center; justify-content: center; animation: t-fade-in .18s ease-out; }
        .t-video-feed-inner { position: relative; width: min(94vw, 520px); max-height: 92vh; display: flex; flex-direction: column; align-items: center; }
        .t-video-close { position: absolute; top: -38px; right: 0; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.12); color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .t-video-close:hover { background: rgba(255,255,255,0.22); }
        .t-video-nav { position: absolute; top: 0; bottom: 0; width: 22%; z-index: 2; background: none; border: none; cursor: pointer; color: #fff; font-size: 40px; line-height: 1; opacity: 0.7; }
        .t-video-nav:hover { opacity: 1; }
        .t-video-nav:disabled { opacity: 0; cursor: default; }
        .t-video-nav--prev { left: -56px; text-align: right; }
        .t-video-nav--next { right: -56px; text-align: left; }
        .t-video-stage { width: 100%; border-radius: 16px; overflow: hidden; background: #000; box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
        .t-video-stage video { width: 100%; max-height: 74vh; display: block; background: #000; }
        .t-video-meta { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; color: #fff; }
        .t-video-author { font-size: 14px; font-weight: 600; color: var(--teal); cursor: pointer; }
        .t-video-author:hover { text-decoration: underline; }
        .t-video-cap { font-size: 13px; color: rgba(255,255,255,0.85); line-height: 1.45; }
        .t-tab-video { margin-left: auto; }
        .t-tab-video:hover { color: var(--teal); }

        .t-scroll-hint { text-align: center; font-size: 11.5px; color: var(--text-faint); margin-top: 18px; padding-bottom: 4px; animation: t-hint-bob 1.6s ease-in-out infinite; }
        .t-scroll-end { text-align: center; font-size: 11.5px; color: var(--text-faint); margin-top: 18px; padding-bottom: 4px; }
        @keyframes t-hint-bob { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 1; transform: translateY(3px); } }

        /* Post detail modal */
        .t-modal-backdrop { position: absolute; inset: 0; background: rgba(10,10,7,0.72); backdrop-filter: blur(3px); z-index: 40; display: flex; align-items: flex-end; justify-content: center; }
        .t-modal { background: var(--card); border: 1px solid var(--border); border-radius: 22px 22px 0 0; width: 100%; max-width: 640px; max-height: 82%; overflow-y: auto; padding: 18px 20px 22px; animation: t-modal-in .2s ease-out; }
        @keyframes t-modal-in { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .t-modal-close { position: sticky; top: 0; display: flex; justify-content: flex-end; margin-bottom: 4px; }
        .t-modal-close button { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .t-modal-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .t-follow-btn { display: flex; align-items: center; gap: 5px; margin-left: auto; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: 'Inter', sans-serif; }
        .t-follow-btn:hover { border-color: var(--gold); color: var(--text); }
        .t-follow-btn.following { background: var(--gold); border-color: var(--gold); color: #17170F; }
        .t-profile-actions { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 14px; }
        .t-profile-actions .t-follow-btn { margin-left: 0; }
        .t-block-btn { display: flex; align-items: center; gap: 5px; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 8px 16px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: 'Inter', sans-serif; }
        .t-block-btn:hover { border-color: #e4554f; color: #e4554f; }
        .t-block-btn.blocked { background: #e4554f; border-color: #e4554f; color: #F4FAF7; }
        .t-avatar { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #17170F; font-family: 'JetBrains Mono', monospace; }
        .t-modal-meta-text { font-size: 11.5px; color: var(--text-faint); }
        .t-modal-meta-author { color: var(--text-dim); font-weight: 600; }
        .t-modal-title { font-size: 18px; font-weight: 700; line-height: 1.35; margin: 0 0 8px; }
        .t-modal-body { font-size: 14px; color: var(--text-dim); line-height: 1.55; margin: 0 0 14px; }
        .t-modal-body p { margin: 0 0 10px; }
        .t-modal-body p:last-child { margin-bottom: 0; }
        .t-modal-body a { color: var(--teal); }
        .t-modal-media { width: 100%; max-height: 340px; border-radius: 14px; overflow: hidden; margin-bottom: 14px; background: var(--surface); }
        .t-modal-media img { width: 100%; max-height: 340px; object-fit: contain; display: block; }
        .t-modal-media video { width: 100%; max-height: 340px; display: block; }
        .t-modal-actions { display: flex; align-items: center; gap: 6px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 10px 0; margin-bottom: 14px; }
        .t-vote-group { display: flex; align-items: center; gap: 4px; background: var(--surface); border-radius: 999px; padding: 3px 8px; }
        .t-vote-btn { background: none; border: none; cursor: pointer; color: var(--text-faint); padding: 3px; border-radius: 6px; display: flex; transition: color .12s; }
        .t-vote-btn.up.active { color: var(--gold); }
        .t-vote-btn.down.active { color: var(--teal); }
        .t-score { font-size: 12.5px; font-weight: 700; min-width: 30px; text-align: center; }
        .t-action-btn { display: flex; align-items: center; gap: 5px; background: var(--surface); border: none; color: var(--text-dim); font-size: 12px; padding: 8px 12px; border-radius: 999px; cursor: pointer; transition: background .12s, color .12s; font-family: 'Inter', sans-serif; }
        .t-action-btn:hover { background: var(--surface-hover); color: var(--text); }
        .t-action-btn.saved { color: var(--gold); }
        .t-comments-head { font-size: 12.5px; font-weight: 700; color: var(--text-dim); margin-bottom: 10px; }
        .t-comment { display: flex; gap: 8px; font-size: 12.5px; margin-bottom: 10px; }
        .t-comment-author { color: var(--teal); font-weight: 600; flex-shrink: 0; }
        .t-comment-text { color: var(--text-dim); line-height: 1.4; }
        .t-comment-empty { font-size: 12px; color: var(--text-faint); font-style: italic; margin-bottom: 9px; }
        .t-comment-card { display: flex; gap: 10px; padding: 11px; border: 1px solid var(--border); border-radius: 14px; margin-bottom: 9px; background: var(--surface); }
        .t-comment-card.t-comment-reply { margin-left: 26px; background: var(--bg); }
        .t-comment-avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; font-family: 'Inter', sans-serif; }
        .t-comment-main { flex: 1; min-width: 0; }
        .t-comment-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; font-size: 13px; }
        .t-comment-author { color: var(--teal); font-weight: 600; cursor: pointer; }
        .t-comment-author:hover { text-decoration: underline; }
        .t-comment-reply-to { font-size: 11.5px; color: var(--text-faint); }
        .t-comment-time { font-size: 11.5px; color: var(--text-faint); }
        .t-comment-text { color: var(--text); line-height: 1.45; margin: 3px 0 7px; font-size: 13.5px; }
        .t-comment-actions { display: flex; align-items: center; gap: 14px; }
        .t-comment-like { display: inline-flex; align-items: center; gap: 5px; background: none; border: none; color: var(--text-faint); font-size: 12px; cursor: pointer; font-family: 'Inter', sans-serif; padding: 0; transition: color .12s; }
        .t-comment-like:hover { color: #e4554f; }
        .t-comment-like.liked { color: #e4554f; }
        .t-comment-reply-btn { background: none; border: none; color: var(--text-dim); font-size: 12px; cursor: pointer; font-family: 'Inter', sans-serif; padding: 0; transition: color .12s; }
        .t-comment-reply-btn:hover { color: var(--gold); }
        .t-comment-form { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
        .t-reply-chip { display: flex; align-items: center; gap: 7px; align-self: flex-start; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 5px 10px; font-size: 12px; color: var(--text-dim); }
        .t-reply-chip strong { color: var(--text); }
        .t-reply-chip-x { display: flex; align-items: center; justify-content: center; background: var(--surface-hover); border: none; color: var(--text-dim); border-radius: 50%; width: 18px; height: 18px; cursor: pointer; padding: 0; }
        .t-reply-chip-x:hover { color: #e4554f; }
        .t-comment-form-row { display: flex; gap: 6px; }
        .t-comment-form input { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 999px; padding: 8px 13px; font-size: 12.5px; outline: none; font-family: 'Inter', sans-serif; }
        .t-comment-form input:focus { border-color: var(--teal); }
        .t-comment-form button { background: var(--teal); border: none; color: #0F1A17; font-weight: 600; padding: 0 14px; border-radius: 999px; font-size: 12px; cursor: pointer; }

        /* Pages */
        .t-community-row { display: flex; align-items: center; gap: 12px; padding: 12px 8px; border-radius: 14px; transition: background .12s; margin-bottom: 2px; cursor: pointer; }
        .t-community-row:hover { background: var(--surface); }
        .t-community-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0; }
        .t-community-main { flex: 1; min-width: 0; }
        .t-community-name { display: flex; align-items: center; font-size: 14px; font-weight: 600; }
        .t-community-desc { font-size: 12px; color: var(--text-faint); margin-top: 2px; line-height: 1.35; }
        .t-community-members { font-size: 11px; color: var(--text-faint); margin-top: 4px; font-family: 'JetBrains Mono', monospace; }
        .t-join-btn { display: flex; align-items: center; gap: 5px; background: var(--gold); border: none; color: #17170F; font-weight: 600; font-size: 12px; padding: 7px 14px; border-radius: 999px; cursor: pointer; flex-shrink: 0; transition: background .15s, color .15s; }
        .t-join-btn.joined { background: var(--surface); color: var(--text-dim); border: 1px solid var(--border); }

        /* Interest onboarding screen on the "Страницы" tab */
        .t-interest-hero { background: linear-gradient(160deg, var(--surface), rgba(232,176,75,0.08)); border: 1px solid var(--border); border-radius: 18px; padding: 22px 16px; text-align: center; }
        .t-interest-hero-icon { font-size: 30px; margin-bottom: 8px; }
        .t-interest-hero-title { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .t-interest-hero-sub { font-size: 12.5px; color: var(--text-faint); line-height: 1.5; margin-bottom: 16px; }
        .t-interest-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 18px; }
        .t-interest-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--bg); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 14px; font-size: 12.5px; cursor: pointer; transition: border-color .12s, color .12s, background .12s; font-family: 'Inter', sans-serif; }
        .t-interest-chip:hover { border-color: var(--gold); color: var(--text); }
        .t-interest-chip.on { background: linear-gradient(150deg, var(--gold), var(--rust)); border-color: transparent; color: #17170F; font-weight: 600; }
        .t-interest-chip-icon { font-size: 15px; }
        .t-interest-actions { display: flex; justify-content: center; gap: 8px; }
        .t-interest-actions .t-btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; }
        .t-interest-actions .t-btn-ghost:hover { color: var(--text); border-color: var(--text-dim); }
        .t-interest-actions .t-btn-solid { background: var(--teal); border: none; color: #0F1A17; font-weight: 700; border-radius: 999px; padding: 8px 20px; font-size: 12.5px; cursor: pointer; }
        .t-interest-actions .t-btn-solid:disabled { opacity: 0.45; cursor: default; }

        /* Interest bar + filter chips above the pages list */
        .t-interest-bar { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .t-interest-bar-label { font-size: 11.5px; color: var(--text-faint); font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
        .t-interest-bar-empty { font-size: 12px; color: var(--text-faint); font-style: italic; }
        .t-interest-tag { font-size: 11.5px; background: rgba(232,176,75,0.12); border: 1px solid rgba(232,176,75,0.35); color: var(--gold); border-radius: 999px; padding: 3px 10px; }
        .t-interest-edit { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 5px 12px; font-size: 11.5px; cursor: pointer; transition: color .12s, border-color .12s; font-family: 'Inter', sans-serif; }
        .t-interest-edit:hover { color: var(--text); border-color: var(--gold); }
        .t-interest-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .t-filter-chip { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 5px 12px; font-size: 11.5px; cursor: pointer; transition: border-color .12s, color .12s; font-family: 'Inter', sans-serif; }
        .t-filter-chip:hover { border-color: var(--gold); color: var(--text); }
        .t-filter-chip.on { background: var(--gold); border-color: transparent; color: #17170F; font-weight: 600; }
        .t-community-tag { display: inline-block; margin-left: 8px; font-size: 10px; font-weight: 600; vertical-align: middle; background: rgba(78,205,196,0.14); border: 1px solid rgba(78,205,196,0.35); color: var(--teal); border-radius: 999px; padding: 2px 8px; }
        .t-create-page { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; margin-bottom: 10px; }
        .t-create-page input, .t-page-composer input { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 10px; padding: 9px 12px; font-size: 13px; outline: none; font-family: 'Inter', sans-serif; }
        .t-create-page input:focus, .t-page-composer input:focus, .t-page-composer textarea:focus { border-color: var(--teal); }
        .t-create-page textarea, .t-page-composer textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 10px; padding: 9px 12px; font-size: 12.5px; outline: none; resize: vertical; min-height: 54px; font-family: 'Inter', sans-serif; }
        .t-create-page-actions, .t-page-composer-actions { display: flex; justify-content: flex-end; gap: 8px; }
        .t-page-head { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .t-page-head-main { flex: 1; min-width: 0; }
        .t-page-title { font-size: 17px; font-weight: 700; font-family: 'Fraunces', serif; }
        .t-page-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
        .t-page-desc { font-size: 12.5px; color: var(--text-dim); line-height: 1.4; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; }
        .t-page-composer { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; margin-bottom: 6px; }
        .t-page-composer .ql-toolbar { background: var(--bg); border: 1px solid var(--border); border-radius: 10px 10px 0 0; border-bottom: none; padding: 6px 8px; }
        .t-page-composer .ql-container { border: 1px solid var(--border); border-radius: 0 0 10px 10px; background: var(--bg); font-family: 'Inter', sans-serif; font-size: 13px; }
        .t-page-composer .ql-editor { min-height: 72px; max-height: 240px; color: var(--text); padding: 9px 11px; }
        .t-page-composer .ql-editor.ql-blank::before { color: var(--text-faint); font-style: normal; }
        .t-page-composer .ql-toolbar .ql-stroke { stroke: var(--text-dim); }
        .t-page-composer .ql-toolbar .ql-fill { fill: var(--text-dim); }
        .t-page-composer .ql-toolbar button:hover .ql-stroke, .t-page-composer .ql-toolbar button.ql-active .ql-stroke { stroke: var(--teal); }
        .t-page-composer .ql-toolbar button:hover .ql-fill, .t-page-composer .ql-toolbar button.ql-active .ql-fill { fill: var(--teal); }
        .t-page-composer .ql-toolbar .ql-picker { color: var(--text-dim); }
        .t-page-composer .ql-editor p { margin: 0 0 8px; }
        .t-page-composer .ql-editor a { color: var(--teal); }
        .t-page-feed-label { font-size: 13px; font-weight: 600; color: var(--text-dim); margin: 12px 0 6px; }

        /* Clickable nicknames -> user profile */
        .t-nick-link { cursor: pointer; }
        .t-nick-link:hover { text-decoration: underline; }
        .t-card-nick { cursor: pointer; }
        .t-card-nick:hover { text-decoration: underline; }
        .t-comment-author { cursor: pointer; }
        .t-comment-author:hover { text-decoration: underline; }
        .t-avatar { cursor: pointer; }
        .t-thread-name { cursor: pointer; }
        .t-thread-name:hover { text-decoration: underline; }
        .t-profile-back-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .t-profile-bio { font-size: 12.5px; color: var(--text-dim); margin-top: 8px; max-width: 280px; line-height: 1.45; }

        /* Messages */
        .t-msgs-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .t-msgs-title { font-size: 17px; font-weight: 700; font-family: 'Fraunces', serif; }
        .t-new-msg-btn { display: flex; align-items: center; gap: 6px; background: var(--gold); color: #17170F; border: none; padding: 7px 13px; border-radius: 999px; font-weight: 600; font-size: 12.5px; cursor: pointer; transition: filter .12s; font-family: 'Inter', sans-serif; }
        .t-new-msg-btn:hover { filter: brightness(1.08); }
        .t-convo-row { display: flex; align-items: center; gap: 12px; padding: 12px 8px; border-radius: 14px; cursor: pointer; transition: background .12s; }
        .t-convo-row:hover { background: var(--surface); }
        .t-convo-avatar-wrap { position: relative; flex-shrink: 0; }
        .t-convo-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #17170F; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.25); }
        .t-online-dot { position: absolute; right: 0; bottom: 0; width: 11px; height: 11px; border-radius: 50%; background: #34c77b; border: 2.5px solid var(--bg); box-shadow: 0 0 0 1px rgba(52,199,123,0.45); }
        .t-convo-main { flex: 1; min-width: 0; }
        .t-convo-name { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .t-convo-preview { font-size: 12.5px; color: var(--text-faint); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px; }
        .t-convo-side { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
        .t-convo-time { font-size: 11px; color: var(--text-faint); flex-shrink: 0; }
        .t-convo-presence { font-size: 11px; color: var(--text-faint); max-width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-convo-presence.on { color: #34c77b; font-weight: 600; }
        .t-unread-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; box-shadow: 0 0 0 3px rgba(79,156,140,0.2); }
        .t-convo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; padding: 4px 0 12px; }
        .t-convo-card { display: flex; flex-direction: column; gap: 5px; background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 16px; cursor: pointer; transition: transform .12s, border-color .12s, box-shadow .12s; }
        .t-convo-card:hover { border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.16); }
        .t-convo-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; }
        .t-convo-card-name { font-size: 14.5px; font-weight: 700; display: flex; align-items: center; gap: 6px; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-convo-card-status { font-size: 11.5px; color: var(--text-faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-convo-card-status.on { color: #34c77b; font-weight: 600; }

        /* Thread (dialog) */
        .t-thread { display: flex; flex-direction: column; min-height: 100%; }
        .t-thread-head { display: flex; align-items: center; gap: 12px; padding: 2px 0 14px; }
        .t-back-btn { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: color .12s, border-color .12s, transform .12s; }
        .t-back-btn:hover { color: var(--text); border-color: var(--gold); transform: translateX(-1px); }
        .t-thread-peer-avatar { position: relative; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: #17170F; flex-shrink: 0; cursor: pointer; box-shadow: 0 0 0 3px var(--surface), 0 0 0 4px rgba(79,156,140,0.35), 0 6px 14px rgba(0,0,0,0.25); transition: transform .12s; }
        .t-thread-peer-avatar:hover { transform: scale(1.05); }
        .t-thread-peer { flex: 1; min-width: 0; }
        .t-thread-name { font-size: 16px; font-weight: 600; cursor: pointer; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-thread-name:hover { text-decoration: underline; }
        .t-thread-status { font-size: 11.5px; color: var(--text-faint); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-thread-status.on { color: #34c77b; font-weight: 600; }
        .t-thread-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); margin: 0 0 16px; }
        .t-thread-body { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .t-msg-block { display: flex; align-items: flex-end; gap: 8px; }
        .t-msg-block.grouped { margin-top: 2px; }
        .t-msg-block.you { justify-content: flex-end; }
        .t-msg-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #17170F; margin-bottom: 2px; }
        .t-msg-col { max-width: 78%; min-width: 0; position: relative; display: flex; flex-direction: column; }
        .t-msg-block.you .t-msg-col { align-items: flex-end; }
        .t-bubble { padding: 10px 14px; border-radius: 18px; font-size: 13.5px; line-height: 1.45; cursor: pointer; word-break: break-word; box-shadow: 0 2px 8px rgba(0,0,0,0.18); animation: t-bubble-in .18s cubic-bezier(.2,.7,.3,1); }
        @keyframes t-bubble-in { from { opacity: 0; transform: translateY(6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .t-msg-block.them .t-bubble { background: var(--surface); border: 1px solid var(--border); color: var(--text); border-bottom-left-radius: 6px; }
        .t-msg-block.you .t-bubble { background: linear-gradient(135deg, var(--gold), var(--rust)); color: #F4FAF7; border-bottom-right-radius: 6px; }
        .t-msg-block.grouped.them .t-bubble { border-top-left-radius: 6px; }
        .t-msg-block.grouped.you .t-bubble { border-top-right-radius: 6px; }
        .t-msg-block.last .t-bubble { border-top-left-radius: 18px; border-top-right-radius: 18px; }
        .t-bubble-time { display: block; font-size: 10px; line-height: 1; margin-top: 4px; text-align: right; letter-spacing: 0.01em; }
        .t-msg-block.them .t-bubble-time { color: var(--text-faint); }
        .t-msg-block.you .t-bubble-time { color: rgba(244,250,247,0.8); }
        .t-reaction-badge { position: absolute; bottom: -8px; display: flex; align-items: center; justify-content: center; min-width: 22px; height: 22px; border-radius: 50%; background: var(--card); border: 1px solid var(--border); font-size: 11px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.4); padding: 0 4px; z-index: 2; }
        .t-msg-block.them .t-reaction-badge { left: 8px; }
        .t-msg-block.you .t-reaction-badge { right: 8px; }
        .t-reaction-picker { position: absolute; top: -42px; display: flex; gap: 2px; background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 4px 5px; box-shadow: 0 6px 16px rgba(0,0,0,0.4); animation: t-pop-in .12s ease-out; z-index: 6; }
        .t-reaction-picker.them { left: 0; }
        .t-reaction-picker.you { right: 0; }
        .t-reaction-opt { background: none; border: none; font-size: 16px; padding: 3px 5px; border-radius: 8px; cursor: pointer; transition: transform .1s, background .1s; line-height: 1; }
        .t-reaction-opt:hover { background: var(--surface-hover); transform: scale(1.2); }
        .t-reaction-opt.active { background: var(--surface-hover); }
        @keyframes t-pop-in { from { opacity: 0; transform: translateY(4px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .t-thread-empty { text-align: center; padding: 44px 20px 20px; }
        .t-thread-empty-mark { font-size: 30px; margin-bottom: 10px; }
        .t-thread-empty-title { font-size: 15px; font-weight: 700; font-family: 'Fraunces', serif; }
        .t-thread-empty-sub { font-size: 12.5px; color: var(--text-faint); margin-top: 4px; }
        .t-thread-footer { position: sticky; bottom: -1px; background: linear-gradient(180deg, rgba(20,20,15,0), var(--bg) 32%); padding-top: 10px; margin-top: 4px; }
        .t-thread-blocked { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 14px; margin-bottom: 10px; border-radius: 12px; background: rgba(228,85,79,0.12); border: 1px solid rgba(228,85,79,0.35); color: #e4554f; font-size: 12.5px; font-weight: 600; }
        .t-thread-input-disabled { opacity: 0.55; }
        .t-thread-input-disabled input { cursor: default; }
        .t-convo-blocked { display: inline-flex; color: #e4554f; margin-left: 2px; vertical-align: middle; }
        .t-quick-replies { display: flex; gap: 7px; overflow-x: auto; padding: 4px 0 10px; scrollbar-width: none; }
        .t-quick-replies::-webkit-scrollbar { display: none; }
        .t-quick-chip { flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); font-size: 12px; padding: 7px 13px; border-radius: 999px; cursor: pointer; white-space: nowrap; transition: background .12s, color .12s, border-color .12s, transform .12s; font-family: 'Inter', sans-serif; }
        .t-quick-chip:hover { background: var(--surface-hover); color: var(--text); border-color: var(--teal); transform: translateY(-1px); }
        .t-thread-input { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 6px; transition: border-color .15s, box-shadow .15s; }
        .t-thread-input:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(79,156,140,0.16); }
        .t-thread-input input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 13.5px; padding: 8px 4px 8px 0; min-width: 0; font-family: 'Inter', sans-serif; }
        .t-thread-input input::placeholder { color: var(--text-faint); }
        .t-thread-input button { background: linear-gradient(135deg, var(--gold), var(--rust)); border: none; color: #F4FAF7; border-radius: 999px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: transform .12s, filter .12s, opacity .12s; }
        .t-thread-input button:hover:not(:disabled) { transform: scale(1.06); filter: brightness(1.1); }
        .t-thread-input button:active:not(:disabled) { transform: scale(0.94); }
        .t-thread-input button:disabled { opacity: 0.4; cursor: default; }
        .t-thread-input .t-mic-btn { width: 38px; background: linear-gradient(135deg, var(--teal), var(--teal-dark, #2a7a6e)); }
        .t-thread-input .t-voice-cancel { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); width: 34px; height: 34px; font-size: 14px; line-height: 1; }
        .t-thread-input .t-voice-stop { background: linear-gradient(135deg, #e4554f, #c0392b); width: 38px; }
        .t-voice-timer { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--text-dim); font-size: 13.5px; font-weight: 600; letter-spacing: 0.02em; font-variant-numeric: tabular-nums; }
        .t-voice-dot { width: 9px; height: 9px; border-radius: 50%; background: #e4554f; animation: t-voice-pulse 1.2s ease-in-out infinite; }
        @keyframes t-voice-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.8); } }
        .t-voice { display: flex; align-items: center; gap: 8px; min-width: 180px; }
        .t-voice-play { border: none; border-radius: 999px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: transform .12s, filter .12s; background: transparent; padding: 0; }
        .t-voice-play:hover { transform: scale(1.1); }
        .t-msg-block.you .t-voice-play { background: rgba(244,250,247,0.2); color: #F4FAF7; }
        .t-msg-block.them .t-voice-play { background: var(--gold); color: #F4FAF7; }
        .t-voice-track { flex: 1; height: 4px; border-radius: 999px; background: rgba(127,127,127,0.25); overflow: hidden; }
        .t-voice-track span { display: block; height: 100%; width: 34%; border-radius: 999px; background: var(--gold); }
        .t-msg-block.you .t-voice-track span { background: #F4FAF7; }
        .t-voice-dur { font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }

        /* Notifications */
        .t-notif-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 8px; border-radius: 14px; margin-bottom: 4px; }
        .t-notif-row.unread { background: var(--surface); }
        .t-notif-icon { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .t-notif-text { font-size: 13px; color: var(--text-dim); line-height: 1.4; }
        .t-notif-time { font-size: 11px; color: var(--text-faint); margin-top: 3px; }
        .t-notif-empty { padding: 14px 8px 10px; }
        .t-notif-empty-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .t-notif-empty-sub { font-size: 13px; color: var(--text-faint); line-height: 1.5; margin-bottom: 14px; }

        /* Profile */
        .t-profile-head { display: flex; flex-direction: column; align-items: center; padding: 10px 0 22px; text-align: center; }
        .t-profile-avatar { width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(150deg, var(--gold), var(--rust)); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; color: #17170F; font-family: 'Fraunces', serif; margin-bottom: 12px; }
        .t-profile-name { font-size: 18px; font-weight: 700; }
        .t-profile-name-btn { background: none; border: none; color: var(--text); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; padding: 0; margin: 0; transition: color .12s; }
        .t-profile-name-btn:hover { color: var(--teal); }
        .t-profile-tag { font-size: 12.5px; color: var(--text-faint); margin-top: 2px; }
        .t-profile-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 22px; margin-top: 16px; }
        .t-profile-tabs { display: flex; gap: 8px; margin-bottom: 16px; }
        .t-profile-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 12px; padding: 9px 12px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background .15s, color .15s, border-color .15s; }
        .t-profile-tab:hover { color: var(--text); border-color: var(--gold); }
        .t-profile-tab.active { background: var(--gold); color: #17170F; border-color: var(--gold); }
        .t-tab-label { white-space: nowrap; }
        .t-tab-count { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: rgba(255,255,255,0.08); color: var(--text-dim); font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .t-profile-tab.active .t-tab-count { background: rgba(0,0,0,0.18); color: #17170F; }
        .t-stat { text-align: center; }
        .t-stat-num { font-size: 16px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .t-stat-label { font-size: 11px; color: var(--text-faint); margin-top: 2px; }
        .t-profile-edit { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px 16px; margin-bottom: 22px; }
        .t-field-label { display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 6px; }
        .t-profile-edit .t-input { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 12px; padding: 10px 13px; font-size: 13px; outline: none; font-family: 'Inter', sans-serif; }
        .t-profile-edit .t-input:focus { border-color: var(--teal); }
        .t-profile-edit .t-textarea { min-height: 84px; resize: vertical; line-height: 1.45; }
        .t-valid { font-size: 11.5px; margin-top: 5px; }
        .t-valid.ok { color: #6FC49A; }
        .t-valid.taken, .t-valid.invalid { color: #E4775F; }
        .t-valid.checking { color: var(--text-faint); }
        .t-profile-edit-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
        .t-profile-edit-actions .t-btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; }
        .t-profile-edit-actions .t-btn-ghost:hover { color: var(--text); border-color: var(--text-dim); }
        .t-profile-edit-actions .t-btn-solid { background: var(--teal); border: none; color: #0F1A17; font-weight: 700; border-radius: 999px; padding: 8px 20px; font-size: 12.5px; cursor: pointer; }
        .t-profile-edit-actions .t-btn-solid:disabled { opacity: 0.45; cursor: default; }

        /* Add-story composer on the profile page */
        .t-story-add-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; background: linear-gradient(150deg, var(--gold), var(--rust)); border: none; color: #17170F; font-weight: 700; border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; font-family: 'Inter', sans-serif; transition: transform .15s, filter .15s; }
        .t-story-add-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
        .t-story-composer .t-input { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 12px; padding: 10px 13px; font-size: 13px; outline: none; font-family: 'Inter', sans-serif; margin-bottom: 4px; }
        .t-story-composer .t-input:focus { border-color: var(--teal); }
        .t-story-composer select.t-input { appearance: none; }
        .t-story-composer .t-media-preview { max-height: 260px; }

        /* Profile settings (gear) + theme toggle */
        .t-profile-wrap { position: relative; }
        .t-settings-btn { position: absolute; top: 2px; right: 2px; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 5; transition: color .15s, border-color .15s; }
        .t-settings-btn:hover { color: var(--text); border-color: var(--gold); }
        .t-settings-title { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; margin: 2px 0 14px; }
        .t-settings { max-width: 440px; }
        .t-settings-group { display: flex; flex-direction: column; }
        .t-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 2px; border-bottom: 1px solid var(--border); }
        .t-settings-row:last-child { border-bottom: none; }
        .t-settings-row-title { font-size: 14px; font-weight: 600; }
        .t-settings-row-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
        .t-settings-link { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; font-family: 'Inter', sans-serif; transition: color .12s, border-color .12s; }
        .t-settings-link:hover { color: var(--text); border-color: var(--gold); }
        .t-bl-row { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--border); }
        .t-bl-row:last-child { border-bottom: none; }
        .t-bl-info { flex: 1; min-width: 0; }
        .t-bl-name { font-size: 13.5px; font-weight: 600; }
        .t-bl-handle { font-size: 12px; color: var(--text-faint); margin-top: 1px; }
        .t-bl-unblock { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; font-family: 'Inter', sans-serif; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-bl-unblock:hover { color: #e4554f; border-color: #e4554f; }
        .t-acc-row { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--border); }
        .t-acc-row:last-child { border-bottom: none; }
        .t-acc-actions { display: flex; gap: 7px; flex-shrink: 0; }
        .t-acc-switch { background: var(--gold); border: 1px solid var(--gold); color: #17170F; border-radius: 999px; padding: 7px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity .12s; }
        .t-acc-switch:hover { opacity: .88; }
        .t-acc-remove { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; font-family: 'Inter', sans-serif; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-acc-remove:hover { color: #e4554f; border-color: #e4554f; }
        .t-acc-current { display: inline-block; margin-left: 8px; font-size: 10.5px; font-weight: 600; color: var(--teal); border: 1px solid var(--teal); border-radius: 999px; padding: 1px 7px; vertical-align: middle; }
        .t-acc-add { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; margin-top: 14px; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 999px; padding: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: border-color .12s, color .12s; }
        .t-acc-add:hover { border-color: var(--gold); color: var(--gold); }
        .t-theme-toggle { display: flex; gap: 3px; background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 3px; flex-shrink: 0; }
        .t-theme-toggle button { display: flex; align-items: center; gap: 5px; background: none; border: none; color: var(--text-faint); padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: background .15s, color .15s; }
        .t-theme-toggle button.active { background: var(--gold); color: #17170F; }
        .t-language-toggle button { min-width: 44px; justify-content: center; }
        .t-logout-btn { display: flex; align-items: center; gap: 6px; background: none; border: 1px solid var(--border); color: #E0604E; padding: 8px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; flex-shrink: 0; transition: border-color .15s, background .15s; }
        .t-logout-btn:hover { border-color: #E0604E; background: rgba(224,96,78,0.1); }
        .t-section-label { font-size: 12px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }

        /* Bottom nav */
        .t-bottom-nav { flex-shrink: 0; background: rgba(20,20,15,0.55); backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4); border-top: 1px solid rgba(255,255,255,0.06); padding: 14px 24px 18px; display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; }
        .tap-root.light .t-bottom-nav { background: rgba(247,245,236,0.6); border-top: 1px solid rgba(0,0,0,0.05); }
        .t-fab { background: linear-gradient(150deg, var(--gold), var(--rust)); border: none; color: #17170F; width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; box-shadow: 0 4px 14px rgba(232,176,75,0.35), 0 2px 6px rgba(0,0,0,0.3); transition: transform .15s, filter .15s; }
        .t-fab:hover { transform: translateY(-2px) scale(1.04); filter: brightness(1.06); }
        .t-fab.open { background: var(--surface); color: var(--text-dim); border: 1px solid var(--border); box-shadow: none; }
        .t-tab-pill { position: relative; display: flex; align-items: center; gap: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 7px; overflow: hidden; }
        .t-tab-slider { position: absolute; top: 8px; bottom: 8px; left: 0; border-radius: 999px; background: linear-gradient(150deg, var(--gold), var(--rust)); box-shadow: 0 2px 10px rgba(232,176,75,0.4); pointer-events: none; will-change: transform, width; z-index: 0; transition: transform .28s cubic-bezier(0.22, 1, 0.36, 1), width .28s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-tab-btn { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; background: none; border: none; color: var(--text-faint); cursor: pointer; padding: 10px 16px; border-radius: 999px; transition: color .15s; font-family: 'Inter', sans-serif; }
        .t-tab-btn.active { color: #17170F; }
        .t-tab-badge { position: absolute; top: 4px; right: 12px; width: 8px; height: 8px; border-radius: 50%; background: var(--rust); border: 1.5px solid var(--surface); transition: border-color .15s; }
        .t-tab-btn.active .t-tab-badge { border-color: #17170F; }
        body.t-dragging, body.t-dragging * { cursor: grabbing !important; user-select: none; -webkit-user-select: none; }

        /* Toast notifications (bottom-right, auto-dismiss with timeline) */
        .t-toast-stack { position: fixed; right: 16px; bottom: 112px; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; z-index: 80; pointer-events: none; }
        .t-toast { position: relative; max-width: 300px; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 12px; padding: 11px 14px 15px; font-size: 12.5px; line-height: 1.45; box-shadow: 0 10px 30px rgba(0,0,0,0.45); overflow: hidden; pointer-events: auto; cursor: pointer; animation: t-toast-in 0.24s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-toast.leaving { animation: t-toast-out 0.26s ease-in forwards; }
        .t-toast.error { border-color: rgba(224,96,78,0.55); }
        .t-toast.success { border-color: rgba(111,196,154,0.55); }
        .t-toast.info { border-color: rgba(91,155,255,0.55); }
        .t-toast-time { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: #5B9BFF; animation-name: t-toast-shrink; animation-timing-function: linear; animation-fill-mode: forwards; }
        .t-toast.error .t-toast-time { background: #E0604E; }
        .t-toast.success .t-toast-time { background: #6FC49A; }
        @keyframes t-toast-in { from { opacity: 0; transform: translateX(110%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes t-toast-out { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(110%); } }
        @keyframes t-toast-shrink { from { width: 100%; } to { width: 0%; } }

        @media (max-width: 480px) {
          .t-header { padding: 12px 14px; } .t-body { padding: 14px 14px 16px; }
          .t-bottom-nav { padding: 10px 12px 14px; gap: 8px; }
          .t-grid { grid-template-columns: repeat(2, 1fr); }
          .t-tab-btn { padding: 8px 11px; }
          .t-fab { width: 44px; height: 44px; }
          .t-profile-stats { gap: 16px; }
        }

        .t-boundary { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .t-boundary-card { max-width: 360px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px 24px; }
        .t-boundary-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
        .t-boundary-sub { font-size: 13px; color: var(--text-faint); line-height: 1.5; margin-bottom: 16px; }
        .t-boundary-btn { background: var(--gold); color: #17170F; border: none; border-radius: 999px; padding: 9px 18px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .t-boundary-btn:hover { filter: brightness(1.05); }

        /* Tab switching: panes slide in from the sides — forward from the
           right, backward from the left. Far jumps travel further, run
           faster and overshoot past the target like a quick page flip.
           --tx-in (start offset) and --tx-over (past-0 overshoot) are set
           per-switch from JS based on the tab distance. */
        .t-tab-pane { min-height: 100%; }
        @keyframes t-tab-in-fwd {
          0% { opacity: 0; transform: translateX(var(--tx-in, 120px)); }
          72% { opacity: 1; transform: translateX(var(--tx-over, -16px)); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes t-tab-in-back {
          0% { opacity: 0; transform: translateX(var(--tx-in, -120px)); }
          72% { opacity: 1; transform: translateX(var(--tx-over, 16px)); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .t-tab-pane.fwd { animation: t-tab-in-fwd 0.28s ease-out; }
        .t-tab-pane.back { animation: t-tab-in-back 0.28s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .t-tab-pane.fwd, .t-tab-pane.back { animation: none; }
        }
      `}</style>

      <div className="t-header">
        <div className="t-header-row">
          <div className="t-brand" onClick={() => { openTab("home"); setQuery(""); }} title="На главную" role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") { openTab("home"); setQuery(""); } }}>
            <span className="t-brand-name">tap</span>
          </div>
          <div className="t-search">
            <Search size={15} color="#6C6E60" />
            <input
              placeholder="Поиск людей и постов"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = query.trim();
                  if (q.length >= 2) saveRecentSearch(q);
                  e.currentTarget.blur();
                } else if (e.key === "Escape") {
                  setSearchFocused(false);
                }
              }}
            />
            {query && (
              <button className="t-search-clear" onClick={() => setQuery("")} aria-label="Очистить поиск" title="Очистить">
                <X size={13} />
              </button>
            )}
            {searchFocused && !query.trim() && recentSearches.length > 0 && (
              <div className="t-search-recent">
                <div className="t-search-recent-head">
                  <span className="t-search-recent-title">Недавние запросы</span>
                  <button className="t-search-recent-clear" onClick={clearRecentSearches}>Очистить</button>
                </div>
                {recentSearches.map((rq) => (
                  <div key={rq} className="t-search-recent-item" onClick={() => { setQuery(rq); saveRecentSearch(rq); setSearchFocused(false); }}>
                    <Clock size={13} />
                    <span className="t-search-recent-text">{rq}</span>
                    <button className="t-search-recent-x" onClick={(e) => { e.stopPropagation(); removeRecentSearch(rq); }} aria-label="Удалить запрос" title="Удалить">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="t-body" onScroll={handleBodyScroll}>
        {loading ? (
          <div className="t-empty" style={{ paddingTop: 120 }}>Loading…</div>
        ) : apiError ? (
          <div className="t-empty">
            Ошибка загрузки: {apiError}
            <div style={{ marginTop: 12 }}>
              <button className="t-boundary-btn" onClick={() => window.location.reload()}>Повторить</button>
            </div>
          </div>
        ) : (
          <React.Fragment>
          <div className={"t-tab-pane" + (tabAnim.dir >= 0 ? " fwd" : " back")} key={tabAnim.n} style={searchActive ? { display: "none" } : paneAnimStyle}>
          {tab === "home" && (
            <React.Fragment>
              {composerOpen && (
                <form className="t-composer" onSubmit={submitPost}>
                  <div className="t-composer-head">Новый пост</div>
                  {window.Quill ? (
                    <div className="t-quill-editor" ref={composerEditorRef} />
                  ) : (
                    <textarea placeholder="Добавьте описание (необязательно)" value={composer.body} onChange={(e) => setComposer((c) => ({ ...c, body: e.target.value }))} />
                  )}

                  {composer.mediaUrl ? (
                    <div className="t-media-preview">
                      {composer.mediaType === "video" ? (
                        <video src={composer.mediaUrl} controls />
                      ) : (
                        <img src={composer.mediaUrl} alt="" />
                      )}
                      <button type="button" className="t-media-remove" onClick={clearMedia}><X size={14} /></button>
                    </div>
                  ) : (
                    <label className="t-media-btn">
                      <Image size={15} />
                      Фото или видео
                      <input type="file" accept="image/*,video/*" onChange={handleMediaFile} hidden />
                    </label>
                  )}

                  <div className="t-composer-actions">
                    <button type="button" className="t-btn-ghost" onClick={() => setComposerOpen(false)}>Отмена</button>
                    <button type="submit" className="t-btn-solid" disabled={!stripHtml(composer.body).trim() && !composer.mediaUrl}>Опубликовать</button>
                  </div>
                </form>
              )}

              <div className="t-refresh-row">
                <span className="t-refresh-time">{lastUpdated ? "Обновлено " + lastUpdated.toLocaleTimeString() : "Лента обновляется автоматически"}</span>
                <button className="t-refresh-btn" onClick={refreshFeed} disabled={refreshing}>
                  <RefreshCw size={13} />{refreshing ? "Обновление..." : "Обновить"}
                </button>
              </div>

              <div className="t-sorts">
                {SORTS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button key={s.id} className={"t-sort-btn" + (sort === s.id ? " active" : "")} onClick={() => setSort(s.id)}>
                      <Icon size={13} />{s.label}
                    </button>
                  );
                })}
              </div>

              {pagePosts.length === 0 && <div className="t-empty">Лента пуста — напишите первый пост</div>}

              <div className="t-grid">
                {pagePosts.map((p) => renderCard(p))}
              </div>

              {hasMore && <div className="t-scroll-hint">Листайте дальше</div>}
              {!hasMore && filtered.length > 0 && <div className="t-scroll-end">Вы всё прочитали</div>}
            </React.Fragment>
          )}

          {tab === "pages" && !openPageId && (
            <div>
              <div className="t-msgs-head">
                <div className="t-msgs-title">Страницы</div>
              </div>

              {createOpen && (
                <form className="t-create-page" onSubmit={submitNewPage}>
                  <input
                    placeholder="Название страницы"
                    value={newPage.name}
                    onChange={(e) => setNewPage((p) => ({ ...p, name: e.target.value }))}
                    maxLength={160}
                    required
                  />
                  <textarea
                    placeholder="О чём эта страница? (необязательно)"
                    value={newPage.desc}
                    onChange={(e) => setNewPage((p) => ({ ...p, desc: e.target.value }))}
                  />
                  <div className="t-create-page-actions">
                    <button type="button" className="t-btn-ghost" onClick={() => setCreateOpen(false)}>Отмена</button>
                    <button type="submit" className="t-btn-solid" disabled={!newPage.name.trim()}>Создать</button>
                  </div>
                </form>
              )}

              {(() => {
                const showInterestPicker = interestPickerOpen || (!interestsSeen && interests.length === 0);
                if (showInterestPicker) {
                  return (
                    <div className="t-interest-hero">
                      <div className="t-interest-hero-icon">✨</div>
                      <div className="t-interest-hero-title">Что вам интересно?</div>
                      <div className="t-interest-hero-sub">Выберите темы — и мы подберём страницы по вашим интересам</div>
                      <div className="t-interest-grid">
                        {INTERESTS.map((it) => {
                          const on = draftInterests.includes(it.id);
                          return (
                            <button key={it.id} className={"t-interest-chip" + (on ? " on" : "")} onClick={() => toggleDraftInterest(it.id)}>
                              <span className="t-interest-chip-icon">{it.icon}</span>
                              {it.id}
                              {on && <Check size={13} />}
                            </button>
                          );
                        })}
                      </div>
                      <div className="t-interest-actions">
                        <button className="t-btn-ghost" onClick={skipInterestPicker} disabled={interestSaving}>Пропустить</button>
                        <button className="t-btn-solid" onClick={() => saveInterests(draftInterests)} disabled={interestSaving || draftInterests.length === 0}>
                          {interestSaving ? "Сохраняем…" : "Продолжить"}
                        </button>
                      </div>
                    </div>
                  );
                }
                const matched = pages.filter((c) => c.interest && interests.includes(c.interest));
                const other = pages.filter((c) => !(c.interest && interests.includes(c.interest)));
                const sortedPages = interests.length ? [...matched, ...other] : pages;
                const visiblePages = pageFilter === "all" ? sortedPages : sortedPages.filter((c) => c.interest === pageFilter);
                return (
                  <React.Fragment>
                    <div className="t-interest-bar">
                      <span className="t-interest-bar-label">Мои интересы:</span>
                      {interests.length === 0
                        ? <span className="t-interest-bar-empty">не выбраны</span>
                        : interests.map((id) => <span key={id} className="t-interest-tag">{id}</span>)}
                      <button className="t-interest-edit" onClick={openInterestPicker}><Settings size={12} />Изменить</button>
                    </div>
                    {interests.length > 0 && (
                      <div className="t-interest-filters">
                        <button className={"t-filter-chip" + (pageFilter === "all" ? " on" : "")} onClick={() => setPageFilter("all")}>Все</button>
                        {interests.map((id) => (
                          <button key={id} className={"t-filter-chip" + (pageFilter === id ? " on" : "")} onClick={() => setPageFilter(id)}>{id}</button>
                        ))}
                      </div>
                    )}
                    {pages.length === 0 && <div className="t-empty">Страниц пока нет — создайте первую</div>}
                    {visiblePages.map((c) => (
                      <div key={c.id} className="t-community-row" onClick={() => openPage(c.id)}>
                        <div className="t-community-icon" style={{ background: solidFor(c.name) }}>{c.icon}</div>
                        <div className="t-community-main">
                          <div className="t-community-name">
                            {c.name}
                            {c.interest && <span className="t-community-tag">{c.interest}</span>}
                          </div>
                          <div className="t-community-desc">{c.desc}</div>
                          <div className="t-community-members">{c.members.toLocaleString()} подписчиков</div>
                        </div>
                        <button
                          className={"t-join-btn" + (c.joined ? " joined" : "")}
                          onClick={(e) => { e.stopPropagation(); toggleJoin(c.id); }}
                        >
                          {c.joined ? <React.Fragment><Check size={13} />Вы подписаны</React.Fragment> : "Подписаться"}
                        </button>
                      </div>
                    ))}
                  </React.Fragment>
                );
              })()}
            </div>
          )}

          {tab === "pages" && openPageId && (
            <div>
              <div className="t-page-head">
                <button className="t-back-btn" onClick={closePage}><ArrowLeft size={16} /></button>
                {pageInfo && (
                  <React.Fragment>
                    <div className="t-community-icon" style={{ background: solidFor(pageInfo.name) }}>{pageInfo.icon}</div>
                    <div className="t-page-head-main">
                      <div className="t-page-title">{pageInfo.name}</div>
                      <div className="t-page-sub">
                        {pageInfo.members.toLocaleString()} подписчиков
                        {pageInfo.owner && pageInfo.owner.name ? (
                          <React.Fragment> · Администратор: <span className="t-nick-link" onClick={() => openProfile(pageInfo.owner.id)}>{pageInfo.owner.name} {pageInfo.owner.handle}</span></React.Fragment>
                        ) : ""}
                      </div>
                    </div>
                    <button
                      className={"t-join-btn" + (pageInfo.joined ? " joined" : "")}
                      onClick={() => toggleJoin(pageInfo.id)}
                    >
                      {pageInfo.joined ? <React.Fragment><Check size={13} />Вы подписаны</React.Fragment> : "Подписаться"}
                    </button>
                  </React.Fragment>
                )}
              </div>

              {pageInfo && (
                <div className="t-page-desc">{pageInfo.desc}</div>
              )}

              {pageComposerOpen && (
                <form className="t-page-composer" onSubmit={submitPagePost}>
                  <input
                    placeholder="Новый пост на страницу"
                    value={pageDraft.title}
                    onChange={(e) => setPageDraft((d) => ({ ...d, title: e.target.value }))}
                    maxLength={140}
                  />
                  {window.Quill ? (
                    <div className="t-page-quill-editor" ref={pageEditorRef} />
                  ) : (
                    <textarea
                      placeholder="Добавьте описание (необязательно)"
                      value={pageDraft.body}
                      onChange={(e) => setPageDraft((d) => ({ ...d, body: e.target.value }))}
                    />
                  )}
                  <div className="t-page-composer-actions">
                    <button type="button" className="t-btn-ghost" onClick={() => setPageComposerOpen(false)}>Отмена</button>
                    <button type="submit" className="t-btn-solid" disabled={!pageDraft.title.trim()}>
                      <PenLine size={13} />Опубликовать
                    </button>
                  </div>
                </form>
              )}

              <div className="t-page-feed-label">Лента страницы</div>
              {pageLoading && <div className="t-empty">Загружаем страницу…</div>}
              {!pageLoading && pageFeed.length === 0 && <div className="t-empty">Здесь пока нет постов — станьте первым</div>}
              {!pageLoading && (
                <div className="t-grid">
                  {pageFeed.map((p) => renderCard(p))}
                </div>
              )}
            </div>
          )}

          {tab === "messages" && !openConvo_ && (
            <AppBoundary title="Ошибка в разделе сообщений">
            <div>
              <div className="t-msgs-head">
                <div className="t-msgs-title">Сообщения</div>
              </div>
              {showNewMsg ? (
                <div>
                  {userList.length === 0 ? (
                    <div className="t-empty">Никого нет — зарегистрируйте второго пользователя</div>
                  ) : (
                    <div className="t-convo-grid">
                      {userList.map((u) => {
                        const p = presenceInfo(u.lastSeen);
                        return (
                          <div key={u.id} className="t-convo-card" onClick={() => startChat(u.id)}>
                            <div className="t-convo-card-top">
                              <div className="t-convo-avatar-wrap">
                                <div className="t-convo-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                                {p.online && <span className="t-online-dot" />}
                              </div>
                              <div className="t-convo-time"><PenLine size={13} /></div>
                            </div>
                            <div className="t-convo-card-name">{u.name}</div>
                            <div className={"t-convo-card-status" + (p.online ? " on" : "")}>{p.label || "не в сети"}</div>
                            <div className="t-convo-preview">{u.handle}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="t-convo-grid">
                  {conversations.map((c) => {
                    const p = presenceInfo(c.lastSeen);
                    return (
                      <div key={c.id} className="t-convo-card" onClick={() => openConvo(c.id)}>
                        <div className="t-convo-card-top">
                          <div className="t-convo-avatar-wrap">
                            <div className="t-convo-avatar" style={{ background: solidFor(c.name) }}>{c.avatarInitials}</div>
                            {p.online && <span className="t-online-dot" />}
                          </div>
                          <div className="t-convo-side">
                            <div className="t-convo-time">{c.time}</div>
                            {c.blockedByMe && <span className="t-convo-blocked" title="Пользователь заблокирован"><Ban size={12} /></span>}
                          </div>
                        </div>
                        <div className="t-convo-card-name">{c.name}{c.unread && <span className="t-unread-dot" />}</div>
                        <div className={"t-convo-card-status" + (p.online ? " on" : "")}>{p.label || "не в сети"}</div>
                        <div className="t-convo-preview">{c.messages.length ? (c.e2ee ? "🔒 " : "") + c.messages[c.messages.length - 1].text : "Нет сообщений"}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            </AppBoundary>
          )}
          {tab === "messages" && openConvo_ && (
            <AppBoundary title="Ошибка в разделе сообщений">
            <div className="t-thread">
              <div className="t-thread-head">
                <button className="t-back-btn" onClick={() => { setOpenConvoId(null); setReactionPicker(null); }}><ArrowLeft size={16} /></button>
                <div className="t-thread-peer-avatar" style={{ background: solidFor(openConvo_.name) }} onClick={() => openProfile(openConvo_.peerUserId)}>{openConvo_.avatarInitials}
                  {presenceInfo(openConvo_.lastSeen).online && <span className="t-online-dot" />}
                </div>
                <div className="t-thread-peer">
                  <div className="t-thread-name tap-serif" onClick={() => openProfile(openConvo_.peerUserId)}>{openConvo_.name}</div>
                  <div className={"t-thread-status" + (presenceInfo(openConvo_.lastSeen).online ? " on" : "")}>{presenceInfo(openConvo_.lastSeen).label || (openConvo_.e2ee ? "🔒 Зашифровано" : "Открытый диалог")}</div>
                </div>
              </div>
              <div className="t-thread-divider" />
              <div className="t-thread-body">
                {openConvo_.messages.length === 0 && (
                  <div className="t-thread-empty">
                    <div className="t-thread-empty-mark">💬</div>
                    <div className="t-thread-empty-title">Пока нет сообщений</div>
                    <div className="t-thread-empty-sub">Напишите первым и поприветствуйте собеседника</div>
                  </div>
                )}
                {openConvo_.messages.map((m, i) => {
                  const prev = openConvo_.messages[i - 1];
                  const next = openConvo_.messages[i + 1];
                  const grouped = prev && prev.from === m.from;
                  const last = !(next && next.from === m.from);
                  return (
                    <div key={m.id != null ? m.id : i} className={"t-msg-block " + m.from + (grouped ? " grouped" : "") + (last ? " last" : "")}>
                      {m.from === "them" && !grouped && (
                        <div className="t-msg-avatar" style={{ background: solidFor(openConvo_.name) }}>{openConvo_.avatarInitials}</div>
                      )}
                      <div className="t-msg-col">
                        <div className="t-bubble" onClick={() => toggleReactionPicker(i)}>
                          {m.media && m.media.type && m.media.type.indexOf("audio") === 0 ? (
                            <span className="t-voice">
                              <button className={"t-voice-play " + m.from} onClick={(e) => { e.stopPropagation(); toggleVoicePlay(m); }}>
                                {voicePlayId === m.id ? <Pause size={13} /> : <Play size={13} />}
                              </button>
                              <span className="t-voice-track"><span /></span>
                              <span className="t-voice-dur">{fmtDur(voiceDurFromText(m.text))}</span>
                            </span>
                          ) : (
                            <>{m.text}</>
                          )}
                          <span className="t-bubble-time">{m.time}</span>
                        </div>
                        {m.reaction && (
                          <button className={"t-reaction-badge " + m.from} onClick={() => setReaction(i, m.reaction)}>{m.reaction}</button>
                        )}
                        {reactionPicker === i && (
                          <div className={"t-reaction-picker " + m.from}>
                            {REACTIONS.map((r) => (
                              <button key={r} className={"t-reaction-opt" + (m.reaction === r ? " active" : "")} onClick={() => setReaction(i, r)}>{r}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="t-thread-footer">
                {(openConvo_.blockedByMe || openConvo_.blockedMe) && (
                  <div className="t-thread-blocked">
                    <Ban size={14} />
                    {openConvo_.blockedByMe ? "Вы заблокировали этого пользователя" : "Пользователь вас заблокировал"}
                  </div>
                )}
                <div className="t-quick-replies">
                  {!openConvo_.blockedByMe && !openConvo_.blockedMe && suggestReplies(openConvo_).map((q, i) => (
                    <button key={i} className="t-quick-chip" onClick={() => sendMessage(q)}>{q}</button>
                  ))}
                </div>
                {(openConvo_.blockedByMe || openConvo_.blockedMe) ? (
                  <div className="t-thread-input t-thread-input-disabled">
                    <input placeholder="Сообщение" disabled />
                  </div>
                ) : (
                <div className="t-thread-input">
                  {recording ? (
                    <React.Fragment>
                      <button className="t-voice-cancel" onClick={cancelVoice}>✕</button>
                      <span className="t-voice-timer"><span className="t-voice-dot" />{fmtDur(recSec)}</span>
                      <button className="t-voice-stop" onClick={stopVoice}><Square size={15} /></button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <button className="t-mic-btn" onClick={startVoice} title="Голосовое сообщение"><Mic size={17} /></button>
                      <input placeholder="Сообщение" value={draftMsg} onChange={(e) => setConvoDraft(openConvoId, e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} />
                      <button onClick={() => sendMessage()} disabled={!draftMsg.trim()}><Send size={15} /></button>
                    </React.Fragment>
                  )}
                </div>
                )}
              </div>
            </div>
            </AppBoundary>
          )}

          {tab === "notifications" && (
            <div>
              {notifications.length === 0 ? (
                <div>
                  <div className="t-notif-empty">
                    <div className="t-notif-empty-title">Нету новых уведомлений.</div>
                    <div className="t-notif-empty-sub">Но вы можете подписаться на эти «страницы»:</div>
                  </div>
                  {pages.length === 0 && <div className="t-empty">Страниц пока нет — создайте первую</div>}
                  {pages.map((c) => (
                    <div key={c.id} className="t-community-row" onClick={() => openPage(c.id)}>
                      <div className="t-community-icon" style={{ background: solidFor(c.name) }}>{c.icon}</div>
                      <div className="t-community-main">
                        <div className="t-community-name">{c.name}</div>
                        <div className="t-community-desc">{c.desc}</div>
                        <div className="t-community-members">{c.members.toLocaleString()} подписчиков</div>
                      </div>
                      <button
                        className={"t-join-btn" + (c.joined ? " joined" : "")}
                        onClick={(e) => { e.stopPropagation(); toggleJoin(c.id); }}
                      >
                        {c.joined ? <React.Fragment><Check size={13} />Вы подписаны</React.Fragment> : "Подписаться"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = n.type === "upvote" ? Heart : n.type === "comment" ? MessageCircle : n.type === "post" ? PenLine : n.type === "repost" ? Repeat : UserPlus;
                  const color = n.type === "upvote" ? "var(--gold)" : n.type === "comment" ? "var(--teal)" : n.type === "repost" ? "var(--gold)" : "var(--rust)";
                  return (
                    <div key={n.id} className={"t-notif-row" + (n.unread ? " unread" : "")}>
                      <div className="t-notif-icon" style={{ background: "rgba(255,255,255,0.06)", color }}><Icon size={16} /></div>
                      <div>
                        <div className="t-notif-text">{n.text}</div>
                        <div className="t-notif-time">{n.time}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {tab === "profile" && !viewUserId && (
            <div className="t-profile-wrap">
              <button className="t-settings-btn" onClick={() => setSettingsOpen(true)} aria-label="Настройки">
                <Settings size={17} />
              </button>
              {!editOpen && (
                <div className="t-profile-head">
                  <div className="t-profile-avatar">{me.initials}</div>
                  <button className="t-profile-name t-profile-name-btn" onClick={openEdit}>
                    {me.name} <PenLine size={14} />
                  </button>
                  <div className="t-profile-tag">{me.handle}</div>
                  {me.bio && <div className="t-profile-bio">{me.bio}</div>}
                  <div className="t-profile-stats">
                    <div className="t-stat"><div className="t-stat-num tap-mono">{posts.filter((p) => p.isMine).length}</div><div className="t-stat-label">Посты</div></div>
                    <div className="t-stat"><div className="t-stat-num tap-mono">{me.observers || 0}</div><div className="t-stat-label">Наблюдатели</div></div>
                    <div className="t-stat"><div className="t-stat-num tap-mono">{me.following || 0}</div><div className="t-stat-label">Подписки</div></div>
                  </div>
                </div>
              )}
              {editOpen && (
                <form className="t-profile-edit" onSubmit={submitProfile}>
                  <div className="t-section-label">Настройки профиля</div>
                  <label className="t-field-label">Имя</label>
                  <input className="t-input" value={editForm.name} onChange={onEditName} maxLength={120} placeholder="Имя" />
                  {editCheck.name && (
                    <div className={"t-valid " + editCheck.name.status}>{editCheck.name.msg}</div>
                  )}
                  <label className="t-field-label">Ник</label>
                  <input className="t-input" value={editForm.handle} onChange={onEditHandle} maxLength={120} placeholder="@nickname" />
                  {editCheck.handle && (
                    <div className={"t-valid " + editCheck.handle.status}>{editCheck.handle.msg}</div>
                  )}
                  <label className="t-field-label">О себе</label>
                  <textarea className="t-input t-textarea" value={editForm.bio} onChange={(e) => setEditForm((f) => ({ ...f, bio: e.target.value }))} maxLength={500} placeholder="Несколько слов о себе" />
                  <div className="t-profile-edit-actions">
                    <button type="button" className="t-btn-ghost" onClick={cancelEdit}>Отмена</button>
                    <button type="submit" className="t-btn-solid" disabled={editSaving || !editCanSave}>
                      {editSaving ? "Сохраняем…" : "Сохранить"}
                    </button>
                  </div>
                </form>
              )}
              <div className="t-profile-tabs">
                <button className={"t-profile-tab" + (profileTab === "posts" ? " active" : "")} onClick={() => setProfileTab("posts")}>Посты</button>
                <button className={"t-profile-tab" + (profileTab === "reposts" ? " active" : "")} onClick={() => setProfileTab("reposts")}>Репосты</button>
                <button className={"t-profile-tab" + (profileTab === "saved" ? " active" : "")} onClick={() => setProfileTab("saved")}>
                  <span className="t-tab-label">Сохранённые посты</span>
                  <span className="t-tab-count">{savedPosts.length}</span>
                </button>
              </div>
              {profileTab === "posts" ? (
                posts.filter((p) => p.isMine).length === 0 ? (
                  <div className="t-empty">У вас пока нет постов</div>
                ) : (
                  <div className="t-grid">
                    {posts.filter((p) => p.isMine).map((p) => renderCard(p))}
                  </div>
                )
              ) : profileTab === "reposts" ? (
                repostPosts.length === 0 ? (
                  <div className="t-empty">Здесь появятся ваши репосты. Нажмите на иконку репоста у поста, чтобы поделиться им.</div>
                ) : (
                  <div className="t-grid">
                    {repostPosts.map((p) => renderCard(p))}
                  </div>
                )
              ) : (
                savedPosts.length === 0 ? (
                  <div className="t-empty">Пока ничего не сохранено. Нажмите на закладку у поста, чтобы добавить его сюда.</div>
                ) : (
                  <div className="t-grid">
                    {savedPosts.map((p) => renderCard(p))}
                  </div>
                )
              )}
            </div>
          )}

          {tab === "profile" && viewUserId && !viewUser && (
            <div className="t-empty" style={{ paddingTop: 60 }}>Загружаем профиль…</div>
          )}

          {tab === "profile" && viewUserId && viewUser && (
            <div>
              <div className="t-profile-back-row">
                <button className="t-back-btn" onClick={closeProfile}><ArrowLeft size={16} /></button>
                {viewUser.isMine && (
                  <button className="t-settings-btn" style={{ position: "static" }} onClick={() => setSettingsOpen(true)} aria-label="Настройки">
                    <Settings size={17} />
                  </button>
                )}
              </div>
              <div className="t-profile-head">
                <div className="t-profile-avatar" style={{ background: solidFor(viewUser.name) }}>{viewUser.initials}</div>
                <div className="t-profile-name">{viewUser.name}</div>
                <div className="t-profile-tag">{viewUser.handle}</div>
                {viewUser.bio && <div className="t-profile-bio">{viewUser.bio}</div>}
                <div className="t-profile-stats">
                  <div className="t-stat"><div className="t-stat-num tap-mono">{viewUser.postCount}</div><div className="t-stat-label">Посты</div></div>
                  <div className="t-stat"><div className="t-stat-num tap-mono">{viewUser.observers || viewUser.friends || 0}</div><div className="t-stat-label">Наблюдатели</div></div>
                  <div className="t-stat"><div className="t-stat-num tap-mono">{viewUser.following}</div><div className="t-stat-label">Подписки</div></div>
                </div>
                {!viewUser.isMine && (
                  <div className="t-profile-actions">
                    <button className={"t-follow-btn" + (viewUser.followed ? " following" : "")} onClick={() => toggleFollow(viewUser.id)}>
                      {viewUser.followed ? <React.Fragment><Check size={13} />Наблюдаете</React.Fragment> : <React.Fragment><UserPlus size={13} />Наблюдать</React.Fragment>}
                    </button>
                    <button className={"t-block-btn" + (viewUser.blockedByMe ? " blocked" : "")} onClick={() => toggleBlock(viewUser.id)}>
                      {viewUser.blockedByMe ? <React.Fragment><Check size={13} />Разблокировать</React.Fragment> : <React.Fragment><Ban size={13} />Заблокировать</React.Fragment>}
                    </button>
                  </div>
                )}
              </div>
              <div className="t-section-label">Посты пользователя</div>
              {posts.filter((p) => p.authorId === viewUserId).length === 0 ? (
                <div className="t-empty">У пользователя пока нет постов</div>
              ) : (
                <div className="t-grid">
                  {posts.filter((p) => p.authorId === viewUserId).map((p) => renderCard(p))}
                </div>
              )}
            </div>
          )}
          </div>

          {searchActive && (
            <div className="t-search-results">
              {searchLoading && <div className="t-empty">Поиск…</div>}
              {searchDone && !searchLoading && searchUsers.length === 0 && searchPosts.length === 0 && (
                <div className="t-empty">
                  <div>Ничего не найдено по запросу «{query.trim()}»</div>
                  {searchSuggestions.length > 0 && (
                    <div className="t-suggest">
                      <div className="t-suggest-label">Возможно, вы имели в виду:</div>
                      <div className="t-suggest-list">
                        {searchSuggestions.map((s) => (
                          <button key={s} className="t-suggest-btn" onClick={() => { setQuery(s); saveRecentSearch(s); }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {searchUsers.length > 0 && (
                <React.Fragment>
                  <div className="t-sr-label">Люди</div>
                  {searchUsers.map((u) => (
                    <div key={u.id} className="t-community-row" onClick={() => openProfile(u.id)}>
                      <div className="t-community-icon" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                      <div className="t-community-main">
                        <div className="t-community-name">{u.name}</div>
                        <div className="t-community-desc">{u.handle}{u.bio ? " · " + u.bio : ""}</div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              )}
              {searchPosts.length > 0 && (
                <React.Fragment>
                  <div className="t-sr-label">Посты</div>
                  <div className="t-grid">{searchPosts.map((p) => renderCard(p))}</div>
                </React.Fragment>
              )}
            </div>
          )}
          </React.Fragment>
        )}
      </div>

      {settingsOpen && (
        <div className="t-modal-backdrop" onClick={() => setSettingsOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setSettingsOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Настройки</div>
            <div className="t-settings-group">
              <div className="t-settings-row">
                <div className="t-settings-info">
                  <div className="t-settings-row-title">Смена темы</div>
                  <div className="t-settings-row-sub">Светлая или тёмная тема оформления</div>
                </div>
                <div className="t-theme-toggle">
                  <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}><Sun size={15} />Светлая</button>
                  <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}><Moon size={15} />Тёмная</button>
                </div>
              </div>
              <div className="t-settings-row">
                <div className="t-settings-info">
                  <div className="t-settings-row-title">Язык</div>
                  <div className="t-settings-row-sub">Немецкий, английский или русский</div>
                </div>
                <div className="t-theme-toggle t-language-toggle" role="group" aria-label="Выбор языка">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      className={language === lang.id ? "active" : ""}
                      onClick={() => setLanguage(lang.id)}
                      aria-pressed={language === lang.id}
                      title={lang.label}
                    >
                      {lang.short}
                    </button>
                  ))}
                </div>
              </div>
              <div className="t-settings-row">
                <div className="t-settings-info">
                  <div className="t-settings-row-title">Чёрный список</div>
                  <div className="t-settings-row-sub">Заблокированные пользователи: {blockedUsers.length}</div>
                </div>
                <button className="t-settings-link" onClick={() => { setSettingsOpen(false); setBlacklistOpen(true); }}>Открыть</button>
              </div>
              <div className="t-settings-row">
                <div className="t-settings-info">
                  <div className="t-settings-row-title">Аккаунты</div>
                  <div className="t-settings-row-sub">Привязанные аккаунты: {accounts.length}</div>
                </div>
                <button className="t-settings-link" onClick={() => { setSettingsOpen(false); setAccountsOpen(true); loadAccounts(); }}>Открыть</button>
              </div>
              <div className="t-settings-row">
                <div className="t-settings-info">
                  <div className="t-settings-row-title">Аккаунт</div>
                  <div className="t-settings-row-sub">Завершить сессию и вернуться к окну входа</div>
                </div>
                <button className="t-logout-btn" onClick={doLogout}><LogOut size={15} />Выйти</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {blacklistOpen && (
        <div className="t-modal-backdrop" onClick={() => setBlacklistOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setBlacklistOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Чёрный список</div>
            {blockedUsers.length === 0 ? (
              <div className="t-empty">Список пуст — вы никого не блокировали</div>
            ) : (
              <div className="t-settings-group">
                {blockedUsers.map((u) => (
                  <div key={u.id} className="t-bl-row">
                    <div className="t-convo-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                    <div className="t-bl-info">
                      <div className="t-bl-name">{u.name}</div>
                      <div className="t-bl-handle">{u.handle}</div>
                    </div>
                    <button className="t-bl-unblock" onClick={() => toggleBlock(u.id)}>Разблокировать</button>
                  </div>
                ))}
                </div>
              )}
          </div>
        </div>
      )}

      {accountsOpen && (
        <div className="t-modal-backdrop" onClick={() => setAccountsOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setAccountsOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Аккаунты</div>
            {accounts.length === 0 ? (
              <div className="t-empty">Нет привязанных аккаунтов</div>
            ) : (
              <div className="t-settings-group">
                {accounts.map((a) => (
                  <div key={a.id} className="t-acc-row">
                    <div className="t-convo-avatar" style={{ background: solidFor(a.name) }}>{a.avatar_initials}</div>
                    <div className="t-bl-info">
                      <div className="t-bl-name">
                        {a.name}
                        {a.current && <span className="t-acc-current">сейчас активен</span>}
                      </div>
                      <div className="t-bl-handle">{a.handle}</div>
                    </div>
                    <div className="t-acc-actions">
                      {a.current ? (
                        <button className="t-acc-remove" onClick={() => removeAccount(a.token)}>Выйти</button>
                      ) : (
                        <React.Fragment>
                          <button className="t-acc-switch" onClick={() => switchAccount(a.token)}>Переключить</button>
                          <button className="t-acc-remove" onClick={() => removeAccount(a.token)}>Удалить</button>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="t-acc-add" onClick={addAccount}><UserPlus size={14} />Добавить аккаунт</button>
          </div>
        </div>
      )}

      {openPost && (
        <div className="t-modal-backdrop" onClick={() => setOpenPostId(null)}>
          <div className="t-modal" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setOpenPostId(null)}><X size={16} /></button></div>
            <div className="t-modal-meta">
              <div className="t-avatar" style={{ background: solidFor(openPost.author) }} onClick={() => openProfile(openPost.authorId)}>{openPost.avatarInitials}</div>
              <span className="t-modal-meta-text"><span className="t-nick-link" onClick={() => openProfile(openPost.authorId)}>{openPost.author}</span> · {openPost.time}</span>
              {!openPost.isMine && (
                <button className={"t-follow-btn" + (openPost.followed ? " following" : "")} onClick={() => toggleFollow(openPost.authorId)}>
                  {openPost.followed ? <React.Fragment><Check size={13} />Наблюдаете</React.Fragment> : <React.Fragment><UserPlus size={13} />Наблюдать</React.Fragment>}
                </button>
              )}
            </div>
            {openPost.repostOf && (
              <div className="t-card-repost-banner t-modal-repost-banner">
                <Repeat size={12} />
                <span>Репост</span>
                <span className="t-card-repost-orig" onClick={() => openProfile(openPost.authorId)}>от {openPost.origAuthorHandle || openPost.origAuthorName}</span>
              </div>
            )}
            <h3 className="t-modal-title">{openPost.title}</h3>
            {openPost.media && (
              <div className="t-modal-media">
                {openPost.media.type === "video" ? (
                  <video src={openPost.media.url} controls />
                ) : (
                  <img src={openPost.media.url} alt="" onError={imgErr} />
                )}
              </div>
            )}
            {openPost.body && <div className="t-modal-body" dangerouslySetInnerHTML={{ __html: bodyContent(openPost.body) }} />}
            <div className="t-modal-actions">
              <div className="t-vote-group">
                <button className={"t-vote-btn up" + (openPost.voted === "up" ? " active" : "")} onClick={() => vote(openPost.id, "up")}><ArrowBigUp size={19} fill={openPost.voted === "up" ? "currentColor" : "none"} /></button>
                <span className="t-score tap-mono" style={{ color: openPost.voted === "up" ? "var(--gold)" : openPost.voted === "down" ? "var(--teal)" : "var(--text)" }}>{formatScore(openPost.score)}</span>
                <button className={"t-vote-btn down" + (openPost.voted === "down" ? " active" : "")} onClick={() => vote(openPost.id, "down")}><ArrowBigDown size={19} fill={openPost.voted === "down" ? "currentColor" : "none"} /></button>
              </div>
              <button className="t-action-btn" onClick={() => share(openPost.title)}><Share2 size={14} />Share</button>
              {!openPost.isMine && (
                <button className={"t-action-btn" + (openPost.reposted ? " saved" : "")} onClick={() => toggleRepost(openPost.id)}>
                  <Repeat size={14} />{openPost.reposted ? "Репост сделан" : "Репост"}{openPost.reposts > 0 ? " · " + openPost.reposts : ""}
                </button>
              )}
              <button className={"t-action-btn" + (openPost.saved ? " saved" : "")} onClick={() => toggleSave(openPost.id)}><Bookmark size={14} fill={openPost.saved ? "currentColor" : "none"} />{openPost.saved ? "Сохранено" : "Сохранить"}</button>
            </div>
            {(() => {
              const commentById = {};
              openPost.comments.forEach((c) => { if (c.id != null) commentById[c.id] = c; });
              return (
                <React.Fragment>
                  <div className="t-comments-head">{openPost.comments.length} comment{openPost.comments.length === 1 ? "" : "s"}</div>
                  {openPost.comments.length === 0 && <div className="t-comment-empty">No comments yet. Be the first to say something.</div>}
                  {openPost.comments.map((c, i) => {
                    const parent = c.parentId != null ? commentById[c.parentId] : null;
                    return (
                      <div className={"t-comment-card" + (parent ? " t-comment-reply" : "")} key={c.id != null ? c.id : i}>
                        {c.avatarInitials && <div className="t-comment-avatar" style={{ background: solidFor(c.author) }}>{c.avatarInitials}</div>}
                        <div className="t-comment-main">
                          <div className="t-comment-head">
                            <span className="t-comment-author" onClick={() => openProfile(c.authorId)}>{c.author}</span>
                            {parent && <span className="t-comment-reply-to">в ответ <span className="t-nick-link" onClick={() => openProfile(parent.authorId)}>{parent.author}</span></span>}
                            <span className="t-comment-time">· {c.time}</span>
                          </div>
                          <div className="t-comment-text">{c.text}</div>
                          <div className="t-comment-actions">
                            <button className={"t-comment-like" + (c.liked ? " liked" : "")} onClick={() => toggleCommentLike(openPost.id, c.id)}>
                              <Heart size={13} fill={c.liked ? "currentColor" : "none"} />{c.likes > 0 ? " " + c.likes : ""}
                            </button>
                            <button className="t-comment-reply-btn" onClick={() => setReplyTo(c)}>Ответить</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="t-comment-form">
                    {replyTo && (
                      <div className="t-reply-chip">
                        Ответить: <strong>{replyTo.author}</strong>
                        <button className="t-reply-chip-x" onClick={() => setReplyTo(null)}><X size={12} /></button>
                      </div>
                    )}
                    <div className="t-comment-form-row">
                      <input placeholder={replyTo ? "Ваш ответ…" : "Добавить комментарий"} value={openPost.commentDraft} onChange={(e) => setDraft(openPost.id, e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submitComment(openPost.id, replyTo ? replyTo.id : null); }} />
                      <button onClick={() => submitComment(openPost.id, replyTo ? replyTo.id : null)}>Ответить</button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })()}
          </div>
        </div>
      )}

      <div className="t-bottom-nav">
        <div className="t-tab-pill" ref={pillRef} style={{ touchAction: "pan-y" }} onPointerDown={pillDragStart}>
          <span className="t-tab-slider" ref={sliderRef} />
          {TABS.map((t) => {
            const Icon = t.icon;
            const badge = (t.id === "messages" && unreadMsgCount > 0) || (t.id === "notifications" && unreadNotifCount > 0);
            return (
              <button key={t.id} ref={(el) => { tabBtnRefs.current[t.id] = el; }} data-tab-id={t.id} className={"t-tab-btn" + (tab === t.id ? " active" : "")} onClick={() => openTab(t.id)} aria-label={t.label} title={t.label}>
                <Icon size={22} />
                {badge && <span className="t-tab-badge" />}
              </button>
            );
          })}
          <button className="t-tab-btn t-tab-video" onClick={openVideoFeedFromStart} aria-label="Открыть видео ленту" title="Открыть видео ленту">
            <Film size={22} />
          </button>
        </div>
        {fabAvailable && (
          <button
            className={"t-fab" + (fabOpen ? " open" : "")}
            onClick={toggleFab}
            aria-label="Создать"
          >
            {fabOpen ? <X size={22} /> : <Plus size={24} />}
          </button>
        )}
      </div>

      {story && story[storyIdx] && (
        <div className="t-story-viewer" onClick={closeStory}>
          <div className="t-story-card" onClick={(e) => e.stopPropagation()}>
            <div className="t-story-progress">
              {story.map((f, i) => (
                <div key={i} className={"t-story-seg" + (i < storyIdx ? " done" : i === storyIdx ? " active" : "")}>
                  <span key={storyIdx === i ? storyIdx : i} style={{ animationDuration: f.type === "video" ? "0s" : "4s" }} />
                </div>
              ))}
            </div>
            <div className="t-story-author">
              <span className="t-story-author-name">{story[storyIdx].author || ""}</span>
            </div>
            <button className="t-story-close" onClick={closeStory} aria-label="Закрыть">×</button>
            {story[storyIdx].type === "video" ? (
              <video src={story[storyIdx].url} autoPlay muted playsInline />
            ) : (
              <img src={story[storyIdx].url} alt="" onError={imgErr} />
            )}
            {story.length > 1 && <button className="t-story-nav t-story-nav--prev" onClick={() => stepStory(-1)} aria-label="Назад" />}
            {story.length > 1 && <button className="t-story-nav t-story-nav--next" onClick={() => stepStory(1)} aria-label="Вперёд" />}
            {story[storyIdx].caption && <div className="t-story-caption">{story[storyIdx].caption}</div>}
          </div>
        </div>
      )}

      {videoFeed && videoFeed.videos[videoFeedIdx] && (
        <div className="t-video-feed" onClick={closeVideoFeed}>
          <div className="t-video-feed-inner" onClick={(e) => e.stopPropagation()}>
            <button className="t-video-close" onClick={closeVideoFeed} aria-label="Закрыть"><X size={20} /></button>
            {videoFeed.videos.length > 1 && (
              <button className="t-video-nav t-video-nav--prev" onClick={(e) => { e.stopPropagation(); stepVideoFeed(-1); }} disabled={videoFeedIdx === 0} aria-label="Назад">‹</button>
            )}
            {videoFeed.videos.length > 1 && (
              <button className="t-video-nav t-video-nav--next" onClick={(e) => { e.stopPropagation(); stepVideoFeed(1); }} disabled={videoFeedIdx === videoFeed.videos.length - 1} aria-label="Вперёд">›</button>
            )}
            {(() => {
              const v = videoFeed.videos[videoFeedIdx];
              return (
                <div className="t-video-stage">
                  <video src={v.media.url} controls autoPlay playsInline />
                  <div className="t-video-meta">
                    <span className="t-video-author" onClick={() => { closeVideoFeed(); openProfile(v.authorId); }}>{v.authorHandle || v.author}</span>
                    {v.text && <span className="t-video-cap">{v.text}</span>}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {storyComposerOpen && (
        <div className="t-modal-backdrop" onClick={() => setStoryComposerOpen(false)}>
          <form className="t-modal t-story-composer" onClick={(e) => e.stopPropagation()} onSubmit={submitStory}>
            <div className="t-modal-close"><button type="button" onClick={() => setStoryComposerOpen(false)}><X size={16} /></button></div>
            <div className="t-composer-head">Новая история</div>
            <label className="t-field-label">К какому посту прикрепить</label>
            <select className="t-input" value={storyForm.postId} onChange={(e) => setStoryForm((f) => ({ ...f, postId: e.target.value }))}>
              {posts.filter((p) => p.isMine).map((p) => (
                <option key={p.id} value={p.id}>{p.title.slice(0, 60)}</option>
              ))}
            </select>
            <label className="t-field-label">Фото или видео</label>
            {storyForm.mediaUrl ? (
              <div className="t-media-preview">
                {storyForm.mediaType === "video" ? (
                  <video src={storyForm.mediaUrl} controls />
                ) : (
                  <img src={storyForm.mediaUrl} alt="" />
                )}
                <button type="button" className="t-media-remove" onClick={() => setStoryForm((f) => ({ ...f, mediaUrl: "", mediaType: null, mediaName: "" }))}><X size={14} /></button>
              </div>
            ) : (
              <label className="t-media-btn">
                <Image size={15} />
                Фото или видео
                <input type="file" accept="image/*,video/*" onChange={handleStoryMedia} hidden />
              </label>
            )}
            <label className="t-field-label">Подпись</label>
            <input className="t-input" value={storyForm.caption} onChange={(e) => setStoryForm((f) => ({ ...f, caption: e.target.value }))} maxLength={160} placeholder="Необязательно" />
            <div className="t-profile-edit-actions">
              <button type="button" className="t-btn-ghost" onClick={() => setStoryComposerOpen(false)}>Отмена</button>
              <button type="submit" className="t-btn-solid" disabled={storySaving || !storyForm.mediaUrl}>
                {storySaving ? "Добавляем…" : "Добавить историю"}
              </button>
            </div>
          </form>
        </div>
      )}

      {toasts.length > 0 && (
        <div className="t-toast-stack">
          {toasts.map((t) => (
            <div key={t.id} className={"t-toast " + t.kind + (t.leaving ? " leaving" : "")} onClick={() => dismissToast(t.id)} title="Скрыть">
              <span className="t-toast-text">{t.msg}</span>
              {!t.leaving && <span className="t-toast-time" style={{ animationDuration: (t.kind === "error" ? 5200 : t.kind === "success" ? 3200 : 4200) + "ms" }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppBoundary><TapApp /></AppBoundary>);
