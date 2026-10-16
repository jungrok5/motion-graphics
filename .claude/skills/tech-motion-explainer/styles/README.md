# Visual styles (3D, WebGL)

The default look is the 2D canvas explainer (dense information, 1–2 min, baked to MP4).
These styles are short cinematic cuts (~20 s, or ~45 s for the zoom) of an existing, reviewed topic. Use one when the user asks
for a different 그림체 / 스타일 / 광고 느낌 / 3D, or names one below. Pick by what the topic is:

| Style | Base pages (copy one) | Fits topics that are… |
|---|---|---|
| A · 빛 입자 (glow) | `skill-journey-glow/`, `boss-lag-glow/` (+ `-wide/`) | a flow or a crowd: things travel, gather, connect, fan out |
| B · 3D 유리 패널 (glass) | `skill-journey-glass/`, `boss-lag-glass/` (+ `-wide/`) | a sequence of stages with real content (fields, lists, numbers) per stage |
| C · 연속 줌인 (zoom) | `packet-zoom/` | "what is inside what": hardware down to bits, system down to one record |

Details per style: `glow.md`, `glass.md`, `zoom.md`.

## Common engine (all three)
- three.js 0.170 is vendored in `assets/vendor/three/`. Importmap:
  `{"three": "../assets/vendor/three/build/three.module.min.js", "three/addons/": "../assets/vendor/three/examples/jsm/"}`.
- Offscreen `WebGLRenderer({antialias: true, preserveDrawingBuffer: true})` at the canvas size → `EffectComposer` (RenderPass, UnrealBloomPass, OutputPass)
  → each frame `ctx.drawImage(gl.domElement, 0, 0)` onto the visible 2D canvas `#c` → header, counters and captions drawn in 2D on top
  (Pretendard / JetBrains Mono, same fonts as every page). `scripts/render.mjs` and `check-player.mjs` work unchanged because they read `#c`.
- Every frame is a pure function of t: camera, positions, opacity and canvas-texture contents come from t only (seeded random, no frame-to-frame state;
  trails are re-sampled from earlier t). Expose `window.DURATION`, `window.ready`, `window.renderAt`.
- Player shell: copy from the base page (vertical: 9:16 player of the `-shorts` pages; wide: 16:9 player of the full videos). Nav links point to the
  topic's full video, 설명 and 용어집.
- Facts: same numbers and claims as the reviewed full video of the topic; mark examples once (`* 수치는 예시`). Copy rules from SKILL.md still apply.
- Orientation: make the wide (PC, 1920×1080, folder `<slug>-<style>-wide/`) and the vertical (mobile, 1080×1920, `<slug>-<style>/`) as separate pages.
  Recompose for each frame shape; do not letterbox.

## Verify
- Stills as usual (`render.mjs --stills`); software WebGL in the container takes ~1–2 s per still. Check beat ends and in-between moments, compare
  side by side with the reference frames, iterate at least 3 rounds. `check-player.mjs` → `errors: []`.
- Save `<folder>/poster.png` (one representative still); the gallery's 스타일 실험 cards show it instead of a live iframe
  (several live WebGL iframes on one page would be heavy).
- **MP4: do not bake unless asked.** In the container it takes 20+ minutes per 20 s (no GPU). The pages play live in a normal browser.
- Real-time cost matters because the page is the deliverable: InstancedMesh / merged geometry, hide what is out of view, and keep shader work modest.

## Gallery and README
Add one card per topic × style to `LAB` in the root `index.html` (`style`, `wide`, `tall`, `mp4` if one exists, `full`, `title`, `length`, `desc`, `tags`)
and a row to the README's 스타일 실험 table.
