# Portfolio redesign and verification

Completed 5 September 2026. The [research note](portfolio-research.md) describes the previous site; this document records the implemented design and its verification.

## Implemented

- Editorial homepage with warm paper tones, oversized typography, restrained colour, and original typographic project covers.
- Four work overviews based on the supplied CV: Sampoerna, PLN UP3 Bekasi, ITS Public Communication Unit, and Team Liquid. Work filters and individual project pages connect the summaries to their context and deliverables.
- Actual experience, education, scholarships, capabilities, and contact details replace the former placeholder biography and arbitrary skill scores.
- Working CV download, copy-email feedback and fallback, social links, mobile navigation, keyboard-accessible experience disclosures, and a custom social preview.
- Optional terminal and compatibility API use the same public content as the website. No model API key or external AI request is required.
- Responsive cover sizing prevents captions from being cropped or grid items from expanding past narrow viewports. The social preview uses the same vector mark as the site.

## Previews

- [Desktop first screen](previews/desktop.png)
- [Full desktop page](previews/desktop-full.png)
- [Mobile first screen](previews/mobile.png)

At the checked desktop viewport (1440 × 1000), selected work begins at approximately y=659. The previous audit recorded y=4,377. The final mobile page at 390px wide is approximately 7,498px tall, compared with approximately 12,231px in the previous audit. These are viewport-specific observations, not performance scores.

## Verification

Verified against the production build with Next.js 16.3.4:

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npm run build` | Pass; all four work routes prerendered |
| Browser flow checks | 17 passed; [saved results](browser-verification.json) |
| Homepage responsiveness | No document overflow at 320, 390, 540, 768, 1024, or 1440px |
| Work-page responsiveness | All four pages checked at 320, 390, 768, and 1440px |
| Cover layout | 20 route/viewport combinations; no clipped cover captions |
| Accessibility automation | Axe 4.10.3 WCAG 2 A/AA and 2.1 AA checks: no reported violations on desktop/mobile home, four work pages, and terminal |
| Browser JavaScript errors | None recorded in the flow checks |
| CV | Downloaded PDF is byte-identical to the supplied source PDF |
| Navigation and controls | Work filters, project entry/return, mobile menu, Escape focus return, keyboard disclosures, terminal history/clear, and 404 behaviour passed |
| Contact | Source URLs, real clipboard copy, and denied-clipboard fallback passed |
| Compatibility API | Verified sourced response, malformed JSON, invalid/missing prompts, length limit, and oversized-body responses |
| Social preview | PNG response verified and visually inspected |
| Without JavaScript | Core homepage content, all four work links, and CV remain available |
| Dependency audit after updates | Zero reported vulnerabilities |

Browser scripts ran locally with Playwright; their temporary working files are under `%TEMP%\devy-portfolio-redesign`. No browser-testing dependency was added to the application. Automated accessibility checks do not replace manual assistive-technology testing, and this was not a complete accessibility certification.

## Content limits and future updates

The source folder did not contain original campaign artwork, product screens, or report screenshots. The covers introduce the work typographically and are not presented as those original artifacts. Work pages explain the distinction. Add suitable original assets when available; keep claims tied to the supplied evidence.

Dates and Present roles reflect the supplied September 2026 CV. The complete live LinkedIn profile was unavailable during research. Updating the portfolio's content and its downloadable CV together is documented in the [README](../README.md).

The app is ready for local review. No deployment was performed. Set the actual production URL as described in the README when deploying.

The subsequent [award-reference review](portfolio-polish.md) documents refinements to navigation, project reading order, cover interactions, and sharing metadata, with six additional browser checks. The homepage previews and browser results were refreshed after that pass.

The later [motion and interactivity pass](portfolio-motion.md) adds the Logic / Imagination explorer and animation. The page-height measurements above describe the earlier redesign snapshot; the explorer adds content to the About section.
