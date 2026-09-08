# Interactive hero star

Implemented 5 September 2026, following the [motion pass](portfolio-motion.md).

The hero now uses a small sculptural version of the existing star. Its outline is shared with the flat marks, its face uses the portfolio's lime colour, and warm lighting and olive edges sit against the cream background. The large name and introduction remain the main visual focus.

## Interaction

- Moving a mouse or pen over the star gently tilts it. Leaving the control returns it to its resting angle.
- Clicking, tapping, Enter, or Space turns the star once. Repeated activation during a turn does not stack rotations.
- A native button provides a visible focus outline and the label “Turn the star.” The small “Give it a turn” caption makes the interaction discoverable.
- Touch preserves vertical scrolling. The sculpture scales down with the existing mobile layout.

## Loading and graphics

`components/StarSculpture.tsx` handles visibility, motion preferences, input, and cleanup. It imports `components/star-scene.ts` after a short delay only when the hero is visible, the document is active, and reduced motion is off. `data/starShape.ts` supplies the same outline to the SVG and extruded geometry.

The scene uses Three.js 0.185.1, a shallow bevelled extrusion, an orthographic camera, and simple lighting. The [WebGPU renderer](https://threejs.org/manual/en/webgpurenderer.html) prefers WebGPU and automatically falls back to WebGL 2. No textures, models, physics, or post-processing assets are downloaded. The production graphics chunk is approximately 788 KiB before compression, or 214 KiB with gzip; it is deferred and skipped entirely on an initial reduced-motion visit.

Actual draw calls stop once the star settles and pause when it is offscreen or the document becomes hidden. The drawing resolution is capped at twice the CSS dimensions. This describes rendering work; Three.js retains its own internal frame bookkeeping while the renderer exists.

The server-rendered SVG remains visible until graphics are ready. Reduced motion, missing graphics support, context loss, and missing JavaScript retain that static identity. Failed initialization does not create a retry loop. Preference changes and navigation [dispose the geometry, materials, and renderer](https://threejs.org/manual/en/cleanup.html). Re-enabling motion creates a fresh canvas because disposing Three.js's WebGL backend loses the previous context.

## Verification

Production build and lint passed. The 17 existing browser-flow checks, six refinement checks, and ten motion checks passed again. Their accessibility scans reported no violations in the tested states.

All 14 [3D-specific checks](star-verification.json) passed, bringing the combined browser-check count to 47. These cover actual rendering, pointer and keyboard interaction, idle/offscreen/hidden-document draw counts, six viewport widths from 320 to 1440px, preference changes, route cleanup, real WebGL context loss, skipped downloads with reduced motion, unavailable graphics, touch, preference changes during a delayed download, and no-JavaScript content. The active 3D homepage also passed the tested Axe rules. No browser JavaScript errors were recorded.

Native WebGPU could not be exercised: this Chromium environment returned no available adapter, including with experimental WebGPU enabled. The interactive render was verified through the automatic WebGL 2 fallback using software graphics. This is not a claim of native-GPU performance or complete Safari/Firefox coverage.

Browser scripts are under `%TEMP%\devy-portfolio-redesign`; no browser-testing dependency was added to the application. The application dependency audit reported no known vulnerabilities at verification time.

[Watch the star interaction](previews/star-walkthrough.webm) · [Desktop hero](previews/star-hero-desktop.png) · [Mobile hero](previews/star-hero-mobile.png)
