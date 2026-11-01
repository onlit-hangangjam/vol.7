/*
 * 한강잼 참가자 앱 동작
 * config.js 값을 읽어 화면을 그립니다. 편집기(editor.js)가 고친 값은
 * 이 브라우저의 localStorage에 저장되어 다음에 열 때도 유지돼요.
 */
(function () {
  "use strict";
  const STORE = "hgj-app-config-v1";
  const clone = o => JSON.parse(JSON.stringify(o));
  const isObj = v => v && typeof v === "object" && !Array.isArray(v);
  const DEFAULT = clone(window.HGJ_CONFIG);

  function merge(base, saved) {
    if (!isObj(saved)) return base;
    Object.keys(base).forEach(k => {
      if (saved[k] === undefined) return;
      base[k] = isObj(base[k]) && isObj(saved[k]) ? Object.assign(base[k], saved[k]) : saved[k];
    });
    return base;
  }
  function load() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE) || "null"); } catch (e) { /* 저장소를 못 쓰면 기본값 */ }
    // 굵기 설정이 생기기 전에 저장된 값이면 글꼴은 새 기본값(Pretendard)을 따름
    if (saved && saved.theme && !saved.theme.weights) { delete saved.theme.fontDisplay; delete saved.theme.fontBody; }
    return fillKeys(merge(clone(DEFAULT), saved));
  }
  /* 예전에 저장한 목록 항목에 새로 생긴 칸(img, photo 등)을 빈 값으로 채움 */
  function fillKeys(c) {
    Object.keys(DEFAULT.content).forEach(k => {
      const tpl = DEFAULT.content[k][0], list = c.content[k];
      if (!tpl || !Array.isArray(list)) return;
      list.forEach(item => Object.keys(tpl).forEach(f => { if (item && !(f in item)) item[f] = Array.isArray(tpl[f]) ? [] : ""; }));
    });
    ["weights", "tracking"].forEach(k => { c.theme[k] = Object.assign({}, DEFAULT.theme[k], c.theme[k]); });
    return c;
  }
  let C = load();
  let IMG = C.images || {};

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = path => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  function set(path, val) {
    const ks = path.split("."), last = ks.pop();
    const o = ks.reduce((o, k) => o[k], C);
    o[last] = val;
  }
  /* 저장에 실패하면 false (이미지가 너무 커서 브라우저 저장 공간을 넘친 경우 등) */
  function save() { try { localStorage.setItem(STORE, JSON.stringify(C)); return true; } catch (e) { return false; } }
  /* data-k 가 붙은 글자 조각: 편집기의 "화면 글자 직접 고치기"로 수정 가능 */
  const T = (tag, path, cls) => `<${tag}${cls ? ` class="${cls}"` : ""} data-k="${path}">${esc(get(path))}</${tag}>`;

  /* ---------- 테마 ---------- */
  /* null = 이 폴더(fonts/)에 들어 있는 글꼴, 나머지는 Google Fonts에서 불러옴 */
  const FONT_SPEC = {
    "Pretendard": null,
    "Gothic A1": "wght@400;600;800", "Noto Sans KR": "wght@400;600;800", "Nanum Gothic": "wght@400;700;800",
    "IBM Plex Sans KR": "wght@400;600;700", "Gowun Dodum": "", "Black Han Sans": "", "Do Hyeon": "", "Jua": "",
    "Gugi": "", "Bagel Fat One": "", "Gasoek One": "", "Dokdo": "", "Orbit": ""
  };
  const SYS = '"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif';
  function fontParam(f) {
    const spec = FONT_SPEC[f];
    return "family=" + encodeURIComponent(f).replace(/%20/g, "+") + (spec ? ":" + spec : "");
  }
  function applyTheme() {
    const t = C.theme;
    const vars = o => Object.entries(o).map(([k, v]) => `--${k}:${v}`).join(";");
    const w = t.weights || {}, ls = t.tracking || {};
    const em = v => (Number(v) || 0) / 100 + "em";
    $("#theme-vars").textContent =
      `:root{${vars(t.colors)};--display:"${t.fontDisplay}",${SYS};--body:"${t.fontBody}",${SYS};` +
      `--r:${t.radius}px;--fs:${t.fontSize}px;--bw:${t.borderWidth}px;--appw:${t.appWidth}px;` +
      `--w-display:${w.display || 800};--w-strong:${w.strong || 700};--w-medium:${w.medium || 600};--w-body:${w.body || 400};` +
      `--ls-display:${em(ls.display)};--ls-strong:${em(ls.strong)};--ls-body:${em(ls.body)};--lh:${t.lineHeight || 1.6}}` +
      `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${vars(t.dark)};color-scheme:dark}}` +
      `:root[data-theme="dark"]{${vars(t.dark)};color-scheme:dark}`;
    const fams = [...new Set([t.fontDisplay, t.fontBody])].filter(f => FONT_SPEC[f] != null);
    const link = $("#font-link");
    if (!fams.length) { link.disabled = true; return; }
    const href = "https://fonts.googleapis.com/css2?" + fams.map(fontParam).join("&") + "&display=swap";
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    link.disabled = false;
  }

  /* ---------- 공통 ---------- */
  function dLabel() {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
    const diff = Math.round((Date.parse(C.event.date) - Date.parse(today)) / 86400000);
    if (isNaN(diff)) return "D-?";
    return diff > 0 ? "D-" + diff : diff === 0 ? "D-DAY" : "THANK YOU";
  }
  const kstToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  const kstHM = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit" });
  const shown = list => list.filter(x => x.show !== false);

  const ICONS = {
    home: '<path d="M12 3l9 9-9 9-9-9z"/>',
    time: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    fun: '<path d="M12 3l9 16H3z"/><path d="M12 10v4"/>',
    map: '<path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    me: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h3"/>'
  };

  /* ---------- 홈 블록 ---------- */
  const HOME = {
    hero: () => IMG.heroPoster
      ? `<figure class="poster"><img src="${esc(IMG.heroPoster)}" alt="${esc(`${C.event.brand} Vol.${C.event.vol} 포스터: ${String(C.event.slogan).replace(/\n/g, " ")}, ${C.event.dateLabel}`)}">` +
        `<figcaption>${T("span", "event.meta")}</figcaption></figure>`
      : `<div class="hero${IMG.heroBg ? " has-bg" : ""}" id="hero">${C.event.badge ? T("div", "event.badge", "stop") : ""}
      ${IMG.heroArt ? `<img class="art" src="${esc(IMG.heroArt)}" alt="">`
        : `<div class="diamond" aria-hidden="true"><div class="dnum"><span class="dlabel"></span>${T("em", "event.dateLabel")}</div></div>`}
      ${T("h1", "event.slogan")}${T("div", "event.meta", "meta")}</div>`,
    now: () => `<div class="now"><div class="dot"></div><div><div class="t" id="nowt"></div><div class="n" id="nown"></div></div></div>`,
    quick: () => `<div class="quick">${C.content.quick.map((q, i) =>
      `<button data-go="${esc(q.go)}">${T("b", `content.quick.${i}.label`)}${T("span", `content.quick.${i}.desc`)}</button>`).join("")}</div>`,
    info: () => `<div class="info"><dl>${C.content.info.map((r, i) =>
      T("dt", `content.info.${i}.label`) + T("dd", `content.info.${i}.value`)).join("")}</dl></div>`
  };

  function renderHome() {
    $("#home").innerHTML = shown(C.layout.home).map(b => (HOME[b.id] ? HOME[b.id]() : "")).join("");
    const hero = $("#hero");
    if (hero && IMG.heroBg) {
      const dim = Math.min(70, Math.max(0, Number(IMG.heroDim) || 0)) / 100;
      hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,${dim}),rgba(0,0,0,${dim})),url(${JSON.stringify(IMG.heroBg)})`;
    }
  }

  /* ---------- 시간표 ---------- */
  function kindOf(k) { return C.content.kinds.find(x => x.id === k); }
  function renderTT() {
    $("#legend").innerHTML = C.content.kinds.map((k, i) =>
      `<span><i style="background:var(--${esc(k.color)})"></i>${T("span", `content.kinds.${i}.label`)}</span>`).join("");
    const today = kstToday() === C.event.date, now = kstHM();
    let liveIdx = -1;
    const tt = C.content.timetable;
    $("#tt").innerHTML = tt.map((r, i) => {
      const live = today && now >= r.t && now < r.end;
      if (live) liveIdx = i;
      const kd = kindOf(r.k);
      const bar = kd ? ` style="border-left:6px solid var(--${esc(kd.color)})"` : "";
      return `<li class="${live ? "live" : ""}">${T("time", `content.timetable.${i}.t`)}<div class="card"${bar}>` +
        T("b", `content.timetable.${i}.name`) +
        (r.sub ? T("small", `content.timetable.${i}.sub`) : "") +
        (r.side ? `<div class="side">동시 진행 · ${T("span", `content.timetable.${i}.side`)}</div>` : "") +
        `</div></li>`;
    }).join("");
    renderNow(today, now, liveIdx);
  }
  function renderNow(today, now, liveIdx) {
    if (!$("#nowt")) return;
    let t = C.texts.nowIdle, n = tt0();
    if (today) {
      const tt = C.content.timetable;
      if (liveIdx >= 0) { t = "지금 진행 중"; n = tt[liveIdx].name; }
      else { const nx = tt.find(r => r.t > now); t = nx ? "다음 순서" : "오늘 행사가 끝났어요"; n = nx ? `${nx.t} ${nx.name}` : "함께해 주셔서 고마워요"; }
    }
    $("#nowt").textContent = t; $("#nown").textContent = n;
  }
  function tt0() {
    const first = C.content.timetable.find(r => r.k) || C.content.timetable[0];
    return first ? `첫 순서: ${first.t} ${first.name}` : "";
  }

  /* ---------- 즐길거리 ---------- */
  let curSeg = null;
  function renderFun() {
    const segs = shown(C.layout.fun);
    if (!segs.find(s => s.id === curSeg)) curSeg = segs[0] ? segs[0].id : null;
    $("#seg").hidden = segs.length < 2;
    $("#seg").innerHTML = segs.map(s =>
      `<button role="tab" aria-selected="${s.id === curSeg}" data-seg="${s.id}">${esc(s.label)}</button>`).join("");
    ["prog", "line", "music"].forEach(k => { $("#s-" + k).hidden = k !== curSeg; });

    $("#s-prog").innerHTML = C.content.programs.map((p, i) => {
      const mark = p.sign === "dia" ? `<b>${esc(p.mark)}</b>` : esc(p.mark);
      const sign = p.img ? `<div class="sign img"><img src="${esc(p.img)}" alt=""></div>` : `<div class="sign ${esc(p.sign)}">${mark}</div>`;
      return `<div class="prog">${sign}<div>` +
        T("div", `content.programs.${i}.where`, "where") + T("h3", `content.programs.${i}.title`) +
        T("p", `content.programs.${i}.desc`) + `</div></div>`;
    }).join("");

    $("#s-line").innerHTML = `<div class="box">${C.content.lineup.map((p, i) =>
      `<div class="person"><div class="av">${p.img ? `<img src="${esc(p.img)}" alt="">` : esc(p.av)}</div><div>${T("b", `content.lineup.${i}.name`)}` +
      (p.tag ? T("span", `content.lineup.${i}.tag`, "tbd") : "") +
      T("div", `content.lineup.${i}.role`, "r") + `</div></div>`).join("")}</div>`;

    const url = C.texts.playlistUrl;
    $("#s-music").innerHTML = T("p", "texts.musicNote", "muted") +
      `<div class="box">${C.content.music.map((m, i) =>
        `<div class="track"><div class="num">${i + 1}</div><div>${T("b", `content.music.${i}.title`)}${T("small", `content.music.${i}.desc`)}</div></div>`).join("")}</div>` +
      (url ? `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${esc(C.texts.playlistLabel)}</a>`
           : `<a class="btn" aria-disabled="true">${esc(C.texts.playlistLabel)} (링크 연결 예정)</a>`);
  }

  /* ---------- 지도 ---------- */
  function renderMap() {
    $("#mapimg").hidden = !IMG.map; $("#mapsvg").style.display = IMG.map ? "none" : "";
    if (IMG.map) $("#mapimg").src = IMG.map; else $("#mapimg").removeAttribute("src");
    $("#zones").innerHTML = C.content.zones.map((z, i) =>
      `<div class="zone"><i class="${z.color === "yellow" ? "on-yellow" : ""}" style="background:var(--${esc(z.color)})">${esc(z.n)}</i>` +
      `<div>${T("b", `content.zones.${i}.title`)} ${T("span", `content.zones.${i}.desc`)}</div></div>`).join("");
  }

  /* ---------- 내 면허 ---------- */
  function levels() {
    return C.content.levels.slice().sort((a, b) => a.min - b.min)
      .map((l, i, arr) => ({ min: Number(l.min), name: l.name, next: arr[i + 1] ? Number(arr[i + 1].min) : null }));
  }
  function level(n) { const L = levels(); let l = L[0]; L.forEach(x => { if (n >= x.min) l = x; }); return l; }

  function showCard(m) {
    const vol = Number(C.event.vol), n = m.vols.length, lv = level(n), T2 = C.texts;
    const stamps = Array.from({ length: vol }, (_, i) => i + 1)
      .map(v => `<div class="stamp ${m.vols.includes(v) ? "got" : ""}" title="Vol.${v}">${v}</div>`).join("");
    const toNext = lv.next ? lv.next - n : 0;
    const pct = lv.next ? Math.round(((n - lv.min) / (lv.next - lv.min)) * 100) : 100;
    const G = C.content.genres, max = Math.max(1, ...G.map(g => Number(g.count)));
    const same = (G.find(g => g.name === m.genre) || { count: 0 }).count;
    const genres = G.map(g => `<div class="g ${g.name === m.genre ? "me" : ""}"><span>${esc(g.name)}</span><div class="gb"><span style="width:${g.count / max * 100}%"></span></div><span>${esc(g.count)}명</span></div>`).join("");
    const vids = m.videos && m.videos.length
      ? m.videos.map(v => `<div class="vid"><span>${esc(v.title)}</span>${v.url && v.url !== "#" ? `<a href="${esc(v.url)}" target="_blank" rel="noopener">보기</a>` : `<span class="soon">링크 연결 예정</span>`}</div>`).join("")
      : `<p class="muted" style="padding:12px 0;margin:0;font-size:14px">Vol.${vol}이 끝나면 내 잼 영상이 여기에 올라와요.</p>`;
    $("#me-card").innerHTML = `
      <div class="license pop">
        <div class="lh"><div class="lt">${esc(T2.licenseTitle)}<small>${esc(T2.licenseSub)}</small></div><div class="cls">${esc(lv.name)}</div></div>
        <div class="lb">
          <div class="photo">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : esc(m.nick.slice(0, 1))}</div>
          <dl>
            <dt>닉네임</dt><dd>${esc(m.nick)}</dd>
            <dt>장르</dt><dd>${esc(m.genre)}</dd>
            <dt>참여</dt><dd>${n}회</dd>
            <dt>첫 잼</dt><dd>${esc(m.first)}년</dd>
            <dt>면허번호</dt><dd>HGJ-${String(m.first).slice(2)}-${esc(m.no)}</dd>
          </dl>
        </div>
        <div class="stamps" aria-label="회차별 참여 도장">${stamps}</div>
      </div>
      <div class="prog-bar">
        <b>${lv.next ? `${toNext}번 더 오면 '${esc(level(lv.next).name)}'로 올라가요` : "최고 등급이에요. 한강잼의 터줏대감!"}</b>
        <div class="bar"><span style="width:${pct}%"></span></div>
      </div>
      <h2 style="font-size:20px">이번 잼, 나와 같은 ${esc(m.genre)} 댄서 ${esc(same)}명</h2>
      <div class="box" style="padding:10px 16px">${genres}</div>
      <h2 style="font-size:20px">내 영상</h2>
      <div class="box">${vids}</div>
      <button class="logout" id="btn-out">다른 닉네임으로 보기</button>`;
    $("#me-login").hidden = true; $("#me-card").hidden = false;
    $("#btn-out").addEventListener("click", () => { $("#me-card").hidden = true; $("#me-login").hidden = false; $("#in-pin").value = ""; });
  }
  let shownMember = null;
  $("#btn-login").addEventListener("click", () => {
    if (document.body.classList.contains("ed-texting")) return;
    const nick = $("#in-nick").value.trim(), pin = $("#in-pin").value.trim();
    if (!nick || pin.length !== 4) { $("#err").textContent = "닉네임과 연락처 뒤 4자리를 모두 입력해 주세요."; return; }
    const m = C.content.members.find(x => x.nick === nick && String(x.pin) === pin);
    if (!m) { $("#err").textContent = "일치하는 신청 정보가 없어요. 신청서에 적은 닉네임을 그대로 입력해 주세요."; return; }
    $("#err").textContent = ""; shownMember = m.nick; showCard(m);
  });
  $("#in-pin").addEventListener("keydown", e => { if (e.key === "Enter") $("#btn-login").click(); });

  /* ---------- 탭 이동 ---------- */
  let cur = "home";
  function renderTabs() {
    $("#tabs").innerHTML = shown(C.layout.tabs).map(t =>
      `<button role="tab" data-tab="${t.id}" aria-selected="${t.id === cur}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">${ICONS[t.id] || ICONS.home}</svg>${esc(t.label)}</button>`).join("");
  }
  function go(name) {
    cur = name;
    $$("section.view").forEach(s => s.classList.toggle("on", s.id === "v-" + name));
    $$("#tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === name));
    window.scrollTo(0, 0);
  }
  document.addEventListener("click", e => {
    const tab = e.target.closest("[data-tab]");
    if (tab) return go(tab.dataset.tab);
    if (document.body.classList.contains("ed-texting")) return; // 글자 수정 중엔 화면 버튼 동작 멈춤
    const g = e.target.closest("[data-go]");
    if (g) return go(g.dataset.go);
    const s = e.target.closest("[data-seg]");
    if (s) { curSeg = s.dataset.seg; renderFun(); }
  });

  /* ---------- 전체 그리기 ---------- */
  function fillStatic() {
    const brand = $(".brand [data-k='event.brand']");
    brand.hidden = !!IMG.logo;
    const logo = $(".brand img");
    if (IMG.logo) {
      if (!logo) brand.insertAdjacentHTML("beforebegin", `<img alt="">`);
      $(".brand img").src = IMG.logo; $(".brand img").alt = C.event.brand;
    } else if (logo) logo.remove();
    $$("[data-k]").forEach(el => {
      if (el.closest("#home,#tt,#legend,#s-prog,#s-line,#s-music,#zones")) return;
      el.textContent = get(el.dataset.k) ?? "";
    });
    $("#hint").textContent = "예시 계정 · " + C.content.members.map(m => `${m.nick} / ${m.pin}`).join(" · ");
    document.title = `${C.event.brand} Vol.${C.event.vol} · ${String(C.event.slogan).replace(/\n/g, " ")}`;
  }
  function render() {
    IMG = C.images || {};
    applyTheme();
    renderTabs(); renderHome(); renderTT(); renderFun(); renderMap(); fillStatic();
    $$(".dlabel").forEach(el => { el.textContent = dLabel(); });
    if (shownMember) { const m = C.content.members.find(x => x.nick === shownMember); if (m) showCard(m); }
    go(cur);
    document.dispatchEvent(new CustomEvent("hgj:render"));
  }

  /* 편집기에서 쓰는 통로 */
  window.HGJ = {
    get config() { return C; },
    get defaults() { return clone(DEFAULT); },
    get, set, save, render, go,
    replace(cfg) { C = fillKeys(merge(clone(DEFAULT), cfg)); save(); render(); },
    reset() { try { localStorage.removeItem(STORE); } catch (e) { /* 무시 */ } C = clone(DEFAULT); render(); },
    current: () => cur
  };

  const startTab = (location.hash || "").slice(1);
  if (C.layout.tabs.some(t => t.id === startTab)) cur = startTab;
  render();
  setInterval(() => {
    if (document.body.classList.contains("ed-texting")) return; // 글자 수정 중엔 다시 그리지 않음
    renderTT(); $$(".dlabel").forEach(el => { el.textContent = dLabel(); }); }, 60000);
})();
