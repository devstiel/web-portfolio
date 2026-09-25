# Readability update

Implemented 25 September 2026 for recruiters reviewing product QA, business analysis, and creative work.

## What changed

- Kept the cream and burgundy palette, DM Sans, original work imagery, CV, social links, and existing routes.
- Grouped the name, disciplines, introduction, and primary work link. The name is capped at 6rem on desktop and 3.5rem on mobile; the optional star sits outside the mobile prose column.
- Set body copy to 1.125rem on desktop and 1rem at widths up to 760px, with 1.65 line height. Metadata uses 0.875rem and navigation uses 1rem. Prose is limited to 60-65ch and the overall layout to 1200px.
- Replaced slogan headings with Selected work, About, and Experience; shortened About to two factual paragraphs. Existing capability groups replace the Logic/Imagination explorer.
- Aligned the four project cards, added visible role labels, and used descriptive project titles. Filters update immediately without layout animation.
- Made all experience summaries visible. Essential text no longer uses entrance or scroll reveals.
- Moved project explanations before supporting visuals, using a single prose column with headings above paragraphs. Reporting scope and shared outcomes retain their attribution.
- Increased navigation, gallery caption, contact, and footer text sizes. Retained subtle hover feedback and the optional star interaction.

## Validation

See [recorded checks](readability-verification.json) for production HTTP checks and calculated token contrast. These checks do not establish browser layout or interaction correctness.

The browser connector returned no available browsers or native apps. Current screenshots, cross-browser layout, actual font rendering, zoom, keyboard flows, clipboard behavior, filters after hydration, and reduced-motion interactions could not be exercised. Existing files in `docs/previews/` and earlier verification reports predate this update.

### Browser checks still required

- Inspect the homepage and all four work pages at 320, 390, 768, and 1440px. Confirm no horizontal scrolling, clipped text, crowded navigation, or unexpected image cropping.
- Check 200% zoom, 400% reflow, and text-spacing overrides: 1.5 line height, 0.12em letter spacing, 0.16em word spacing, and 2em paragraph spacing.
- Check skip link, mobile menu, Escape, focus visibility, section anchors, all three filters, project links, next-project navigation, CV, email, and clipboard success/fallback.
- Check reduced motion and JavaScript disabled. Server HTML content checks establish content delivery without executing JavaScript, not its visual appearance.
- Confirm visitors can identify all three disciplines, understand each project's subject, and find contributions without interpreting slogans or expanding disclosures.

No new dependency, API, data schema, or deployment was introduced.
