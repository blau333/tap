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
const LayoutGrid = makeIcon(
  <React.Fragment>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </React.Fragment>
);
const Film = makeIcon(
  <React.Fragment>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 3v18" />
    <path d="M17 3v18" />
    <path d="M3 8h4M3 13h4M3 18h4" />
    <path d="M17 8h4M17 13h4M17 18h4" />
  </React.Fragment>
);
const Settings = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </React.Fragment>
);
const Palette = makeIcon(
  <React.Fragment>
    <path d="M12 22a10 10 0 1 1 10-10c0 1.66-1.34 3-3 3h-1.5a2.5 2.5 0 0 0-1.86 4.22c.34.37.15 1.55-.86 1.78A10.1 10.1 0 0 1 12 22Z" />
    <circle cx="7.5" cy="11.5" r=".5" fill="currentColor" />
    <circle cx="10.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="15" cy="8" r=".5" fill="currentColor" />
    <circle cx="17" cy="12" r=".5" fill="currentColor" />
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
const LifeBuoy = makeIcon(
  <React.Fragment>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="m4.93 19.07 4.24-4.24" />
    <circle cx="12" cy="12" r="4" />
  </React.Fragment>
);
const ShieldAlert = makeIcon(
  <React.Fragment>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </React.Fragment>
);
const Megaphone = makeIcon(
  <React.Fragment>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
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
const Trash2 = makeIcon(
  <React.Fragment>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </React.Fragment>
);
const Lock = makeIcon(
  <React.Fragment>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
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

function csrfToken() {
  const m = document.cookie.match(/(?:^|;\s*)kolo_csrf=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

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
function truncText(v, max) {
  const s = String(v || "");
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
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

// Splits text into parts and wraps every case-insensitive match of `q` in a
// <mark>, so search results visibly highlight where the query hit.
function highlight(text, q) {
  const s = String(text || "");
  const needle = String(q || "").trim();
  if (!needle) return s;
  const lower = s.toLowerCase();
  const n = needle.toLowerCase();
  const out = [];
  let i = 0;
  let k = 0;
  while (true) {
    const idx = lower.indexOf(n, i);
    if (idx === -1) { out.push(s.slice(i)); break; }
    if (idx > i) out.push(s.slice(i, idx));
    out.push(React.createElement("mark", { key: "m" + (k++) }, s.slice(idx, idx + needle.length)));
    i = idx + needle.length;
  }
  return out;
}

// Converts #hashtag tokens in text into clickable buttons that open a search
// for that tag. Plain text is left as-is. Used in post card bodies/titles.
function renderHashtags(text, onTagClick) {
  const s = String(text || "");
  if (!s) return s;
  const parts = s.split(/(#[\wа-яА-ЯёЁ]+)/g);
  if (parts.length <= 1) return s;
  let key = 0;
  return parts.map((part) => {
    if (part.startsWith("#") && part.length > 1) {
      return React.createElement("button", {
        key: "tag" + (key++),
        className: "t-hashtag",
        onClick: (e) => { e.stopPropagation(); onTagClick(part); },
      }, part);
    }
    return part;
  });
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
    "Смена темы": "Theme", "Светлая или тёмная тема оформления": "Light or dark appearance", "Светлая": "Light", "Тёмная": "Dark", "Язык": "Language", "Немецкий, английский или русский": "German, English or Russian", "Выбор языка": "Language selection", "Чёрный список": "Blacklist", "Открыть": "Open", "Аккаунт": "Account", "Завершить сессию и вернуться к окну входа": "End the session and return to login", "Выйти": "Log out", "Список пуст — вы никого не блокировали": "The list is empty - you haven't blocked anyone", "Репост сделан": "Reposted", "Добавить комментарий": "Add a comment", "Закрыть": "Close", "Назад": "Back", "Вперёд": "Forward", "Новая история": "New story", "К какому посту прикрепить": "Attach to which post", "Подпись": "Caption", "Необязательно": "Optional", "Добавляем…": "Adding...", "Добавить историю": "Add story", "Скрыть": "Hide", "Share": "Share", "Reply": "Reply", "No comments yet. Be the first to say something.": "No comments yet. Be the first to say something.",
    "Приватный профиль": "Private profile", "Посты видны только вам и списку разрешённых пользователей": "Posts are visible only to you and the users you allow", "Закрытый": "Private", "Открытый": "Public", "Разрешения для просмотра": "Viewing permissions", "Эти пользователи видят ваши посты, пока включён приватный профиль.": "These users can see your posts while your profile is private.", "Имя или ник (например, @marina.k)": "Name or handle (e.g. @marina.k)", "Добавить": "Add", "Убрать": "Remove", "Профиль закрыт": "Profile is private", "Пользователь ограничил доступ к своим публикациям. Посты видны только тем, кто есть в списке разрешений на просмотр.": "This user has restricted access to their posts. Posts are only visible to people on the viewing permissions list.", "Профиль теперь закрыт": "Profile is now private", "Профиль открыт": "Profile is public", "Не удалось изменить приватность": "Could not change privacy", "Пользователь не найден": "User not found", "Не удалось добавить": "Could not add user",
    "Поделиться в чате": "Share to chat", "Кому отправить этот пост? Собеседник получит миниатюру поста в личные сообщения.": "Who do you want to send this post to? They'll get the post thumbnail in a private message.", "Нет диалогов — начните общение, чтобы поделиться постом": "No chats yet - start a chat to share posts", "Отправка…": "Sending...", "Пост отправлен в чат": "Post sent to chat", "Не удалось отправить пост": "Could not send the post",
    "По релевантности": "By relevance", "По дате": "By date", "По популярности": "By popularity", "Комментарии": "Comments", "Результаты по запросу": "Results for", "Ничего не найдено по запросу": "Nothing found for", "Возможно, вы имели в виду:": "Did you mean:", "В комментариях": "In comments"
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
    "Смена темы": "Design", "Светлая или тёмная тема оформления": "Helles oder dunkles Erscheinungsbild", "Светлая": "Hell", "Тёмная": "Dunkel", "Язык": "Sprache", "Немецкий, английский или русский": "Deutsch, Englisch oder Russisch", "Выбор языка": "Sprachauswahl", "Чёрный список": "Blacklist", "Открыть": "Öffnen", "Аккаунт": "Konto", "Завершить сессию и вернуться к окну входа": "Sitzung beenden und zum Login zurückkehren", "Выйти": "Abmelden", "Список пуст — вы никого не блокировали": "Die Liste ist leer - du hast niemanden blockiert", "Репост сделан": "Repost erstellt", "Добавить комментарий": "Kommentar hinzufügen", "Закрыть": "Schließen", "Назад": "Zurück", "Вперёд": "Vorwärts", "Новая история": "Neue Story", "К какому посту прикрепить": "An welchen Beitrag anhängen", "Подпись": "Bildunterschrift", "Необязательно": "Optional", "Добавляем…": "Hinzufügen...", "Добавить историю": "Story hinzufügen", "Скрыть": "Ausblenden", "Share": "Teilen", "Reply": "Antworten", "No comments yet. Be the first to say something.": "Noch keine Kommentare. Schreib als Erste/r.",
    "Приватный профиль": "Privates Profil", "Посты видны только вам и списку разрешённых пользователей": "Beiträge sind nur für dich und von dir erlaubte Nutzer sichtbar", "Закрытый": "Privat", "Открытый": "Öffentlich", "Разрешения для просмотра": "Anzeigeberechtigungen", "Эти пользователи видят ваши посты, пока включён приватный профиль.": "Diese Nutzer sehen deine Beiträge, solange dein Profil privat ist.", "Имя или ник (например, @marina.k)": "Name oder Handle (z. B. @marina.k)", "Добавить": "Hinzufügen", "Убрать": "Entfernen", "Профиль закрыт": "Profil ist privat", "Пользователь ограничил доступ к своим публикациям. Посты видны только тем, кто есть в списке разрешений на просмотр.": "Dieser Nutzer hat den Zugriff auf seine Beiträge eingeschränkt. Beiträge sind nur für Personen auf der Anzeigeberechtigungsliste sichtbar.", "Профиль теперь закрыт": "Profil ist jetzt privat", "Профиль открыт": "Profil ist öffentlich", "Не удалось изменить приватность": "Datenschutz konnte nicht geändert werden", "Пользователь не найден": "Nutzer nicht gefunden", "Не удалось добавить": "Hinzufügen fehlgeschlagen",
    "Поделиться в чате": "Im Chat teilen", "Кому отправить этот пост? Собеседник получит миниатюру поста в личные сообщения.": "Wem soll dieser Beitrag gesendet werden? Der Empfänger erhält die Beitrags-Minikarte in einer privaten Nachricht.", "Нет диалогов — начните общение, чтобы поделиться постом": "Noch keine Chats - starte eine Unterhaltung, um Beiträge zu teilen", "Отправка…": "Senden...", "Пост отправлен в чат": "Beitrag an den Chat gesendet", "Не удалось отправить пост": "Beitrag konnte nicht gesendet werden",
    "По релевантности": "Nach Relevanz", "По дате": "Nach Datum", "По популярности": "Nach Beliebtheit", "Комментарии": "Kommentare", "Результаты по запросу": "Ergebnisse für", "Ничего не найдено по запросу": "Nichts gefunden für", "Возможно, вы имели в виду:": "Meintest du:", "В комментариях": "In Kommentaren"
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
    const viewPermCount = trimmed.match(/^Кому открыт ваш профиль: (.+)$/);
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
    else if (viewPermCount) translated = (lang === "de" ? "Wer sieht dein Profil: " : "Who can view your profile: ") + viewPermCount[1];
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
  { id: "boards", label: "Доски", icon: LayoutGrid },
  { id: "messages", label: "Сообщения", icon: MessageCircle },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "profile", label: "Профиль", icon: User },
];

const NAV_CATALOG = {
  home: { label: "Главная", icon: Home },
  pages: { label: "Страницы", icon: Users },
  boards: { label: "Доски", icon: LayoutGrid },
  messages: { label: "Сообщения", icon: MessageCircle },
  notifications: { label: "Уведомления", icon: Bell },
  profile: { label: "Профиль", icon: User },
  video: { label: "Видео", icon: Film },
  settings: { label: "Настройки", icon: Settings },
};
const NAV_DEFAULT = ["home", "pages", "boards", "messages", "notifications", "profile", "video"];

const ACCENTS = [
  { id: "green", label: "Зелёный", color: "#4F9C8C" },
  { id: "blue", label: "Синий", color: "#5B8FE0" },
  { id: "red", label: "Красный", color: "#D96A54" },
  { id: "purple", label: "Фиолетовый", color: "#A57AD9" },
  { id: "white", label: "Белый", color: "#EDEAE2" },
];

const DELETE_REASONS = [
  { id: "unused", label: "Не пользуюсь приложением" },
  { id: "notifications", label: "Слишком много уведомлений" },
  { id: "privacy", label: "Беспокоит приватность" },
  { id: "accidental", label: "Создал(а) аккаунт случайно" },
  { id: "duplicate", label: "Есть другой аккаунт" },
  { id: "other", label: "Другая причина" },
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
  const [accent, setAccent] = useState(() => {
    try {
      const saved = localStorage.getItem("tap:accent");
      return ACCENTS.some((a) => a.id === saved) ? saved : "green";
    } catch (e) { return "green"; }
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
  const [settingsTab, setSettingsTab] = useState("interface");
  const [tabDir, setTabDir] = useState(1);
  function switchSettingsTab(id) {
    const order = ["interface", "appearance", "privacy", "security", "account"];
    const from = order.indexOf(settingsTab);
    const to = order.indexOf(id);
    setTabDir(to >= from ? 1 : -1);
    setSettingsTab(id);
  }
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [passkeysOpen, setPasskeysOpen] = useState(false);
  const [passkeys, setPasskeys] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteFinalOpen, setDeleteFinalOpen] = useState(false);
  const [privacyBusy, setPrivacyBusy] = useState(false);
  const [viewPermsOpen, setViewPermsOpen] = useState(false);
  const [viewPerms, setViewPerms] = useState([]);
  const [viewPermQuery, setViewPermQuery] = useState("");
  const [viewPermSuggestions, setViewPermSuggestions] = useState([]);
  const [viewPermBusy, setViewPermBusy] = useState(false);
  const [relationsOpen, setRelationsOpen] = useState(false);
  const [relationsTitle, setRelationsTitle] = useState("");
  const [relationsList, setRelationsList] = useState([]);
  const [relationsOwner, setRelationsOwner] = useState(null);
  const [navPos, setNavPos] = useState(() => {
    try {
      const saved = localStorage.getItem("tap:navpos");
      return ["bottom", "top", "left", "right"].includes(saved) ? saved : "bottom";
    } catch (e) { return "bottom"; }
  });
  const navRef = useRef(null);
  useEffect(() => { try { localStorage.setItem("tap:navpos", navPos); } catch (e) {} }, [navPos]);
  const [navItems, setNavItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tap:navitems") || "null");
      if (Array.isArray(saved)) {
        let hidden = [];
        try { hidden = JSON.parse(localStorage.getItem("tap:navhidden") || "[]"); } catch (e) {}
        const valid = saved.filter((id) => NAV_CATALOG[id]);
        const extras = NAV_DEFAULT.filter((id) => !valid.includes(id) && !hidden.includes(id));
        const merged = valid.length ? valid.concat(extras) : NAV_DEFAULT.slice();
        return merged;
      }
    } catch (e) {}
    return NAV_DEFAULT.slice();
  });
  const [navHidden, setNavHidden] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tap:navhidden") || "[]"); } catch (e) { return []; }
  });
  useEffect(() => { try { localStorage.setItem("tap:navitems", JSON.stringify(navItems)); } catch (e) {} }, [navItems]);
  useEffect(() => { try { localStorage.setItem("tap:navhidden", JSON.stringify(navHidden)); } catch (e) {} }, [navHidden]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("home");
  const [sort, setSort] = useState("hot");
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchPages, setSearchPages] = useState([]);
  const [searchComments, setSearchComments] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchSort, setSearchSort] = useState("relevance");
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tap:recent-searches") || "[]").slice(0, 8); } catch (e) { return []; }
  });
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const orbCanvasRef = useRef(null);
  const orbSearchInputRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composer, setComposer] = useState({ title: "", body: "", mediaUrl: "", mediaType: null, mediaName: "" });
  const composerEditorRef = useRef(null);
  const quillRef = useRef(null);
  const [toasts, setToasts] = useState([]);
  const toastSeq = useRef(0);
  const [openPostId, setOpenPostId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [commentMedia, setCommentMedia] = useState({ url: "", type: null });
  const [videoFeed, setVideoFeed] = useState(null);
  const [videoFeedIdx, setVideoFeedIdx] = useState(0);
  const [mediaViewer, setMediaViewer] = useState(null);   // { items, start } — лайтбокс медиа
  const [mediaViewerIdx, setMediaViewerIdx] = useState(0);
  const [mediaAnimDir, setMediaAnimDir] = useState(0);   // направление перелистывания: -1 / +1 / 0
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", handle: "", bio: "" });
  const [editCheck, setEditCheck] = useState({ handle: null, name: null });
  const [editSaving, setEditSaving] = useState(false);
  const [profileTab, setProfileTab] = useState("posts");
  const [viewProfileTab, setViewProfileTab] = useState("posts");
  const editTimer = useRef(null);

  const [story, setStory] = useState(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const [storyComposerOpen, setStoryComposerOpen] = useState(false);
  const [storyForm, setStoryForm] = useState({ postId: "", mediaUrl: "", mediaType: null, mediaName: "", caption: "" });
  const [storySaving, setStorySaving] = useState(false);

  // Boards: infinite user-created canvases. openBoardId opens a board canvas.
  const [boards, setBoards] = useState([]);
  const [openBoardId, setOpenBoardId] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null);   // fetched board {.., posts, members}
  const [boardCreateOpen, setBoardCreateOpen] = useState(false);
  const [boardForm, setBoardForm] = useState({ name: "", description: "", icon_emoji: "" });
  const [boardSaving, setBoardSaving] = useState(false);
  const [boardPostOpen, setBoardPostOpen] = useState(false);   // modal to create board post
  const [boardPostXY, setBoardPostXY] = useState({ x: 0, y: 0 });
  const [boardPo, setBoardPo] = useState({ body: "", mediaUrl: "", mediaType: null, mediaName: "" });
  const [boardPoSaving, setBoardPoSaving] = useState(false);
  const boardView = useRef({ x: 0, y: 0, scale: 1 });      // authoritative pan/zoom transform
  const [boardRender, setBoardRender] = useState({ x: 0, y: 0, scale: 1 }); // render mirror so pan updates repaint
  const boardPan = useRef(null);                            // active pan pointer
  const boardTapSuppress = useRef(false);                   // true right after a pan gesture
  const [boardDragPost, setBoardDragPost] = useState(null); // {id, sx, sy, x, y} while dragging
  const boardCanvasRef = useRef(null);
  const [boardInviteHandle, setBoardInviteHandle] = useState("");
  const [boardInviting, setBoardInviting] = useState(false);
  const [boardInviteList, setBoardInviteList] = useState([]);
  const [boardInviteOpen, setBoardInviteOpen] = useState(false);

  // Low-level fetch wrapper supporting arbitrary methods, used by boards for
  // PUT (move) and DELETE (remove member/post) mutations.
  async function apiMethod(method, path, body) {
    const headers = body != null ? { "Content-Type": "application/json" } : {};
    const csrf = csrfToken();
    if (csrf) headers["X-CSRF-Token"] = csrf;
    const res = await fetch(path, {
      method,
      credentials: "same-origin",
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) { window.location.href = "/login"; throw new Error("auth"); }
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(t || path + " " + res.status);
    }
    return res.json();
  }

  const [conversations, setConversations] = useState([]);
  const [openConvoId, setOpenConvoId] = useState(null);
  // Unsent message drafts are kept per conversation (id → text) and persisted
  // to localStorage, so switching chats or reloading never loses typing.
  const [msgDrafts, setMsgDrafts] = useState({});
  const draftMsg = (openConvoId != null && msgDrafts[openConvoId]) || "";
  // Timestamp of the last "typing" heartbeat sent for the open conversation,
  // used to throttle the indicator to ~2.5s so we don't spam the server.
  const typingSentAt = useRef(0);
  const [reactionPicker, setReactionPicker] = useState(null);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [userList, setUserList] = useState([]);
  // Post currently being shared to a chat: non-null opens the picker modal.
  const [sharePostId, setSharePostId] = useState(null);
  const [shareBusy, setShareBusy] = useState(false);
  // The support account (superuser): pinned "Поддержка" entry in messages.
  const [support, setSupport] = useState(null);
  // Superuser panel: system notification broadcast + post warnings.
  const [adminNotifyOpen, setAdminNotifyOpen] = useState(false);
  const [adminNotifyText, setAdminNotifyText] = useState("");
  const [adminNotifyBusy, setAdminNotifyBusy] = useState(false);
  const [warnPost, setWarnPost] = useState(null);
  const [warnReason, setWarnReason] = useState("");
  const [warnBusy, setWarnBusy] = useState(false);
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
  const [msgMedia, setMsgMedia] = useState({ url: "", type: null });
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
      const key = m.msgKey ? await msgKeyFor(m, me.id) : await ensureConvKey(openConvoId, me.id);
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
    const appendMsg = (msg, msgKey) => setConversations((prev) => prev.map((c) => (c.id === openConvoId ? { ...c, messages: [...c.messages, msg], time: "только что", e2ee: c.e2ee || !!msgKey } : c)));
    let msgKey = null;
    if (e2eeReady() && me) {
      const md = await makeMsgKey(peerId);
      if (md) {
        try {
          const enc = await KoloE2EE.encryptData(md.msgKey, await blob.arrayBuffer());
          api(`/api/conversations/${openConvoId}/messages`, { encrypted: true, cipher_text: enc.cipher, nonce: enc.nonce, media_type: mime, text: label, message_keys: md.message_keys })
            .then((r) => appendMsg({ ...r.message, text: label }, md.msgKey))
            .catch(() => setToast("Не удалось отправить голосовое сообщение"));
          msgKey = md.msgKey;
        } catch (e) {
          setToast("Не удалось зашифровать голосовое сообщение");
        }
        return;
      }
    }
    if (!msgKey) {
      setToast("Собеседник ещё не настроил шифрование — голосовое не отправлено");
      return;
    }
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
    function restoreBootstrap(data) {
      setMe(data.me);
      setSupport(data.support || null);
      setPosts(normalizePosts(data.posts || []));
      setPages(normalizePages(data.pages || data.communities || []));
      setNotifications(data.notifications || []);
      setBlockedUsers(data.blockedUsers || []);
      setInterests((data.me && data.me.interests) || []);
    }
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
        try {
          localStorage.setItem("tap:bootstrap:last", JSON.stringify(data));
        } catch (e) {}
        restoreBootstrap(data);
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
        if (e.message === "auth") return;
        let cached = null;
        try {
          cached = JSON.parse(localStorage.getItem("tap:bootstrap:last") || "null");
        } catch (cacheError) {}
        if (cached && cached.me) {
          restoreBootstrap(cached);
          setUiLoaded(true);
          setLoading(false);
          setApiError("Нет соединения с сервером. Показаны последние сохранённые данные.");
        } else {
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
    const headers = { "Content-Type": "application/json" };
    const csrf = csrfToken();
    if (csrf) headers["X-CSRF-Token"] = csrf;
    const res = await fetch(path, {
      method: "POST",
      credentials: "same-origin",
      headers,
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

  // Reposition the slider on tab switch, reorder, or window resize.
  useLayoutEffect(() => { slideTabTo(tab); }, [tab, navItems]);
  useEffect(() => {
    const onResize = () => slideTabTo(tabRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function pillDragStart(e) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    // Presses on tab buttons belong to click/reorder (startIconDrag);
    // the slide-to-switch drag only starts from the pill background/slider.
    if (e.target.closest(".t-tab-btn")) return;
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
    try { localStorage.setItem("tap:accent", accent); } catch (e) {}
    const bg = theme === "light" ? "#F7F5EC" : "#14140F";
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
  }, [theme, accent]);

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
      const headers = { "Content-Type": "application/json" };
      const csrf = csrfToken();
      if (csrf) headers["X-CSRF-Token"] = csrf;
      const res = await fetch("/api/accounts/switch", {
        method: "POST",
        credentials: "same-origin",
        headers,
        body: JSON.stringify({ token }),
      });
      if (res.ok) window.location.reload();
    } catch (e) { /* ignore */ }
  }

  async function removeAccount(token) {
    try {
      const headers = { "Content-Type": "application/json" };
      const csrf = csrfToken();
      if (csrf) headers["X-CSRF-Token"] = csrf;
      const res = await fetch("/api/accounts/remove", {
        method: "POST",
        credentials: "same-origin",
        headers,
        body: JSON.stringify({ token }),
      });
      if (res.ok) window.location.reload();
    } catch (e) { /* ignore */ }
  }

  function deleteAccount() {
    setDeleteReason("");
    setDeleteOpen(true);
  }

  function confirmDelete() {
    setDeleteOpen(false);
    setDeleteFinalOpen(true);
  }

  async function submitDelete() {
    try {
      const headers = { "Content-Type": "application/json" };
      const csrf = csrfToken();
      if (csrf) headers["X-CSRF-Token"] = csrf;
      const res = await fetch("/api/account/delete", {
        method: "POST",
        credentials: "same-origin",
        headers,
        body: JSON.stringify({ reason: deleteReason }),
      });
      if (res.ok) {
        try { localStorage.removeItem("tap:ui:" + (me && me.id)); } catch (e) {}
        window.location.href = "/login";
      }
    } catch (e) { /* ignore */ }
  }

  function addAccount() {
    window.location.href = "/login?add=1";
  }

  // ---- Приватный профиль ----
  async function togglePrivacy(val) {
    if (privacyBusy) return;
    setPrivacyBusy(true);
    try {
      const r = await api("/api/profile/privacy", { is_private: val });
      setMe((prev) => (prev ? { ...prev, isPrivate: r.isPrivate } : prev));
      setViewUser((v) => (v && v.isMine ? { ...v, isPrivate: r.isPrivate, canView: true } : v));
      setToast(r.isPrivate ? "Профиль теперь закрыт" : "Профиль открыт");
    } catch (e) {
      setToast(e.status === 401 ? "Сессия истекла" : "Не удалось изменить приватность");
    } finally {
      setPrivacyBusy(false);
    }
  }

  async function loadViewPerms() {
    try {
      const res = await fetch("/api/profile/view-permissions", { credentials: "same-origin" });
      if (res.ok) {
        const d = await res.json();
        setViewPerms(d.users || []);
      }
    } catch (e) { /* ignore */ }
  }

  function openViewPerms() {
    setViewPermQuery("");
    setViewPermSuggestions([]);
    setSettingsOpen(false);
    setViewPermsOpen(true);
    loadViewPerms();
  }

  async function searchViewPermUsers(q) {
    if (!q.trim()) { setViewPermSuggestions([]); return; }
    try {
      const res = await fetch("/api/search?q=" + encodeURIComponent(q), { credentials: "same-origin" });
      if (res.ok) {
        const d = await res.json();
        const mine = new Set(viewPerms.map((u) => u.id));
        setViewPermSuggestions((d.users || []).filter((u) => u.id !== me.id && !mine.has(u.id)));
      }
    } catch (e) { /* ignore */ }
  }

  async function addViewPerm(userId) {
    if (viewPermBusy) return;
    setViewPermBusy(true);
    try {
      const r = await api("/api/profile/view-permissions", { user_id: userId });
      setViewPerms((prev) => (prev.some((u) => u.id === r.user.id) ? prev : [...prev, r.user]));
      setViewPermQuery("");
      setViewPermSuggestions((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      setToast(e.status === 404 ? "Пользователь не найден" : "Не удалось добавить");
    } finally {
      setViewPermBusy(false);
    }
  }

  async function removeViewPerm(userId) {
    try {
      await fetch("/api/profile/view-permissions/" + userId, {
        method: "DELETE",
        credentials: "same-origin",
      });
      setViewPerms((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) { /* ignore */ }
  }

  // ---- Pass-ключи (WebAuthn) ----
  const [passkeyName, setPasskeyName] = useState("");
  const [passkeyBusy, setPasskeyBusy] = useState(false);
  const [passkeyMsg, setPasskeyMsg] = useState("");

  async function loadPasskeys() {
    try {
      const res = await fetch("/api/passkeys", { credentials: "same-origin" });
      if (res.ok) {
        const d = await res.json();
        setPasskeys(d.passkeys || []);
      }
    } catch (e) { /* ignore */ }
  }

  // Refresh the pass-key list every time the settings modal is opened.
  useEffect(() => {
    if (passkeysOpen) loadPasskeys();
  }, [passkeysOpen]);

  async function addPasskey() {
    if (!window.TapWebAuthn || !TapWebAuthn.supported()) {
      setPasskeyMsg("Ваш браузер не поддерживает pass-ключи.");
      return;
    }
    setPasskeyBusy(true);
    setPasskeyMsg("");
    try {
      const startRes = await fetch("/api/passkeys/register/start", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: passkeyName }),
      });
      const start = await startRes.json().catch(() => ({}));
      if (!startRes.ok) {
        setPasskeyMsg(start.error || start.message || "Не удалось начать добавление pass-ключа.");
        return;
      }

      const attestation = await TapWebAuthn.doRegister(start.options);

      const finishRes = await fetch("/api/passkeys/register/finish", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: start.challengeId, credential: attestation, device: TapWebAuthn.detectOs() || "" }),
      });
      if (!finishRes.ok) {
        const text = await finishRes.text().catch(() => "");
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (e) {}
        const msg = (parsed && (parsed.error || parsed.message)) || text;
        setPasskeyMsg("Не удалось добавить pass-ключ: " + (msg || ("HTTP " + finishRes.status)));
        return;
      }
      setPasskeyName("");
      setPasskeyMsg("Pass-ключ добавлен.");
      await loadPasskeys();
    } catch (e) {
      if (e && e.name === "NotAllowedError") {
        setPasskeyMsg("Добавление отменено.");
      } else {
        setPasskeyMsg("Не удалось добавить pass-ключ: " + (e && e.name ? e.name + " " + (e.message || "") : String(e)));
      }
    } finally {
      setPasskeyBusy(false);
    }
  }

  async function removePasskey(id) {
    try {
      const res = await fetch("/api/passkeys/" + id, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (res.ok) {
        setPasskeys((list) => list.filter((p) => p.id !== id));
      }
    } catch (e) { /* ignore */ }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    setReplyTo(null);
  }, [openPostId]);

  // ---- E2EE helpers (client-side encryption for direct messages) ----
  const keyUsersRef = useRef({});
  const msgKeyCacheRef = useRef({});

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

  // Fresh per-message AES-256-GCM key. Returns { msgKey, message_keys, wrap }
  // where message_keys holds one wrapped copy per participant and wrap() can
  // encrypt a text or binary payload. Null when the peer has no identity key.
  async function makeMsgKey(peerId) {
    if (!e2eeReady() || !me || !me.id || peerId == null) return null;
    let ident = await KoloE2EE.getIdentity(me.id);
    if (!ident && (await ensureIdentity(me.id))) ident = await KoloE2EE.getIdentity(me.id);
    let peerPub = keyUsersRef.current[peerId];
    if (!peerPub) {
      await refreshKeyUsers();
      peerPub = keyUsersRef.current[peerId];
    }
    if (!ident || !peerPub) return null;
    const msgKey = KoloE2EE.newConversationKey();
    const [mine, theirs] = await Promise.all([
      KoloE2EE.wrapConversationKey(ident.pubB64, msgKey),
      KoloE2EE.wrapConversationKey(peerPub, msgKey),
    ]);
    return {
      msgKey,
      message_keys: [
        { user_id: me.id, wrapped_key: mine.wrapped, wrap_nonce: mine.nonce, wrap_eph: mine.ephPub },
        { user_id: peerId, wrapped_key: theirs.wrapped, wrap_nonce: theirs.nonce, wrap_eph: theirs.ephPub },
      ],
    };
  }

  // Unwraps the per-message key for a message (cached per message id), so the
  // body ciphertext can be decrypted. Falls back to null for legacy messages
  // that carry no msgKey.
  async function msgKeyFor(msg, userId) {
    if (!e2eeReady() || !msg.msgKey || userId == null) return null;
    let k = msgKeyCacheRef.current[msg.id];
    if (k) return k;
    try {
      const ident = await KoloE2EE.getIdentity(userId);
      if (!ident) return null;
      k = await KoloE2EE.unwrapConversationKey(ident.privJwk, msg.msgKey.wrapped, msg.msgKey.nonce, msg.msgKey.ephPub);
      msgKeyCacheRef.current[msg.id] = k;
      return k;
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
      if (key || msgs.some((m) => m.encrypted && m.msgKey)) {
        let ok = true;
        const decrypted = [];
        for (const m of msgs) {
          if (!m.encrypted) {
            decrypted.push({ ...m, text: safeStr(m.text) });
            continue;
          }
          // New scheme: one key per message, unwrapped with the local identity.
          const mk = m.msgKey && (await msgKeyFor(m, userId));
          if (mk) {
            const plain = await KoloE2EE.decryptMessage(mk, m.text, m.nonce);
            if (plain == null) ok = false;
            if (m.media && m.media.type && m.media.type.indexOf("audio") === 0) {
              decrypted.push({ ...m, text: plain != null ? plain : "🎤", audioCipher: m.text, decrypted: plain != null });
            } else {
              decrypted.push({ ...m, text: plain != null ? plain : "🔒 не удалось расшифровать", decrypted: plain != null });
            }
            continue;
          }
          // Legacy messages: decrypted with the per-conversation key.
          if (key) {
            if (m.media && m.media.type && m.media.type.indexOf("audio") === 0) {
              const plain = await KoloE2EE.decryptMessage(key, m.text, m.nonce);
              if (plain == null) ok = false;
              decrypted.push({ ...m, text: plain != null ? plain : "🎤", audioCipher: m.text, decrypted: plain != null });
            } else {
              const plain = await KoloE2EE.decryptMessage(key, m.text, m.nonce);
              if (plain == null) ok = false;
              decrypted.push({ ...m, text: plain != null ? plain : "🔒 не удалось расшифровать", decrypted: plain != null });
            }
            continue;
          }
          ok = false;
          decrypted.push({ ...m, text: "🔒 не удалось расшифровать" });
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

  // Server-side search (posts + users + pages + comments) with debounce.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchUsers([]);
      setSearchPosts([]);
      setSearchPages([]);
      setSearchComments([]);
      setSearchSuggestions([]);
      setSearchDone(false);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const t = setTimeout(() => {
      fetch("/api/search?q=" + encodeURIComponent(q) + "&sort=" + encodeURIComponent(searchSort), { credentials: "same-origin" })
        .then((r) => r.json())
        .then((d) => {
          setSearchUsers(d.users || []);
          setSearchPosts(normalizePosts(d.posts || []));
          setSearchPages(normalizePages(d.pages || []));
          setSearchComments(d.commentResults || []);
          setSearchSuggestions(d.suggestions || []);
          setSearchDone(true);
        })
        .catch(() => { setSearchUsers([]); setSearchPosts([]); setSearchPages([]); setSearchComments([]); setSearchSuggestions([]); setSearchDone(true); })
        .finally(() => setSearchLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [query, searchSort]);

  // ── Orb canvas animation ────────────────────────────────────────────
  useEffect(() => {
    const canvas = orbCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    function frame() {
      t += 0.016;
      const w = canvas.width = canvas.clientWidth * 2;
      const h = canvas.height = canvas.clientHeight * 2;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      if (h > 0 && w > h * 1.5) {
        // Dynamic-island mode: draw a glowing pill along the full width.
        const radius = h / 2;
        const hue = (t * 28) % 360;
        const bg = ctx.createLinearGradient(0, 0, w, 0);
        bg.addColorStop(0, `hsla(${hue}, 52%, 40%, 0.85)`);
        bg.addColorStop(0.12, `hsla(${(hue + 18) % 360}, 55%, 62%, 0.92)`);
        bg.addColorStop(0.42, `hsla(${(hue + 40) % 360}, 60%, 70%, 0.95)`);
        bg.addColorStop(0.62, `hsla(${(hue + 70) % 360}, 55%, 66%, 0.92)`);
        bg.addColorStop(1, `hsla(${(hue + 100) % 360}, 50%, 45%, 0.85)`);
        ctx.fillStyle = bg;
        ctx.shadowColor = `hsla(${hue}, 70%, 55%, 0.55)`;
        ctx.shadowBlur = 26;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(w - radius, 0);
        ctx.arcTo(w, 0, w, h, radius);
        ctx.arcTo(w, h, w - radius, h, radius);
        ctx.lineTo(radius, h);
        ctx.arcTo(0, h, 0, h / 2, radius);
        ctx.arcTo(0, 0, radius, 0, radius);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        // moving highlight sweep
        const sx = ((t * 110) % (w + h * 3)) - h;
        const hg = ctx.createLinearGradient(sx, 0, sx + h * 0.8, 0);
        hg.addColorStop(0, "rgba(255,255,255,0)");
        hg.addColorStop(0.5, "rgba(255,255,255,0.5)");
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.moveTo(radius, h * 0.15);
        ctx.lineTo(w - radius, h * 0.15);
        ctx.arcTo(w - h * 0.3, h * 0.15, w - h * 0.3, h * 0.85, h * 0.3);
        ctx.lineTo(radius + h * 0.15, h * 0.85);
        ctx.arcTo(h * 0.15, h * 0.85, h * 0.15, h * 0.15, h * 0.3);
        ctx.closePath();
        ctx.fill();
        // thin inner rim
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(radius, 1);
        ctx.lineTo(w - radius, 1);
        ctx.arcTo(w - 1, 1, w - 1, h - 1, radius - 1);
        ctx.arcTo(w - 1, h - 1, radius, h - 1, radius - 1);
        ctx.lineTo(radius, h - 1);
        ctx.arcTo(1, h - 1, 1, h / 2, radius - 1);
        ctx.arcTo(1, 1, radius, 1, radius - 1);
        ctx.closePath();
        ctx.stroke();
        raf = requestAnimationFrame(frame);
        return;
      }
      const r = Math.min(w, h) / 2 - 4;
      // layered glow
      for (let i = 3; i >= 0; i--) {
        const rr = r * (1 + i * 0.18);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        const hue = (t * 28 + i * 30) % 360;
        g.addColorStop(0, `hsla(${hue}, 60%, 62%, ${0.22 - i * 0.04})`);
        g.addColorStop(0.6, `hsla(${hue + 20}, 50%, 50%, ${0.08 - i * 0.015})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();
      }
      // core
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const ch = (t * 28) % 360;
      cg.addColorStop(0, `hsla(${ch}, 55%, 72%, 0.9)`);
      cg.addColorStop(0.45, `hsla(${ch + 15}, 48%, 55%, 0.55)`);
      cg.addColorStop(0.78, `hsla(${ch + 30}, 40%, 40%, 0.2)`);
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      // specular highlight
      const sg = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.3, 0, cx - r * 0.25, cy - r * 0.3, r * 0.55);
      sg.addColorStop(0, "rgba(255,255,255,0.38)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Ctrl+K opens search overlay
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOverlayOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Focus overlay input when opened
  useEffect(() => {
    if (searchOverlayOpen && orbSearchInputRef.current) {
      setTimeout(() => orbSearchInputRef.current?.focus(), 80);
    }
  }, [searchOverlayOpen]);

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
    let list = posts;
    const arr = [...list];
    if (sort === "hot") arr.sort((a, b) => b.score + b.comments.length * 2 - (a.score + a.comments.length * 2));
    if (sort === "new") arr.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "top") arr.sort((a, b) => b.score - a.score);
    if (sort === "rising") arr.sort((a, b) => b.comments.length - a.comments.length);
    return arr;
  }, [posts, sort]);

  const pagePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const homeVideos = filtered.filter((p) => p.media && p.media.type === "video");
  const feedMedia = filtered.filter((p) => p.media && p.media.url).map((p) => ({
    postId: p.id,
    url: p.media.url,
    type: p.media.type === "video" ? "video" : "image",
    title: p.title,
    text: p.body,
    author: p.author,
    authorHandle: p.authorHandle,
    authorId: p.authorId,
    avatarInitials: p.avatarInitials,
  }));
  const openPost = findPost(openPostId);
  const savedPosts = posts.filter((p) => p.saved);
  const repostPosts = posts.filter((p) => p.isMine && p.repostOf);
  const unreadMsgCount = conversations.filter((c) => c.unread).length;
  const unreadNotifCount = notifications.filter((n) => n.unread).length;
  const islandCount = unreadMsgCount + unreadNotifCount;

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
        setViewUser((v) => (v && v.id === authorId ? { ...v, followed: r.following, observers: Math.max(0, (v.observers || v.friends || 0) + (r.following ? 1 : -1)) } : v));
        setMe((m) => ({ ...m, following: Math.max(0, (m.following || 0) + (r.following ? 1 : -1)) }));
      })
      .catch(() => {
        setPosts((prev) => prev.map((p) => (p.authorId === authorId ? { ...p, followed: !p.followed } : p)));
        setViewUser(syncView);
      });
  }
  function openRelations(type, owner) {
    const ownerUser = owner || viewUser;
    const id = ownerUser && ownerUser.id;
    if (!id) return;
    const title = type === "following" ? "Подписки" : "Наблюдатели";
    setRelationsTitle(title);
    setRelationsList([]);
    setRelationsOwner(id);
    setRelationsOpen(true);
    api(`/api/users/${id}/${type === "following" ? "following" : "observers"}`)
      .then((r) => setRelationsList(r.users || []))
      .catch(() => setRelationsList([]));
  }
  function toggleRowFollow(userId) {
    if (userId === me.id) return;
    api(`/api/users/${userId}/follow`)
      .then((r) => {
        setRelationsList((prev) => prev.map((u) => (u.id === userId ? { ...u, followed: r.following } : u)));
        if (relationsOwner === me.id) {
          setMe((m) => ({
            ...m,
            following: Math.max(0, (m.following || 0) + (r.following ? 1 : -1)),
            observers: Math.max(0, (m.observers || 0) + (r.following ? 1 : -1)),
          }));
        } else {
          setViewUser((v) => {
            if (!v || v.id !== relationsOwner) return v;
            return {
              ...v,
              following: Math.max(0, v.following + (r.following ? 1 : -1)),
              observers: Math.max(0, (v.observers || 0) + (r.following ? 1 : -1)),
            };
          });
        }
      })
      .catch(() => {});
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
    if (!text && !commentMedia.url) return;
    api(`/api/posts/${id}/comments`, { text, parentCommentId: parentId || null, mediaUrl: commentMedia.url || undefined, mediaType: commentMedia.type || undefined })
      .then((r) => {
        applyToPost(id, (x) => ({ ...x, comments: [...x.comments, r.comment], commentDraft: "" }));
        setCommentMedia({ url: "", type: null });
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
  function handleCommentMediaFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : null;
    if (!type) { setToast("Выберите файл с фото или видео"); return; }
    const reader = new FileReader();
    reader.onload = () => { setCommentMedia({ url: reader.result, type }); };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function handleMsgMediaFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : null;
    if (!type) { setToast("Выберите файл с фото или видео"); return; }
    const reader = new FileReader();
    reader.onload = () => { setMsgMedia({ url: reader.result, type }); };
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

  // ----------------------- Boards -----------------------
  // Board E2EE: one AES-256-GCM key per board, stored wrapped per member in
  // board_keys. Name/description/cards live server-side as "e1:nonce:ct"
  // envelopes so the DB never holds readable board content.
  function boardEnv(payload) {
    return "e1:" + payload.nonce + ":" + payload.cipher;
  }
  async function encryptBoardText(boardKey, text) {
    if (!e2eeReady() || !boardKey) return "";
    try {
      const e = await KoloE2EE.encryptMessage(boardKey, text || "");
      return boardEnv(e);
    } catch (e2) {
      return "";
    }
  }
  async function decryptBoardText(boardKey, env) {
    if (!env || env.indexOf("e1:") !== 0) return env || "";
    if (!e2eeReady() || !boardKey) return "";
    const i = env.indexOf(":", 3);
    if (i < 0) return "";
    const nonce = env.substring(3, i);
    const ct = env.substring(i + 1);
    const plain = await KoloE2EE.decryptMessage(boardKey, ct, nonce);
    return plain != null ? plain : "";
  }
  async function ensureBoardKey(boardId) {
    if (!e2eeReady() || !me || !me.id) return null;
    try {
      let bk = await KoloE2EE.getBoardKey(boardId);
      if (bk) return bk;
      const res = await fetch("/api/boards/" + boardId + "/keys", { credentials: "same-origin" });
      if (!res.ok) return null;
      const d = await res.json();
      if (!d.key) return null;
      let ident = await KoloE2EE.getIdentity(me.id);
      if (!ident && (await ensureIdentity(me.id))) ident = await KoloE2EE.getIdentity(me.id);
      if (!ident) return null;
      bk = await KoloE2EE.unwrapConversationKey(ident.privJwk, d.key.wrapped, d.key.nonce, d.key.ephPub);
      await KoloE2EE.setBoardKey(boardId, bk);
      return bk;
    } catch (e) {
      return null;
    }
  }
  async function decryptBoardPosts(board, posts) {
    if (!board.encrypted) return posts;
    const bk = await ensureBoardKey(board.id);
    if (!bk) return posts.map((p) => ({ ...p, title: "", body: "", media: null }));
    const out = [];
    for (const p of posts) {
      const np = { ...p, title: await decryptBoardText(bk, p.title), body: await decryptBoardText(bk, p.body) };
      if (p.media && p.media.url && p.media.url.indexOf("e1:") === 0) {
        np.media = { ...p.media, url: await decryptBoardText(bk, p.media.url) };
      }
      out.push(np);
    }
    return out;
  }
  async function fetchBoards() {
    try {
      const r = await fetch("/api/boards", { credentials: "same-origin" });
      if (!r.ok) throw new Error("load");
      const d = await r.json();
      const list = d.boards || [];
      const out = [];
      for (const b of list) {
        const nb = { ...b };
        if (b.encrypted) {
          const bk = await ensureBoardKey(b.id);
          if (bk) {
            nb.name = await decryptBoardText(bk, b.nameCipher);
            nb.description = await decryptBoardText(bk, b.descCipher);
          }
        }
        out.push(nb);
      }
      setBoards(out);
    } catch (e) {
      /* ignore */
    }
  }
  useEffect(() => { if (tab === "boards" && !openBoardId) fetchBoards(); }, [tab, openBoardId]);
  useEffect(() => { if (openBoardId) loadBoard(openBoardId); }, [openBoardId]);

  async function loadBoard(id) {
    try {
      const r = await fetch("/api/boards/" + id, { credentials: "same-origin" });
      if (!r.ok) throw new Error("load");
      const d = await r.json();
      const board = { ...d.board };
      if (board.encrypted) {
        const bk = await ensureBoardKey(id);
        if (bk) {
          board.name = await decryptBoardText(bk, board.nameCipher);
          board.description = await decryptBoardText(bk, board.descCipher);
          setToast("");
        }
      }
      const conv = await decryptBoardPosts(board, (d.posts || []).map((p) => ({ ...p, py: Number(p.y) || 0, px: Number(p.x) || 0 })));
      setActiveBoard({ ...board, posts: conv, members: d.members || [], role: d.role });
      // recenter view once on open
      boardView.current = { x: 0, y: 0, scale: 1 };
      setBoardRender({ x: 0, y: 0, scale: 1 });
    } catch (e) {
      setToast("Не удалось загрузить доску");
    }
  }

  function openBoard(id) {
    setOpenBoardId(id);
    setBoardCreateOpen(false);
  }
  function closeBoard() {
    setOpenBoardId(null);
    setActiveBoard(null);
    setBoardDragPost(null);
  }

  function submitBoardCreate(e) {
    e.preventDefault();
    const name = boardForm.name.trim();
    if (!name) return;
    setBoardSaving(true);
    (async () => {
      try {
        let ident = await KoloE2EE.getIdentity(me.id);
        if (!ident && (await ensureIdentity(me.id))) ident = await KoloE2EE.getIdentity(me.id);
        if (!e2eeReady() || !ident) throw new Error("ident");
        const bk = KoloE2EE.newConversationKey();
        const mine = await KoloE2EE.wrapConversationKey(ident.pubB64, bk);
        const [nameCipher, descCipher] = await Promise.all([
          encryptBoardText(bk, name),
          encryptBoardText(bk, boardForm.description.trim()),
        ]);
        const r = await api("/api/boards", {
          icon_emoji: boardForm.icon_emoji.trim(),
          name_cipher: nameCipher,
          desc_cipher: descCipher,
          wrapped_key: mine.wrapped,
          wrap_nonce: mine.nonce,
          wrap_eph: mine.ephPub,
        });
        await KoloE2EE.setBoardKey(r.board.id, bk);
        const fb = { ...r.board, name, description: boardForm.description.trim() };
        setBoards((prev) => [fb, ...prev]);
        setBoardForm({ name: "", description: "", icon_emoji: "" });
        setBoardCreateOpen(false);
        setToast("Доска создана");
        openBoard(r.board.id);
      } catch (err2) {
        setToast("Не удалось создать доску");
      } finally {
        setBoardSaving(false);
      }
    })();
  }

  function boardMediaFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : file.type.startsWith("image") ? "image" : null;
    if (!type) { setToast("Выберите файл с фото или видео"); return; }
    const reader = new FileReader();
    reader.onload = () => setBoardPo((c) => ({ ...c, mediaUrl: reader.result, mediaType: type, mediaName: file.name }));
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function boardMediaClear() { setBoardPo((c) => ({ ...c, mediaUrl: "", mediaType: null, mediaName: "" })); }

  // Called when the user taps an empty spot on the canvas: open the create post
  // modal anchored at the clicked world coordinates.
  function openBoardPostAt(worldX, worldY) {
    if (!activeBoard) return;
    const role = activeBoard.role;
    if (role !== "owner" && role !== "can_post") { setToast("Нет прав добавлять посты"); return; }
    setBoardPostXY({ x: worldX, y: worldY });
    setBoardPo({ body: "", mediaUrl: "", mediaType: null, mediaName: "" });
    setBoardPostOpen(true);
  }

  function submitBoardPost(e) {
    e.preventDefault();
    if (!activeBoard) return;
    const bodyText = stripHtml(boardPo.body).replace(/\s+/g, " ").trim();
    if (!bodyText && !boardPo.mediaUrl) { setToast("Пост пустой"); return; }
    const title = bodyText.slice(0, 120) || "Фото";
    const bodyHtml = boardPo.body.trim();
    const mediaUrl = boardPo.mediaUrl;
    const mediaType = boardPo.mediaType;
    setBoardPoSaving(true);
    (async () => {
      try {
        const localPost = {
          title, body: bodyHtml,
          media: mediaUrl ? { type: mediaType, url: mediaUrl } : null,
        };
        if (activeBoard.encrypted) {
          const bk = await ensureBoardKey(activeBoard.id);
          if (!bk) throw new Error("nokey");
          const [titleCipher, bodyCipher, mediaCipher] = await Promise.all([
            encryptBoardText(bk, title),
            encryptBoardText(bk, bodyHtml),
            mediaUrl ? encryptBoardText(bk, mediaUrl) : Promise.resolve(""),
          ]);
          const r = await api(`/api/boards/${activeBoard.id}/posts`, {
            title_cipher: titleCipher,
            body_cipher: bodyCipher,
            media_cipher: mediaCipher,
            media_type: mediaType || "",
            x: boardPostXY.x,
            y: boardPostXY.y,
          });
          localPost.id = r.post.id;
          localPost.py = r.post.y;
          localPost.px = r.post.x;
        } else {
          const payload = { title, body: bodyHtml, x: boardPostXY.x, y: boardPostXY.y };
          if (mediaUrl) { payload.media_url = mediaUrl; payload.media_type = mediaType; }
          const r = await api(`/api/boards/${activeBoard.id}/posts`, payload);
          Object.assign(localPost, { id: r.post.id, py: r.post.y, px: r.post.x, author: r.post.author, avatarInitials: r.post.avatarInitials });
        }
        setActiveBoard((prev) => ({ ...(prev || {}), posts: [...(prev.posts || []), localPost] }));
        setBoardPostOpen(false);
        setToast("Пост добавлен на доску");
      } catch (err2) {
        setToast("Не удалось добавить пост");
      } finally {
        setBoardPoSaving(false);
      }
    })();
  }

  function boardInvite(e) {
    if (!activeBoard) return;
    e.preventDefault();
    const handle = boardInviteHandle.trim();
    if (!handle || boardInviting) return;
    setBoardInviting(true);
    api(`/api/boards/${activeBoard.id}/invite`, { handle })
      .then(async (r) => {
        const b = activeBoard;
        if (b.encrypted) {
          const bk = await ensureBoardKey(b.id);
          if (bk) {
            let pub = keyUsersRef.current[r.member.id];
            if (!pub) {
              await refreshKeyUsers();
              pub = keyUsersRef.current[r.member.id];
            }
            if (pub) {
              const w = await KoloE2EE.wrapConversationKey(pub, bk);
              api(`/api/boards/${b.id}/keys`, {
                user_id: r.member.id,
                wrapped_key: w.wrapped,
                wrap_nonce: w.nonce,
                wrap_eph: w.ephPub,
              }).catch(() => setToast("Не удалось передать ключ доски"));
            } else {
              setToast("Пользователь ещё не настроил шифрование — ключ доски не выдан");
            }
          }
        }
        setActiveBoard((prev) => ({ ...(prev || {}), members: [...(prev.members || []), r.member] }));
        setBoardInviteHandle("");
        setToast("Пользователь приглашён");
      })
      .catch((err) => setToast((err.message || "Не удалось пригласить").replace(/^.*?: /, "")))
      .finally(() => setBoardInviting(false));
  }

  function loadBoardInviteSuggestions() {
    if (!me || !me.id || boardInviteList.length > 0) return;
    fetch(`/api/users/${me.id}/following`, { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setBoardInviteList(d.users || []))
      .catch(() => {});
  }

  function selectBoardInviteUser(u) {
    setBoardInviteHandle(u.handle);
    setBoardInviteOpen(false);
  }

  function boardRemoveMember(mid) {
    if (!activeBoard) return;
    if (!window.confirm("Убрать участника с доски?")) return;
    apiMethod("DELETE", `/api/boards/${activeBoard.id}/members/${mid}`)
      .then(() => setActiveBoard((prev) => ({ ...(prev || {}), members: (prev.members || []).filter((m) => m.id !== mid) })))
      .catch((err) => setToast((err.message || "").replace(/^.*?: /, "")));
  }

  function boardRemovePost(pid) {
    if (!activeBoard) return;
    if (!window.confirm("Удалить пост с доски?")) return;
    apiMethod("DELETE", `/api/boards/${activeBoard.id}/posts/${pid}`)
      .then(() => setActiveBoard((prev) => ({ ...(prev || {}), posts: (prev.posts || []).filter((p) => p.id !== pid) })))
      .catch(() => {});
  }

  // --- canvas pan/zoom handlers (pointer events, touch + mouse) ---
  const boardCanPost = () => !!activeBoard && (activeBoard.role === "owner" || activeBoard.role === "can_post");
  const boardIsOwner = () => !!activeBoard && activeBoard.role === "owner";

  function boardPointerDown(e) {
    const card = e.target.closest(".t-board-card");
    if (card) {
      if (boardCanPost()) {
        // start dragging the card (both author-own and everyone if owner)
        const id = Number(card.dataset.id);
        const p = (activeBoard.posts || []).find((x) => x.id === id);
        if (!p) return;
        const world = screenToWorld(e.clientX, e.clientY);
        boardPan.current = { drag: true, postId: id, sx: world.x, sy: world.y, ox: p.px, oy: p.py, ptr: e.pointerId };
        card.setPointerCapture(e.pointerId);
      }
      return;
    }
    // empty canvas: start pan
    boardPan.current = { drag: false, sx: e.clientX, sy: e.clientY, vx: boardView.current.x, vy: boardView.current.y, ptr: e.pointerId, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function boardPointerMove(e) {
    const pan = boardPan.current;
    if (!pan || pan.ptr !== e.pointerId) return;
    if (pan.drag) {
      const world = screenToWorld(e.clientX, e.clientY);
      const nx = pan.ox + (world.x - pan.sx);
      const ny = pan.oy + (world.y - pan.sy);
      setBoardDragPost({ id: pan.postId, nx, ny });
    } else {
      const dx = e.clientX - pan.sx;
      const dy = e.clientY - pan.sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) pan.moved = true;
      boardView.current = { ...boardView.current, x: pan.vx + dx, y: pan.vy + dy };
      setBoardRender({ ...boardView.current });
    }
  }
  function boardPointerUp(e) {
    const pan = boardPan.current;
    if (!pan || pan.ptr !== e.pointerId) return;
    if (pan.drag) {
      setBoardDragPost(null);
      apiMethod("PUT", `/api/boards/${activeBoard.id}/posts/${pan.postId}`, { x: pan.ox + (screenToWorld(e.clientX, e.clientY).x - pan.sx), y: pan.oy + (screenToWorld(e.clientX, e.clientY).y - pan.sy) })
        .then((r) => {
          const id = pan.postId;
          setActiveBoard((prev) => ({ ...(prev || {}), posts: (prev.posts || []).map((p) => (p.id === id ? { ...p, px: r.x, py: r.y } : p)) }));
        })
        .catch(() => {});
    } else if (pan.moved) {
      boardTapSuppress.current = true;
      window.setTimeout(() => { boardTapSuppress.current = false; }, 120);
    }
    boardPan.current = null;
  }
  // Wheel zoom (desktop). Optional.
  function boardWheel(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const zoom = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    zoomAt(px, py, zoom);
  }
  function zoomAt(px, py, zoom) {
    const v = boardView.current;
    const ns = Math.min(3, Math.max(0.25, v.scale * zoom));
    const k = ns / v.scale;
    boardView.current = {
      scale: ns,
      x: px - (px - v.x) * k,
      y: py - (py - v.y) * k,
    };
    setBoardRender({ ...boardView.current });
  }
  // Convert a screen (viewport) coordinate to canvas world coordinate.
  function screenToWorld(sx, sy) {
    const root = boardCanvasRef.current;
    if (!root) return { x: 0, y: 0 };
    const rect = root.getBoundingClientRect();
    const v = boardView.current;
    return {
      x: (sx - rect.left - v.x) / v.scale,
      y: (sy - rect.top - v.y) / v.scale,
    };
  }
  // Tap on empty canvas background opens the post composer at that spot.
  function boardCanvasTap(e) {
    if (boardTapSuppress.current) { boardTapSuppress.current = false; return; }
    if (e.target.closest(".t-board-card")) return;
    const world = screenToWorld(e.clientX, e.clientY);
    openBoardPostAt(world.x, world.y);
  }
  function openConvo(id) {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
    setOpenConvoId(id);
    setReactionPicker(null);
    api(`/api/conversations/${id}/read`).catch(() => {});
  }
  function openChatFromNotif(n) {
    if (!n || n.conversationId == null) return;
    openTab("messages");
    setOpenConvoId(n.conversationId);
    setReactionPicker(null);
    setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    api(`/api/conversations/${n.conversationId}/read`).catch(() => {});
    const convo = conversations.find((c) => c.id === n.conversationId);
    const name = convo ? convo.name : "";
    if (name) {
      window.setTimeout(() => {
        const el = document.getElementById("t-thread");
        if (el) {
          el.style.setProperty("--t-notif-glow", "rgba(var(--gold-rgb),0.35)");
          el.classList.remove("t-notif-flash");
          void el.offsetWidth;
          el.classList.add("t-notif-flash");
          window.setTimeout(() => el.classList.remove("t-notif-flash"), 1200);
        }
      }, 320);
    }
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
  // The existing conversation with the support account, if any.
  function supportConvo() {
    if (!support) return null;
    return conversations.find((c) => c.peerUserId === support.id) || null;
  }
  // Opens the support chat, creating the conversation on the fly if needed.
  function openSupport() {
    const existing = supportConvo();
    if (existing) openConvo(existing.id);
    else if (support) {
      setShowNewMsg(false);
      startChat(support.id);
    }
  }
  // Superuser: broadcast a system notification to everyone.
  function submitAdminNotify() {
    const text = adminNotifyText.trim();
    if (!text) { setToast("Введите текст уведомления"); return; }
    setAdminNotifyBusy(true);
    api("/api/admin/notify", { text })
      .then((r) => {
        setAdminNotifyOpen(false);
        setAdminNotifyText("");
        setToast(r.sent > 0 ? "Системное уведомление разослано " + r.sent + " пользователям" : "Уведомление разослано");
      })
      .catch((e) => setToast("Не удалось разослать уведомление: " + (e.message || "")))
      .finally(() => setAdminNotifyBusy(false));
  }
  // Superuser: warn a post for breaking the rules.
  function submitWarnPost() {
    if (!warnPost) return;
    const reason = warnReason.trim();
    if (!reason) { setToast("Укажите причину предупреждения"); return; }
    setWarnBusy(true);
    api(`/api/admin/posts/${warnPost.id}/warn`, { reason })
      .then(() => {
        setWarnPost(null);
        setWarnReason("");
        setToast("Предупреждение отправлено автору поста");
      })
      .catch((e) => setToast("Не удалось отправить предупреждение: " + (e.message || "")))
      .finally(() => setWarnBusy(false));
  }
  // Sends the post currently set in sharePostId as a chat message to the given
  // user, creating a new conversation on the fly when there is none yet.
  async function sharePostToChat(userId) {
    if (sharePostId == null || shareBusy) return;
    setShareBusy(true);
    try {
      let convo = conversations.find((c) => c.peerUserId === userId);
      if (!convo) {
        const started = await api("/api/conversations/start", { user_id: userId });
        convo = started.conversation;
        setConversations((prev) => (prev.some((c) => c.id === convo.id) ? prev : [...prev, convo]));
      }
      const sent = await api(`/api/conversations/${convo.id}/messages`, { post_id: sharePostId });
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convo.id ? { ...c, time: "только что", messages: c.messages.concat(sent.message) } : c
        )
      );
      setSharePostId(null);
      setToast("Пост отправлен в чат");
    } catch {
      setToast("Не удалось отправить пост");
    } finally {
      setShareBusy(false);
    }
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
    // Tell the peer we're typing, throttled so every keystroke doesn't hit the
    // server. Stopping (empty value) immediately clears the local heartbeat so
    // the peer's "печатает…" fades out.
    if (val) signalTyping(id);
  }

  // Sends a "typing" heartbeat for the given conversation (creating it on the
  // server if needed). Throttled to once per ~2.5s while the user keeps typing.
  function signalTyping(id) {
    const now = Date.now();
    if (now - typingSentAt.current < 2500) return;
    typingSentAt.current = now;
    fetch(`/api/conversations/${id}/typing`, {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => {});
  }
  async function sendMessage(templateText) {
    if (msgMedia.url) {
      const convoM = conversations.find((c) => c.id === openConvoId);
      if (convoM && (convoM.blockedByMe || convoM.blockedMe)) { setToast("Нельзя отправить: пользователь заблокирован"); return; }
      api(`/api/conversations/${openConvoId}/messages`, {
        text: draftMsg.trim(),
        media_url: msgMedia.url,
        media_type: msgMedia.type,
      })
        .then((r) => {
          const msg = { ...r.message, text: draftMsg.trim(), media: { type: msgMedia.type, url: msgMedia.url }, encrypted: false };
          setConversations((prev) => prev.map((c) => (c.id === openConvoId ? { ...c, messages: [...c.messages, msg], time: "только что" } : c)));
          setConvoDraft(openConvoId, "");
          setMsgMedia({ url: "", type: null });
        })
        .catch(() => setToast("Не удалось отправить сообщение"));
      return;
    }
    const text = (templateText !== undefined ? templateText : draftMsg).trim();
    if (!text || openConvoId == null) return;
    const convo = conversations.find((c) => c.id === openConvoId);
    if (convo && (convo.blockedByMe || convo.blockedMe)) { setToast("Нельзя отправить: пользователь заблокирован"); return; }
    const peerId = convo ? convo.peerUserId : null;
    let msgKey = null;
    let payload;
    if (e2eeReady() && me) {
      const md = await makeMsgKey(peerId);
      if (md) {
        const enc = await KoloE2EE.encryptMessage(md.msgKey, text);
        payload = {
          encrypted: true,
          cipher_text: enc.cipher,
          nonce: enc.nonce,
          message_keys: md.message_keys,
        };
        msgKey = md.msgKey;
      }
    }
    if (!payload || !msgKey) {
      setToast("Собеседник ещё не настроил шифрование — сообщение не отправлено");
      return;
    }
    api(`/api/conversations/${openConvoId}/messages`, payload)
      .then((r) => {
        const msg = { ...r.message, text, encrypted: false };
        setConversations((prev) => prev.map((c) => (c.id === openConvoId ? { ...c, messages: [...c.messages, msg], time: "только что", e2ee: true } : c)));
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
  function openPeerMedia(id) {
    fetch(`/api/users/${id}/media`, { credentials: "same-origin" })
      .then((r) => {
        if (r.status === 401) { window.location.href = "/login"; throw new Error("auth"); }
        if (r.status === 404) { setToast("Фото не найдены"); throw new Error("notfound"); }
        if (!r.ok) throw new Error("media " + r.status);
        return r.json();
      })
      .then((data) => {
        const frames = data.frames || [];
        if (frames.length) openStory(frames);
        else openProfile(id);
      })
      .catch((e) => { if (e.message !== "auth" && e.message !== "notfound") setToast("Не удалось открыть фото"); });
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
  function handleAvatarFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setToast("Аватар должен быть картинкой"); return; }
    if (file.size > 10 * 1024 * 1024) { setToast("Файл аватара слишком большой"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const source = document.createElement("img");
      source.onload = () => {
        const baseScale = 280 / Math.min(source.naturalWidth, source.naturalHeight);
        setAvatarCrop({
          src: reader.result,
          width: source.naturalWidth,
          height: source.naturalHeight,
          baseScale,
          zoom: 1,
          x: 0,
          y: 0,
        });
      };
      source.onerror = () => setToast("Не удалось прочитать изображение");
      source.src = reader.result;
    };
    reader.onerror = () => setToast("Не удалось прочитать файл");
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [avatarCrop, setAvatarCrop] = useState(null);
  const avatarCropDrag = useRef(null);
  function moveAvatarCrop(e) {
    const drag = avatarCropDrag.current;
    if (!drag) return;
    const renderedWidth = drag.width * drag.baseScale * drag.zoom;
    const renderedHeight = drag.height * drag.baseScale * drag.zoom;
    const maxX = Math.max(0, (renderedWidth - 280) / 2);
    const maxY = Math.max(0, (renderedHeight - 280) / 2);
    setAvatarCrop((current) => current ? {
      ...current,
      x: Math.max(-maxX, Math.min(maxX, drag.x + e.clientX - drag.startX)),
      y: Math.max(-maxY, Math.min(maxY, drag.y + e.clientY - drag.startY)),
    } : current);
  }
  function startAvatarCropDrag(e) {
    if (!avatarCrop || avatarSaving) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    avatarCropDrag.current = {
      startX: e.clientX,
      startY: e.clientY,
      x: avatarCrop.x,
      y: avatarCrop.y,
      width: avatarCrop.width,
      height: avatarCrop.height,
      baseScale: avatarCrop.baseScale,
      zoom: avatarCrop.zoom,
    };
  }
  function stopAvatarCropDrag() {
    avatarCropDrag.current = null;
  }
  function saveAvatarCrop() {
    if (!avatarCrop || avatarSaving) return;
    const renderScale = avatarCrop.baseScale * avatarCrop.zoom;
    const renderedWidth = avatarCrop.width * renderScale;
    const renderedHeight = avatarCrop.height * renderScale;
    const left = (280 - renderedWidth) / 2 + avatarCrop.x;
    const top = (280 - renderedHeight) / 2 + avatarCrop.y;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const source = document.createElement("img");
    source.onload = () => {
      const sourceX = Math.max(0, -left / renderScale);
      const sourceY = Math.max(0, -top / renderScale);
      const sourceSize = 280 / renderScale;
      canvas.getContext("2d").drawImage(source, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 512, 512);
      const url = canvas.toDataURL("image/jpeg", 0.88);
      if (url.length > 1_000_000) {
        setToast("Не удалось уменьшить изображение");
        return;
      }
      setAvatarSaving(true);
      apiMethod("PUT", "/api/profile/avatar", { avatar_url: url })
        .then((r) => {
          setMe((m) => ({ ...m, avatarUrl: r.avatarUrl || url }));
          setViewUser((v) => (v && v.isMine ? { ...v, avatarUrl: r.avatarUrl || url } : v));
          setPosts((prev) => prev.map((p) => (p.isMine ? { ...p, avatarUrl: r.avatarUrl || url } : p)));
          setAvatarCrop(null);
          setToast("Аватар обновлён");
        })
        .catch((err) => setToast(err.message || "Не удалось загрузить аватар"))
        .finally(() => setAvatarSaving(false));
    };
    source.onerror = () => setToast("Не удалось подготовить изображение");
    source.src = avatarCrop.src;
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

  const fabAvailable = tab === "home" || tab === "pages" || tab === "messages" || (tab === "profile" && !viewUserId) || (tab === "boards" && !openBoardId);
  const fabOpen =
    (tab === "home" && composerOpen) ||
    (tab === "pages" && (openPageId ? pageComposerOpen : createOpen)) ||
    (tab === "messages" && showNewMsg) ||
    (tab === "profile" && storyComposerOpen);

  const openConvo_ = conversations.find((c) => c.id === openConvoId) || null;
  // Superuser (role "admin") gets support/moderator tools in the UI.
  const isAdmin = !!(me && me.role === "admin");

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
  function openMediaViewer(items, idx) {
    if (!items || items.length === 0) return;
    const i = Math.max(0, Math.min(idx, items.length - 1));
    setMediaAnimDir(0);
    setMediaViewerIdx(i);
    setMediaViewer({ items, start: i });
  }
  function closeMediaViewer() {
    setMediaViewer(null);
    setMediaViewerIdx(0);
  }
  function stepMediaViewer(dir) {
    if (!mediaViewer) return;
    setMediaAnimDir(dir);
    setMediaViewerIdx((i) => Math.min(mediaViewer.items.length - 1, Math.max(0, i + dir)));
  }
  function openFeedMedia(p) {
    const items = (feedMedia && feedMedia.length ? feedMedia : [p]).map((it) => (
      { postId: it.postId, url: it.url || it.media.url, type: (it.type || it.media.type) === "video" ? "video" : "image", title: it.title, text: it.text || it.body, author: it.author, authorHandle: it.authorHandle, authorId: it.authorId, avatarInitials: it.avatarInitials })
    );
    const idx = Math.max(0, items.findIndex((it) => it.postId === p.id));
    openMediaViewer(items, idx);
  }
  function startNavDrag(e) {
    if (e.target.closest("button")) return;
    const el = navRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offX = e.clientX - rect.left;
    const offY = e.clientY - rect.top;
    el.style.position = "fixed";
    el.style.zIndex = "95";
    el.style.left = rect.left + "px";
    el.style.top = rect.top + "px";
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.setAttribute("data-nav-pos", "");
    const move = (ev) => {
      el.style.left = (ev.clientX - offX) + "px";
      el.style.top = (ev.clientY - offY) + "px";
    };
    const up = (ev) => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const w = window.innerWidth, h = window.innerHeight;
      const dl = ev.clientX, dr = w - ev.clientX, dt = ev.clientY, db = h - ev.clientY;
      const min = Math.min(dl, dr, dt, db);
      const pos = min === dl ? "left" : min === dr ? "right" : min === dt ? "top" : "bottom";
      el.style.position = ""; el.style.left = ""; el.style.top = ""; el.style.zIndex = ""; el.style.right = ""; el.style.bottom = "";
      setNavPos(pos);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  }
  const navDragMoved = useRef(false);
  function activateNavItem(id) {
    if (id === "video") { openVideoFeedFromStart(); return; }
    if (id === "settings") { setSettingsOpen(true); return; }
    openTab(id);
  }
  function onNavPointerDown(e) {
    const btn = e.target.closest(".t-tab-btn");
    if (btn) { navDragMoved.current = false; startIconDrag(e, btn); }
    else if (!e.target.closest(".t-tab-pill")) { startNavDrag(e); }
  }
  function startIconDrag(e, btn) {
    const dragId = btn.dataset.tabId;
    const pid = e.pointerId;
    const sx = e.clientX, sy = e.clientY;
    let active = false;
    const move = (ev) => {
      if (ev.pointerId !== pid) return;
      // Only treat it as a reorder once the pointer actually travels;
      // otherwise a jittery press would swallow the click.
      if (!active) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
        active = true;
        navDragMoved.current = true;
      }
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const over = el && el.closest(".t-tab-btn");
      if (!over) return;
      const overId = over.dataset.tabId;
      if (overId && overId !== dragId) {
        setNavItems((cur) => {
          const arr = cur.slice();
          const i = arr.indexOf(dragId), j = arr.indexOf(overId);
          if (i < 0 || j < 0) return cur;
          arr.splice(i, 1);
          arr.splice(j, 0, dragId);
          return arr;
        });
      }
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  }
  function moveNavItem(idx, dir) {
    setNavItems((cur) => {
      const arr = cur.slice();
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return cur;
      const tmp = arr[idx]; arr[idx] = arr[j]; arr[j] = tmp;
      return arr;
    });
  }
  function removeNavItem(id) {
    if (id === "profile") return;
    setNavHidden((cur) => (cur.includes(id) ? cur : cur.concat(id)));
    setNavItems((cur) => (cur.length <= 2 ? cur : cur.filter((x) => x !== id)));
  }
  function addNavItem(id) {
    setNavHidden((cur) => cur.filter((x) => x !== id));
    setNavItems((cur) => (cur.includes(id) ? cur : cur.concat(id)));
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

  useEffect(() => {
    if (!mediaViewer) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeMediaViewer();
      else if (e.key === "ArrowLeft") stepMediaViewer(-1);
      else if (e.key === "ArrowRight") stepMediaViewer(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mediaViewer]);

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
        {isAdmin && (
          <button className="t-card-act warn" title="Предупредить о нарушении правил" onClick={(e) => { e.stopPropagation(); setWarnPost(p); setWarnReason(""); }}>
            <ShieldAlert size={13} />
          </button>
        )}
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
              <div className="t-card-text-title">{renderHashtags(p.title, (tag) => { setQuery(tag); saveRecentSearch(tag); })}</div>
              {p.body && <div className={"t-card-text-preview" + (htmlLike(p.body) ? " html" : "")} dangerouslySetInnerHTML={{ __html: bodyContent(p.body) }} />}
            </div>
            {actions}
          </div>
        ) : (
          <React.Fragment>
            <div className="t-card-media">
              {p.media.type === "video" ? (
                <button className="t-card-video-open" onClick={(e) => { e.stopPropagation(); openFeedMedia(p); }} aria-label="Открыть видео" title="Открыть видео">
                  <video src={p.media.url} muted loop playsInline autoPlay />
                  <div className="t-card-play"><span><Play size={14} fill="currentColor" /></span></div>
                </button>
              ) : (
                <button className="t-card-img-open" onClick={(e) => { e.stopPropagation(); openFeedMedia(p); }} aria-label="Открыть фото" title="Открыть фото">
                  <img src={p.media.url} alt="" onError={imgErr} />
                </button>
              )}
              {saveBtn}
              {storyBtn}
            </div>
            <div className="t-card-footer">
              {repostBanner}
              <div className="t-card-title">{renderHashtags(p.title, (tag) => { setQuery(tag); saveRecentSearch(tag); })}</div>
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
        <div className={"tap-root" + (theme === "light" ? " light" : "")} data-nav-pos={navPos} data-accent={accent}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap');

        .tap-root {
          --bg: #14140F; --surface: #1D1E17; --surface-hover: #262719; --card: #1F2018;
          --border: #2E3024; --text: #EDEAE0; --text-dim: #9A9C8C; --text-faint: #6C6E60;
          --gold: #4F9C8C; --teal: #4F9C8C; --rust: #2E6B60;
          --gold-rgb: 79,156,140;
          --header-bg: rgba(20,20,15,0.94);
          background: var(--bg); color: var(--text); font-family: 'Unbounded', sans-serif;
          height: 100dvh; overflow: hidden;
          position: relative; display: flex; flex-direction: column;
        }
        .tap-root.light {
          --bg: #F7F5EC; --surface: #FFFFFF; --surface-hover: #EFEDE1; --card: #FFFFFF;
          --border: #E6E3D4; --text: #1D1E17; --text-dim: #61635A; --text-faint: #A0A293;
          --gold: #3E8B7A; --teal: #3E8B7A; --rust: #2E6B60;
          --gold-rgb: 62,139,122;
          --header-bg: rgba(247,245,236,0.92);
        }
        .tap-root[data-accent="blue"] { --gold: #5B8FE0; --teal: #5B8FE0; --rust: #2E5C9C; --gold-rgb: 91,143,224; }
        .tap-root.light[data-accent="blue"] { --gold: #4A7DC6; --teal: #4A7DC6; --rust: #2E5C9C; --gold-rgb: 74,125,198; }
        .tap-root[data-accent="red"] { --gold: #D96A54; --teal: #D96A54; --rust: #9A392F; --gold-rgb: 217,106,84; }
        .tap-root.light[data-accent="red"] { --gold: #C65842; --teal: #C65842; --rust: #9A392F; --gold-rgb: 198,88,66; }
        .tap-root[data-accent="purple"] { --gold: #A57AD9; --teal: #A57AD9; --rust: #66429B; --gold-rgb: 165,122,217; }
        .tap-root.light[data-accent="purple"] { --gold: #8F63C4; --teal: #8F63C4; --rust: #66429B; --gold-rgb: 143,99,196; }
        .tap-root[data-accent="white"] { --gold: #EDEAE2; --teal: #EDEAE2; --rust: #B9B7AC; --gold-rgb: 237,234,226; }
        .tap-root.light[data-accent="white"] { --gold: #FFFFFF; --teal: #FFFFFF; --rust: #D9D6C8; --gold-rgb: 255,255,255; }
        .tap-root * { box-sizing: border-box; }
        .tap-serif { font-family: 'Unbounded', sans-serif; }
        .tap-mono { font-family: 'Unbounded', sans-serif; }

        /* ── Support chat / superuser panel ────────────────────────────── */
        .t-support-card {
          width: 100%; display: flex; align-items: center; gap: 12px; text-align: left;
          background: linear-gradient(135deg, rgba(var(--gold-rgb),0.16), rgba(var(--gold-rgb),0.05));
          border: 1px solid rgba(var(--gold-rgb),0.4); border-radius: 16px;
          padding: 14px 16px; margin-bottom: 10px; color: var(--text); cursor: pointer;
          font-family: 'Unbounded', sans-serif; transition: border-color .15s, background .15s;
        }
        .t-support-card:hover { border-color: var(--gold); background: linear-gradient(135deg, rgba(var(--gold-rgb),0.24), rgba(var(--gold-rgb),0.08)); }
        .t-support-card.unread { border-color: var(--gold); }
        .t-support-icon {
          width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--gold); color: #17170F;
        }
        .t-support-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .t-support-name { font-size: 14px; font-weight: 700; color: var(--text); }
        .t-support-sub { font-size: 12px; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-support-open { color: var(--gold); font-size: 15px; flex-shrink: 0; }
        .t-support-card.t-support-admin { cursor: default; opacity: 0.85; }
        .t-admin-panel {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          background: rgba(224,96,78,0.08); border: 1px solid rgba(224,96,78,0.35);
          border-radius: 16px; padding: 12px 16px; margin-bottom: 12px;
        }
        .t-admin-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--text); flex-shrink: 0; }
        .t-admin-btn {
          display: inline-flex; align-items: center; gap: 7px; padding: 8px 13px;
          border: 1px solid var(--border); border-radius: 999px; background: var(--surface);
          color: var(--text); font-family: 'Unbounded', sans-serif; font-size: 12px; cursor: pointer;
          transition: border-color .15s, background .15s;
        }
        .t-admin-btn:hover { border-color: #E0604E; background: rgba(224,96,78,0.12); }
        .t-admin-form { display: flex; flex-direction: column; gap: 12px; }
        .t-admin-form textarea {
          width: 100%; min-height: 84px; resize: vertical; background: var(--surface);
          border: 1px solid var(--border); border-radius: 12px; color: var(--text);
          font-family: 'Unbounded', sans-serif; font-size: 13px; padding: 12px 14px; outline: none;
        }
        .t-admin-form textarea:focus { border-color: var(--gold); }
        .t-card-act.warn { color: var(--text-faint); }
        .t-card-act.warn:hover { color: #E0604E; }
        .t-action-btn.warn { color: var(--text-dim); }
        .t-action-btn.warn:hover { color: #E0604E; border-color: #E0604E; }

        .t-header { position: sticky; top: 0; z-index: 20; background: var(--header-bg); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 14px 20px; flex-shrink: 0; box-shadow: 0 10px 30px -14px rgba(0,0,0,0.45); }
        .t-header::after { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 22px; pointer-events: none; z-index: 19; background: linear-gradient(to bottom, var(--header-bg), rgba(0,0,0,0)); }
        .t-header-row { display: flex; align-items: center; gap: 12px; width: 100%; }
        .t-brand { display: flex; align-items: center; flex-shrink: 0; cursor: pointer; user-select: none; }
        .t-brand-name { font-family: 'Body Grotesque Large', 'Body Grotesque', 'Inter', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0; line-height: 1; }
        .t-brand-logo { height: 40px; width: auto; display: block; }
        .t-console-btn { display: inline-flex; align-items: center; gap: 6px; margin-left: 2px; padding: 7px 11px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; color: var(--text-dim); cursor: pointer; font-size: 12px; font-family: 'Unbounded', sans-serif; transition: all .15s; flex-shrink: 0; }
        .t-console-btn:hover { color: #17170F; background: var(--gold); border-color: var(--gold); }
        .t-console-btn-label { line-height: 1; }
        .t-search { flex: 1; display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 8px 14px; transition: border-color .15s; position: relative; }
        .t-search:focus-within { border-color: var(--gold); }
        .t-search input { background: none; border: none; outline: none; color: var(--text); font-size: 13.5px; width: 100%; font-family: 'Unbounded', sans-serif; }
        .t-search input::placeholder { color: var(--text-faint); }
        .t-search-clear { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: var(--surface-hover); border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; border-radius: 50%; flex-shrink: 0; padding: 0; transition: all .15s; }
        .t-search-clear:hover { color: #17170F; background: var(--gold); border-color: var(--gold); }
        .t-search-recent { position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 30; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.35); padding: 8px; animation: t-tab-in-fwd 0.15s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-search-recent-head { display: flex; align-items: center; justify-content: space-between; padding: 4px 8px 8px; font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
        .t-search-recent-clear { background: none; border: none; color: var(--text-dim); font-size: 11.5px; cursor: pointer; font-family: 'Unbounded', sans-serif; padding: 0; }
        .t-search-recent-clear:hover { color: #E0604E; }
        .t-search-recent-item { display: flex; align-items: center; gap: 9px; padding: 8px 9px; border-radius: 9px; cursor: pointer; color: var(--text-dim); transition: background .12s, color .12s; }
        .t-search-recent-item:hover { background: var(--surface-hover); color: var(--text); }
        .t-search-recent-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
        .t-search-recent-x { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: none; border: none; color: var(--text-faint); cursor: pointer; border-radius: 50%; padding: 0; flex-shrink: 0; }
        .t-search-recent-x:hover { color: #E0604E; background: var(--surface-hover); }

        /* ── Orb search button ─────────────────────────────────────────── */
        .t-orb-wrap { margin-left: auto; display: flex; align-items: center; justify-content: flex-end; position: relative; }
        .t-orb-canvas {
          width: 44px; height: 44px; border-radius: 50%; display: block; pointer-events: none;
          cursor: pointer;
          transition: width .5s cubic-bezier(.22,1,.36,1), border-radius .5s cubic-bezier(.22,1,.36,1), transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .t-orb-wrap.island .t-orb-canvas {
          width: 132px; border-radius: 50%;
          box-shadow: 0 0 34px rgba(var(--gold-rgb),.5);
        }
        .t-orb-wrap.island:hover .t-orb-canvas { transform: scale(1.04); }
        .t-orb-wrap.island:active .t-orb-canvas { transform: scale(.97); }
        .t-orb-wrap:hover .t-orb-canvas { transform: scale(1.12); box-shadow: 0 0 24px rgba(var(--gold-rgb),.45); }
        .t-orb-wrap:active .t-orb-canvas { transform: scale(.94); }
        .t-orb-wrap.island .t-orb-badge {
          position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
          pointer-events: none; z-index: 2;
          min-width: 20px; height: 20px; padding: 0 5px; border-radius: 999px;
          background: var(--gold); color: #17170F;
          display: flex; align-items: center; justify-content: center;
          font: 700 11px/1 'Unbounded', sans-serif;
          animation: t-island-pulse 1.6s ease-in-out infinite;
        }
        .t-orb-badge {
          position: absolute; right: -4px; top: -4px; pointer-events: none; z-index: 2;
          min-width: 18px; height: 18px; padding: 0 4px; border-radius: 999px;
          background: var(--rust); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font: 700 10px/1 'Unbounded', sans-serif;
          box-shadow: 0 2px 6px rgba(0,0,0,.35);
        }
        @keyframes t-island-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(var(--gold-rgb),.4); transform: translateY(-50%) scale(1); }
          50% { box-shadow: 0 0 14px rgba(var(--gold-rgb),.9); transform: translateY(-50%) scale(1.15); }
        }

        /* ── Search overlay ────────────────────────────────────────────── */
        .t-search-overlay {
          position: fixed; inset: 0; z-index: 100;
          display: flex; flex-direction: column; align-items: center;
          background: rgba(7,8,13,.72);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          opacity: 0; pointer-events: none;
          transition: opacity .35s cubic-bezier(.22,1,.36,1);
          padding: 0 20px;
        }
        .t-search-overlay.open { opacity: 1; pointer-events: auto; }

        .t-search-overlay-bar {
          display: flex; align-items: center; gap: 10px; width: min(580px, 100%);
          margin-top: 60px; background: var(--surface); border: 1px solid var(--border);
          border-radius: 999px; padding: 10px 16px;
          transform: translateY(20px) scale(.96);
          transition: transform .35s cubic-bezier(.22,1,.36,1), border-color .2s;
        }
        .t-search-overlay.open .t-search-overlay-bar { transform: translateY(0) scale(1); }
        .t-search-overlay-bar:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(var(--gold-rgb),.12); }
        .t-search-overlay-bar input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--text); font: 500 15px/1.4 'Unbounded', sans-serif;
        }
        .t-search-overlay-bar input::placeholder { color: var(--text-faint); }
        .t-search-overlay-close {
          width: 28px; height: 28px; border: none; border-radius: 50%;
          background: var(--surface-hover); color: var(--text-dim); cursor: pointer;
          display: grid; place-items: center; font-size: 16px; padding: 0;
          transition: background .15s, color .15s;
        }
        .t-search-overlay-close:hover { background: var(--gold); color: #17170F; }
        .t-search-overlay-results {
          width: min(580px, 100%); margin-top: 16px; overflow-y: auto;
          max-height: calc(100vh - 160px); flex: 1;
        }
        .t-search-overlay-hint {
          margin-top: 24px; font-size: 12px; color: var(--text-faint); text-align: center;
        }
        .t-search-overlay-hint kbd {
          display: inline-block; padding: 2px 7px; border-radius: 5px;
          background: var(--surface); border: 1px solid var(--border);
          font-family: inherit; font-size: 11px; color: var(--text-dim);
        }

        .t-search-results { animation: t-tab-in-fwd 0.22s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-search-filters { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .t-search-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .t-search-tab { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .12s; white-space: nowrap; }
        .t-search-tab:hover { border-color: var(--gold); color: var(--text); }
        .t-search-tab.active { background: var(--gold); border-color: var(--gold); color: #17170F; }
        .t-search-sort { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 8px; padding: 5px 10px; font-size: 12px; cursor: pointer; margin-left: auto; }
        .t-search-sort:focus { outline: none; border-color: var(--gold); }

        .t-sr-label { display: flex; align-items: baseline; gap: 8px; font-size: 12px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.08em; margin: 18px 0 10px; }
        .t-sr-label:first-of-type { margin-top: 4px; }
        .t-sr-count { font-size: 11px; font-weight: 600; color: var(--text-faint); }

        .t-srow {
          display: flex; align-items: center; gap: 13px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 12px 14px; margin-bottom: 8px;
          cursor: pointer; transition: border-color .15s, transform .12s, box-shadow .15s;
        }
        .t-srow:hover { border-color: var(--gold); transform: translateY(-1px); box-shadow: 0 8px 22px -12px rgba(0,0,0,.5); }
        .t-srow-avatar {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 13px; font-weight: 700; font-family: 'Unbounded', sans-serif;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.16);
        }
        .t-srow-main { flex: 1; min-width: 0; }
        .t-srow-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-srow-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 3px; font-size: 11.5px; color: var(--text-faint); }
        .t-srow-meta .dot { opacity: .5; }
        .t-srow-desc { font-size: 12px; color: var(--text-dim); margin-top: 4px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
        .t-srow-score { display: inline-flex; align-items: center; gap: 4px; color: var(--gold); font-weight: 600; }
        .t-srow-chip { display: inline-flex; align-items: center; gap: 4px; background: var(--surface-hover); border: 1px solid var(--border); border-radius: 999px; padding: 2px 9px; font-size: 11px; color: var(--text-dim); }
        .t-srow-thumb { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }

        .t-search-summary { font-size: 12px; color: var(--text-faint); margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; }
        .t-search-results mark { background: rgba(255, 202, 92, 0.32); color: var(--gold); padding: 0 2px; border-radius: 3px; }

        .t-suggest { margin-top: 14px; }
        .t-suggest-label { font-size: 12.5px; color: var(--text-dim); margin-bottom: 10px; }
        .t-suggest-list { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .t-suggest-btn { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 7px 15px; border-radius: 999px; font-size: 13px; cursor: pointer; transition: all .15s; font-family: 'Unbounded', sans-serif; }
        .t-suggest-btn:hover { border-color: var(--gold); color: var(--gold); }
        .t-new-btn { display: flex; align-items: center; gap: 6px; background: var(--gold); color: #17170F; border: none; padding: 8px 14px; border-radius: 999px; font-weight: 600; font-size: 13px; cursor: pointer; flex-shrink: 0; transition: transform .12s, filter .12s; font-family: 'Unbounded', sans-serif; }
        .t-new-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .t-screen-title { font-size: 19px; font-weight: 700; font-family: 'Unbounded', sans-serif; }

        .t-body { flex: 1; width: 100%; padding: 18px 20px 20px; overflow-y: auto; }

        .t-composer { background: var(--surface); border: 1px solid var(--gold); border-radius: 16px; padding: 16px; margin-bottom: 16px; }
        .t-composer-head { font-size: 12px; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
        .t-composer input, .t-composer textarea { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 9px 11px; font-size: 13.5px; margin-bottom: 8px; font-family: 'Unbounded', sans-serif; outline: none; }
        .t-composer input:focus, .t-composer textarea:focus { border-color: var(--gold); }
        .t-composer textarea { resize: vertical; min-height: 60px; }
        .t-composer .ql-toolbar { background: var(--bg); border: 1px solid var(--border); border-radius: 10px 10px 0 0; border-bottom: none; padding: 6px 8px; }
        .t-composer .ql-container { border: 1px solid var(--border); border-radius: 0 0 10px 10px; background: var(--bg); font-family: 'Unbounded', sans-serif; font-size: 13.5px; margin-bottom: 8px; }
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
        .t-page-composer .ql-toolbar .ql-picker.ql-font .ql-picker-label:not([data-value])::before { content: "Inter"; font-family: 'Unbounded', sans-serif; }
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
        .t-btn-ghost { background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 7px 14px; border-radius: 999px; font-size: 13px; cursor: pointer; font-family: 'Unbounded', sans-serif; }
        .t-btn-solid { background: var(--gold); border: none; color: #17170F; font-weight: 600; padding: 7px 16px; border-radius: 999px; font-size: 13px; cursor: pointer; font-family: 'Unbounded', sans-serif; }
        .t-btn-solid:disabled { opacity: 0.4; cursor: not-allowed; }

        .t-sorts { display: flex; gap: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 4px; width: fit-content; margin-bottom: 16px; }
        .t-refresh-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .t-refresh-time { font-size: 11px; color: var(--text-faint); }
        .t-refresh-btn { display: flex; align-items: center; gap: 5px; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: 'Unbounded', sans-serif; }
        .t-refresh-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--text); }
        .t-refresh-btn:disabled { opacity: 0.5; cursor: default; }
        .t-sort-btn { display: flex; align-items: center; gap: 5px; background: transparent; border: none; color: var(--text-dim); padding: 6px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: 'Unbounded', sans-serif; }
        .t-sort-btn:hover { color: var(--text); }
        .t-sort-btn.active { background: var(--gold); color: #17170F; }

        .t-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
        .t-card { position: relative; aspect-ratio: 1 / 1; border-radius: 16px; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 8px 18px -14px rgba(0,0,0,0.7); transition: transform .15s, box-shadow .15s, border-color .15s; }
        .t-card:hover { transform: translateY(-3px); box-shadow: 0 4px 10px rgba(0,0,0,0.3), 0 16px 28px -16px rgba(0,0,0,0.8); border-color: #3a3c2c; }
        .t-card-media { position: relative; flex: 1; min-height: 0; background: var(--surface); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .t-card-media img, .t-card-media video { width: 100%; height: 100%; object-fit: cover; }
        .t-card-img-open { display: block; width: 100%; height: 100%; background: none; border: none; padding: 0; cursor: zoom-in; }
        .t-card-text { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 14px; }
        .t-card-text-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-shrink: 0; }
        .t-card-text-head .t-card-save { position: static; }
        .t-card-nick { font-size: 12px; font-weight: 600; color: var(--gold); font-family: 'Unbounded', sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-card-text-body { flex: 1; min-height: 0; overflow: hidden; margin: 4px 0 10px; }
        .t-card-text-title { font-size: 17px; font-weight: 700; line-height: 1.35; font-family: 'Unbounded', sans-serif; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
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
        .t-hashtag { background: none; border: none; color: var(--gold); font-weight: 600; cursor: pointer; padding: 0; font: inherit; }
        .t-hashtag:hover { text-decoration: underline; }
        .t-card-actions { display: flex; align-items: center; gap: 2px; }
        .t-card-act { display: flex; align-items: center; gap: 3px; background: none; border: none; color: var(--text-faint); font-size: 10.5px; font-weight: 600; padding: 3px 5px; border-radius: 6px; cursor: pointer; transition: color .12s, background .12s; font-family: 'JetBrains Mono', monospace; }
        .t-card-act:hover { background: var(--surface-hover); color: var(--text); }
        .t-card-act.up.active { color: var(--gold); }
        .t-card-act.down.active { color: var(--teal); }
        .t-card-act.repost.active { color: var(--gold); }
        .t-card-act.comment { margin-left: auto; font-family: 'Unbounded', sans-serif; }
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

        /* Fullscreen media viewer (lightbox for photo/video) */
        .t-media-viewer { position: absolute; inset: 0; background: rgba(8,8,6,0.94); backdrop-filter: blur(6px); z-index: 80; display: flex; align-items: center; justify-content: center; animation: t-fade-in .18s ease-out; }
        .t-media-viewer-inner { position: relative; width: min(96vw, 860px); max-height: 96vh; display: flex; flex-direction: column; align-items: center; }
        .t-media-viewer-close { position: absolute; top: 12px; right: 12px; z-index: 3; width: 38px; height: 38px; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.35); transition: background .15s, transform .15s; }
        .t-media-viewer-close:hover { background: rgba(0,0,0,0.75); transform: scale(1.06); }
        .t-media-stage { width: 100%; border-radius: 16px; overflow: hidden; background: #000; box-shadow: 0 24px 60px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
        .t-media-frame { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .t-media-frame-in { animation: t-media-slide .3s cubic-bezier(.2,.7,.3,1); }
        @keyframes t-media-slide {
          from { opacity: 0; transform: translateX(var(--tx, 46px)); }
          40% { opacity: 1; }
          to { opacity: 1; transform: translateX(0); }
        }
        .t-media-stage img, .t-media-stage video { width: 100%; max-height: 78vh; display: block; background: #000; object-fit: contain; }
        .t-media-meta { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; color: #fff; max-width: 860px; }
        .t-media-author { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--teal); cursor: pointer; }
        .t-media-author:hover { text-decoration: underline; }
        .t-media-avatar { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #17170F; font-family: 'Unbounded', sans-serif; flex-shrink: 0; }
        .t-media-title { font-size: 15px; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }
        .t-media-text { font-size: 13px; color: rgba(255,255,255,0.78); line-height: 1.5; overflow-wrap: anywhere; max-height: 96px; overflow-y: auto; }
        .t-media-count { font-size: 11px; color: var(--text-faint); margin-top: 8px; font-family: 'JetBrains Mono', monospace; }
        .t-media-nav { position: absolute; top: 0; bottom: 0; width: 14%; z-index: 2; background: none; border: none; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; opacity: 0.7; }
        .t-media-nav:hover { opacity: 1; }
        .t-media-nav:disabled { opacity: 0; cursor: default; }
        .t-media-nav::before { content: ""; position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.94); box-shadow: 0 4px 14px rgba(0,0,0,0.35); }
        .t-media-nav img { position: relative; z-index: 1; width: 28px; height: 28px; }
        .t-media-nav--prev img { transform: scaleX(-1); }
        .t-media-nav--prev { left: -84px; }
        .t-media-nav--next { right: -84px; }
        .t-tab-video { margin-left: auto; }
        .t-tab-video:hover { color: var(--teal); }

        .t-scroll-hint { text-align: center; font-size: 11.5px; color: var(--text-faint); margin-top: 18px; padding-bottom: 4px; animation: t-hint-bob 1.6s ease-in-out infinite; }
        .t-scroll-end { text-align: center; font-size: 11.5px; color: var(--text-faint); margin-top: 18px; padding-bottom: 4px; }
        @keyframes t-hint-bob { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 1; transform: translateY(3px); } }

        /* Post detail modal */
        .t-modal-backdrop { position: absolute; inset: 0; background: rgba(10,10,7,0.72); backdrop-filter: blur(3px); z-index: 40; display: flex; align-items: flex-end; justify-content: center; }
        .t-share-backdrop { z-index: 45; }
        .t-modal { background: var(--card); border: 1px solid var(--border); border-radius: 22px 22px 0 0; width: fit-content; min-width: min(92vw, 360px); max-width: 640px; max-height: 82%; overflow-y: auto; padding: 18px 20px 22px; animation: t-modal-in .2s ease-out; }
        @keyframes t-modal-in { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .t-modal-close { position: sticky; top: 0; display: flex; justify-content: flex-end; margin-bottom: 4px; }
        .t-modal-close button { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .t-modal-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .t-follow-btn { display: flex; align-items: center; gap: 5px; margin-left: auto; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: 'Unbounded', sans-serif; }
        .t-follow-btn:hover { border-color: var(--gold); color: var(--text); }
        .t-follow-btn.following { background: var(--gold); border-color: var(--gold); color: #17170F; }
        .t-profile-actions { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 14px; }
        .t-profile-actions .t-follow-btn { margin-left: 0; }
        .t-block-btn { display: flex; align-items: center; gap: 5px; background: none; border: 1px solid var(--border); color: var(--text-dim); padding: 8px 16px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: 'Unbounded', sans-serif; }
        .t-block-btn:hover { border-color: #e4554f; color: #e4554f; }
        .t-block-btn.blocked { background: #e4554f; border-color: #e4554f; color: #F4FAF7; }
        .t-avatar { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #17170F; font-family: 'Unbounded', sans-serif; }
        .t-avatar img, .t-comment-avatar img, .t-convo-avatar img, .t-thread-peer-avatar img, .t-msg-avatar img, .t-srow-avatar img, .t-board-avatar img, .t-media-avatar img, .t-chat-post-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
        .t-modal-meta-text { font-size: 11.5px; color: var(--text-faint); }
        .t-modal-meta-author { color: var(--text-dim); font-weight: 600; }
        .t-modal-title { font-size: 18px; font-weight: 700; line-height: 1.35; margin: 0 0 8px; max-width: 560px; overflow-wrap: anywhere; }
        .t-avatar-crop-modal { width: min(92vw, 380px); }
        .t-avatar-crop-help { color: var(--text-faint); font-size: 12px; line-height: 1.45; margin: 0 0 12px; text-align: center; }
        .t-avatar-crop-stage { width: 280px; height: 280px; max-width: 100%; margin: 0 auto 16px; overflow: hidden; position: relative; border-radius: 50%; background: var(--bg); cursor: grab; touch-action: none; box-shadow: 0 0 0 1px var(--border), 0 8px 24px rgba(0,0,0,.24); }
        .t-avatar-crop-stage:active { cursor: grabbing; }
        .t-avatar-crop-image { position: absolute; max-width: none; user-select: none; pointer-events: none; }
        .t-avatar-crop-overlay { position: absolute; inset: 0; border: 1px solid rgba(255,255,255,.45); border-radius: 50%; pointer-events: none; }
        .t-avatar-crop-control { display: flex; align-items: center; gap: 10px; margin: 0 auto 16px; max-width: 280px; color: var(--text-faint); }
        .t-avatar-crop-control input { flex: 1; accent-color: var(--gold); }
        .t-avatar-crop-control span { font-size: 15px; line-height: 1; }
        .t-modal-body { font-size: 14px; color: var(--text-dim); line-height: 1.55; margin: 0 0 14px; max-width: 560px; overflow-wrap: anywhere; }
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
        .t-action-btn { display: flex; align-items: center; gap: 5px; background: var(--surface); border: none; color: var(--text-dim); font-size: 12px; padding: 8px 12px; border-radius: 999px; cursor: pointer; transition: background .12s, color .12s; font-family: 'Unbounded', sans-serif; }
        .t-action-btn:hover { background: var(--surface-hover); color: var(--text); }
        .t-action-btn.saved { color: var(--gold); }
        .t-comments-head { font-size: 12.5px; font-weight: 700; color: var(--text-dim); margin-bottom: 10px; }
        .t-comment { display: flex; gap: 8px; font-size: 12.5px; margin-bottom: 10px; }
        .t-comment-author { color: var(--teal); font-weight: 600; flex-shrink: 0; }
        .t-comment-text { color: var(--text-dim); line-height: 1.4; }
        .t-comment-empty { font-size: 12px; color: var(--text-faint); font-style: italic; margin-bottom: 9px; }
        .t-comment-card { display: flex; gap: 10px; padding: 11px; border: 1px solid var(--border); border-radius: 14px; margin-bottom: 9px; background: var(--surface); }
        .t-comment-card.t-comment-reply { margin-left: 26px; background: var(--bg); }
        .t-comment-avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; font-family: 'Unbounded', sans-serif; }
        .t-comment-main { flex: 1; min-width: 0; }
        .t-comment-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; font-size: 13px; }
        .t-comment-author { color: var(--teal); font-weight: 600; cursor: pointer; }
        .t-comment-author:hover { text-decoration: underline; }
        .t-comment-reply-to { font-size: 11.5px; color: var(--text-faint); }
        .t-comment-time { font-size: 11.5px; color: var(--text-faint); }
        .t-comment-text { color: var(--text); line-height: 1.45; margin: 3px 0 7px; font-size: 13.5px; }
        .t-comment-media { width: 100%; max-height: 280px; border-radius: 12px; overflow: hidden; margin: 0 0 8px; background: var(--bg); }
        .t-comment-media img { width: 100%; max-height: 280px; object-fit: contain; display: block; }
        .t-comment-media video { width: 100%; max-height: 280px; display: block; }
        .t-comment-form-media { position: relative; width: 100%; max-height: 200px; border-radius: 12px; overflow: hidden; background: var(--bg); }
        .t-comment-form-media img { width: 100%; max-height: 200px; object-fit: contain; display: block; }
        .t-comment-form-media video { width: 100%; max-height: 200px; display: block; }
        .t-comment-attach { display: flex; align-items: center; justify-content: center; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 38px; height: 38px; cursor: pointer; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-comment-attach:hover { color: var(--gold); border-color: var(--gold); }
        .t-media-remove { position: absolute; top: 6px; right: 6px; width: 26px; height: 26px; border-radius: 50%; background: rgba(0,0,0,0.55) !important; color: #fff !important; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
        .t-media-remove:hover { background: rgba(0,0,0,0.75) !important; }
        .t-comment-actions { display: flex; align-items: center; gap: 14px; }
        .t-comment-like { display: inline-flex; align-items: center; gap: 5px; background: none; border: none; color: var(--text-faint); font-size: 12px; cursor: pointer; font-family: 'Unbounded', sans-serif; padding: 0; transition: color .12s; }
        .t-comment-like:hover { color: #e4554f; }
        .t-comment-like.liked { color: #e4554f; }
        .t-comment-reply-btn { background: none; border: none; color: var(--text-dim); font-size: 12px; cursor: pointer; font-family: 'Unbounded', sans-serif; padding: 0; transition: color .12s; }
        .t-comment-reply-btn:hover { color: var(--gold); }
        .t-comment-form { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
        .t-reply-chip { display: flex; align-items: center; gap: 7px; align-self: flex-start; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 5px 10px; font-size: 12px; color: var(--text-dim); }
        .t-reply-chip strong { color: var(--text); }
        .t-reply-chip-x { display: flex; align-items: center; justify-content: center; background: var(--surface-hover); border: none; color: var(--text-dim); border-radius: 50%; width: 18px; height: 18px; cursor: pointer; padding: 0; }
        .t-reply-chip-x:hover { color: #e4554f; }
        .t-comment-form-row { display: flex; gap: 6px; }
        .t-comment-form input { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 999px; padding: 8px 13px; font-size: 12.5px; outline: none; font-family: 'Unbounded', sans-serif; }
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
        .t-interest-hero { background: linear-gradient(160deg, var(--surface), rgba(var(--gold-rgb),0.08)); border: 1px solid var(--border); border-radius: 18px; padding: 22px 16px; text-align: center; }
        .t-interest-hero-icon { font-size: 30px; margin-bottom: 8px; }
        .t-interest-hero-title { font-family: 'Unbounded', sans-serif; font-size: 19px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .t-interest-hero-sub { font-size: 12.5px; color: var(--text-faint); line-height: 1.5; margin-bottom: 16px; }
        .t-interest-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 18px; }
        .t-interest-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--bg); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 14px; font-size: 12.5px; cursor: pointer; transition: border-color .12s, color .12s, background .12s; font-family: 'Unbounded', sans-serif; }
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
        .t-interest-tag { font-size: 11.5px; background: rgba(var(--gold-rgb),0.12); border: 1px solid rgba(var(--gold-rgb),0.35); color: var(--gold); border-radius: 999px; padding: 3px 10px; }
        .t-interest-edit { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 5px 12px; font-size: 11.5px; cursor: pointer; transition: color .12s, border-color .12s; font-family: 'Unbounded', sans-serif; }
        .t-interest-edit:hover { color: var(--text); border-color: var(--gold); }
        .t-interest-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .t-filter-chip { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 5px 12px; font-size: 11.5px; cursor: pointer; transition: border-color .12s, color .12s; font-family: 'Unbounded', sans-serif; }
        .t-filter-chip:hover { border-color: var(--gold); color: var(--text); }
        .t-filter-chip.on { background: var(--gold); border-color: transparent; color: #17170F; font-weight: 600; }
        .t-community-tag { display: inline-block; margin-left: 8px; font-size: 10px; font-weight: 600; vertical-align: middle; background: rgba(78,205,196,0.14); border: 1px solid rgba(78,205,196,0.35); color: var(--teal); border-radius: 999px; padding: 2px 8px; }
        .t-create-page { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; margin-bottom: 10px; }
        .t-create-page input, .t-page-composer input { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 10px; padding: 9px 12px; font-size: 13px; outline: none; font-family: 'Unbounded', sans-serif; }
        .t-create-page input:focus, .t-page-composer input:focus, .t-page-composer textarea:focus { border-color: var(--teal); }
        .t-create-page textarea, .t-page-composer textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 10px; padding: 9px 12px; font-size: 12.5px; outline: none; resize: vertical; min-height: 54px; font-family: 'Unbounded', sans-serif; }
        .t-create-page-actions, .t-page-composer-actions { display: flex; justify-content: flex-end; gap: 8px; }
        .t-page-head { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .t-page-head-main { flex: 1; min-width: 0; }
        .t-page-title { font-size: 17px; font-weight: 700; font-family: 'Unbounded', sans-serif; }
        .t-page-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
        .t-page-desc { font-size: 12.5px; color: var(--text-dim); line-height: 1.4; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; }
        .t-page-composer { display: flex; flex-direction: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; margin-bottom: 6px; }
        .t-page-composer .ql-toolbar { background: var(--bg); border: 1px solid var(--border); border-radius: 10px 10px 0 0; border-bottom: none; padding: 6px 8px; }
        .t-page-composer .ql-container { border: 1px solid var(--border); border-radius: 0 0 10px 10px; background: var(--bg); font-family: 'Unbounded', sans-serif; font-size: 13px; }
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
        .t-msgs-title { font-size: 17px; font-weight: 700; font-family: 'Unbounded', sans-serif; }
        .t-new-msg-btn { display: flex; align-items: center; gap: 6px; background: var(--gold); color: #17170F; border: none; padding: 7px 13px; border-radius: 999px; font-weight: 600; font-size: 12.5px; cursor: pointer; transition: filter .12s; font-family: 'Unbounded', sans-serif; }
        .t-new-msg-btn:hover { filter: brightness(1.08); }
        .t-msgs-new { display: flex; align-items: center; gap: 6px; background: var(--gold); color: #17170F; border: none; padding: 7px 13px; border-radius: 999px; font-weight: 600; font-size: 12.5px; cursor: pointer; transition: filter .12s; font-family: 'Unbounded', sans-serif; }
        .t-msgs-new:hover { filter: brightness(1.08); }
        .t-board-screen { position: relative; width: 100%; height: calc(100vh - 100px); height: calc(100dvh - 100px); min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
        .t-board-toolbar { display: flex; align-items: center; gap: 10px; padding: 4px 2px 10px; flex-shrink: 0; }
        .t-board-title { flex: 1; font-size: 15px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-board-toolbar-right { display: flex; align-items: center; gap: 8px; }
        .t-board-add-btn { font-size: 12.5px; padding: 7px 12px; }
        .t-board-owner-badge { font-size: 11px; color: var(--gold); border: 1px solid var(--gold); padding: 3px 8px; border-radius: 999px; font-family: 'JetBrains Mono', monospace; }
        .t-board-canvas { flex: 1; position: relative; overflow: hidden; border: 1px dashed var(--border); border-radius: 16px; background-color: var(--bg); background-repeat: repeat; touch-action: none; cursor: grab; }
        .t-board-canvas * { touch-action: none; }
        .t-board-canvas:active { cursor: grabbing; }
        .t-board-hint { position: absolute; top: 0; left: 0; font-size: 12px; color: var(--text-faint); white-space: nowrap; pointer-events: none; font-style: italic; z-index: 3; }
        .t-board-viewport { position: absolute; top: 0; left: 0; will-change: transform; }
        .t-board-world { position: absolute; top: 0; left: 0; }
        .t-board-card { position: absolute; top: 0; left: 0; width: 230px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 10px 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.18); cursor: grab; user-select: none; transition: box-shadow .12s, border-color .12s; }
        .t-board-card:hover { border-color: var(--gold); }
        .t-board-card.dragging { opacity: 0.85; box-shadow: 0 12px 28px rgba(0,0,0,0.32); }
        .t-board-media { width: 100%; max-height: 220px; object-fit: cover; border-radius: 10px; margin-bottom: 8px; display: block; }
        .t-board-card-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .t-board-card-body { font-size: 12.5px; color: var(--text-dim); line-height: 1.4; word-break: break-word; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
        .t-board-card-author { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12px; color: var(--text-faint); }
        .t-board-avatar { width: 22px; height: 22px; border-radius: 50%; background: var(--gold); color: #17170F; font-weight: 700; font-size: 10px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .t-board-card-del { position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border); background: var(--bg); color: var(--text-dim); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .t-board-card-del:hover { color: #ff5a5a; border-color: #ff5a5a; }
        .t-board-members-panel { position: absolute; top: 56px; right: 6px; width: 240px; max-height: calc(100% - 64px); overflow-y: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; z-index: 5; box-shadow: 0 10px 26px rgba(0,0,0,0.2); }
        .t-board-members-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold); margin-bottom: 10px; }
        .t-board-invite { position: relative; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .t-board-invite input { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 9px 11px; font-size: 13px; font-family: 'Unbounded', sans-serif; outline: none; }
        .t-board-invite input:focus { border-color: var(--gold); }
        .t-board-invite .t-btn-solid { width: 100%; font-size: 12.5px; padding: 9px 10px; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .t-board-invite .t-btn-solid:disabled { opacity: 0.45; cursor: not-allowed; }
        .t-board-invite-pop { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 20; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; box-shadow: 0 10px 26px rgba(0,0,0,0.3); max-height: 200px; overflow-y: auto; }
        .t-board-invite-user { display: flex; align-items: center; gap: 8px; padding: 7px 9px; cursor: pointer; border-bottom: 1px solid var(--border); }
        .t-board-invite-user:last-child { border-bottom: none; }
        .t-board-invite-user:hover { background: var(--surface-hover); }
        .t-board-invite-user-name { flex: 1; font-size: 12.5px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-board-invite-user-handle { font-size: 11px; color: var(--text-faint); font-family: 'JetBrains Mono', monospace; }
        .t-board-member { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--border); }
        .t-board-member:last-child { border-bottom: none; }
        .t-board-member-name { flex: 1; font-size: 13px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .t-board-member-del { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--border); background: var(--bg); color: var(--text-dim); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .t-board-member-del:hover { color: #ff5a5a; border-color: #ff5a5a; }
        .t-board-post-modal { max-width: 420px; width: 92%; }
        .t-board-post-textarea { width: 100%; min-height: 90px; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 9px 11px; font-size: 13.5px; margin-bottom: 8px; font-family: 'Unbounded', sans-serif; outline: none; resize: vertical; }

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
        .t-unread-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; box-shadow: 0 0 0 3px rgba(var(--gold-rgb),0.2); }
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
        .t-thread-peer-avatar { position: relative; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: #17170F; flex-shrink: 0; cursor: pointer; box-shadow: 0 0 0 3px var(--surface), 0 0 0 4px rgba(var(--gold-rgb),0.35), 0 6px 14px rgba(0,0,0,0.25); transition: transform .12s; }
        .t-thread-peer-avatar:hover { transform: scale(1.05); }
        .t-thread-peer { flex: 1; min-width: 0; }
        .t-thread-name { font-size: 16px; font-weight: 600; cursor: pointer; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-thread-name:hover { text-decoration: underline; }
        .t-thread-status { font-size: 11.5px; color: var(--text-faint); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-thread-status.on { color: #34c77b; font-weight: 600; }
        .t-thread-status.typing { color: var(--gold); font-style: italic; font-weight: 600; }
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
        .t-chat-post { display: flex; gap: 10px; min-width: 220px; max-width: 300px; align-items: flex-start; }
        .t-chat-post-thumb { width: 56px; height: 56px; flex-shrink: 0; border-radius: 10px; overflow: hidden; background: var(--card); }
        .t-chat-post-thumb img, .t-chat-post-thumb video { width: 100%; height: 100%; object-fit: cover; }
        .t-chat-post-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .t-chat-post-title { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .t-chat-post-snippet { font-size: 11.5px; opacity: 0.85; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; word-break: break-word; }
        .t-chat-post-author { display: flex; align-items: center; gap: 5px; margin-top: 2px; font-size: 11px; opacity: 0.9; min-width: 0; }
        .t-chat-post-avatar { width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 700; color: #17170F; }
        .t-chat-post-author-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; text-decoration: underline dotted; }
        .t-chat-post-score { align-self: flex-start; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .t-msg-media { width: 100%; min-width: 180px; max-width: 280px; border-radius: 10px; overflow: hidden; background: var(--bg); }
        .t-msg-media img { width: 100%; max-height: 280px; object-fit: contain; display: block; }
        .t-msg-media video { width: 100%; max-height: 280px; display: block; }
        .t-thread-msg-media { position: relative; width: 100%; max-width: 300px; border-radius: 12px; overflow: hidden; background: var(--bg); margin-top: 6px; }
        .t-thread-msg-media img { width: 100%; max-height: 200px; object-fit: contain; display: block; }
        .t-thread-msg-media video { width: 100%; max-height: 200px; display: block; }
        .t-msg-attach { display: flex; align-items: center; justify-content: center; background: none; border: none; color: var(--text-faint); cursor: pointer; flex-shrink: 0; transition: color .12s, transform .12s; }
        .t-msg-attach:hover { color: var(--gold); transform: scale(1.08); }
        .t-share-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 10px; padding: 4px 0 12px; }
        .t-settings-side-note { font-size: 12px; color: var(--text-faint); margin: 6px 0 12px; line-height: 1.5; }
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
        .t-thread-empty-title { font-size: 15px; font-weight: 700; font-family: 'Unbounded', sans-serif; }
        .t-thread-empty-sub { font-size: 12.5px; color: var(--text-faint); margin-top: 4px; }
        .t-thread-footer { position: sticky; bottom: -1px; background: linear-gradient(180deg, rgba(20,20,15,0), var(--bg) 32%); padding-top: 10px; margin-top: 4px; }
        .t-thread-blocked { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 14px; margin-bottom: 10px; border-radius: 12px; background: rgba(228,85,79,0.12); border: 1px solid rgba(228,85,79,0.35); color: #e4554f; font-size: 12.5px; font-weight: 600; }
        .t-thread-input-disabled { opacity: 0.55; }
        .t-thread-input-disabled input { cursor: default; }
        .t-convo-blocked { display: inline-flex; color: #e4554f; margin-left: 2px; vertical-align: middle; }
        .t-quick-replies { display: flex; gap: 7px; overflow-x: auto; padding: 4px 0 10px; scrollbar-width: none; }
        .t-quick-replies::-webkit-scrollbar { display: none; }
        .t-quick-chip { flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); font-size: 12px; padding: 7px 13px; border-radius: 999px; cursor: pointer; white-space: nowrap; transition: background .12s, color .12s, border-color .12s, transform .12s; font-family: 'Unbounded', sans-serif; }
        .t-quick-chip:hover { background: var(--surface-hover); color: var(--text); border-color: var(--teal); transform: translateY(-1px); }
        .t-thread-input { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 6px; transition: border-color .15s, box-shadow .15s; }
        .t-thread-input:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(var(--gold-rgb),0.16); }
        .t-thread-input input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 13.5px; padding: 8px 4px 8px 0; min-width: 0; font-family: 'Unbounded', sans-serif; }
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
        .t-notif-row.chat { cursor: pointer; transition: background .12s, border-color .12s; border: 1px solid transparent; }
        .t-notif-row.chat:hover { background: var(--surface-hover); border-color: var(--teal); }
        .t-notif-row.chat .t-notif-text { color: var(--text); }
        .t-notif-open { margin-left: auto; align-self: center; color: var(--teal); font-size: 16px; font-weight: 700; flex-shrink: 0; }
        .t-notif-icon { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .t-notif-text { font-size: 13px; color: var(--text-dim); line-height: 1.4; }
        .t-notif-time { font-size: 11px; color: var(--text-faint); margin-top: 3px; }
        .t-notif-empty { padding: 14px 8px 10px; }
        .t-notif-empty-title { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .t-notif-empty-sub { font-size: 13px; color: var(--text-faint); line-height: 1.5; margin-bottom: 14px; }

        .t-thread.t-notif-flash { animation: t-notif-flash 1.15s ease-out; }
        @keyframes t-notif-flash {
          0% { box-shadow: 0 0 0 0 var(--t-notif-glow, rgba(var(--gold-rgb),0.35)); }
          100% { box-shadow: 0 0 0 26px rgba(var(--gold-rgb),0); }
        }

        /* Profile */
        .t-profile-head { display: flex; flex-direction: column; align-items: center; padding: 10px 0 22px; text-align: center; }
        .t-profile-avatar { width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(150deg, var(--gold), var(--rust)); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; color: #17170F; font-family: 'Unbounded', sans-serif; margin-bottom: 12px; }
        .t-profile-avatar-img { width: 76px; height: 76px; border-radius: 50%; object-fit: cover; display: block; }
        .t-profile-avatar-mine { cursor: pointer; transition: filter .15s, transform .15s; position: relative; }
        .t-profile-avatar-mine:hover { filter: brightness(1.12); transform: scale(1.03); }
        .t-profile-avatar-mine img, .t-profile-avatar-mine .t-avatar-loading { pointer-events: none; }
        .t-avatar-loading { animation: t-avatar-pulse 1s ease-in-out infinite; }
        @keyframes t-avatar-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .t-profile-name { font-size: 18px; font-weight: 700; font-family: 'Unbounded', sans-serif; }
        .t-profile-name-btn { background: none; border: none; color: var(--text); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; padding: 0; margin: 0; transition: color .12s; }
        .t-profile-name-btn:hover { color: var(--teal); }
        .t-profile-tag { font-size: 12.5px; color: var(--text-faint); margin-top: 2px; }
        .t-profile-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 22px; margin-top: 16px; }
        .t-profile-tabs { display: flex; gap: 8px; margin-bottom: 16px; }
        .t-profile-locked { text-align: center; padding: 40px 12px; border: 1px dashed var(--border); border-radius: 16px; color: var(--text-dim); }
        .t-profile-locked-ico { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; margin: 0 auto 14px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border); color: var(--accent); }
        .t-profile-locked-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; font-family: 'Unbounded', sans-serif; }
        .t-profile-locked-sub { font-size: 12.5px; color: var(--text-faint); line-height: 1.55; max-width: 320px; margin: 0 auto; }
        .t-profile-tab { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-width: 40px; height: 40px; padding: 0 12px; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 12px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: background .15s, color .15s, border-color .15s; }
        .t-profile-tab:hover { color: var(--text); border-color: var(--gold); }
        .t-profile-tab.active { background: var(--gold); color: #17170F; border-color: var(--gold); }
        .t-tab-label { white-space: nowrap; }
        .t-tab-count { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: rgba(255,255,255,0.08); color: var(--text-dim); font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .t-profile-tab.active .t-tab-count { background: rgba(0,0,0,0.18); color: #17170F; }
        .t-stat { text-align: center; }
        .t-stat-click { cursor: pointer; }
        .t-stat-click:hover .t-stat-num { color: var(--accent); }
        .t-stat-num { font-size: 16px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .t-stat-label { font-size: 11px; color: var(--text-faint); margin-top: 2px; }
        .t-profile-edit { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px 16px; margin-bottom: 22px; }
        .t-field-label { display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 6px; }
        .t-profile-edit .t-input { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 12px; padding: 10px 13px; font-size: 13px; outline: none; font-family: 'Unbounded', sans-serif; }
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
        .t-story-add-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; background: linear-gradient(150deg, var(--gold), var(--rust)); border: none; color: #17170F; font-weight: 700; border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: transform .15s, filter .15s; }
        .t-story-add-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
        .t-story-composer .t-input { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 12px; padding: 10px 13px; font-size: 13px; outline: none; font-family: 'Unbounded', sans-serif; margin-bottom: 4px; }
        .t-story-composer .t-input:focus { border-color: var(--teal); }
        .t-story-composer select.t-input { appearance: none; }
        .t-story-composer .t-media-preview { max-height: 260px; }

        /* Profile settings (gear) + theme toggle */
        .t-profile-wrap { position: relative; }
        .t-settings-btn { position: absolute; top: 2px; right: 2px; background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 5; transition: color .15s, border-color .15s; }
        .t-settings-btn:hover { color: var(--text); border-color: var(--gold); }
        .t-settings-title { font-family: 'Unbounded', sans-serif; font-size: 19px; font-weight: 600; margin: 2px 0 14px; }
        .t-settings { width: fit-content; min-width: min(86vw, 320px); max-width: 440px; }
        .t-settings-screen { position: absolute; inset: 0; z-index: 60; background: var(--bg); display: flex; opacity: 0; visibility: hidden; pointer-events: none; transform: scale(1.02) translateY(14px); transition: opacity .24s ease, transform .28s cubic-bezier(.2,.8,.25,1), visibility .24s; }
        .t-settings-screen.open { opacity: 1; visibility: visible; pointer-events: auto; transform: none; }
        @keyframes t-tab-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
        @keyframes t-tab-in-back { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: none; } }
        .t-settings-screen-body-anim { animation: t-tab-in .26s cubic-bezier(.2,.8,.25,1); }
        .t-settings-screen-body-anim.back { animation-name: t-tab-in-back; }
        .t-settings-screen-inner { display: flex; flex-direction: column; flex: 1; min-width: 0; max-width: 760px; margin: 0 auto; width: 100%; height: 100%; }
        .t-settings-screen-head { display: flex; align-items: center; gap: 12px; padding: 18px 20px 10px; }
        .t-settings-screen-close { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-settings-screen-close:hover { color: var(--text); border-color: var(--gold); }
        .t-settings-tabs { display: flex; gap: 6px; padding: 0 20px; border-bottom: 1px solid var(--border); overflow-x: auto; scrollbar-width: none; }
        .t-settings-tabs::-webkit-scrollbar { display: none; }
        .t-settings-tab { display: flex; align-items: center; gap: 7px; padding: 11px 14px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-family: 'Unbounded', sans-serif; font-size: 13px; cursor: pointer; white-space: nowrap; transition: color .12s, border-color .12s; flex-shrink: 0; }
        .t-settings-tab:hover { color: var(--text); }
        .t-settings-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
        .t-settings-screen-body { flex: 1; overflow-y: auto; padding: 8px 20px 40px; }
        .t-settings-group { display: flex; flex-direction: column; max-width: 720px; }
        .t-settings .t-settings-title { margin-bottom: 10px; }
        .t-settings-section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); margin: 18px 2px 2px; font-weight: 700; }
        .t-nav-hint { margin-bottom: 6px; line-height: 1.4; }
        .t-nav-item-row { display: flex; align-items: center; gap: 12px; padding: 9px 2px; border-bottom: 1px solid var(--border); }
        .t-nav-item-row:last-child { border-bottom: none; }
        .t-nav-item-hidden { opacity: 0.6; }
        .t-nav-item-ico { width: 24px; display: flex; align-items: center; justify-content: center; color: var(--text-dim); flex-shrink: 0; }
        .t-nav-item-label { flex: 1; font-size: 13.5px; }
        .t-nav-item-actions { display: flex; align-items: center; gap: 6px; }
        .t-nav-item-actions button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); cursor: pointer; font-size: 15px; line-height: 1; display: flex; align-items: center; justify-content: center; transition: color .12s, border-color .12s, opacity .12s; }
        .t-nav-item-actions button:hover:not(:disabled) { color: var(--text); border-color: var(--gold); }
        .t-nav-item-actions button:disabled { opacity: 0.35; cursor: default; }
        .t-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 2px; border-bottom: 1px solid var(--border); }
        .t-settings-row:last-child { border-bottom: none; }
        .t-settings-row-title { font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }
        .t-settings-row-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; max-width: 320px; overflow-wrap: anywhere; }
        .t-settings-info { min-width: 0; }
        .t-settings-link { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 8px 16px; font-size: 12.5px; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: color .12s, border-color .12s; }
        .t-settings-link:hover { color: var(--text); border-color: var(--gold); }
        .t-bl-row { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--border); }
        .t-bl-row:last-child { border-bottom: none; }
        .t-bl-info { flex: 1; min-width: 0; }
        .t-bl-name { font-size: 13.5px; font-weight: 600; overflow-wrap: anywhere; }
        .t-bl-handle { font-size: 12px; color: var(--text-faint); margin-top: 1px; overflow-wrap: anywhere; }
        .t-bl-unblock { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-bl-unblock:hover { color: #e4554f; border-color: #e4554f; }
        .t-acc-row { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--border); }
        .t-acc-row:last-child { border-bottom: none; }
        .t-acc-actions { display: flex; gap: 7px; flex-shrink: 0; }
        .t-acc-switch { background: var(--gold); border: 1px solid var(--gold); color: #17170F; border-radius: 999px; padding: 7px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: opacity .12s; }
        .t-acc-switch:hover { opacity: .88; }
        .t-acc-remove { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-acc-remove:hover { color: #e4554f; border-color: #e4554f; }
        .t-acc-current { display: inline-block; margin-left: 8px; font-size: 10.5px; font-weight: 600; color: var(--teal); border: 1px solid var(--teal); border-radius: 999px; padding: 1px 7px; vertical-align: middle; }
        .t-acc-add { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; margin-top: 14px; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 999px; padding: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: border-color .12s, color .12s; }
        .t-acc-add:hover { border-color: var(--gold); color: var(--gold); }
        .t-settings-side-note { font-size: 12px; color: var(--text-faint); line-height: 1.5; margin: 4px 0 14px; }
        .t-pk-add { display: flex; gap: 8px; margin-bottom: 10px; }
        .t-pk-name { flex: 1; min-width: 0; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 12px; padding: 10px 13px; font-size: 13px; font-family: 'Unbounded', sans-serif; outline: none; transition: border-color .12s; }
        .t-pk-name:focus { border-color: var(--gold); }
        .t-pk-add-btn { display: flex; align-items: center; gap: 6px; background: var(--gold); border: 1px solid var(--gold); color: #17170F; border-radius: 12px; padding: 0 16px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: opacity .12s; }
        .t-pk-add-btn:hover:not(:disabled) { opacity: .88; }
        .t-pk-add-btn:disabled { opacity: .6; cursor: default; }
        .t-pk-msg { font-size: 12.5px; color: #e4554f; margin-bottom: 10px; }
        .t-pk-msg.ok { color: var(--teal); }
        .t-pk-row { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--border); }
        .t-pk-row:last-child { border-bottom: none; }
        .t-pk-remove { background: transparent; border: 1px solid var(--border); color: var(--text-dim); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: color .12s, border-color .12s; }
        .t-pk-remove:hover { color: #e4554f; border-color: #e4554f; }
        .t-pk-device { display: inline-block; margin-left: 8px; font-size: 10.5px; font-weight: 600; color: var(--gold); border: 1px solid var(--gold); border-radius: 999px; padding: 1px 7px; vertical-align: middle; }
        .t-theme-toggle { display: flex; gap: 3px; background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 3px; flex-shrink: 0; }
        .t-theme-toggle button { display: flex; align-items: center; gap: 5px; background: none; border: none; color: var(--text-faint); padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; transition: background .15s, color .15s; }
        .t-theme-toggle button.active { background: var(--gold); color: #17170F; }
        .t-accent-hint { margin: 4px 0 10px; }
        .t-accent-picker { display: flex; flex-wrap: wrap; gap: 10px; padding: 4px 0 10px; }
        .t-accent-swatch { display: flex; align-items: center; gap: 9px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 7px 12px 7px 8px; cursor: pointer; transition: border-color .15s, background .15s; font-family: 'Unbounded', sans-serif; }
        .t-accent-swatch:hover { border-color: var(--gold); }
        .t-accent-swatch.active { border-color: var(--gold); background: rgba(var(--gold-rgb), 0.08); }
        .t-accent-dot { width: 20px; height: 20px; border-radius: 50%; background: var(--swatch); border: 2px solid var(--card); box-shadow: 0 0 0 1px var(--border); flex-shrink: 0; }
        .t-accent-label { font-size: 12.5px; color: var(--text-dim); }
        .t-accent-swatch.active .t-accent-label { color: var(--text); }
        .t-language-toggle button { min-width: 44px; justify-content: center; }
        .t-logout-btn { display: flex; align-items: center; gap: 6px; background: none; border: 1px solid var(--border); color: #E0604E; padding: 8px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: border-color .15s, background .15s; }
        .t-logout-btn:hover { border-color: #E0604E; background: rgba(224,96,78,0.1); }
        .t-danger-title { color: #E0604E; }
        .t-danger-btn { display: flex; align-items: center; gap: 6px; background: none; border: 1px solid #E0604E; color: #E0604E; padding: 8px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: 'Unbounded', sans-serif; flex-shrink: 0; transition: border-color .15s, background .15s; }
        .t-danger-btn:hover { background: rgba(224,96,78,0.1); }
        .t-danger-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .t-delete-reasons { display: flex; flex-direction: column; gap: 8px; margin: 4px 0 16px; }
        .t-delete-reason { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 11px 14px; cursor: pointer; transition: border-color .15s, background .15s; }
        .t-delete-reason:hover { border-color: var(--gold); }
        .t-delete-reason.active { border-color: #E0604E; background: rgba(224,96,78,0.08); }
        .t-delete-reason input { accent-color: #E0604E; margin: 0; }
        .t-delete-reason span { font-size: 13.5px; font-weight: 500; }
        .t-section-label { font-size: 12px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }

        /* Bottom nav */
        .t-bottom-nav { flex-shrink: 0; background: rgba(20,20,15,0.55); backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4); border-top: 1px solid rgba(255,255,255,0.06); padding: 12px 24px calc(14px + env(safe-area-inset-bottom, 0px)); display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; }
        .tap-root.light .t-bottom-nav { background: rgba(247,245,236,0.6); border-top: 1px solid rgba(0,0,0,0.05); }
        .t-fab { background: linear-gradient(150deg, var(--gold), var(--rust)); border: none; color: #17170F; width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; box-shadow: 0 4px 14px rgba(var(--gold-rgb),0.35), 0 2px 6px rgba(0,0,0,0.3); transition: transform .15s, filter .15s; }
        .t-fab:hover { transform: translateY(-2px) scale(1.04); filter: brightness(1.06); }
        .t-fab.open { background: var(--surface); color: var(--text-dim); border: 1px solid var(--border); box-shadow: none; }
        .t-tab-pill { position: relative; display: flex; align-items: center; gap: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 7px; overflow: hidden; }
        .t-tab-slider { position: absolute; top: 8px; bottom: 8px; left: 0; border-radius: 999px; background: linear-gradient(150deg, var(--gold), var(--rust)); box-shadow: 0 2px 10px rgba(var(--gold-rgb),0.4); pointer-events: none; will-change: transform, width; z-index: 0; transition: transform .28s cubic-bezier(0.22, 1, 0.36, 1), width .28s cubic-bezier(0.22, 1, 0.36, 1); }
        .t-tab-btn { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; background: none; border: none; color: var(--text-faint); cursor: pointer; padding: 10px 16px; border-radius: 999px; transition: color .15s; font-family: 'Unbounded', sans-serif; }
        .t-tab-btn.active { color: #17170F; }
        .tap-root:not([data-nav-pos="left"]):not([data-nav-pos="right"]) .t-tab-pill { flex: 1 1 auto; max-width: 640px; justify-content: center; }
        .tap-root:not([data-nav-pos="left"]):not([data-nav-pos="right"]) .t-tab-btn { flex: 1 1 0; min-width: 0; justify-content: center; padding: 10px 10px; }
        .t-tab-badge { position: absolute; top: 4px; right: 12px; width: 8px; height: 8px; border-radius: 50%; background: var(--rust); border: 1.5px solid var(--surface); transition: border-color .15s; }
        .t-tab-btn.active .t-tab-badge { border-color: #17170F; }
        body.t-dragging, body.t-dragging * { cursor: grabbing !important; user-select: none; -webkit-user-select: none; }

        /* Navbar repositioning (top / bottom / left / right) */
        .tap-root[data-nav-pos="top"] .t-bottom-nav { order: -1; border-top: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .tap-root.light[data-nav-pos="top"] .t-bottom-nav { border-bottom: 1px solid rgba(0,0,0,0.05); }
        .tap-root[data-nav-pos="left"] .t-bottom-nav,
        .tap-root[data-nav-pos="right"] .t-bottom-nav {
          position: absolute; top: 0; bottom: 0; width: 74px; flex-direction: column; padding: 16px 8px; justify-content: center; z-index: 30; border-top: none;
        }
        .tap-root[data-nav-pos="left"] .t-bottom-nav { left: 0; border-right: 1px solid rgba(255,255,255,0.06); }
        .tap-root[data-nav-pos="right"] .t-bottom-nav { right: 0; border-left: 1px solid rgba(255,255,255,0.06); }
        .tap-root.light[data-nav-pos="left"] .t-bottom-nav { border-right: 1px solid rgba(0,0,0,0.05); }
        .tap-root.light[data-nav-pos="right"] .t-bottom-nav { border-left: 1px solid rgba(0,0,0,0.05); }
        .tap-root[data-nav-pos="left"] .t-body { padding-left: 96px; }
        .tap-root[data-nav-pos="right"] .t-body { padding-right: 96px; }
        .tap-root[data-nav-pos="left"] .t-tab-pill,
        .tap-root[data-nav-pos="right"] .t-tab-pill { flex-direction: column; }
        .tap-root[data-nav-pos="left"] .t-tab-slider,
        .tap-root[data-nav-pos="right"] .t-tab-slider { display: none; }
        .t-nav-grip { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 36px; height: 4px; border-radius: 2px; background: var(--text-faint); opacity: 0.5; }
        .tap-root[data-nav-pos="left"] .t-nav-grip,
        .tap-root[data-nav-pos="right"] .t-nav-grip { width: 22px; }

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

        @media (min-width: 481px) and (max-width: 900px) {
          .t-bottom-nav { padding: 10px 16px calc(12px + env(safe-area-inset-bottom, 0px)); gap: 10px; }
          .t-fab { width: 48px; height: 48px; }
          .t-tab-btn { padding: 10px 8px; }
        }

        @media (max-width: 480px) {
          .t-header { padding: 12px 14px; } .t-body { padding: 14px 14px 16px; }
          .t-bottom-nav { padding: 8px 10px calc(10px + env(safe-area-inset-bottom, 0px)); gap: 8px; }
          .t-grid { grid-template-columns: repeat(2, 1fr); }
          .t-tab-pill { gap: 2px; padding: 5px; max-width: none; }
          .t-tab-btn { padding: 9px 3px; }
          .t-tab-btn.active .t-tab-badge { border-color: #17170F; }
          .t-tab-badge { right: 6px; top: 3px; }
          .t-fab { width: 44px; height: 44px; }
          .t-nav-grip { top: 4px; width: 30px; height: 3px; }
          .t-profile-stats { gap: 16px; }
        }

        .t-boundary { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .t-boundary-card { max-width: 360px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px 24px; }
        .t-boundary-title { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
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

        /* Копирование текста разрешено только в чате (список диалогов и открытый диалог),
           а также в полях ввода. Из остального интерфейса выделение отключено. */
        .tap-root { user-select: none; -webkit-user-select: none; }
        .tap-root input,
        .tap-root textarea,
        .tap-root [contenteditable="true"],
        .tap-root .t-convo-grid,
        .tap-root .t-thread {
          user-select: text; -webkit-user-select: text;
        }
      `}</style>

      <div className="t-header">
        <div className="t-header-row">
          <div className="t-brand" onClick={() => { openTab("home"); setQuery(""); }} title="На главную" role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") { openTab("home"); setQuery(""); } }}>
            <img className="t-brand-logo" src={theme === "light" ? "/static/logo2.png" : "/static/logo1.png"} alt="tap" />
          </div>
          {isAdmin && (
            <button type="button" className="t-console-btn" title="Консоль ошибок (Boris)" aria-label="Консоль ошибок"
              onClick={(e) => { e.stopPropagation(); try { window.koloErrors && window.koloErrors.open(); } catch (err) {} }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
              <span className="t-console-btn-label">Консоль</span>
            </button>
          )}
          <div className={"t-orb-wrap" + (islandCount > 0 && !searchOverlayOpen ? " island" : "")} onClick={() => setSearchOverlayOpen(true)} title={islandCount > 0 ? "Уведомления — Поиск (Ctrl+K)" : "Поиск (Ctrl+K)"} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setSearchOverlayOpen(true); }}>
            <canvas ref={orbCanvasRef} className="t-orb-canvas" width={88} height={88} />
            {islandCount > 0 && <span className={searchOverlayOpen ? "t-orb-badge" : "t-orb-badge island-badge"}>{islandCount}</span>}
          </div>
        </div>
      </div>

      {/* ── Search overlay ────────────────────────────────────────────── */}
      <div className={"t-search-overlay" + (searchOverlayOpen ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setSearchOverlayOpen(false); }}>
        <div className="t-search-overlay-bar">
          <Search size={16} color="var(--text-dim)" />
          <input
            ref={orbSearchInputRef}
            placeholder="Поиск людей и постов"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={searchOverlayOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = query.trim();
                if (q.length >= 2) saveRecentSearch(q);
              } else if (e.key === "Escape") {
                setSearchOverlayOpen(false);
              }
            }}
          />
          <button className="t-search-overlay-close" onClick={() => setSearchOverlayOpen(false)} aria-label="Закрыть">
            &times;
          </button>
        </div>
        {!query.trim() && recentSearches.length > 0 && (
          <div style={{ width: "min(580px,100%)", marginTop: 12 }}>
            <div className="t-search-recent" style={{ position: "static", boxShadow: "none", border: "1px solid var(--border)", background: "var(--surface)" }}>
              <div className="t-search-recent-head">
                <span className="t-search-recent-title">Недавние запросы</span>
                <button className="t-search-recent-clear" onClick={clearRecentSearches}>Очистить</button>
              </div>
              {recentSearches.map((rq) => (
                <div key={rq} className="t-search-recent-item" onClick={() => { setQuery(rq); saveRecentSearch(rq); }}>
                  <Clock size={13} />
                  <span className="t-search-recent-text">{rq}</span>
                  <button className="t-search-recent-x" onClick={(e) => { e.stopPropagation(); removeRecentSearch(rq); }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {query.trim().length >= 2 && (
          <div className="t-search-overlay-results">
            {searchLoading && <div className="t-empty" style={{ paddingTop: 40 }}>Поиск…</div>}
            {!searchLoading && searchDone && (searchUsers.length + searchPosts.length + searchPages.length + searchComments.length) === 0 && (
              <div className="t-empty" style={{ paddingTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
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
                <button className="t-btn-solid" onClick={() => {
                  setComposer({ title: "", body: query.trim(), mediaUrl: "", mediaType: null, mediaName: "" });
                  setSearchOverlayOpen(false);
                  setComposerOpen(true);
                }}>Создать пост «{query.trim()}»</button>
              </div>
            )}
            {!searchLoading && searchDone && (searchUsers.length + searchPosts.length + searchPages.length + searchComments.length) > 0 && (
              <div>
                <div className="t-search-summary">Результаты по запросу «{query.trim()}»</div>
                <div className="t-search-filters">
                  <div className="t-search-tabs">
                    {[
                      { id: "all", label: "Все" },
                      { id: "people", label: "Люди", count: searchUsers.length },
                      { id: "pages", label: "Страницы", count: searchPages.length },
                      { id: "posts", label: "Посты", count: searchPosts.length },
                      { id: "comments", label: "Комментарии", count: searchComments.length },
                    ].filter((f) => f.count === undefined || f.count > 0).map((f) => (
                      <button key={f.id} className={"t-search-tab" + (searchFilter === f.id ? " active" : "")} onClick={() => setSearchFilter(f.id)}>
                        {f.label}{f.count != null ? ` (${f.count})` : ""}
                      </button>
                    ))}
                  </div>
                  {searchFilter === "posts" && (
                    <select className="t-search-sort" value={searchSort} onChange={(e) => setSearchSort(e.target.value)}>
                      <option value="relevance">По релевантности</option>
                      <option value="recent">По дате</option>
                      <option value="popular">По популярности</option>
                    </select>
                  )}
                </div>
                {(searchFilter === "all" || searchFilter === "people") && searchUsers.length > 0 && (
                  <div>
                    <div className="t-sr-label">Люди<span className="t-sr-count">{searchUsers.length}</span></div>
                    {searchUsers.map((u) => (
                      <div key={u.id} className="t-srow" onClick={() => { setSearchOverlayOpen(false); setViewUserId(u.id); }}>
                        <div className="t-srow-avatar" style={{ background: solidFor(u.name || u.handle) }}>{u.avatarInitials || (u.handle ? u.handle[1] : "?")}</div>
                        <div className="t-srow-main">
                          <div className="t-srow-title">{highlight(u.name || u.username, query)}</div>
                          <div className="t-srow-meta">{u.handle}</div>
                          {u.bio && <div className="t-srow-desc">{highlight(truncText(u.bio, 90), query)}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(searchFilter === "all" || searchFilter === "pages") && searchPages.length > 0 && (
                  <div>
                    <div className="t-sr-label">Страницы<span className="t-sr-count">{searchPages.length}</span></div>
                    {searchPages.map((p) => (
                      <div key={p.id} className="t-srow" onClick={() => { setSearchOverlayOpen(false); openPage(p.id); }}>
                        <div className="t-srow-avatar" style={{ background: solidFor(p.name) }}>{p.icon || (p.name ? p.name[0] : "?")}</div>
                        <div className="t-srow-main">
                          <div className="t-srow-title">{highlight(p.name, query)}</div>
                          {p.desc && <div className="t-srow-desc">{highlight(truncText(p.desc, 90), query)}</div>}
                          <div className="t-srow-meta">
                            <span className="t-srow-chip">{p.members.toLocaleString("ru-RU")} участников</span>
                            {p.interest && <span className="t-srow-chip">{p.interest}</span>}
                            {p.joined && <span className="t-srow-chip">Вы участник</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(searchFilter === "all" || searchFilter === "posts") && searchPosts.length > 0 && (
                  <div>
                    <div className="t-sr-label">Посты<span className="t-sr-count">{searchPosts.length}</span></div>
                    {searchPosts.map((p) => (
                      <div key={p.id} className="t-srow" onClick={() => { setSearchOverlayOpen(false); setOpenPostId(p.id); }}>
                        <div className="t-srow-avatar" style={{ background: solidFor(p.author) }}>{p.avatarInitials}</div>
                        <div className="t-srow-main">
                          <div className="t-srow-title">{highlight(p.title, query)}</div>
                          {p.body && <div className="t-srow-desc">{highlight(truncText(stripHtml(p.body), 100), query)}</div>}
                          <div className="t-srow-meta">
                            <span>{p.author}</span>
                            <span className="dot">·</span>
                            <span>{p.authorHandle}</span>
                            <span className="dot">·</span>
                            <span className="t-srow-score">▲ {formatScore(p.score)}</span>
                          </div>
                        </div>
                        {p.media && p.media.url && p.media.type === "image" && <img className="t-srow-thumb" src={p.media.url} alt="" loading="lazy" />}
                      </div>
                    ))}
                  </div>
                )}
                {(searchFilter === "all" || searchFilter === "comments") && searchComments.length > 0 && (
                  <div>
                    <div className="t-sr-label">Комментарии<span className="t-sr-count">{searchComments.length}</span></div>
                    {searchComments.map((c, i) => (
                      <div key={c.id || i} className="t-srow" onClick={() => { setSearchOverlayOpen(false); setOpenPostId(c.postId); }}>
                        <div className="t-srow-avatar" style={{ background: "var(--rust)" }}>💬</div>
                        <div className="t-srow-main">
                          <div className="t-srow-desc">{highlight(truncText(c.snippet, 120), query)}</div>
                          <div className="t-srow-meta"><span>{c.author}</span><span className="dot">·</span><span>{c.postTitle}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {!searchLoading && !searchDone && query.trim().length >= 2 && (
              <div className="t-empty" style={{ paddingTop: 40 }}>Поиск…</div>
            )}
          </div>
        )}
        {!query.trim() && (
          <div className="t-search-overlay-hint">
            Начните вводить для поиска &middot; <kbd>Esc</kbd> чтобы закрыть
          </div>
        )}
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
          <div className={"t-tab-pane" + (tabAnim.dir >= 0 ? " fwd" : " back")} key={tabAnim.n} style={paneAnimStyle}>
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

          {tab === "boards" && !openBoardId && (
            <div>
              <div className="t-msgs-head">
                <div className="t-msgs-title">Доски</div>
                <button className="t-msgs-new" onClick={() => setBoardCreateOpen((v) => !v)}>
                  <Plus size={16} />Создать доску
                </button>
              </div>

              {boardCreateOpen && (
                <form className="t-create-page" onSubmit={submitBoardCreate}>
                  <input
                    placeholder="Название доски"
                    value={boardForm.name}
                    onChange={(e) => setBoardForm((f) => ({ ...f, name: e.target.value }))}
                    maxLength={160}
                    required
                  />
                  <textarea
                    placeholder="Описание (необязательно)"
                    value={boardForm.description}
                    onChange={(e) => setBoardForm((f) => ({ ...f, description: e.target.value }))}
                  />
                  <input
                    placeholder="Эмодзи-иконка (необязательно)"
                    value={boardForm.icon_emoji}
                    onChange={(e) => setBoardForm((f) => ({ ...f, icon_emoji: e.target.value }))}
                    maxLength={4}
                  />
                  <div className="t-create-page-actions">
                    <button type="button" className="t-btn-ghost" onClick={() => setBoardCreateOpen(false)}>Отмена</button>
                    <button type="submit" className="t-btn-solid" disabled={!boardForm.name.trim() || boardSaving}>
                      {boardSaving ? "Создаём…" : "Создать"}
                    </button>
                  </div>
                </form>
              )}

              {boards.length === 0 && !boardCreateOpen && (
                <div className="t-empty">Досок пока нет — создайте первую и пригласите друзей</div>
              )}
              {boards.map((b) => (
                <div key={b.id} className="t-community-row" onClick={() => openBoard(b.id)}>
                  <div className="t-community-icon" style={{ background: solidFor(b.name) }}>{b.icon || (b.name ? b.name[0] : "?")}</div>
                  <div className="t-community-main">
                    <div className="t-community-name">{b.name}</div>
                    <div className="t-community-desc">{b.description || "Без описания"}</div>
                    <div className="t-community-members">{b.posts} постов · {b.members} участников{b.isPublic ? " · публичная" : ""}</div>
                  </div>
                  <div className={"t-join-btn " + (b.role === "owner" ? "joined" : "")}>
                    {b.role === "owner" ? <React.Fragment><Check size={13} />Владелец</React.Fragment> : b.role === "can_post" ? "Участник" : "Просмотр"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "boards" && openBoardId && (
            <div className="t-board-screen">
              <div className="t-board-toolbar">
                <button className="t-btn-ghost" onClick={closeBoard}><ArrowBigUp size={14} style={{ transform: "rotate(-90deg)" }} />Доски</button>
                <div className="t-board-title">{activeBoard ? (activeBoard.icon ? activeBoard.icon + " " : "") + activeBoard.name : "…"}</div>
                <div className="t-board-toolbar-right">
                  {activeBoard && (activeBoard.role === "owner" || activeBoard.role === "can_post") && (
                    <button className="t-btn-solid t-board-add-btn" onClick={() => openBoardPostAt(boardView.current.x, boardView.current.y)}>
                      <Plus size={15} />Пост
                    </button>
                  )}
                  {boardIsOwner() && (
                    <span className="t-board-owner-badge">Владелец</span>
                  )}
                </div>
              </div>

              <div
                className="t-board-canvas"
                ref={boardCanvasRef}
                style={{
                  backgroundImage: "radial-gradient(circle, var(--text-faint) 1px, transparent 1px)",
                  backgroundSize: (32 * boardRender.scale) + "px " + (32 * boardRender.scale) + "px",
                  backgroundPosition: boardRender.x + "px " + boardRender.y + "px",
                }}
                onPointerDown={boardPointerDown}
                onPointerMove={boardPointerMove}
                onPointerUp={boardPointerUp}
                onPointerCancel={boardPointerUp}
                onWheel={boardWheel}
                onClick={boardCanvasTap}
              >
                <div className="t-board-viewport" style={{ transform: "translate(" + boardRender.x + "px," + boardRender.y + "px) scale(" + boardRender.scale + ")" }}>
                  <div className="t-board-world">
                    {activeBoard && activeBoard.posts.map((p) => {
                      const dragging = boardDragPost && boardDragPost.id === p.id;
                      const x = dragging ? boardDragPost.nx : (Number(p.px) || 0);
                      const y = dragging ? boardDragPost.ny : (Number(p.py) || 0);
                      return (
                        <div
                          key={p.id}
                          className={"t-board-card" + (dragging ? " dragging" : "")}
                          data-id={p.id}
                          style={{ transform: "translate(" + x + "px," + y + "px)" }}
                        >
                          {p.media && p.media.url && (
                            p.media.type === "video"
                              ? <video src={p.media.url} controls className="t-board-media" />
                              : <img src={p.media.url} alt="" className="t-board-media" onError={imgErr} />
                          )}
                          {p.title && <div className="t-board-card-title">{p.title}</div>}
                          {p.body && <div className="t-board-card-body">{stripHtml(p.body)}</div>}
                          <div className="t-board-card-author">
                            <span className="t-board-avatar">{p.avatarInitials}</span>
                            <span>{p.author}</span>
                          </div>
                          {(boardIsOwner() || p.authorId === (activeBoard.myId || -1)) && boardCanPost() && (
                            <button
                              className="t-board-card-del"
                              onClick={(e) => { e.stopPropagation(); boardRemovePost(p.id); }}
                              aria-label="Удалить"
                            ><X size={12} /></button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {boardCanPost() && (
                  <div className="t-board-hint" style={{ transform: "translate(12px,12px)" }}>Перетащите пустое место, чтобы двигаться · коснитесь, чтобы добавить пост</div>
                )}
              </div>

              {boardPostOpen && (
                <div className="t-modal-backdrop" onClick={() => setBoardPostOpen(false)}>
                  <form className="t-modal t-board-post-modal" onSubmit={submitBoardPost} onClick={(e) => e.stopPropagation()}>
                    <div className="t-modal-close"><button type="button" onClick={() => setBoardPostOpen(false)}><X size={16} /></button></div>
                    <div className="t-composer-head">Новый пост на доске</div>
                    <textarea
                      placeholder="Напишите что-нибудь (необязательно, можно фото)"
                      value={boardPo.body}
                      onChange={(e) => setBoardPo((c) => ({ ...c, body: e.target.value }))}
                      className="t-board-post-textarea"
                    />
                    {boardPo.mediaUrl ? (
                      <div className="t-media-preview">
                        {boardPo.mediaType === "video"
                          ? <video src={boardPo.mediaUrl} controls />
                          : <img src={boardPo.mediaUrl} alt="" />}
                        <button type="button" className="t-media-remove" onClick={boardMediaClear}><X size={14} /></button>
                      </div>
                    ) : (
                      <label className="t-media-btn">
                        <Image size={15} />Фото или видео
                        <input type="file" accept="image/*,video/*" onChange={boardMediaFile} hidden />
                      </label>
                    )}
                    <div className="t-composer-actions">
                      <button type="button" className="t-btn-ghost" onClick={() => setBoardPostOpen(false)}>Отмена</button>
                      <button type="submit" className="t-btn-solid" disabled={boardPoSaving || (!stripHtml(boardPo.body).trim() && !boardPo.mediaUrl)}>
                        {boardPoSaving ? "Добавляем…" : "Добавить"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {boardIsOwner() && (
                <div className="t-board-members-panel">
                  <div className="t-board-members-title">Участники</div>
                  <form className="t-board-invite" onSubmit={boardInvite}>
                    <input
                      placeholder="@ник"
                      value={boardInviteHandle}
                      onChange={(e) => { setBoardInviteHandle(e.target.value); setBoardInviteOpen(true); }}
                      onFocus={() => { loadBoardInviteSuggestions(); setBoardInviteOpen(true); }}
                      onBlur={() => setTimeout(() => setBoardInviteOpen(false), 150)}
                      autoComplete="off"
                      maxLength={40}
                    />
                    <button type="submit" className="t-btn-solid" disabled={boardInviting || !boardInviteHandle.trim()}>
                      {boardInviting ? "Приглашаем…" : "Пригласить"}
                    </button>
                    {boardInviteOpen && (
                      (() => {
                        const q = boardInviteHandle.replace(/^@/, "").trim().toLowerCase();
                        const show = boardInviteList.filter((u) => {
                          if (!q) return true;
                          return (u.name || "").toLowerCase().includes(q) || (u.handle || "").toLowerCase().includes(q);
                        });
                        return show.length > 0 && (
                          <div className="t-board-invite-pop">
                            {show.map((u) => (
                              <div
                                key={u.id}
                                className="t-board-invite-user"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => selectBoardInviteUser(u)}
                              >
                                <span className="t-board-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</span>
                                <span className="t-board-invite-user-name">{u.name}</span>
                                <span className="t-board-invite-user-handle">@{u.handle}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()
                    )}
                  </form>
                  {(activeBoard.members || []).map((m) => (
                    <div key={m.id} className="t-board-member">
                      <span className="t-board-avatar">{m.avatarInitials}</span>
                      <span className="t-board-member-name">{m.name}</span>
                      <button type="button" className="t-board-member-del" onClick={() => boardRemoveMember(m.id)} aria-label="Убрать"><X size={12} /></button>
                    </div>
                  ))}
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
              {!showNewMsg && support && !isAdmin && (
                <button type="button" className={"t-support-card" + (supportConvo() && supportConvo().unread ? " unread" : "")} onClick={openSupport}>
                  <span className="t-support-icon"><LifeBuoy size={18} /></span>
                  <span className="t-support-main">
                    <span className="t-support-name">Поддержка</span>
                    <span className="t-support-sub">{supportConvo() ? (supportConvo().unread ? "Есть новый ответ" : "Ответ службы поддержки") : "Задать вопрос службе поддержки"}</span>
                  </span>
                  <span className="t-support-open">→</span>
                </button>
              )}
              {!showNewMsg && isAdmin && (
                <div className="t-support-card t-support-admin">
                  <span className="t-support-icon"><LifeBuoy size={18} /></span>
                  <span className="t-support-main">
                    <span className="t-support-name">Вы — служба поддержки</span>
                    <span className="t-support-sub">Отвечайте на обращения пользователей прямо в этой ленте чатов</span>
                  </span>
                </div>
              )}
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
                            <div className="t-convo-avatar" style={!c.avatarUrl ? { background: solidFor(c.name) } : undefined}>{c.avatarUrl ? <img src={c.avatarUrl} alt="" onError={imgErr} /> : c.avatarInitials}</div>
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
            <div className="t-thread" id="t-thread">
              <div className="t-thread-head">
                <button className="t-back-btn" onClick={() => { setOpenConvoId(null); setReactionPicker(null); }}><ArrowLeft size={16} /></button>
                <div className="t-thread-peer-avatar" style={!openConvo_.avatarUrl ? { background: solidFor(openConvo_.name) } : undefined} onClick={() => openPeerMedia(openConvo_.peerUserId)}>{openConvo_.avatarUrl ? <img src={openConvo_.avatarUrl} alt="" onError={imgErr} /> : openConvo_.avatarInitials}
                  {presenceInfo(openConvo_.lastSeen).online && <span className="t-online-dot" />}
                </div>
                <div className="t-thread-peer">
                  <div className="t-thread-name tap-serif" onClick={() => openProfile(openConvo_.peerUserId)}>{openConvo_.name}</div>
                  <div className={"t-thread-status" + (openConvo_.peerTyping ? " typing" : (presenceInfo(openConvo_.lastSeen).online ? " on" : ""))}>{openConvo_.peerTyping ? "печатает…" : (presenceInfo(openConvo_.lastSeen).label || (openConvo_.e2ee ? "🔒 Зашифровано" : "Открытый диалог"))}</div>
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
                        <div className="t-msg-avatar" style={!openConvo_.avatarUrl ? { background: solidFor(openConvo_.name) } : undefined}>{openConvo_.avatarUrl ? <img src={openConvo_.avatarUrl} alt="" onError={imgErr} /> : openConvo_.avatarInitials}</div>
                      )}
                      <div className="t-msg-col">
                        <div className="t-bubble" onClick={() => toggleReactionPicker(i)}>
                          {m.postId && m.post ? (
                            <div className="t-chat-post" onClick={(e) => { e.stopPropagation(); setOpenPostId(m.postId); }}>
                              {m.post.media && (
                                <div className="t-chat-post-thumb" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); openMediaViewer([{ url: m.post.media.url, type: m.post.media.type === "video" ? "video" : "image", title: m.post.title, text: m.post.text, author: m.post.author, authorHandle: m.post.authorHandle, authorId: m.post.authorId, avatarInitials: m.post.avatarInitials }], 0); }}>
                                  {m.post.media.type === "video" ? (
                                    <video src={m.post.media.url} muted />
                                  ) : (
                                    <img src={m.post.media.url} alt="" onError={imgErr} />
                                  )}
                                </div>
                              )}
                              <div className="t-chat-post-info">
                                <div className="t-chat-post-title">{m.post.title}</div>
                                {m.post.text && <div className="t-chat-post-snippet">{m.post.text}</div>}
                                <div className="t-chat-post-author">
                                  <span className="t-chat-post-avatar" style={{ background: solidFor(m.post.author) }}>{m.post.avatarInitials}</span>
                                  <span className="t-chat-post-author-name" onClick={(e) => { e.stopPropagation(); openProfile(m.post.authorId); }}>{m.post.authorHandle || m.post.author}</span>
                                </div>
                              </div>
                              <div className="t-chat-post-score" style={{ color: "var(--gold)" }}>▲ {formatScore(m.post.score)}</div>
                            </div>
                          ) : m.media && m.media.type && (m.media.type === "image" || m.media.type.indexOf("video") === 0) ? (
                            <div className="t-msg-media" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); openMediaViewer([{ url: m.media.url, type: m.media.type.indexOf("video") === 0 ? "video" : "image", title: "", text: "", author: openConvo_.name, authorHandle: "", authorId: openConvo_.peerUserId, avatarInitials: openConvo_.avatarInitials }], 0); }}>
                              {m.media.type.indexOf("video") === 0 ? <video src={m.media.url} controls /> : <img src={m.media.url} alt="" onError={imgErr} />}
                            </div>
                          ) : m.media && m.media.type && m.media.type.indexOf("audio") === 0 ? (
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
                <React.Fragment>
                <div className="t-thread-input">
                  {recording ? (
                    <React.Fragment>
                      <button className="t-voice-cancel" onClick={cancelVoice}>✕</button>
                      <span className="t-voice-timer"><span className="t-voice-dot" />{fmtDur(recSec)}</span>
                      <button className="t-voice-stop" onClick={stopVoice}><Square size={15} /></button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <label className="t-msg-attach" title="Прикрепить фото или видео">
                        <Image size={17} />
                        <input type="file" accept="image/*,video/*" onChange={handleMsgMediaFile} hidden />
                      </label>
                      <button className="t-mic-btn" onClick={startVoice} title="Голосовое сообщение"><Mic size={17} /></button>
                      <input placeholder="Сообщение" value={draftMsg} onChange={(e) => setConvoDraft(openConvoId, e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} />
                      <button onClick={() => sendMessage()} disabled={!draftMsg.trim() && !msgMedia.url}><Send size={15} /></button>
                    </React.Fragment>
                  )}
                </div>
                {msgMedia.url && (
                  <div className="t-thread-msg-media">
                    {msgMedia.type === "video" ? <video src={msgMedia.url} controls /> : <img src={msgMedia.url} alt="" />}
                    <button type="button" className="t-media-remove" onClick={() => setMsgMedia({ url: "", type: null })}><X size={14} /></button>
                  </div>
                )}
                </React.Fragment>
                )}
              </div>
            </div>
            </AppBoundary>
          )}

          {tab === "notifications" && (
            <div>
              {isAdmin && (
                <div className="t-admin-panel">
                  <div className="t-admin-title"><ShieldAlert size={15} /> Суперпользователь</div>
                  <button type="button" className="t-admin-btn" onClick={() => setAdminNotifyOpen(true)}><Megaphone size={14} />Системное уведомление</button>
                </div>
              )}
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
                  const Icon = n.type === "upvote" ? Heart : n.type === "comment" ? MessageCircle : n.type === "message" ? MessageCircle : n.type === "post" ? PenLine : n.type === "repost" ? Repeat : n.type === "system" ? Megaphone : n.type === "warning" ? ShieldAlert : UserPlus;
                  const color = n.type === "upvote" ? "var(--gold)" : n.type === "comment" ? "var(--teal)" : n.type === "message" ? "var(--teal)" : n.type === "repost" ? "var(--gold)" : n.type === "system" ? "var(--rust)" : n.type === "warning" ? "#E0604E" : "var(--rust)";
                  const isChat = n.type === "message" && n.conversationId != null;
                  return (
                    <div key={n.id} className={"t-notif-row" + (n.unread ? " unread" : "") + (isChat ? " chat" : "")} onClick={isChat ? () => openChatFromNotif(n) : undefined}
                      role={isChat ? "button" : undefined} tabIndex={isChat ? 0 : undefined}
                      onKeyDown={isChat ? (e) => { if (e.key === "Enter") openChatFromNotif(n); } : undefined}>
                      <div className="t-notif-icon" style={{ background: "rgba(255,255,255,0.06)", color }}><Icon size={16} /></div>
                      <div>
                        <div className="t-notif-text">{n.text}</div>
                        <div className="t-notif-time">{n.time}</div>
                      </div>
                      {isChat && <span className="t-notif-open" title="Открыть чат">→</span>}
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
                  <label className="t-profile-avatar t-profile-avatar-mine" title={avatarSaving ? "Загружаем…" : "Нажмите, чтобы сменить аватар"}>
                    {avatarSaving ? <span className="t-avatar-loading">…</span> : me.avatarUrl ? (
                      <img src={me.avatarUrl} alt="" className="t-profile-avatar-img" onError={imgErr} />
                    ) : (
                      me.initials
                    )}
                    <input type="file" accept="image/*" onChange={handleAvatarFile} hidden />
                  </label>
                  <button className="t-profile-name t-profile-name-btn" onClick={openEdit}>
                    {me.name} <PenLine size={14} />
                  </button>
                  <div className="t-profile-tag">{me.handle}</div>
                  {me.bio && <div className="t-profile-bio">{me.bio}</div>}
                  <div className="t-profile-stats">
                    <div className="t-stat"><div className="t-stat-num tap-mono">{posts.filter((p) => p.isMine).length}</div><div className="t-stat-label">Посты</div></div>
                    <div className="t-stat t-stat-click" onClick={() => openRelations("observers", me)}><div className="t-stat-num tap-mono">{me.observers || 0}</div><div className="t-stat-label">Наблюдатели</div></div>
                    <div className="t-stat t-stat-click" onClick={() => openRelations("following", me)}><div className="t-stat-num tap-mono">{me.following || 0}</div><div className="t-stat-label">Подписки</div></div>
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
                <button className={"t-profile-tab" + (profileTab === "posts" ? " active" : "")} onClick={() => setProfileTab("posts")} title="Посты" aria-label="Посты"><PenLine size={15} /></button>
                <button className={"t-profile-tab" + (profileTab === "reposts" ? " active" : "")} onClick={() => setProfileTab("reposts")} title="Репосты" aria-label="Репосты"><Repeat size={15} /></button>
                <button className={"t-profile-tab" + (profileTab === "saved" ? " active" : "")} onClick={() => setProfileTab("saved")} title="Сохранённые посты" aria-label="Сохранённые посты">
                  <Bookmark size={15} />
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
                <div className="t-profile-avatar" style={!viewUser.avatarUrl ? { background: solidFor(viewUser.name) } : undefined}>
                  {viewUser.avatarUrl ? <img src={viewUser.avatarUrl} alt="" className="t-profile-avatar-img" onError={imgErr} /> : viewUser.initials}
                </div>
                <div className="t-profile-name">{viewUser.name}</div>
                <div className="t-profile-tag">{viewUser.handle}</div>
                {viewUser.bio && <div className="t-profile-bio">{viewUser.bio}</div>}
                <div className="t-profile-stats">
                  <div className="t-stat"><div className="t-stat-num tap-mono">{viewUser.postCount}</div><div className="t-stat-label">Посты</div></div>
                  <div className="t-stat t-stat-click" onClick={() => openRelations("observers")}><div className="t-stat-num tap-mono">{viewUser.observers || viewUser.friends || 0}</div><div className="t-stat-label">Наблюдатели</div></div>
                  <div className="t-stat t-stat-click" onClick={() => openRelations("following")}><div className="t-stat-num tap-mono">{viewUser.following}</div><div className="t-stat-label">Подписки</div></div>
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
              {viewUser.isPrivate && !viewUser.canView ? (
                <div className="t-profile-locked">
                  <div className="t-profile-locked-ico"><Lock size={22} /></div>
                  <div className="t-profile-locked-title">Профиль закрыт</div>
                  <div className="t-profile-locked-sub">Пользователь ограничил доступ к своим публикациям. Посты видны только тем, кто есть в списке разрешений на просмотр.</div>
                </div>
              ) : (
              <React.Fragment>
              <div className="t-profile-tabs">
                <button className={"t-profile-tab" + (viewProfileTab === "posts" ? " active" : "")} onClick={() => setViewProfileTab("posts")} title="Посты" aria-label="Посты"><PenLine size={15} /></button>
                <button className={"t-profile-tab" + (viewProfileTab === "reposts" ? " active" : "")} onClick={() => setViewProfileTab("reposts")} title="Репосты" aria-label="Репосты"><Repeat size={15} /></button>
              </div>
              {viewProfileTab === "posts" ? (
                posts.filter((p) => p.authorId === viewUserId && !p.repostOf).length === 0 ? (
                  <div className="t-empty">У пользователя пока нет постов</div>
                ) : (
                  <div className="t-grid">
                    {posts.filter((p) => p.authorId === viewUserId && !p.repostOf).map((p) => renderCard(p))}
                  </div>
                )
              ) : (
                posts.filter((p) => p.authorId === viewUserId && p.repostOf).length === 0 ? (
                  <div className="t-empty">У пользователя пока нет репостов</div>
                ) : (
                  <div className="t-grid">
                    {posts.filter((p) => p.authorId === viewUserId && p.repostOf).map((p) => renderCard(p))}
                  </div>
                )
              )}
              </React.Fragment>
              )}
            </div>
          )}
          </div>
          </React.Fragment>
        )}
      </div>

      <div className={"t-settings-screen" + (settingsOpen ? " open" : "")} onClick={() => setSettingsOpen(false)}>
          <div className="t-settings-screen-inner" onClick={(e) => e.stopPropagation()}>
            <div className="t-settings-screen-head">
              <button className="t-settings-screen-close" onClick={() => setSettingsOpen(false)} aria-label="Закрыть"><X size={18} /></button>
              <div className="t-settings-title">Настройки</div>
            </div>
            <div className="t-settings-tabs" role="tablist">
              <button role="tab" aria-selected={settingsTab === "interface"} className={"t-settings-tab" + (settingsTab === "interface" ? " active" : "")} onClick={() => switchSettingsTab("interface")}>
                <LayoutGrid size={15} /><span>Интерфейс</span>
              </button>
              <button role="tab" aria-selected={settingsTab === "appearance"} className={"t-settings-tab" + (settingsTab === "appearance" ? " active" : "")} onClick={() => switchSettingsTab("appearance")}>
                <Palette size={15} /><span>Оформление</span>
              </button>
              <button role="tab" aria-selected={settingsTab === "privacy"} className={"t-settings-tab" + (settingsTab === "privacy" ? " active" : "")} onClick={() => switchSettingsTab("privacy")}>
                <Lock size={15} /><span>Приватность</span>
              </button>
              <button role="tab" aria-selected={settingsTab === "security"} className={"t-settings-tab" + (settingsTab === "security" ? " active" : "")} onClick={() => switchSettingsTab("security")}>
                <ShieldAlert size={15} /><span>Безопасность</span>
              </button>
              <button role="tab" aria-selected={settingsTab === "account"} className={"t-settings-tab" + (settingsTab === "account" ? " active" : "")} onClick={() => switchSettingsTab("account")}>
                <User size={15} /><span>Аккаунт</span>
              </button>
            </div>
            <div key={settingsTab} className={"t-settings-screen-body t-settings-screen-body-anim" + (tabDir < 0 ? " back" : "")}>
              {settingsTab === "interface" && (
                <div className="t-settings-group">
                  <div className="t-settings-section-title">Значки панели</div>
                  <div className="t-settings-row-sub t-nav-hint">Перетащите значок на панели, чтобы поменять местами. Здесь можно скрыть или вернуть нужные. «Профиль» скрыть нельзя, минимум должно остаться 2 значка.</div>
                  {navItems.filter((id) => NAV_CATALOG[id]).map((id, idx) => {
                    const item = NAV_CATALOG[id];
                    const Icon = item.icon;
                    return (
                      <div className="t-nav-item-row" key={id}>
                        <span className="t-nav-item-ico"><Icon size={18} /></span>
                        <span className="t-nav-item-label">{item.label}</span>
                        <div className="t-nav-item-actions">
                          <button type="button" disabled={idx === 0} onClick={() => moveNavItem(idx, -1)} title="Вверх" aria-label="Вверх">↑</button>
                          <button type="button" disabled={idx === navItems.length - 1} onClick={() => moveNavItem(idx, 1)} title="Вниз" aria-label="Вниз">↓</button>
                          <button type="button" disabled={id === "profile" || navItems.length <= 2} onClick={() => removeNavItem(id)} title="Скрыть" aria-label="Скрыть">×</button>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(NAV_CATALOG).filter((id) => !navItems.includes(id)).map((id) => {
                    const item = NAV_CATALOG[id];
                    const Icon = item.icon;
                    return (
                      <div className="t-nav-item-row t-nav-item-hidden" key={id}>
                        <span className="t-nav-item-ico"><Icon size={18} /></span>
                        <span className="t-nav-item-label">{item.label}</span>
                        <div className="t-nav-item-actions">
                          <button type="button" onClick={() => addNavItem(id)} title="Показать" aria-label="Показать">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {settingsTab === "appearance" && (
                <div className="t-settings-group">
                  <div className="t-settings-section-title">Тема оформления</div>
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Светлая или тёмная</div>
                      <div className="t-settings-row-sub">Переключение темы всего приложения</div>
                    </div>
                    <div className="t-theme-toggle" role="group" aria-label="Тема оформления">
                      <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} title="Светлая тема">Светлая</button>
                      <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} title="Тёмная тема">Тёмная</button>
                    </div>
                  </div>
                  <div className="t-settings-section-title">Цвет оформления</div>
                  <div className="t-settings-row-sub t-accent-hint">Выберите акцентный цвет приложения</div>
                  <div className="t-accent-picker" role="group" aria-label="Цвет оформления">
                    {ACCENTS.map((a) => (
                      <button key={a.id} className={"t-accent-swatch" + (accent === a.id ? " active" : "")} style={{ "--swatch": a.color }} onClick={() => setAccent(a.id)} title={a.label}>
                        <span className="t-accent-dot" />
                        <span className="t-accent-label">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {settingsTab === "privacy" && (
                <div className="t-settings-group">
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Приватный профиль</div>
                      <div className="t-settings-row-sub">Посты видны только вам и списку разрешённых пользователей</div>
                    </div>
                    <div className="t-theme-toggle t-privacy-toggle" role="group" aria-label="Приватный профиль">
                      <button className={me && me.isPrivate ? "active" : ""} disabled={privacyBusy} onClick={() => togglePrivacy(true)} title="Включить">Закрытый</button>
                      <button className={me && !me.isPrivate ? "active" : ""} disabled={privacyBusy} onClick={() => togglePrivacy(false)} title="Выключить">Открытый</button>
                    </div>
                  </div>
                  {me && me.isPrivate && (
                    <div className="t-settings-row">
                      <div className="t-settings-info">
                        <div className="t-settings-row-title">Разрешения для просмотра</div>
                        <div className="t-settings-row-sub">Кому открыт ваш профиль: {viewPerms.length}</div>
                      </div>
                      <button className="t-settings-link" onClick={openViewPerms}>Открыть</button>
                    </div>
                  )}
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Чёрный список</div>
                      <div className="t-settings-row-sub">Заблокированные пользователи: {blockedUsers.length}</div>
                    </div>
                    <button className="t-settings-link" onClick={() => { setSettingsOpen(false); setBlacklistOpen(true); }}>Открыть</button>
                  </div>
                </div>
              )}
              {settingsTab === "security" && (
                <div className="t-settings-group">
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Проверка безопасности</div>
                      <div className="t-settings-row-sub">Чек-лист защиты аккаунта и устройства с активным входом</div>
                    </div>
                    <button className="t-settings-link" onClick={() => { setSettingsOpen(false); window.location.href = "/security"; }}>Открыть</button>
                  </div>
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Pass-ключи</div>
                      <div className="t-settings-row-sub">Входите в аккаунт без пароля</div>
                    </div>
                    <button className="t-settings-link" onClick={() => { setSettingsOpen(false); setPasskeysOpen(true); }}>Настроить</button>
                  </div>
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Двухфакторная аутентификация</div>
                      <div className="t-settings-row-sub">Код из приложения или с почты при входе</div>
                    </div>
                    <button className="t-settings-link" onClick={() => { setSettingsOpen(false); window.location.href = "/2fa"; }}>Настроить</button>
                  </div>
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title">Смена пароля</div>
                      <div className="t-settings-row-sub">{me && me.hasRecovery ? "Подтверждается кодом восстановления" : "Сначала привяжите способ восстановления — в «Двухфакторной аутентификации»"}</div>
                    </div>
                    <button className="t-settings-link" onClick={() => { setSettingsOpen(false); window.location.href = (me && me.hasRecovery) ? "/password" : "/2fa"; }}>{(me && me.hasRecovery) ? "Сменить" : "Привязать"}</button>
                  </div>
                </div>
              )}
              {settingsTab === "account" && (
                <div className="t-settings-group">
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
                  <div className="t-settings-row">
                    <div className="t-settings-info">
                      <div className="t-settings-row-title t-danger-title">Удалить аккаунт</div>
                      <div className="t-settings-row-sub">Безвозвратно удалить аккаунт и все данные</div>
                    </div>
                    <button className="t-danger-btn" onClick={deleteAccount}><Trash2 size={15} />Удалить</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      {viewPermsOpen && (
        <div className="t-modal-backdrop" onClick={() => setViewPermsOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setViewPermsOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Разрешения для просмотра</div>
            <div className="t-settings-side-note">Эти пользователи видят ваши посты, пока включён приватный профиль.</div>
            <div className="t-pk-add">
              <input
                className="t-pk-name"
                value={viewPermQuery}
                onChange={(e) => { setViewPermQuery(e.target.value); searchViewPermUsers(e.target.value); }}
                placeholder="Имя или ник (например, @marina.k)"
                maxLength="120"
              />
            </div>
            {viewPermSuggestions.length > 0 && (
              <div className="t-settings-group">
                {viewPermSuggestions.map((u) => (
                  <div key={"s" + u.id} className="t-bl-row">
                    <div className="t-convo-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                    <div className="t-bl-info">
                      <div className="t-bl-name">{u.name}</div>
                      <div className="t-bl-handle">{u.handle}</div>
                    </div>
                    <button className="t-bl-unblock" disabled={viewPermBusy} onClick={() => addViewPerm(u.id)}>Добавить</button>
                  </div>
                ))}
              </div>
            )}
            {viewPerms.length === 0 ? (
              <div className="t-empty">Список пуст — добавьте первого пользователя</div>
            ) : (
              <div className="t-settings-group">
                {viewPerms.map((u) => (
                  <div key={u.id} className="t-bl-row">
                    <div className="t-convo-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                    <div className="t-bl-info">
                      <div className="t-bl-name">{u.name}</div>
                      <div className="t-bl-handle">{u.handle}</div>
                    </div>
                    <button className="t-bl-unblock" onClick={() => removeViewPerm(u.id)}>Убрать</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {sharePostId != null && (
        <div className="t-modal-backdrop t-share-backdrop" onClick={() => setSharePostId(null)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setSharePostId(null)}><X size={16} /></button></div>
            <div className="t-settings-title">Поделиться в чате</div>
            <div className="t-settings-side-note">Кому отправить этот пост? Собеседник получит миниатюру поста в личные сообщения.</div>
            {conversations.length === 0 ? (
              <div className="t-empty">Нет диалогов — начните общение, чтобы поделиться постом</div>
            ) : (
              <div className="t-share-grid">
                {conversations.map((c) => (
                  <div key={c.id} className="t-convo-card" onClick={() => sharePostToChat(c.peerUserId)}>
                    <div className="t-convo-card-top">
                      <div className="t-convo-avatar-wrap">
                        <div className="t-convo-avatar" style={{ background: solidFor(c.name) }}>{c.avatarInitials}</div>
                        {presenceInfo(c.lastSeen).online && <span className="t-online-dot" />}
                      </div>
                      <div className="t-convo-time"><Share2 size={13} /></div>
                    </div>
                    <div className="t-convo-card-name">{c.name}</div>
                    <div className="t-convo-card-status">{c.messages.length ? (c.e2ee ? "🔒 " : "") + c.messages[c.messages.length - 1].text : "Нет сообщений"}</div>
                  </div>
                ))}
              </div>
            )}
            {shareBusy && <div className="t-empty">Отправка…</div>}
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

      {relationsOpen && (
        <div className="t-modal-backdrop" onClick={() => setRelationsOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setRelationsOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">{relationsTitle}</div>
            {relationsList.length === 0 ? (
              <div className="t-empty">Список пуст</div>
            ) : (
              <div className="t-settings-group">
                {relationsList.map((u) => (
                  <div key={u.id} className="t-bl-row">
                    <div className="t-convo-avatar" style={{ background: solidFor(u.name) }}>{u.avatarInitials}</div>
                    <div className="t-bl-info">
                      <div className="t-bl-name">{u.name}</div>
                      <div className="t-bl-handle">{u.handle}</div>
                    </div>
                    {u.isMine ? (
                      <div className="t-bl-handle">Это вы</div>
                    ) : (
                      <button
                        className={"t-follow-btn" + (u.followed ? " following" : "")}
                        onClick={() => toggleRowFollow(u.id)}
                      >
                        {u.followed ? <React.Fragment><Check size={13} />Наблюдаете</React.Fragment> : <React.Fragment><UserPlus size={13} />Наблюдать</React.Fragment>}
                      </button>
                    )}
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

      {passkeysOpen && (
        <div className="t-modal-backdrop" onClick={() => setPasskeysOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setPasskeysOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Pass-ключи</div>
            <div className="t-settings-side-note">Pass-ключи позволяют входить в аккаунт без пароля — через отпечаток пальца, Face ID или PIN. Ключ хранится на этом устройстве, и по нему нельзя узнать ваш аккаунт другим сайтам.</div>
            {!window.TapWebAuthn || !TapWebAuthn.supported() ? (
              <div className="t-empty">Ваш браузер не поддерживает pass-ключи</div>
            ) : (
              <React.Fragment>
                <div className="t-pk-add">
                  <input
                    className="t-pk-name"
                    value={passkeyName}
                    onChange={(e) => setPasskeyName(e.target.value)}
                    placeholder="Название ключа (например, «Мой iPhone»)"
                    maxLength="120"
                  />
                  <button className="t-pk-add-btn" onClick={addPasskey} disabled={passkeyBusy}>
                    {passkeyBusy ? "…" : <Plus size={14} />}
                    {passkeyBusy ? "" : "Добавить"}
                  </button>
                </div>
                {passkeyMsg && <div className={"t-pk-msg" + (passkeyMsg === "Pass-ключ добавлен." ? " ok" : "")}>{passkeyMsg}</div>}
                {passkeys.length === 0 ? (
                  <div className="t-empty">Пока нет привязанных pass-ключей</div>
                ) : (
                  <div className="t-settings-group">
                    {passkeys.map((p) => (
                      <div key={p.id} className="t-pk-row">
                        <div className="t-bl-info">
                          <div className="t-bl-name">{p.name || "Pass-ключ"}{p.device ? <span className="t-pk-device">{p.device}</span> : null}</div>
                          <div className="t-bl-handle">Добавлен {new Date(p.createdAt * 1000).toLocaleDateString("ru-RU")}</div>
                        </div>
                        <button className="t-pk-remove" onClick={() => removePasskey(p.id)}>Удалить</button>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="t-modal-backdrop" onClick={() => setDeleteOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setDeleteOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Почему хотите удалить аккаунт?</div>
            <div className="t-settings-side-note">Аккаунт и все связанные с ним данные будут удалены безвозвратно. Это действие нельзя отменить.</div>
            <div className="t-delete-reasons">
              {DELETE_REASONS.map((r) => (
                <label key={r.id} className={"t-delete-reason" + (deleteReason === r.id ? " active" : "")}>
                  <input
                    type="radio"
                    name="deleteReason"
                    value={r.id}
                    checked={deleteReason === r.id}
                    onChange={() => setDeleteReason(r.id)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
            <div className="t-profile-edit-actions">
              <button type="button" className="t-btn-ghost" onClick={() => setDeleteOpen(false)}>Отмена</button>
              <button type="button" className="t-danger-btn" disabled={!deleteReason} onClick={confirmDelete}>
                <Trash2 size={15} />Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteFinalOpen && (
        <div className="t-modal-backdrop" onClick={() => setDeleteFinalOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setDeleteFinalOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title">Тогда вы предадите Бориса Блау — главного разработчика!</div>
            <div className="t-settings-side-note">Аккаунт и все связанные с ним данные будут удалены безвозвратно. Вы уверены?</div>
            <div className="t-profile-edit-actions">
              <button type="button" className="t-btn-ghost" onClick={() => setDeleteFinalOpen(false)}>Отмена</button>
              <button type="button" className="t-danger-btn" onClick={submitDelete}>
                <Trash2 size={15} />Всё равно удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {adminNotifyOpen && (
        <div className="t-modal-backdrop" onClick={() => setAdminNotifyOpen(false)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setAdminNotifyOpen(false)}><X size={16} /></button></div>
            <div className="t-settings-title"><Megaphone size={17} /> Системное уведомление</div>
            <div className="t-settings-side-note">Уведомление получит каждый пользователь tap.</div>
            <form className="t-admin-form" onSubmit={(e) => { e.preventDefault(); submitAdminNotify(); }}>
              <textarea
                placeholder="Текст уведомления…"
                value={adminNotifyText}
                maxLength={500}
                onChange={(e) => setAdminNotifyText(e.target.value)}
                autoFocus
              />
              <div className="t-profile-edit-actions">
                <button type="button" className="t-btn-ghost" onClick={() => setAdminNotifyOpen(false)}>Отмена</button>
                <button type="submit" className="t-danger-btn" disabled={adminNotifyBusy || !adminNotifyText.trim()}>
                  {adminNotifyBusy ? "Отправка…" : <React.Fragment><Megaphone size={15} />Разослать всем</React.Fragment>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {warnPost && (
        <div className="t-modal-backdrop" onClick={() => setWarnPost(null)}>
          <div className="t-modal t-settings" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setWarnPost(null)}><X size={16} /></button></div>
            <div className="t-settings-title"><ShieldAlert size={17} /> Предупреждение о нарушении</div>
            <div className="t-settings-side-note">Автор поста «{warnPost.title || "без заголовка"}» получит уведомление с этой причиной.</div>
            <form className="t-admin-form" onSubmit={(e) => { e.preventDefault(); submitWarnPost(); }}>
              <textarea
                placeholder="Причина предупреждения…"
                value={warnReason}
                maxLength={500}
                onChange={(e) => setWarnReason(e.target.value)}
                autoFocus
              />
              <div className="t-profile-edit-actions">
                <button type="button" className="t-btn-ghost" onClick={() => setWarnPost(null)}>Отмена</button>
                <button type="submit" className="t-danger-btn" disabled={warnBusy || !warnReason.trim()}>
                  {warnBusy ? "Отправка…" : <React.Fragment><ShieldAlert size={15} />Предупредить</React.Fragment>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openPost && (
        <div className="t-modal-backdrop" onClick={() => setOpenPostId(null)}>
          <div className="t-modal" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close"><button onClick={() => setOpenPostId(null)}><X size={16} /></button></div>
            <div className="t-modal-meta">
              <div className="t-avatar" style={!openPost.avatarUrl ? { background: solidFor(openPost.author) } : undefined} onClick={() => openProfile(openPost.authorId)}>{openPost.avatarUrl ? <img src={openPost.avatarUrl} alt="" onError={imgErr} /> : openPost.avatarInitials}</div>
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
              <div className="t-modal-media" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); openMediaViewer([{ url: openPost.media.url, type: openPost.media.type === "video" ? "video" : "image", title: openPost.title, text: openPost.body, author: openPost.author, authorHandle: openPost.authorHandle, authorId: openPost.authorId, avatarInitials: openPost.avatarInitials }], 0); }}>
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
              <button className="t-action-btn" onClick={() => setSharePostId(openPost.id)}><Share2 size={14} />Share</button>
              {!openPost.isMine && (
                <button className={"t-action-btn" + (openPost.reposted ? " saved" : "")} onClick={() => toggleRepost(openPost.id)}>
                  <Repeat size={14} />{openPost.reposted ? "Репост сделан" : "Репост"}{openPost.reposts > 0 ? " · " + openPost.reposts : ""}
                </button>
              )}
              <button className={"t-action-btn" + (openPost.saved ? " saved" : "")} onClick={() => toggleSave(openPost.id)}><Bookmark size={14} fill={openPost.saved ? "currentColor" : "none"} />{openPost.saved ? "Сохранено" : "Сохранить"}</button>
              {isAdmin && (
                <button className="t-action-btn warn" onClick={() => { setWarnPost(openPost); setWarnReason(""); }}><ShieldAlert size={14} />Предупредить</button>
              )}
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
                        <div className="t-comment-avatar" style={!c.avatarUrl ? { background: solidFor(c.author) } : undefined}>{c.avatarUrl ? <img src={c.avatarUrl} alt="" onError={imgErr} /> : c.avatarInitials}</div>
                        <div className="t-comment-main">
                          <div className="t-comment-head">
                            <span className="t-comment-author" onClick={() => openProfile(c.authorId)}>{c.author}</span>
                            {parent && <span className="t-comment-reply-to">в ответ <span className="t-nick-link" onClick={() => openProfile(parent.authorId)}>{parent.author}</span></span>}
                            <span className="t-comment-time">· {c.time}</span>
                          </div>
                          <div className="t-comment-text">{c.text}</div>
                          {c.media && c.media.url && (
                            <div className="t-comment-media" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); openMediaViewer([{ url: c.media.url, type: c.media.type === "video" ? "video" : "image", title: "", text: "", author: c.author, authorHandle: "", authorId: c.authorId, avatarInitials: c.avatarInitials }], 0); }}>
                              {c.media.type === "video" ? <video src={c.media.url} controls /> : <img src={c.media.url} alt="" onError={imgErr} />}
                            </div>
                          )}
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
                    {commentMedia.url && (
                      <div className="t-comment-form-media">
                        {commentMedia.type === "video" ? <video src={commentMedia.url} controls /> : <img src={commentMedia.url} alt="" />}
                        <button type="button" className="t-media-remove" onClick={() => setCommentMedia({ url: "", type: null })}><X size={14} /></button>
                      </div>
                    )}
                    <div className="t-comment-form-row">
                      <label className="t-comment-attach" title="Прикрепить фото или видео">
                        <Image size={16} />
                        <input type="file" accept="image/*,video/*" onChange={handleCommentMediaFile} hidden />
                      </label>
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

      <div className="t-bottom-nav" ref={navRef} onPointerDown={onNavPointerDown} style={{ touchAction: "none", cursor: "grab", userSelect: "none" }}>
        <span className="t-nav-grip" aria-hidden="true" />
        <div className="t-tab-pill" ref={pillRef} style={{ touchAction: "pan-y" }} onPointerDown={pillDragStart}>
          <span className="t-tab-slider" ref={sliderRef} />
          {navItems.filter((id) => NAV_CATALOG[id]).map((id) => {
            const item = NAV_CATALOG[id];
            const Icon = item.icon;
            const badge = (id === "messages" && unreadMsgCount > 0) || (id === "notifications" && unreadNotifCount > 0);
            const active = id !== "video" && id !== "settings" && tab === id;
            return (
              <button key={id} ref={(el) => { tabBtnRefs.current[id] = el; }} data-tab-id={id} className={"t-tab-btn" + (active ? " active" : "")} onClick={() => { if (navDragMoved.current) { navDragMoved.current = false; return; } activateNavItem(id); }} aria-label={item.label} title={item.label}>
                <Icon size={22} />
                {badge && <span className="t-tab-badge" />}
              </button>
            );
          })}
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

      {mediaViewer && mediaViewer.items[mediaViewerIdx] && (
        <div className="t-media-viewer" onClick={closeMediaViewer}>
          <div className="t-media-viewer-inner" onClick={(e) => e.stopPropagation()}>
            <button className="t-media-viewer-close" onClick={closeMediaViewer} aria-label="Закрыть"><X size={20} /></button>
            {(() => {
              const it = mediaViewer.items[mediaViewerIdx];
              return (
                <div
                  key={mediaViewerIdx}
                  className={"t-media-frame" + (mediaAnimDir ? " t-media-frame-in" : "")}
                  style={mediaAnimDir ? { "--tx": (mediaAnimDir > 0 ? "46px" : "-46px") } : undefined}
                >
                  <div className="t-media-stage">
                    {it.type === "video" ? (
                      <video src={it.url} controls autoPlay playsInline />
                    ) : (
                      <img src={it.url} alt="" onError={imgErr} />
                    )}
                  </div>
                  {(it.author || it.title || it.text) && (
                    <div className="t-media-meta">
                      {it.author && (
                        <span className="t-media-author" onClick={() => openProfile(it.authorId)}>
                          <span className="t-media-avatar" style={{ background: solidFor(it.author) }}>{it.avatarInitials}</span>
                          {it.authorHandle || it.author}
                        </span>
                      )}
                      {it.title && <div className="t-media-title">{renderHashtags(it.title, (tag) => { setQuery(tag); saveRecentSearch(tag); })}</div>}
                      {it.text && <div className="t-media-text">{stripHtml(it.text)}</div>}
                    </div>
                  )}
                  <div className="t-media-count">{mediaViewerIdx + 1} / {mediaViewer.items.length}</div>
                </div>
              );
            })()}
            {mediaViewer.items.length > 1 && (
              <button className="t-media-nav t-media-nav--prev" onClick={(e) => { e.stopPropagation(); stepMediaViewer(-1); }} disabled={mediaViewerIdx === 0} aria-label="Назад"><img src="/static/media/arrow-right.png" alt="Назад" /></button>
            )}
            {mediaViewer.items.length > 1 && (
              <button className="t-media-nav t-media-nav--next" onClick={(e) => { e.stopPropagation(); stepMediaViewer(1); }} disabled={mediaViewerIdx === mediaViewer.items.length - 1} aria-label="Вперёд"><img src="/static/media/arrow-right.png" alt="Вперёд" /></button>
            )}
          </div>
        </div>
      )}

      {avatarCrop && (
        <div className="t-modal-backdrop" onClick={() => !avatarSaving && setAvatarCrop(null)}>
          <div className="t-modal t-avatar-crop-modal" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-close">
              <button type="button" onClick={() => !avatarSaving && setAvatarCrop(null)} disabled={avatarSaving}><X size={16} /></button>
            </div>
            <div className="t-composer-head">Обрезка аватарки</div>
            <p className="t-avatar-crop-help">Перетащите изображение, чтобы выбрать область. Масштаб изменяется ползунком.</p>
            <div
              className="t-avatar-crop-stage"
              onPointerDown={startAvatarCropDrag}
              onPointerMove={moveAvatarCrop}
              onPointerUp={stopAvatarCropDrag}
              onPointerCancel={stopAvatarCropDrag}
              onPointerLeave={stopAvatarCropDrag}
            >
              <img
                className="t-avatar-crop-image"
                src={avatarCrop.src}
                alt=""
                draggable="false"
                style={{
                  width: avatarCrop.width * avatarCrop.baseScale * avatarCrop.zoom,
                  height: avatarCrop.height * avatarCrop.baseScale * avatarCrop.zoom,
                  left: (280 - avatarCrop.width * avatarCrop.baseScale * avatarCrop.zoom) / 2 + avatarCrop.x,
                  top: (280 - avatarCrop.height * avatarCrop.baseScale * avatarCrop.zoom) / 2 + avatarCrop.y,
                }}
              />
              <div className="t-avatar-crop-overlay" />
            </div>
            <label className="t-avatar-crop-control">
              <span>−</span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={avatarCrop.zoom}
                onChange={(e) => setAvatarCrop((current) => current ? { ...current, zoom: Number(e.target.value), x: 0, y: 0 } : current)}
                disabled={avatarSaving}
                aria-label="Масштаб аватарки"
              />
              <span>+</span>
            </label>
            <div className="t-profile-edit-actions">
              <button type="button" className="t-btn-ghost" onClick={() => setAvatarCrop(null)} disabled={avatarSaving}>Отмена</button>
              <button type="button" className="t-btn-solid" onClick={saveAvatarCrop} disabled={avatarSaving}>
                {avatarSaving ? "Сохраняем…" : "Сохранить"}
              </button>
            </div>
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
