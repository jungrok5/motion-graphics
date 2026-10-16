---
name: tech-motion-explainer
description: Turn a technical process (architecture, pipeline, dev workflow, protocol, infra flow) into a 60–110s code-driven motion-graphic explainer — a set of three pages per topic (video player · written explanation · topic glossary), plus an optional MP4. Use when the user gives technical content and asks for a 모션그래픽 / 설명 영상 / explainer video / animated walkthrough in the style of proto-bot-pipeline.
---

# Tech Motion Explainer

Builds a single-file canvas animation where every frame is a pure function of time (`renderAt(t)`),
wrapped in a player (play/pause, scrubber, chapter chips, speed 1× / 0.75× / 0.5×). Each topic is a set of three pages:
`index.html` (영상), `article.html` (설명, chapter by chapter) and `terms.html` (용어집, this topic's terms only). The same page is baked to MP4 by
`scripts/render.mjs`. Reference implementation: `proto-bot-pipeline/index.html` (64s, 5 chapters).

Files:
- `template.html` (this folder) — engine + player + 4 example scenes (intro, code panel, node flow, outro).
- `scripts/render.mjs` — stills (`--stills 3,20`) or full MP4.
- `scripts/check-player.mjs` — headless check: page errors, play, chapter jump, speed button, notes, phone-width overflow.
- `expert-review.md` — prompt for the senior-expert review agent (step 5).
- `scripts/build-articles.mjs` — builds `<slug>/article.html` (설명) and `<slug>/terms.html` (용어집) from the notes in every video page.
- `assets/fonts/` — Pretendard (Korean/Latin UI) and JetBrains Mono (code). Loaded from `../assets/fonts/`.

## Workflow

### 1. Extract the story (before any code)
From the user's content, write down:
- **Actors / artifacts** (e.g. `.proto`, client, server, bot, publisher). Each gets one role color, used consistently.
- **The flow**, in order. Each step becomes a chapter.
- **The audience** — default: engineers without game-dev background (backend, infra, QA). Write for what they actually ask
  (what happens on the wire and on the server, which number or metric to look at), not only for game programmers.
- **The punchline** — why this matters (e.g. "packets never go stale", "test before the client exists"). It becomes the title and the outro tagline.
  State it as a fact. Do not stage a question and answer it ("답: 조건부로 맞다"); if a claim has conditions, show the conditions as content.
- **Concrete details only this subject has**: real file names, message names, field names, commands, metrics.
  These are what make it read as technical rather than generic. Invented numbers must be labeled `* 수치는 예시`.

### 2. Storyboard table
Show the user nothing yet; write the table into your plan:

| time | chapter | visual device | key on-screen text |
Budget: intro 5s · 4–8 chapters of 10–15s · outro 5.5s → 60–110s total.
Each chapter = one idea and one visual device. Pick from the device catalog below.

### 3. Build
1. `mkdir <slug>` and copy `template.html` → `<slug>/index.html`. Replace `__TITLE__` (2–4 word name).
2. Set `DURATION`, `HEAD` (chapter rows: start, end, number, title, subtitle), `TITLE` (intro only), `OUTRO`.
   The player reads `DURATION` for the time label and slider range; nothing else to update.
   Length guide: chapter title ≤ 14 chars, subtitle ≤ 40 chars, a centered canvas line ≤ ~1600px at its size
   (check with `tw(text, size, weight)` when unsure).
3. Delete the example scenes, write one `sXxx(t)` per chapter, and list them in `renderAt`.
4. Helpers in the template: `panel`, `chip`, `dot`, `txt`, `tw`, `code`, `words`, `bezPt`, `rng`, easing (`eo`, `eio`, `eback`, `win`, `p`).
   Devices beyond that (cards, lanes, tanks, bars, hatching) live in the reference videos in the catalog below; copy the function you need.
5. Scene skeleton:
   ```js
   function sThing(t) {
     const [S, E] = HEAD[i]; const a = win(t, S, E, .5); if (a <= 0) return;
     const u = t - S;                       // local time
     ctx.save(); ctx.globalAlpha = a;
     const k = eo(p(u, .2, .7));             // element enters at u=.2 over .7s
     panel(x, y + (1 - k) * 40, w, h, { alpha: k, stroke: C.proto });
     ...
     ctx.restore();
   }
   ```
   A chapter can have sub-phases: two `win()` windows overlapping by ~0.3s (see `sServerFirst`, `sPublisher`).
   Or one window whose layout persists while state changes (see `sCodegen` → sync, which spans two headers).

6. Write the source text for the 설명 and 용어집 pages into the `<!-- NOTES -->` slot (inside the hidden `<section class="notes">`), for the same audience:
   ```html
   <p class="lede">2–3 sentences: what the video explains and the main takeaway.</p>
   <article data-ch="01"><p>…</p></article>      <!-- one per chapter number in HEAD; no heading -->
   <h2>용어 정리</h2>
   <dl class="terms"><dt>틱</dt><dd>…</dd> …</dl>  <!-- 8–15 terms used in the video -->
   ```
   Chapter titles and subtitles come from `HEAD` when the pages are built, so chapter renames need no notes edit.
   Each chapter: 2–4 short paragraphs (or a `<ul>`) that say what is on screen and why. Numbers must match the canvas exactly.
7. Add the gallery entry (see Deliver), then generate the reading pages from those notes:
   `node scripts/build-articles.mjs` → `<slug>/article.html` (설명: lede, table of contents, chapters with "▶ 이 장면 보기"
   links to `index.html#chNN`) and `<slug>/terms.html` (용어집: this topic's terms, searchable). All three pages share tabs 영상 · 설명 · 용어집.
   Never edit these generated files by hand; edit the notes in `<slug>/index.html` and rerun.

### 4. Verify (mandatory, before showing the user)
```bash
node scripts/render.mjs <slug>/index.html <scratch>/<slug>-stills --stills <times>
node scripts/check-player.mjs <slug>/index.html --shots <scratch>/<slug>-stills
```
- Use a fresh stills folder per video. Files are named `t003.6.png`, `t011.0.png` so they sort by time.
- Pick times: the end of each chapter (everything revealed), plus the moments where something moves through
  or lands near text (packets crossing labels, counters growing, chips appearing). Overlaps hide in those in-between frames.
- The two `404` lines in the render log are expected: fonts are tried at `assets/fonts/` then `../assets/fonts/`.
- Open `article.html` and `terms.html` too (or screenshot them) at desktop and phone width.
- The poster frame (`POSTER`, before play) shows the intro; the big play button sits under the title, so keep the intro's
  story strip above y ≈ 900.
Read every still. Fix overlapping text, clipped boxes, truncated typed lines, empty areas. Re-render only the stills you changed.
Then re-read every on-screen claim and the notes as a skeptical reviewer: is it true as stated, is it compared like-for-like,
is any number or effect exaggerated, is an example number labeled `예시`? Fix before delivering.

### 5. Expert review (mandatory, separate agent)
After the verify step, spawn a separate agent as a senior expert in the topic, using the prompt in
`expert-review.md` (this folder). It reads the page and returns findings in three classes:
**틀림** (false; always fix), **오해 소지** (misleading; fix when a word or clause does it), **단순화 (OK)** (leave as is).

- This is explanatory material: simplification, rounded or labeled example numbers, idealized timelines and analogies
  are allowed as long as nothing is false. Do not tighten the copy beyond what a 틀림 / 오해 소지 finding needs.
- Apply fixes to the canvas text and the notes together, re-render only the stills you changed, rerun
  `node scripts/build-articles.mjs`, and tell the user in one or two lines what the review changed.
- If a finding seems wrong to you, keep the text and say why in your summary instead of silently ignoring it.

### Vertical shorts (9:16)
When the user asks for a short (쇼츠 / 릴스 / 세로), make a separate 40–60s cut of an existing topic, not a full conversion.
Pick 3–4 ideas that carry the topic's main message and redraw them for a phone screen.

- Base: copy `boss-lag-shorts/index.html` (1080×1920 engine, vertical `headers()` / `progress()` / `caption()`, player sized 9:16).
  Name it `<slug>-shorts/`. Keep the numbers and claims identical to the reviewed full video.
- Fill the frame: background and pictures run edge to edge. Only text keeps a light margin from the shorts app's own UI
  (top ~110px, bottom ~280px; avoid the lower-right corner where the like/comment buttons sit). Side margins 60, centered on 540.
  Header y 100–340, picture y 370–1470, two-line caption y 1500–1640.
- Type: title 80, caption 54 / 44, picture labels ≥ 34, key numbers 90+. Give labels that sit over dots a dark backing. One idea per screen; the caption states it in one line.
- End card: the takeaway in two short lines and the full video's link (`jungrok5.github.io/motion-graphics/<slug>`).
- The player nav links to the full video's 영상 · 설명 · 용어집; shorts have no notes of their own.
- Verify the same way (stills, `check-player`), then bake the MP4 to upload: `node scripts/render.mjs <slug>-shorts/index.html out/<slug>-shorts.mp4`.
- Gallery entry: `{ path: '<slug>-shorts/', vertical: true, mp4: 'out/<slug>-shorts.mp4', full: '<slug>/', … }`;
  add a `세로 쇼츠` link to the full video's player nav.

### 6. Deliver
- Publish the page as an Artifact. Use `files` so the fonts and the reading page ship with it:
  `{"article.html": "<slug>/article.html", "terms.html": "<slug>/terms.html", "assets/fonts/Pretendard-Variable.woff2": "assets/fonts/Pretendard-Variable.woff2", "assets/fonts/JetBrainsMono.woff2": "assets/fonts/JetBrainsMono.woff2"}`.
  The page tries `assets/fonts/` first, then `../assets/fonts/`.
- Add an entry to the `VIDEOS` list in the root `index.html` (GitHub Pages gallery) and a row in the matching group table under "영상 목록" in `README.md` (title · length · one-line summary · 영상 / 설명 / 용어집 links).
  Run `node scripts/build-articles.mjs` again if anything changed, then commit and push (the generated pages are committed).
- MP4 only if asked: `node scripts/render.mjs <slug>/index.html out/<slug>.mp4` (~3.5 min per minute of video).

## Rules
- **Determinism**: no `Math.random()`, `Date`, or `performance.now()` inside scenes. Use `rng(seed)`, and derive everything from `t`.
- **Canvas 1920×1080.** Side margins 120. Header zone y < 190 (owned by `headers()`). Progress bar at y 1040. Content lives in y 200–1010.
- **Type sizes**: chapter title 50, scene headline 34–36, body 22–27, code 19–24 mono, smallest labels 15–16. Never below 15.
- **Color = role.** The palette is `C.proto / client / server / bot / pub / red`; rename the roles in a comment if the subject differs, but keep one meaning per color. Red only for failure/threshold.
- **Motion vocabulary**: things enter with `eo` + 30–60px slide; emphasis uses `eback` pop or glow pulse; packets are `dot()`s on `bezPt` paths. Nothing moves without meaning.
- **Text reveals**: give viewers ~1s of read time per 10 Korean characters before the next element replaces it.
- **Contrast beats**: at most one red dashed card + ✗ per video, for the main wrong approach, near the chapter that proves the point.
  Other bad states (waiting, overflow, threshold crossed) use red fills or red hatching without the ✗ card.
- **Korean copy**: short declarative lines. Code, identifiers and metrics stay in English/mono.
- **No AI-sounding copy** (titles, subtitles, canvas text, notes). Avoid:
  - metaphor nouns for a process: "받는 길", "~의 여정", "편도 여행", "전체 지도" → say what it is: "패킷을 받을 때", "전체 구간";
  - "~하는 곳", "핵심은 ~다", "단순히 ~가 아니라 ~다", "~라는 점이다", 살펴보자 / 알아보자, rhetorical questions;
  - aphorism taglines built on contrast or metaphor ("바이트는 작지만, 곱하기는 크다", "예측이 판정에 진 순간").
    The tagline states the takeaway plainly: "1바이트도 곱하면 월 6.5TB.";
  - more than one em dash (—) per line of copy; prefer a comma or a new line.
- **Honesty**: compare like with like (tuned vs tuned, not tuned vs default). Effects that depend on a bottleneck say which one
  ("대역폭이 병목일 때"). Small effects are shown as small.
- **Progress bar labels** shorten themselves to fit between ticks (`progress()`); keep chapter titles short anyway (≤ 14 chars reads best).

## Device catalog (where to copy from in proto-bot-pipeline)
| device | when | reference |
|---|---|---|
| Typed code panel + 3 explanation cards | defining a schema/config/API | `sProto` |
| Hub-and-spoke codegen (source → tool → N outputs) | one source fans out | `sCodegen` |
| In-place diff (`insert` in `code()`) + version chips flip + ✓ badges | change propagates / stays in sync | `sCodegen` (u ≥ 10) |
| Stale/bad alternative card (dashed red, shake, ✗) | contrast | `sCodegen` ghost card |
| Gantt timeline with playhead + hatched gap | schedule / who waits on whom | `sServerFirst` part A |
| Sequence diagram (lifelines, arrows, burst) | request/response protocol, call order | `sServerFirst` part B |
| Hand-off arc between two team cards | deliverable passes between teams | `sPublisher` part A |
| Load dashboard (dot grid, server gauges, line chart with threshold, stat chips) | scale / capacity / metrics | `sPublisher` part B |
| Result cards row | conclusions of a chapter | `sPublisher` RES |
| Node strip + tagline | outro summary | `sOutro` |

More devices in later videos (copy the function and its helpers):
| device | when | reference |
|---|---|---|
| Thread / time lanes with blocks and hatched waits (`laneLabel`, `blk`) | threads, frames, who waits on whom over time | `ue-client-threads` `sThreads`, `sBossFrame`, `sHitch` |
| Stacked latency bar per scenario | where the milliseconds go | `ue-client-threads` `sLatency` |
| Line chart with shaded gap and live counter | rate in vs rate out, backlog growing | `slow-client` `sSqueeze` |
| Tanks (buffers filling, cap line) and flow arrows (`tank`, `flowArrow`) | queues, buffers, backpressure | `slow-client` `sBackpressure`, `sCap` |
| 2×2 cards with a small animation each (`cardFrame`) | four causes / four costs | `slow-client` `sCosts` |
| Byte cells per field, bit layout | packet formats, sizes | `one-byte` `sSizes` (`protoRow`, `bitRow`) |
| Bars with values + savings panel | totals, cost, capacity comparisons | `one-byte` `sTotals`, `sCapacity` |
| Terminal output + judgement list | which metric to read and what it means | `slow-client` `sDetect` |
| Two-column fix list (`noteRow`) | client side vs server side remedies | `slow-client` `sFixes` |

For a protocol timing diagram with time running down the page, use the lane devices rotated: one vertical lifeline per side,
y = time in ms (label the axis), arrows between lifelines at their send/receive times, red hatching for waits.
