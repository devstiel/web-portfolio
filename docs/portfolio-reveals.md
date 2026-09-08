# Original work and scroll reveals

Implemented 6 September 2026, following the user's addition of a portfolio made before joining Sampoerna.

## Source review

Reviewed the text of all 16 PDF pages and the supplied slide exports for the selected imagery. The presentation documents PLN analysis, ITS communications and illustration, ICHIRO marketing, Ini Lho ITS creative direction, ISE mascot work, GERIGI branding, and personal content. It does not include Team Liquid campaign artwork or Sampoerna work samples.

Current CV facts take precedence over older education status, GPA, and role labels. November and December PLN reporting periods remain distinct. The ITS gallery explicitly includes artwork from 2024 before the lead role. Shared team outcomes retain their existing attribution.

## Original asset mapping

The images below were extracted as embedded PDF objects using pypdf, then encoded as WebP at quality 85 using the existing Sharp installation. Dimensions and compositions are preserved. They were not generated, redrawn, or taken from presentation screenshots. Together, the eight public assets occupy about 545 KiB before responsive image optimization.

| Public filename under `public/work/` | PDF page / image object | Use |
| --- | --- | --- |
| `devy-portrait.webp` | 1 / X45.jpg | About portrait |
| `pln-report-november.webp` | 4 / X17.png | PLN cover and gallery, November snapshot |
| `pln-report-december.webp` | 4 / X21.png | PLN gallery, December snapshot |
| `its-team.webp` | 5 / X24.jpg | Team photograph |
| `its-world-aids-day.webp` | 8 / X6.png | ITS cover and gallery |
| `its-environment-day.webp` | 8 / X7.png | ITS cover and gallery |
| `its-packing.webp` | 8 / X8.png | ITS gallery |
| `its-music-concert.webp` | 8 / X12.png | ITS cover and gallery |

Source files remain in `data/content/`; the full PDF is not placed in `public/`. Gallery links open the individual full images. Small embedded illustrations retain their source resolution, so enlarging them cannot add detail. `next/image` supplies responsive image sizes and native lazy loading.

## Motion design

- Heading lines rise from masks 100ms apart; each line takes 680ms.
- Project artwork reveals through a 720ms wipe. Metadata, title, description, and link follow in 55ms steps.
- Logic and Imagination approach their final overlap from opposite directions over 650ms.
- Experience rules extend over 550ms, with the summary following 100ms later. The disclosure height animation runs independently.
- About paragraphs, the portrait, and capabilities have short individual entrances. Contact uses the same two-line heading sequence.

These are one-time viewport entrances. They preserve native scrolling and do not pin sections or extend the document with animation spacers. Explicit text-line markup keeps each heading intact for assistive technology. Everything is visible in server-rendered HTML. Reduced motion skips entrances, and keyboard focus cancels an active reveal immediately. Work filters settle child reveals before moving/removing cards. Resize, preference changes, and unmount clean up active animations. Work pages also load the reveal controller; it resets when the project slug changes.

The design direction follows the previously researched [JVEB Studio scroll effects](https://www.awwwards.com/inspiration/scroll-triggered-effects-and-illustrations), [Shalom Osahon animated scroll](https://www.awwwards.com/inspiration/animated-scroll-73), and [LM / AL scrolling gallery](https://www.awwwards.com/inspiration/scroll-portfolio-gallery-lm-al-c-portfolio-23). These references informed the motion approach; the sequences here are original adaptations to this portfolio.

## Verification

The production build and lint passed. Eleven [reveal and media checks](reveal-verification.json) and all 17 existing browser-flow checks passed, including six homepage widths, three gallery widths, original image delivery, keyboard disclosures, filtering, reduced motion, no-JavaScript content, CV delivery, navigation, and accessibility scans. No browser JavaScript errors were recorded. Checks use Chromium, not exhaustive cross-browser or assistive-technology testing.

Local review scripts are in `%TEMP%\devy-portfolio-redesign`. The older design documents and recordings describe previous passes.

[Watch the scroll sequence](previews/scroll-reveals-walkthrough.webm) · [Desktop About](previews/reveals-about-desktop.png) · [Mobile About](previews/reveals-about-mobile.png) · [ITS original work](previews/its-social-media-originals.png) · [PLN original work](previews/pln-business-analysis-originals.png)
