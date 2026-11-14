/**
 * <tap-poll> — виджет опроса для ленты/композера. Без зависимостей, Shadow DOM.
 *
 * Показ опроса в посте:   <tap-poll poll-id="42"></tap-poll>
 * Создание (в композере): <tap-poll mode="create"></tap-poll>
 *     el.value  -> { question, options, multiple } | null (если форма не валидна)
 *     el.reset()
 *
 * Атрибуты: api (по умолчанию /api/polls), max-options (по умолчанию 6)
 * События (bubbles + composed): poll:change, poll:voted
 * Свойство poll: можно передать готовый объект (SSR), тогда fetch не нужен.
 *
 * Тема: наследует шрифт сайта; цвета через CSS-переменные --tap-poll-*
 * (все значения по умолчанию — палитра вашего сайта).
 */

const STR = {
  question: 'Вопрос',
  questionPh: 'О чём спросим?',
  option: 'Вариант',
  addOption: 'Добавить вариант',
  removeOption: 'Удалить вариант',
  multiple: 'Можно выбрать несколько',
  chooseOne: 'Выберите один вариант',
  chooseMany: 'Выберите один или несколько вариантов',
  vote: 'Проголосовать',
  showResults: 'Результаты',
  back: 'Назад к голосованию',
  retry: 'Повторить',
  mine: 'Ваш голос',
  loadError: 'Не удалось загрузить опрос',
  voteError: 'Не удалось отправить голос',
};

const plural = (n, a, b, c) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return a;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
  return c;
};

const CSS = `
:host{
  display:block;
  --_surface:var(--tap-poll-surface,#2a2b23);
  --_border:var(--tap-poll-border,#2e3024);
  --_text:var(--tap-poll-text,#e8e5db);
  --_muted:var(--tap-poll-muted,#8d8c82);
  --_accent:var(--tap-poll-accent,#a57ad9);
  --_accent-deep:var(--tap-poll-accent-deep,#8f67c4);
  --_on-accent:var(--tap-poll-on-accent,#fff);
  --_danger:var(--tap-poll-danger,#e5827a);
  --_radius:var(--tap-poll-radius,14px);
  font-family:inherit;font-size:.875rem;line-height:1.35;color:var(--_text);
}
*,*::before,*::after{box-sizing:border-box}
.q{font-weight:700;font-size:1rem;line-height:1.3;margin:0 0 4px;overflow-wrap:anywhere}
.hint{color:var(--_muted);font-size:.78rem;margin:0 0 10px}
.opts{display:grid;gap:8px;margin:0;padding:0;list-style:none}

/* варианты */
.opt{position:relative;display:flex;align-items:center;gap:12px;padding:11px 14px;cursor:pointer;
  background:var(--_surface);border:1px solid var(--_border);border-radius:var(--_radius);
  transition:border-color .15s,background-color .15s}
.opt:hover{border-color:var(--_accent-deep)}
.opt input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.mark{flex:none;width:20px;height:20px;border-radius:50%;border:2px solid var(--_muted);display:grid;place-items:center;transition:.15s}
.multi .mark{border-radius:6px}
.mark svg{width:12px;height:12px;fill:none;stroke:var(--_on-accent);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:scale(.5);transition:.15s}
.opt:has(input:checked){border-color:var(--_accent);background:color-mix(in srgb,var(--_accent) 14%,var(--_surface))}
.opt:has(input:checked) .mark{background:var(--_accent);border-color:var(--_accent)}
.opt:has(input:checked) .mark svg{opacity:1;transform:none}
.opt:has(input:focus-visible){outline:2px solid var(--_accent);outline-offset:2px}
.txt{font-weight:600;overflow-wrap:anywhere}

/* результаты */
.res{position:relative;overflow:hidden;border-radius:var(--_radius);border:1px solid var(--_border);background:var(--_surface)}
.fill{position:absolute;inset:0 auto 0 0;width:0;background:color-mix(in srgb,var(--_accent) 30%,transparent);
  transition:width .8s cubic-bezier(.2,.8,.2,1)}
.res.lead{border-color:var(--_accent)}
.res.lead .fill{background:linear-gradient(90deg,var(--_accent-deep),var(--_accent))}
.res.lead .row{color:var(--_on-accent)}
.row{position:relative;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 14px}
.nm{font-weight:600;overflow-wrap:anywhere}
.nm small{display:block;font-weight:500;font-size:.72rem;opacity:.8}
.pct{font-weight:800;font-variant-numeric:tabular-nums}

/* кнопки (пилюли как в навигации сайта) */
.bar{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:12px}
.meta{color:var(--_muted);font-size:.78rem;margin-right:auto}
button{font:inherit;font-weight:700;cursor:pointer;border-radius:999px;border:1px solid transparent;padding:9px 18px;
  background:linear-gradient(135deg,var(--_accent-deep),var(--_accent));color:var(--_on-accent);transition:opacity .15s,transform .12s}
button:hover:not(:disabled){transform:translateY(-1px)}
button:disabled{opacity:.4;cursor:not-allowed}
button.ghost{background:transparent;color:var(--_accent);border-color:var(--_border);padding:9px 14px}
button.ghost:hover:not(:disabled){border-color:var(--_accent-deep)}
button:focus-visible{outline:2px solid var(--_accent);outline-offset:2px}
.err{color:var(--_danger);font-size:.8rem;margin:8px 0 0}

/* создание */
.field{display:block;margin:0 0 12px}
.lbl{display:block;font-weight:700;font-size:.78rem;margin:0 0 6px;color:var(--_muted)}
input[type=text]{width:100%;font:inherit;color:inherit;padding:10px 14px;border-radius:var(--_radius);
  background:var(--_surface);border:1px solid var(--_border);transition:border-color .15s}
input[type=text]::placeholder{color:var(--_muted)}
input[type=text]:focus{outline:none;border-color:var(--_accent)}
.orow{display:flex;gap:6px;align-items:center}
.orow input{flex:1;min-width:0}
.x{flex:none;width:34px;height:34px;padding:0;border-radius:50%;background:transparent;color:var(--_muted);font-size:1.15rem;line-height:1;border-color:transparent}
.x:hover:not(:disabled){color:var(--_danger);background:var(--_surface)}
.sw{display:flex;align-items:center;gap:10px;cursor:pointer;margin-top:12px;font-weight:600}
.sw input{position:absolute;opacity:0}
.trk{width:38px;height:22px;border-radius:99px;background:var(--_border);position:relative;transition:background .2s;flex:none}
.trk::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--_text);transition:transform .2s}
.sw input:checked+.trk{background:var(--_accent-deep)}
.sw input:checked+.trk::after{transform:translateX(16px)}
.sw input:focus-visible+.trk{outline:2px solid var(--_accent);outline-offset:2px}

.skeleton{height:132px;border-radius:var(--_radius);background:linear-gradient(90deg,var(--_surface),var(--_border),var(--_surface));
  background-size:200% 100%;animation:sk 1.3s linear infinite}
@keyframes sk{to{background-position:-200% 0}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

const SVG_NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat().filter((c) => c != null));
  return el;
}
function checkIcon() {
  const s = document.createElementNS(SVG_NS, 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  const p = document.createElementNS(SVG_NS, 'path');
  p.setAttribute('d', 'M5 12.5l4.5 4.5L19 7.5');
  s.append(p);
  return s;
}

class TapPoll extends HTMLElement {
  static observedAttributes = ['poll-id', 'mode'];

  #poll = null;
  #sel = new Set();
  #busy = false;
  #peek = false;
  #error = '';
  #view = '';
  #ac = null;
  #rawPoll = null;
  #decodePoll = null;
  #draft = { question: '', options: ['', ''], multiple: false };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML =
      `<style>${CSS}</style><div class="root" aria-live="polite"></div>`;
    this.$ = this.shadowRoot.querySelector('.root');
  }

  get api() { return (this.getAttribute('api') || '/api/polls').replace(/\/$/, ''); }
  get max() { return Math.min(Math.max(+this.getAttribute('max-options') || 6, 2), 10); }
  get poll() { return this.#poll; }
  set poll(p) {
    this.#rawPoll = p;
    this.#sel.clear();
    this.#peek = false;
    this.#view = '';
    this.#applyPoll(p);
  }
  set decodePoll(decode) {
    this.#decodePoll = typeof decode === 'function' ? decode : null;
    if (this.#rawPoll) this.#applyPoll(this.#rawPoll);
  }

  connectedCallback() { this.#init(); }
  attributeChangedCallback(_n, o, v) { if (this.isConnected && o !== v) this.#init(); }
  disconnectedCallback() { this.#ac?.abort(); }

  #init() {
    if (this.getAttribute('mode') === 'create') return this.#render();
    const id = this.getAttribute('poll-id');
    if (this.#poll && (!id || String(this.#poll.id) === id)) return this.#render();
    if (id) this.#load();
  }

  async #req(path, { method = 'GET', body, signal } = {}) {
    const headers = { Accept: 'application/json' };
    if (body) headers['Content-Type'] = 'application/json';
    const csrfCookie = document.cookie.match(/(?:^|;\s*)kolo_csrf=([^;]+)/);
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content
      || (csrfCookie ? decodeURIComponent(csrfCookie[1]) : '');
    if (csrf) headers['X-CSRF-Token'] = csrf;
    const res = await fetch(this.api + path, {
      method, headers, signal, credentials: 'same-origin',
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      let msg = '';
      try { msg = (await res.json()).error; } catch { /* тело не JSON */ }
      const err = new Error(msg || `HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  }

  async #load() {
    this.#ac?.abort();
    this.#ac = new AbortController();
    this.#view = '';
    this.$.replaceChildren(h('div', { class: 'skeleton' }));
    try {
      this.#rawPoll = await this.#req(`/${encodeURIComponent(this.getAttribute('poll-id'))}`, { signal: this.#ac.signal });
      this.#poll = this.#decodePoll ? await this.#decodePoll(this.#rawPoll) : this.#rawPoll;
      this.#render();
    } catch (e) {
      if (e.name === 'AbortError') return;
      this.$.replaceChildren(
        h('p', { class: 'err' }, STR.loadError),
        h('div', { class: 'bar' }, h('button', { class: 'ghost', type: 'button', onclick: () => this.#load() }, STR.retry)),
      );
    }
  }

  async #applyPoll(raw) {
    this.#poll = this.#decodePoll ? await this.#decodePoll(raw) : raw;
    this.#render();
  }

  #render() {
    if (this.getAttribute('mode') === 'create') return this.#renderCreate();
    const p = this.#poll;
    if (!p) return this.$.replaceChildren();
    if (p.voted || this.#peek) this.#renderResults(p);
    else this.#renderVote(p);
  }

  /* ---------- голосование ---------- */
  #renderVote(p) {
    this.#view = 'vote';
    const multi = !!p.multiple;
    const btn = h('button', { type: 'button', disabled: this.#busy || !this.#sel.size, onclick: () => this.#vote() }, STR.vote);

    const list = h('div', { class: 'opts', role: multi ? 'group' : 'radiogroup', 'aria-label': p.question });
    for (const o of p.options) {
      const inp = h('input', { type: multi ? 'checkbox' : 'radio', name: 'opt', value: o.id });
      inp.checked = this.#sel.has(o.id);
      inp.addEventListener('change', () => {
        if (!multi) this.#sel.clear();
        inp.checked ? this.#sel.add(o.id) : this.#sel.delete(o.id);
        btn.disabled = this.#busy || !this.#sel.size;
      });
      list.append(h('label', { class: 'opt' + (multi ? ' multi' : '') },
        inp, h('span', { class: 'mark' }, checkIcon()), h('span', { class: 'txt' }, o.text)));
    }

    this.$.replaceChildren(...[
      h('p', { class: 'q' }, p.question),
      h('p', { class: 'hint' }, multi ? STR.chooseMany : STR.chooseOne),
      list,
      this.#error ? h('p', { class: 'err' }, this.#error) : null,
      h('div', { class: 'bar' }, btn,
        h('button', { class: 'ghost', type: 'button', onclick: () => { this.#peek = true; this.#error = ''; this.#render(); } }, STR.showResults)),
    ].filter(Boolean));
  }

  async #vote() {
    if (this.#busy || !this.#sel.size) return;
    const prev = this.#poll, ids = [...this.#sel];
    this.#busy = true; this.#error = '';
    const set = new Set(ids);
    this.#poll = { ...prev, voted: true, voters: prev.voters + 1,
      options: prev.options.map((o) => set.has(o.id) ? { ...o, votes: o.votes + 1, mine: true } : o) };
    this.#render(); // оптимистичное обновление

    try {
      this.#rawPoll = await this.#req(`/${prev.id}/vote`, { method: 'POST', body: { option_ids: ids } });
      this.#poll = this.#decodePoll ? await this.#decodePoll(this.#rawPoll) : this.#rawPoll;
      this.#sel.clear();
      this.dispatchEvent(new CustomEvent('poll:voted', { detail: this.#poll, bubbles: true, composed: true }));
    } catch (e) {
      if (e.status === 409) {       // уже голосовали с другого устройства
        try {
          this.#rawPoll = await this.#req(`/${prev.id}`);
          this.#poll = this.#decodePoll ? await this.#decodePoll(this.#rawPoll) : this.#rawPoll;
        } catch { this.#poll = prev; }
      } else {
        this.#poll = prev; this.#view = '';
        this.#error = STR.voteError;
      }
    } finally {
      this.#busy = false;
      this.#render();
    }
  }

  /* ---------- результаты ---------- */
  #renderResults(p) {
    const animate = this.#view !== 'results';
    this.#view = 'results';
    const voters = p.voters || 0;
    const max = Math.max(0, ...p.options.map((o) => o.votes));
    const fills = [];

    const rows = p.options.map((o) => {
      const share = voters ? (o.votes / voters) * 100 : 0;
      const fill = h('div', { class: 'fill' });
      fills.push([fill, share]);
      const nm = h('span', { class: 'nm' }, o.text);
      if (o.mine) nm.append(h('small', {}, STR.mine));
      return h('div', { class: 'res' + (voters && o.votes === max ? ' lead' : '') },
        fill, h('div', { class: 'row' }, nm, h('span', { class: 'pct' }, Math.round(share) + '%')));
    });

    const meta = `${voters} ${plural(voters, 'голос', 'голоса', 'голосов')}`;
    this.$.replaceChildren(
      h('p', { class: 'q' }, p.question),
      h('div', { class: 'opts', style: 'margin-top:10px' }, rows),
      h('div', { class: 'bar' },
        h('span', { class: 'meta' }, meta),
        p.voted ? null : h('button', { class: 'ghost', type: 'button', onclick: () => { this.#peek = false; this.#render(); } }, STR.back)),
    );

    const apply = () => fills.forEach(([el, w]) => { el.style.width = w + '%'; });
    if (animate) requestAnimationFrame(() => requestAnimationFrame(apply)); else { fills.forEach(([el]) => (el.style.transition = 'none')); apply(); }
  }

  /* ---------- создание ---------- */
  get value() {
    const q = this.#draft.question.trim();
    const seen = new Set();
    const options = this.#draft.options.map((s) => s.trim()).filter((s) => {
      const k = s.toLowerCase();
      if (!s || seen.has(k)) return false;
      seen.add(k); return true;
    });
    return q && options.length >= 2 ? { question: q, options, multiple: this.#draft.multiple } : null;
  }

  reset() {
    this.#draft = { question: '', options: ['', ''], multiple: false };
    this.#renderCreate();
    this.#changed();
  }

  #changed() {
    this.dispatchEvent(new CustomEvent('poll:change', { detail: { valid: !!this.value, value: this.value }, bubbles: true, composed: true }));
  }

  #renderCreate(focusIdx) {
    const d = this.#draft;
    const q = h('input', { type: 'text', maxlength: 140, placeholder: STR.questionPh, 'aria-label': STR.question, value: d.question });
    q.addEventListener('input', () => { d.question = q.value; this.#changed(); });

    const list = h('div', { class: 'opts' });
    d.options.forEach((val, i) => {
      const inp = h('input', { type: 'text', maxlength: 80, value: val, placeholder: `${STR.option} ${i + 1}`, 'aria-label': `${STR.option} ${i + 1}` });
      inp.addEventListener('input', () => { d.options[i] = inp.value; this.#changed(); });
      inp.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (i === d.options.length - 1 && d.options.length < this.max) { d.options.push(''); this.#renderCreate(i + 1); }
        else list.querySelectorAll('input')[i + 1]?.focus();
      });
      const del = h('button', { type: 'button', class: 'x', 'aria-label': `${STR.removeOption} ${i + 1}`, disabled: d.options.length <= 2,
        onclick: () => { d.options.splice(i, 1); this.#renderCreate(); this.#changed(); } }, '×');
      list.append(h('div', { class: 'orow' }, inp, del));
    });

    const multi = h('input', { type: 'checkbox' });
    multi.checked = d.multiple;
    multi.addEventListener('change', () => { d.multiple = multi.checked; this.#changed(); });

    this.$.replaceChildren(
      h('div', { class: 'field' }, h('span', { class: 'lbl' }, STR.question), q),
      h('div', { class: 'field' }, list),
      h('button', { type: 'button', class: 'ghost', disabled: d.options.length >= this.max,
        onclick: () => { d.options.push(''); this.#renderCreate(d.options.length - 1); } }, '+ ' + STR.addOption),
      h('label', { class: 'sw' }, multi, h('span', { class: 'trk' }), STR.multiple),
    );
    if (focusIdx != null) list.querySelectorAll('input')[focusIdx]?.focus();
  }
}

if (!customElements.get('tap-poll')) customElements.define('tap-poll', TapPoll);
