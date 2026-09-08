# Parchment and burgundy

Implemented 8 September 2026 following the selected palette. Parchment backgrounds and warm ink retain the editorial composition, with burgundy identifying key details and active controls. Pale rose provides readable accents on the dark footer and terminal.

## Colour roles

| Role | Token | Colour |
| --- | --- | --- |
| Page background | `--paper` | `#F5EFE7` |
| Primary text and dark surfaces | `--ink` | `#292225` |
| Secondary text | `--muted` | `#6B5C62` |
| About and gallery panels | `--panel` | `#EBE0DC` |
| Dividers | `--line` | `#CCBDBB` |
| Main accent | `--accent` | `#7B3048` |
| Accent on dark surfaces | `--accent-light` | `#E8B6C4` |
| Sculpture edge and shadow | `--accent-edge` | `#491B2B` |

`app/globals.css` owns the interface palette. `components/star-scene.ts` reads its face and edge colours from the canvas's computed CSS variables when the scene is created. Warm lighting replaces the former green light cast. The SVG fallback uses the same tokens. The server-generated social image and static favicon contain matching literal colours because they render outside the page's CSS context.

The updated surfaces include the name's punctuation, work explorer, experience toggles, project arrows, CV interaction, skip link, text selection, cover decorations, gallery frames, footer, terminal, social preview, and favicon. Burgundy fills use parchment foregrounds. The selected explorer's inset focus ring also switches to parchment. Original images and project-specific navy frames retain their colours.

## Verification

Fresh production build and ESLint passed. [Recorded results](colour-verification.json) include:

- 17 Chromium browsing checks: filters, navigation, four work pages, CV byte identity, contact actions, terminal, API, social image, and content without JavaScript.
- 11 reveal and gallery checks, including keyboard interruption, rapid filtering, and reduced motion.
- 14 sculpture checks covering rendering, pointer/keyboard/touch interaction, pause and disposal, context loss, missing graphics, and static fallback.
- Eight checks each in Firefox and WebKit, covering reveals, filters, explorer, disclosures, motion preferences, mobile navigation, gallery, and automated accessibility.
- 12 contrast checks for body text, selection, skip link, CV states, selected explorer and its focus ring, experience icon, project arrows, footer accent, and terminal submit button.

Tested automated accessibility scans reported no violations. Body text on parchment measures **13.62:1**; parchment text on burgundy measures **7.79:1**; pale rose on warm ink measures **8.83:1**. These checks support the tested states and do not constitute a complete accessibility audit.

Desktop and mobile previews were visually reviewed. Layout checks cover widths from 320 to 1440 pixels. The graphics tests exercised the **WebGL 2 fallback**; native WebGPU hardware was unavailable in this environment.

## Previews

- [Desktop with the rendered 3D star](previews/burgundy-hero.png)
- [Mobile with the rendered 3D star](previews/burgundy-hero-mobile.png)
- [About section](previews/burgundy-about.png)
- [Contact section](previews/burgundy-contact.png)
- [Full mobile page with reduced motion](previews/burgundy-mobile.png)

Earlier design and motion documents describe historical snapshots. This document records the current palette.
