# Other ways to explain (3D, WebGL)

A "style" here is an **approach to explaining**, not a look. Each approach is a principle for how the picture carries the idea;
the look (palette, type, header, end card, materials) comes from the topic itself. References people send are inspiration for the
principle and the craft level, never a template: do not copy a reference's colors, header wording, title typography, end card or layout.

## The approaches

| Approach | Principle | Fits when the topic… | Does not fit when… |
|---|---|---|---|
| **분해해 들어가기** (open it up) | Start from something you can see, take it apart, and keep going inside until the working principle is visible. | has a real nesting: a thing that physically or structurally contains the thing that matters (packet → fields → bits; server process → threads → one tick; one client frame → thread work). | the idea is a comparison, a rule or a decision, with nothing to open. |
| **흐름과 관계를 빛으로** (make the invisible flow visible) | Show data movement, connection density, pressure or waiting as light, particles and links, so the shape of the load is felt. | is about something moving, piling up or connecting (a packet's path, N × (N − 1) links, back-pressure through queues). | the point is a specific artifact the viewer must read (code, a log line, a metric table). |
| **실물을 공간에 늘어놓기** (put the real artifacts in space) | Put the actual things engineers look at (files, code, logs, dashboards, timelines) in a space and walk through them in order. | is a pipeline or a procedure whose steps produce or read real artifacts (codegen pipeline, a diagnosis checklist with metrics). | there are no real artifacts, only an abstract mechanism. |

If none fits, keep the 2D explainer. Do not force a topic into an approach; a forced one reads as a template pasted on.

## Choosing, per topic
1. Write one sentence: "the viewer understands it when they see ___." If the blank is *inside* something → 분해. If it is *movement or density* → 흐름.
   If it is *the real screen/file* → 실물. Otherwise → 2D.
2. Derive the look from the subject's own world: what the thing really looks like or what the engineer really looks at
   (a profiler timeline, a packet capture, a rack, a log viewer, a game scene). Pick palette and type from that, not from a reference.
3. Decide the beats from the reviewed 2D video's chapters; every chapter's facts must survive.

## Cuts and pages
- **Wide (PC, 1920×1080, `<slug>-<approach>-wide/`) = the full explainer**: same chapters, timing, numbers, claims, footnotes and hidden notes
  as the reviewed 2D video `<slug>/index.html`, nav to its `article.html` and `terms.html`. Compare stills of the same moments chapter by chapter.
- **Vertical (mobile, 1080×1920, `<slug>-<approach>/`) = a ~20 s cut** of the main message. Recompose for each frame; never letterbox.

## Engine (shared)
- three.js 0.170 vendored in `assets/vendor/three/`; importmap
  `{"three": "../assets/vendor/three/build/three.module.min.js", "three/addons/": "../assets/vendor/three/examples/jsm/"}`.
- Offscreen `WebGLRenderer({antialias: true, preserveDrawingBuffer: true})` → `EffectComposer` (RenderPass, UnrealBloomPass, OutputPass) →
  `ctx.drawImage(gl.domElement, 0, 0)` onto `#c` → 2D text on top. `render.mjs` and `check-player.mjs` work unchanged.
- Every frame a pure function of t (seeded random, no frame-to-frame state). `window.DURATION`, `window.ready`, `window.renderAt`.
- Lists and tables from the 2D video become clean 2D text columns or in-scene panels, readable on a laptop (body ≥ 28px, key numbers ≥ 90px).
- Real-time cost matters (the page is the deliverable): InstancedMesh, hide what is out of view, modest shaders.

## Verify
- Stills (`render.mjs --stills`, ~1–2 s each in the container), every chapter end and middle, ≥ 3 rounds. `check-player.mjs` exits 0.
- Look test: put a still next to the reference that inspired it. If it reads as the same video with our words swapped in, redo the look.
- Save `<folder>/poster.png`; gallery cards in `LAB` use it.
- **No MP4 unless asked** (20+ min per 20 s without a GPU).

## Craft notes per approach
`zoom.md` (분해), `glow.md` (흐름), `glass.md` (실물). These hold techniques that worked and what went wrong in the first samples.
The first samples (`*-glow`, `*-glass`, `packet-zoom`) copied their references' surface too closely; use them for technique, not for look.
