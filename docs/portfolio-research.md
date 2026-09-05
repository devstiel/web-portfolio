# Portfolio research and repository review

Reviewed 5 September 2026. This is a research and design brief; the website implementation has not been changed.

The strongest direction for this portfolio is an expressive editorial layout built around Devy's actual product QA, business analysis, and creative work. The current implementation gives much more attention to its fictional developer persona and console than to evidence of that work. This is a design judgment based on the source and rendered pages, not a claim that a particular visual style proves AI authorship.

## Sources and review coverage

- Read [reference.md](../reference.md), the supplied [CV](../data/content/CV_Devy%20Relliani%20Saffiyah%20%281%29.pdf), and [social links](../data/content/social_media.md).
- Reviewed the app routes, metadata, portfolio data, section components, shared UI components, terminal/chat behavior, sound utility, styling, project configuration, README, and public asset inventory. Dependency internals, generated output, secrets, and Git history were outside this review.
- Inspected the local homepage in a browser at 1440 × 1000 and 390 × 844, desktop light mode, individual sections, keyboard focus on project links, and the dedicated terminal's contact command.
- Read the supplied [folio-v2 repository](https://github.com/oluwadareseyi/folio-v2), including its HTML, SCSS, font declarations, package configuration, and Home module. Viewed [Seyi's live portfolio](https://www.seyi.dev/), [NEXUSMAG](https://www.nexusmag.eu/), and [Brittany Chiang's portfolio](https://brittanychiang.com/) in the browser.
- The direct LinkedIn profile did not load through the research tool. A [publicly indexed LinkedIn result](https://id.linkedin.com/in/devy-relliani-saffiyah) exposes a short SWE-intern headline and About text, but may be stale. It is not evidence of the complete current profile. Use the supplied CV as the primary factual source for this brief; reconcile the desired headline before final copy is published.

## What good portfolios do

A visitor should quickly understand the person's area of work, see specific examples, understand their contribution, and find a direct way to contact them. Visual personality helps when it gives those things a memorable presentation.

Nielsen Norman Group's portfolio guidance recommends selecting a few relevant projects and explaining the problem, personal role, decisions, constraints, results, and learning. It also emphasizes scannability. This research concerns UX hiring; applying those principles to Devy's QA, analytics, and creative work is a recommendation, not a claim that every recruiter assesses every discipline identically. [Source: NN/g portfolio guidance](https://www.nngroup.com/articles/ux-design-portfolios/).

The first reviewer may be a recruiter or manager from another discipline. Plain explanations of the work therefore matter more than terminology that only peers understand. [Source: NN/g recruiter interview](https://www.nngroup.com/articles/ux-hiring-insights/).

| Reference | Useful observation | Application to Devy |
| --- | --- | --- |
| [Seyi / folio-v2](https://www.seyi.dev/) | Oversized typography, sparse navigation, alternating project placement, substantial project titles, and direct links give the work visual weight. Its source uses HTML/SCSS with Vite and animation dependencies. | Use its hierarchy, spacing, and variation as inspiration within the existing Next.js app. A stack migration is unnecessary. |
| [NEXUSMAG](https://www.nexusmag.eu/) | A distinctive masthead, limited high-contrast palette, expressive lettering, and editorial content establish a recognizable identity. It is a magazine, with browsing needs different from a personal portfolio. | Borrow the confidence and selective graphic expression. Keep the portfolio's navigation and work selection simple. |
| [Brittany Chiang](https://brittanychiang.com/) | A clear name and role, readable descriptions, accessible experience links, and personal details make the information easy to scan. | Use its clarity and evidence density as a reference while developing Devy's own composition and voice. |

These examples demonstrate different successful-looking approaches; none is a universal template. The proposed combination is Seyi's scale, NEXUSMAG's personality, and Brittany's readable professional context.

## Why the current site feels manufactured

| Finding | Evidence | Recommended change |
| --- | --- | --- |
| The professional identity is mostly placeholder content. | [portfolioData.ts](../data/portfolioData.ts) explicitly labels its data as placeholder. NovaTech, PixelForge, eight project entries, numerical skill ratings, and the displayed experience/project totals are not substantiated by the supplied CV. | Replace placeholder claims with sourced experience and selected work. Do not translate self-assessed skill scores into professional evidence. |
| The personal voice is generic and unsupported. | The About data includes a Neopets origin story, typing speed, matcha, cloud goals, and an AWS certification that the supplied material does not establish. | Write a short introduction grounded in actual interests and work. Leave unknown personality details out. |
| The first screen prioritizes operating the interface. | [HeroDashboard](../components/HeroDashboard/HeroDashboard.tsx) promotes “Explore HUD” and “Dedicated Console”; a large terminal takes the other column. | Put “Selected work”, CV, and contact within immediate reach. Move the terminal to an optional experiment. |
| The strongest evidence appears late. | In the 1440 × 1000 dark-mode browser pass, About began near y=1,637, Experience at 2,438, and Projects at 4,377. Total height was about 6,485px. Mobile height was about 12,231px. | Place selected work immediately after the introduction. Remove repeated mission, status, and character panels. These measurements are observations of this viewport/build, not universal layout constants. |
| The site has little visual evidence of its owner. | The rendered homepage had zero image elements; public assets are starter SVGs. Project cards contain text, badges, stars, and folder icons. | Use original campaign artwork, relevant work samples, and optionally a real portrait. Layout alone cannot replace missing project artifacts. |
| Nearly everything receives the same decorative treatment. | Pixel typography, window chrome, borders, colored badges, quests, XP, skill rarity, and console labels repeat throughout the page. Much supporting copy uses 12px text; many pixel labels use 8.8px or smaller. | Give projects larger visual areas, use a readable body font, vary section composition, and reserve distinctive graphic details for a few deliberate moments. |
| The contact path is unfinished. | Social links still use `username` and `hello@example.com`; the CV button says “Resume Soon”. The terminal contact command also returns placeholder contact details. | Wire the provided email and social URLs, and serve a downloadable copy of the supplied CV. GitHub is not supplied in social_media.md, so do not guess its handle. |
| The chatbot has a separate inaccurate biography. | [chat route](../app/api/chat/route.ts) hardcodes the placeholder history, metrics, and different contact details. The terminal also contains additional legacy biography strings. | If retained, generate answers from one verified content source and remove contradictory legacy material. Correcting portfolioData.ts alone will not correct the API prompt. |
| Desktop project actions are hidden during keyboard focus. | [project CSS](../components/ProjectsGallery/ProjectsGallery.module.css) reveals actions on hover. A browser focus check on the first project link left its action container at opacity 0 and max-height 0px. | Keep essential project links visible, or expose them on focus-within as well as hover. The mobile CSS already exposes these actions. |

## The actual story available in the CV

The CV supports a mix of product quality, analytical work, communication, and creative delivery. A useful provisional descriptor is **Product QA, business analysis & creative work**. This describes demonstrated areas without inventing a seniority level or assuming the exact next job Devy wants.

| Work | Evidence in the supplied CV | Portfolio treatment |
| --- | --- | --- |
| Sampoerna — Product Quality Assurance Intern, May 2026–present in the CV | QA for AYO Kasir and MyAYO, PRD-to-test-case work, testing guidelines, SIT demonstrations, and an n8n workshop. | Explain how requirements become test scenarios and how findings support release decisions. Use a public-safe example; the actual scenario and artifacts still need sourcing. |
| PLN UP3 Bekasi — Business Analyst Intern, Sep–Dec 2025 | EV-charging reporting spanning 39,349 transactions and 27 units at 12 locations, operational analysis, and strategic-roadmap support. | Show what the reporting helped management understand, Devy's analytical contribution, and a suitable report or chart. Recorded revenue in the dataset is not revenue personally generated. |
| ITS Public Communication Unit — Lead Social Media Specialist, Dec 2024–Dec 2025 | Led 21 specialists across five platforms, with audience growth and content-delivery results. | Show a specific campaign and explain direction, coordination, and evaluation. Attribute shared outcomes to the team. |
| Team Liquid — commissioned holiday campaign, Dec 2021 | Hand-illustrated Christmas card and wallpaper assets for multiple platforms, including light/night variants. | Use the actual art as a visually distinctive feature with a concise brief, role, constraints, and final deliverables. |
| ICHIRO ITS and Ini Lho ITS! — leadership | Marketing, sponsorship communications, creative direction, and team coordination. | Include in concise experience entries or a creative archive. Explain Devy's role in team achievements; do not imply sole ownership of robotics results. |

The CV also supplies ITS Computer Science education, a 3.74/4.00 GPA, scholarships, and named certifications. These belong in a compact background section and the downloadable CV. None of the proposed project artwork or report screenshots is present in this repository yet. CV statements establish candidate topics; they do not supply complete case studies or prove causal impact beyond their wording.

## Recommended visual direction

Build an editorial personal portfolio with large typography, generous margins, and real work samples. Start with a restrained charcoal/off-white foundation and one recurring accent. Choose that accent alongside the supplied artwork so it belongs to the overall composition. This is an art-direction proposal, not a research finding about which color performs best.

Use one expressive display typeface and one readable body typeface. Aim for roughly 16–18px body copy and comfortable line lengths. Use asymmetry for emphasis: a large feature, a paired row, then compact text-led experience entries. Avoid giving every project an identical badge-filled container.

Keep any retro detail specific and optional: a small illustrated mark, a playful footer interaction, or the existing terminal linked from an experiments area. The hiring path should work through ordinary links and readable project pages.

Suggested homepage order:

1. **Introduction:** name, a short personal sentence, professional context, Selected work, and CV.
2. **Selected work:** Sampoerna QA, PLN reporting, ITS creative leadership, and Team Liquid illustration. Order can change with the target role; begin with QA/analytics for the CV's present emphasis.
3. **About and experience:** a short human introduction plus a compact factual timeline.
4. **More creative work:** ICHIRO, Ini Lho ITS!, and other documented work when assets are available.
5. **Contact:** direct email, LinkedIn, and a small set of relevant social links.

A provisional introduction, derived from the CV rather than quoted from LinkedIn:

> Hi, I'm Devy. I've worked on product testing at Sampoerna, EV-charging reports at PLN, and creative campaigns for ITS and Team Liquid. I like figuring out what people need, then working through the details with a team.

A finished version should reflect Devy's own phrasing and chosen career emphasis. Keep detailed metrics inside the relevant work story rather than packing them into the introduction.

## Implementation priorities for the next phase

1. Establish verified content in portfolioData.ts and reconcile every duplicated identity/contact string in the hero, terminal, API, and metadata.
2. Create the new introduction and selected-work structure using the existing Next.js/CSS Modules setup.
3. Add real assets and write a few specific case studies. Use clearly labeled reconstructions if a demonstration is needed; never present invented screens as original work.
4. Replace skill rankings with contextual capabilities, connect the CV and contact links, and make navigation and project actions usable with a keyboard.
5. Check phone layouts, contrast, reduced motion, readability at zoom, links, and content consistency. Update the starter README to explain the implemented site and its content workflow once implementation occurs.

## Validation and limits

- `npx tsc --noEmit --incremental false`: passed.
- `npm run lint`: failed with one existing error (`any` in app/api/chat/route.ts:71) and three existing unused-variable/import warnings in RetroTerminal.tsx.
- The desktop homepage browser capture recorded no page-level JavaScript exceptions. Document width matched the viewport at 1440px and 390px; that narrow check is not a full responsive or accessibility certification.
- The development-server output also recorded a React hydration warning involving an inline caret-color style on the terminal input during the capture session. Its cause was not isolated; reproduce outside screenshot automation before attributing it to the application.
- Verified the light-mode switch, hidden desktop project-link focus state, and placeholder output of the terminal contact command.
- A production build, real Gemini request, exhaustive accessibility audit, and verification of external project destinations were not performed. The AI endpoint was reviewed in source.
- Browser evidence is stored locally under `%TEMP%\devy-portfolio-audit` (desktop, mobile, light mode, section captures, reference captures, and capture scripts). These temporary files may be cleaned up by the operating system.
- Only this research note was added to the repository. Existing source/content files were preserved.
