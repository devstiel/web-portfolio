# Portfolio review and refinements

Reviewed 5 September 2026, following the completed editorial redesign. This pass preserves the cream, ink, and lime palette and the existing work selection.

## Award-winning references

Award status was checked against the official Awwwards records, rather than a third-party inspiration list. Dates below refer to the awarded versions; live portfolios can change.

| Reference | Verified award | Relevant lesson |
| --- | --- | --- |
| [Dennis Snellenberg](https://www.awwwards.com/sites/dennis-snellenberg) | Site of the Day, 4 April 2022 | The record highlights navigation, contact, and microinteractions. His [live portfolio](https://dennissnellenberg.com/) clearly separates recent work, contribution labels, and contact. |
| [Bruno Simon Portfolio](https://www.awwwards.com/sites/bruno-simon-portfolio) | Site of the Day, 11 November 2019 | The archived game-based project navigation demonstrates his interactive development craft. The useful principle is that the presentation should express the person's actual work. |
| [Aristide Benoist — Portfolio](https://www.awwwards.com/sites/aristide-benoist-portfolio) | Site of the Day, 11 October 2017 | The record foregrounds project-page layout and transitions and explicitly credits design, development, motion, and 3D contributors. Clear attribution belongs alongside visual presentation. |

The application of these lessons is editorial judgment, not a claim that a particular feature wins awards. External source code and artwork were not copied. Bruno and Aristide were reviewed through the archived award records; Dennis's live homepage was also opened in Chromium.

## Changes made

- Navigation now marks the section being read with a small dot on desktop and an underline in the mobile menu. Project pages mark Work until the contact section is reached. Returning to the homepage introduction clears the indicator.
- The mobile menu closes when keyboard focus moves outside it, in addition to the existing Escape, pointer, navigation, and resize behavior.
- The header uses the same SVG star as the rest of the identity. Each work cover has a restrained interaction suited to its composition: a turning question mark, a straightening report, or a rotating star. Keyboard focus receives the same treatment; reduced-motion mode keeps the artwork still.
- The introduction removes the repeated phrase “creative streak” and names ITS directly.
- Work pages put their existing facts before the narrative, and place the source/context note beside the cover as a figure caption. The source data and attribution remain intact.
- Each project has its own Open Graph and Twitter title and description, a canonical URL, and the inherited portfolio preview image. Production absolute URLs use the configured site origin described in the README.

## Remaining content opportunity

Original work samples are the strongest next addition: the Team Liquid illustration and its variants, selected ITS campaign assets with Devy's contribution, or a suitable public reporting example. Those assets are absent from the supplied source folder. The typographic covers remain clearly contextual illustrations; they do not stand in for evidence of the original deliverables.

## Verification

Verified against the final Next.js 16.3.4 production build:

- `npm run build` and `npm run lint`: passed; all four project pages remain prerendered.
- Six [focused browser checks](polish-verification.json): section indicators including the short desktop footer, keyboard menu exit and Escape, project sharing metadata and inherited image, reading order, reduced motion, and equivalent hover/keyboard cover interactions.
- All 17 existing [browser flow checks](browser-verification.json): passed again, including source-identical CV delivery, contact controls, project links, terminal, and invalid API input.
- Automated Axe WCAG 2 A/AA and 2.1 AA checks: no violations reported on seven tested pages/states. This does not replace a full manual accessibility review.
- No page overflow at six homepage widths from 320 to 1440px. All four work routes fit phone, tablet, and desktop. Twenty cover/viewport combinations had no clipped captions.
- No browser JavaScript errors recorded. Desktop and mobile project screenshots were visually reviewed.

The focused checks caught and resolved two integration issues: Contact was not marked active when a short footer could not reach the reading line on a tall viewport; overriding a project's social metadata initially dropped the inherited preview image. Both behaviors now have passing browser assertions.

Local browser scripts are in `%TEMP%\devy-portfolio-redesign` (`verify.cjs`, `polish.cjs`, and `visual-checks.cjs`); no testing or animation dependency was added to the app.

[Desktop project preview](previews/project-refined.png) · [Mobile project preview](previews/project-mobile-refined.png) · [Homepage preview](previews/desktop.png)
