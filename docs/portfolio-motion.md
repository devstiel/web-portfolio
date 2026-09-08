# Motion and interactive work explorer

Implemented 5 September 2026, following the [editorial redesign](portfolio-redesign.md) and [award-reference review](portfolio-polish.md).

The later [3D hero enhancement](portfolio-3d.md) replaces the flat hero star entrance with an interactive sculpture. The measurements and hero behavior recorded below describe this earlier motion pass.

The subsequent [original work and scroll reveal pass](portfolio-reveals.md) replaces the uniform fades with distinct heading, artwork, circle, timeline, and footer sequences, and adds imagery supplied in the creative portfolio.

## What changed

| Feature | Behavior |
| --- | --- |
| Hero entrance | The two name lines enter 100ms apart. The introduction follows, with one short rotation of the lime star. Everything settles within about 1.1 seconds. |
| Scroll reveals | Section headings and initial project cards rise 22px into place once. Paired cards have a 90ms stagger. Content is visible in the server-rendered HTML; observation starts a short animation rather than unlocking hidden content. |
| Work filters | Existing cards move from their previous positions and new cards fade in. The grid height interpolates over 420ms to ease the shift of the sections below. Repeated clicks replace the current animation and retain focus on the selected filter. |
| Logic / Imagination | Two overlapping circle buttons switch between QA/analysis and creative/illustration work. Each view uses two real projects from `data/portfolioData.ts`. The star turns and the project links transition into view. |
| Experience panels | Native details disclosures animate their height over 300ms. The plus icon rotates into a minus, and hover/focus gives the summary a soft background. Repeated toggles, viewport resizing, and preference changes settle to the requested state. |

The two work-explorer panels share one grid cell so changing the active side does not change the section height. The inactive panel is invisible, inert, and hidden from assistive technology. Both buttons support native touch, Enter, Space, and Tab behavior. On small screens, the personal introduction comes before the explorer.

## Implementation and fallbacks

- `components/ScrollReveals.tsx` observes the homepage's marked headings/cards. It reveals them once, cancels motion when they receive focus, and cleans up observations and animations on unmount.
- `components/WorkGrid.tsx` captures card positions before a filter change and animates toward the updated layout.
- `components/WorkLenses.tsx` and its CSS implement the new diagram and project links.
- `components/ExperienceItem.tsx` enhances native `<details>` without replacing its keyboard or no-JavaScript behavior.
- `app/page.module.css` supplies the entrance sequence and disclosure-icon transitions.

The browser's [Element.animate API](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) supplies the imperative animations; experience entries retain the [native details disclosure](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details). No animation or UI library was added.

Reduced-motion preferences suppress the CSS entrances and transitions, skip scroll reveals and filter animation, and use immediate native disclosure toggles. Changing that preference during an animation cancels or settles the relevant motion. Resizing cancels layout animations so natural responsive sizing takes over. Missing animation APIs leave the controls functional. Without JavaScript, all four work links, the CV, the biography, and native experience disclosures remain available.

## Review and verification

The final production build and lint passed. All 33 browser checks passed:

- Ten [motion-specific checks](motion-verification.json): staggered hero and visible final state; once-only reveal; filter-height interpolation, focus and repeated changes; keyboard work lenses and stable section height; animated keyboard disclosures and repeated toggles; changing reduced-motion preference during collapse; resizing during expansion; touch controls and six viewport widths; no-JavaScript disclosures; and missing animation APIs.
- Seventeen [existing browser-flow checks](browser-verification.json): navigation, filters, CV download and source identity, clipboard success/failure, contact links, four project routes, terminal, API input validation, and no-JavaScript core content.
- Six [previous refinement checks](polish-verification.json): active navigation, menu focus, sharing metadata, project reading order, reduced motion, and hover/keyboard parity.

The existing automated Axe checks reported no violations across seven tested pages/states. An additional check of the new explorer with Imagination selected also reported no violations. No browser JavaScript errors were recorded. Layout checks covered widths from 320 to 1440px.

Tests use Chromium through the locally cached Playwright installation; they are not a claim of exhaustive cross-browser or assistive-technology coverage. Local test scripts are under `%TEMP%\devy-portfolio-redesign` (`motion.cjs`, `verify.cjs`, and `polish.cjs`). No browser-testing dependency was added to the app.

At the end of this pass, the homepage was approximately 5,920px tall at 1440px wide and 8,037px tall at 390px wide. Selected work began at approximately y=659 on desktop. The increase from the earlier redesign reflects the new work explorer, not empty animation spacers.

[Watch the motion walkthrough](previews/motion-walkthrough.webm) · [Desktop work explorer](previews/interactive-about-desktop.png) · [Mobile work explorer](previews/interactive-about-mobile.png)
