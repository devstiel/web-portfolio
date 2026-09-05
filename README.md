# Devy Relliani — portfolio

A personal portfolio for Devy Relliani Saffiyah, built with Next.js App Router, React, TypeScript, and CSS Modules. The design uses an editorial layout, original typographic project covers, and a small optional terminal.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```powershell
npm run lint
npm run build
npm start
```

The site does not require a model API key. Google Fonts are fetched by `next/font` at build time and served locally in the built application; the build therefore needs access to the font service.

For deployment, set `NEXT_PUBLIC_SITE_URL` to the site's actual absolute URL so social-image URLs resolve correctly. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when available; local development falls back to `http://localhost:3000`. See the [Next.js metadataBase documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase).

## Pages and behaviour

- `/`: introduction, filterable selected work, About, capabilities, expandable experience, education, scholarships, and contact.
- `/work/[slug]`: four statically generated work overviews. Each has role and timing, context and deliverables, carefully attributed figures, and a link to the next project. Unknown slugs return a 404.
- `/terminal`: optional keyboard portfolio index. Supports `about`, `work`, `experience`, `skills`, `contact`, `cv`, `help`, and `clear`, as well as company names. Up/down browse session command history. History is in memory and resets on reload.
- `/api/chat`: retained as a compatibility endpoint, now a deterministic local lookup using the same public content. Accepts `{ "prompt": "contact" }`. Invalid JSON/prompts return 400; bodies over 2,000 characters return 413. Prompts are limited to 500 characters. No external model calls or secret keys are used.
- `/opengraph-image`: generated social preview. The favicon is `app/icon.svg`.

The desktop navigation becomes a disclosure menu on small screens. The menu closes on navigation, Escape, outside interaction, and resizing to desktop. Essential content is server-rendered and visible without scroll animations. Native experience disclosures, ordinary project links, a skip link, focus states, reduced-motion styling, and a copy-email fallback support the main browsing path.

## Content and sources

`data/portfolioData.ts` is the single public source for identity, contact details, work, experience, education, capabilities, and certifications. `data/portfolioAnswers.ts` formats this content for the terminal and compatibility API.

The supplied source material lives in `data/content/`:

- `CV_Devy Relliani Saffiyah (1).pdf`
- `social_media.md`

The full current LinkedIn profile could not be read during research. Its search excerpt may be stale; the supplied CV and social links were used for factual content. Introductory first-person copy is editorial writing based on that material, not a quotation from LinkedIn.

The website's downloadable CV is `public/devy-relliani-saffiyah-cv.pdf`, an unchanged copy of the supplied PDF. To update it, replace the source and public copy together:

```powershell
Copy-Item -LiteralPath 'data\content\CV_Devy Relliani Saffiyah (1).pdf' -Destination 'public\devy-relliani-saffiyah-cv.pdf'
```

Dates marked Present reflect the supplied September 2026 CV. Review them when updating the portfolio. No GitHub handle, invented employment, arbitrary skill scores, or unsupported project totals are displayed. PLN figures describe reporting scope; ITS growth is attributed to shared team work.

## Project visuals

`components/ProjectCover.tsx` and its CSS create original, responsive typographic covers. These introduce each project; they are not original client campaign artwork, product screenshots, or internal reports. Work-page notes make the distinction explicit.

Original illustrations, campaign images, and report screenshots were not included in the source folder. When suitable assets are available, add them under `public/work/` and display them with descriptive alternative text and captions on the relevant work page. Do not substitute invented screenshots for original work or publish internal material as a public work sample.

## Design and structure

- `app/globals.css`: paper/ink/lime colours, shared layout, focus and reduced-motion defaults.
- `app/page.tsx` and `app/page.module.css`: homepage composition.
- `components/WorkGrid.tsx`: client-side work filters and navigable project cards.
- `app/work/[slug]/`: work pages and metadata.
- `components/SiteHeader.tsx`, `SiteFooter.tsx`: shared navigation, contact, CV, and social links.
- `docs/portfolio-research.md`: pre-redesign research and audit. Its measurements describe the previous site.

The former gamified dashboard, fictional résumé, skill levels, sound system, and model-backed chatbot were replaced. The terminal remains an optional footer link and uses the same factual data as the visible pages. No UI or animation library is required.

## Verification

Run lint and the production build after content or layout changes. Browser checks should cover desktop and mobile widths, all work filters and work pages, keyboard navigation, experience disclosures, CV delivery, clipboard feedback, and terminal commands. Compare the downloaded CV to the source PDF. Check both reduced motion and the page without JavaScript; do not equate a passing build with visual or accessibility verification.

The research references informed the composition; external source code, fonts from those repositories, and their artwork were not copied into this project.
