// Build the reading pages from the notes already inside each video page.
//   <slug>/article.html — chapter-by-chapter explanation + glossary, one per video
//   glossary.html       — every glossary term across all videos, searchable
// Source of truth: the <section class="notes"> and HEAD in <slug>/index.html, and VIDEOS in the root index.html.
// Usage: node scripts/build-articles.mjs            (run from the repo root after editing any notes)
import fs from 'node:fs';

const SITE = 'https://jungrok5.github.io/motion-graphics/';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const between = (s, a, b, from = 0) => { const i = s.indexOf(a, from); if (i < 0) return null; const j = s.indexOf(b, i + a.length); return j < 0 ? null : s.slice(i + a.length, j); };

const gallery = fs.readFileSync('index.html', 'utf8');
const VIDEOS = Function(`return [${between(gallery, 'const VIDEOS = [', '\n  ];')}]`)();

const FONTS = `@font-face { font-family: Pretendard; src: url(assets/fonts/Pretendard-Variable.woff2) format("woff2"), url(../assets/fonts/Pretendard-Variable.woff2) format("woff2"); font-weight: 100 900; }
  @font-face { font-family: "JetBrains Mono"; src: url(assets/fonts/JetBrainsMono.woff2) format("woff2"), url(../assets/fonts/JetBrainsMono.woff2) format("woff2"); font-weight: 100 800; }`;
const CSS = `
  /* Reading page: one 720px column, light and dark. */
  ${FONTS}
  :root {
    --bg: #fbfbfd; --surface: #f1f2f7; --line: #dde0ea; --fg: #141826; --text2: #39405a; --dim: #6b7290; --accent: #6d4fd8;
    --sans: Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif;
    --mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
  }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
    --bg: #070a13; --surface: #0e1424; --line: #24304a; --fg: #e8ecf4; --text2: #c3cad8; --dim: #8b95a7; --accent: #a78bfa; color-scheme: dark; } }
  :root[data-theme="dark"] { --bg: #070a13; --surface: #0e1424; --line: #24304a; --fg: #e8ecf4; --text2: #c3cad8; --dim: #8b95a7; --accent: #a78bfa; color-scheme: dark; }
  body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--sans); font-size: 17px; line-height: 1.8;
    word-break: keep-all; overflow-wrap: anywhere;
    padding-block: 48px 72px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  main { max-width: 720px; margin: 0 auto; }
  a { color: var(--accent); }
  .eyebrow { font: 600 12px/1 var(--mono); letter-spacing: .18em; color: var(--dim); text-transform: uppercase; }
  h1 { font-size: clamp(30px, 6vw, 42px); line-height: 1.25; letter-spacing: -.02em; margin: 12px 0 16px; text-wrap: balance; }
  h2 { font-size: 24px; line-height: 1.4; margin: 56px 0 4px; text-wrap: balance; display: flex; gap: 12px; align-items: baseline; }
  h2 .n { font: 600 15px/1 var(--mono); color: var(--accent); flex: none; }
  .sub { color: var(--dim); margin: 0 0 16px; font-size: 16px; }
  p, li { color: var(--text2); }
  .lede { font-size: 19px; color: var(--fg); }
  .actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0 8px; }
  .actions a { font: 600 14px/1 var(--sans); text-decoration: none; color: var(--fg); border: 1px solid var(--line); border-radius: 999px; padding: 10px 14px; background: var(--surface); }
  .actions a:hover { border-color: var(--accent); }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; font: 500 12px/1 var(--mono); color: var(--dim); }
  .tags span { border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; }
  nav.toc { border: 1px solid var(--line); border-radius: 12px; padding: 16px 20px; margin: 32px 0 0; background: var(--surface); }
  nav.toc ol { margin: 0; padding-left: 1.4em; } nav.toc li { color: var(--fg); }
  nav.toc a { color: inherit; text-decoration: none; } nav.toc a:hover { color: var(--accent); }
  .scene { font: 600 13px/1 var(--sans); }
  code { font: 500 .88em var(--mono); background: var(--surface); border: 1px solid var(--line); border-radius: 4px; padding: 1px 5px; }
  dl.terms { display: grid; grid-template-columns: minmax(120px, max-content) minmax(0, 1fr); gap: 14px 28px; margin: 16px 0 0; }
  dt { font-weight: 700; color: var(--fg); } dd { margin: 0; color: var(--text2); }
  dd .src { display: block; font-size: 13px; color: var(--dim); }
  @media (max-width: 600px) { dl.terms { grid-template-columns: minmax(0, 1fr); gap: 2px; } dd { margin-bottom: 16px; } }
  input[type=search] { width: 100%; box-sizing: border-box; font: 500 16px var(--sans); color: var(--fg); background: var(--surface);
    border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; margin: 16px 0 8px; }
  footer { margin-top: 64px; font-size: 14px; color: var(--dim); }`;
const page = (title, body, desc) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<style>${CSS}
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;

const glossary = new Map();   // normalized term -> { label, defs: [{ def, slug, title }] }
for (const v of VIDEOS) {
  const slug = v.path.replace(/\/$/, ''), src = `${slug}/index.html`;
  if (!fs.existsSync(src)) continue;
  const html = fs.readFileSync(src, 'utf8');
  const HEAD = Function(`return [${between(html, 'const HEAD = [', '\n];')}]`)();
  const notes = between(html, '<section class="notes" id="notes" hidden>', '</section>');
  if (!notes || !notes.includes('<article')) { console.warn(`skip ${slug}: no notes`); continue; }
  const lede = between(notes, '<p class="lede">', '</p>') || '';
  const arts = [...notes.matchAll(/<article data-ch="(\d\d)">([\s\S]*?)<\/article>/g)];
  const terms = between(notes, '<dl class="terms">', '</dl>') || '';
  for (const [, dt, dd] of terms.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)) {
    // same term with a different parenthetical (틱 / 틱 (Tick)) merges into one entry; the fullest label wins
    const label = dt.trim(), key = label.replace(/<[^>]+>/g, '').replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!glossary.has(key)) glossary.set(key, { label, defs: [] });
    const g = glossary.get(key); if (label.length > g.label.length) g.label = label;
    g.defs.push({ def: dd.trim(), slug, title: v.title });
  }
  const chapters = arts.map(([, n, body]) => {
    const h = HEAD.find(r => r[2] === n) || [0, 0, n, '', ''];
    return `<section id="ch${n}">
<h2><span class="n">${n}</span>${esc(h[3])}</h2>
<p class="sub">${esc(h[4])} · <a class="scene" href="index.html#ch${n}">▶ 이 장면 보기</a></p>
${body.trim()}
</section>`;
  });
  const body = `<span class="eyebrow">글로 읽기 · ${esc(v.length)}</span>
<h1>${esc(v.title)}</h1>
<div class="tags">${v.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
<div class="actions"><a href="index.html">▶ 영상으로 보기</a><a href="#terms">용어 정리</a><a href="${SITE}glossary.html">전체 용어집</a></div>
<p class="lede">${lede}</p>
<nav class="toc" aria-label="목차"><ol>${arts.map(([, n]) => { const h = HEAD.find(r => r[2] === n); return `<li><a href="#ch${n}">${esc(h ? h[3] : n)}</a></li>`; }).join('')}<li><a href="#terms">용어 정리</a></li></ol></nav>
${chapters.join('\n')}
<section id="terms">
<h2>용어 정리</h2>
<dl class="terms">${terms}</dl>
</section>
<footer><a href="${SITE}">전체 영상 목록</a> · <a href="${SITE}glossary.html">전체 용어집</a></footer>`;
  fs.writeFileSync(`${slug}/article.html`, page(`${v.title} — 글`, body, v.desc));
  console.log(`${slug}/article.html  ${arts.length} chapters`);
}

const keys = [...glossary.keys()].sort((a, b) => a.localeCompare(b, 'ko'));
const gbody = `<span class="eyebrow">Glossary</span>
<h1>용어집</h1>
<p class="lede">모든 영상에 나오는 용어를 한곳에 모았다. 같은 용어도 영상마다 설명하는 맥락이 달라, 영상별 설명을 함께 둔다.</p>
<div class="actions"><a href="./">전체 영상 목록</a></div>
<input type="search" id="q" placeholder="용어 찾기 (예: RTT, 틱, Zero Window)" aria-label="용어 찾기">
<dl class="terms" id="list">
${keys.map(k => `<dt>${glossary.get(k).label}</dt><dd>${glossary.get(k).defs.map(e => `<div>${e.def}<span class="src"><a href="${e.slug}/article.html#terms">${esc(e.title)}</a></span></div>`).join('')}</dd>`).join('\n')}
</dl>
<footer>${keys.length}개 용어 · <a href="./">전체 영상 목록</a></footer>
<script>
  const q = document.getElementById('q'), dts = [...document.querySelectorAll('#list dt')];
  q.addEventListener('input', () => { const s = q.value.trim().toLowerCase();
    dts.forEach(dt => { const show = !s || (dt.textContent + dt.nextElementSibling.textContent).toLowerCase().includes(s); dt.hidden = dt.nextElementSibling.hidden = !show; }); });
</script>`;
fs.writeFileSync('glossary.html', page('용어집', gbody, '모든 기술 설명 영상에 나오는 용어 모음'));
console.log(`glossary.html  ${keys.length} terms`);
