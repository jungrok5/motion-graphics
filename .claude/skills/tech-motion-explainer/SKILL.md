---
name: tech-motion-explainer
description: Turn a technical process (architecture, pipeline, dev workflow, protocol, infra flow) into a 45–75s code-driven motion-graphic explainer — a playable web page with a player, plus an optional MP4. Use when the user gives technical content and asks for a 모션그래픽 / 설명 영상 / explainer video / animated walkthrough in the style of proto-bot-pipeline.
---

# Tech Motion Explainer

Builds a single-file canvas animation where every frame is a pure function of time (`renderAt(t)`),
wrapped in a player (play/pause, scrubber, chapter chips). The same page is baked to MP4 by
`scripts/render.mjs`. Reference implementation: `proto-bot-pipeline/index.html` (64s, 5 chapters).

Files:
- `template.html` (this folder) — engine + player + 4 example scenes (intro, code panel, node flow, outro).
- `scripts/render.mjs` — stills (`--stills 3,20`) or full MP4.
- `scripts/check-player.mjs` — headless check: page errors, play, chapter jump, phone-width overflow.
- `assets/fonts/` — Pretendard (Korean/Latin UI) and JetBrains Mono (code). Loaded from `../assets/fonts/`.

## Workflow

### 1. Extract the story (before any code)
From the user's content, write down:
- **Actors / artifacts** (e.g. `.proto`, client, server, bot, publisher). Each gets one role color, used consistently.
- **The flow**, in order. Each step becomes a chapter.
- **The punchline** — why this matters (e.g. "packets never go stale", "test before the client exists"). It becomes the title and the outro tagline.
- **Concrete details only this subject has**: real file names, message names, field names, commands, metrics.
  These are what make it read as technical rather than generic. Invented numbers must be labeled `* 수치는 예시`.

### 2. Storyboard table
Show the user nothing yet; write the table into your plan:

| time | chapter | visual device | key on-screen text |
Budget: intro 5s · 3–6 chapters of 8–13s · outro 5.5s → 45–75s total.
Each chapter = one idea and one visual device. Pick from the device catalog below.

### 3. Build
1. `mkdir <slug>` and copy `template.html` → `<slug>/index.html`. Replace `__TITLE__` (2–4 word name).
2. Set `DURATION`, `HEAD` (chapter rows: start, end, number, title, subtitle), `TITLE`, `OUTRO`.
3. Delete the example scenes, write one `sXxx(t)` per chapter, and list them in `renderAt`.
4. Scene skeleton:
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

### 4. Verify (mandatory, before showing the user)
```bash
node scripts/render.mjs <slug>/index.html <scratch>/stills --stills <mid of each chapter + 1–2 transitions>
node scripts/check-player.mjs <slug>/index.html
```
Read every still. Fix overlapping text, clipped boxes, truncated typed lines, empty areas. Re-render only the stills you changed.

### 5. Deliver
- Publish the page as an Artifact. Use `files` so the fonts ship with it:
  `{"assets/fonts/Pretendard-Variable.woff2": "assets/fonts/Pretendard-Variable.woff2", "assets/fonts/JetBrainsMono.woff2": "assets/fonts/JetBrainsMono.woff2"}`.
  The page tries `assets/fonts/` first, then `../assets/fonts/`.
- Add an entry to the `VIDEOS` list in the root `index.html` (GitHub Pages gallery). Commit and push.
- MP4 only if asked: `node scripts/render.mjs <slug>/index.html out/<slug>.mp4` (~3.5 min per minute of video).

## Rules
- **Determinism**: no `Math.random()`, `Date`, or `performance.now()` inside scenes. Use `rng(seed)`, and derive everything from `t`.
- **Canvas 1920×1080.** Side margins 120. Header zone y < 190 (owned by `headers()`). Progress bar at y 1040. Content lives in y 200–1010.
- **Type sizes**: chapter title 50, scene headline 34–36, body 22–27, code 19–24 mono, smallest labels 15–16. Never below 15.
- **Color = role.** The palette is `C.proto / client / server / bot / pub / red`; rename the roles in a comment if the subject differs, but keep one meaning per color. Red only for failure/threshold.
- **Motion vocabulary**: things enter with `eo` + 30–60px slide; emphasis uses `eback` pop or glow pulse; packets are `dot()`s on `bezPt` paths. Nothing moves without meaning.
- **Text reveals**: give viewers ~1s of read time per 10 Korean characters before the next element replaces it.
- **Contrast beats**: show the bad alternative (red dashed card + ✗) once, near the chapter that proves the point.
- **Korean copy**: short declarative lines. Code, identifiers and metrics stay in English/mono.

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
