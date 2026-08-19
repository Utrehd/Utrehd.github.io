# Portfolio Style Decisions

This file records site-wide visual decisions for the portfolio. Project-specific exceptions belong in the project's own `style.md`.

## Visual System

- Use solid dark surfaces, fine borders, orange labels, and a restrained hierarchy. Avoid decorative grids, layered gradients, and heavy shadows.
- Use orange for active labels, primary actions, and small directional details. Do not use it for long body copy.
- Keep normal text at a high-contrast gray (`#d4d9dd`) and reserve pure off-white (`#f4f5f3`) for headings and important values.
- Use real project artefacts as the primary visual material. Decorative diagrams or metrics must support the content, not compete with it.

## Heading Scale

- Use Outfit for all headings and Inter for body copy.
- Keep the homepage H1 at `clamp(2rem, 4vw, 3rem)` with open `0.01em` tracking.
- Keep the compact project-card title at `clamp(1.25rem, 1.7vw, 1.5rem)`.
- Use small uppercase orange section headings without decorative label bars.
- On mobile, reduce the homepage H1 to `clamp(1.9rem, 8.3vw, 2.05rem)` and the project title to `1.35rem`.
- Keep secondary uppercase text at least `0.72rem` on mobile so status lines and project metadata remain readable.

## Homepage Structure

- Keep the introduction compact. It must state full-stack, edge, and connected-industrial scope before the first scroll.
- Place a short career progression directly after the introduction. Keep the longer evidence-led story inside a native `details` disclosure so it remains optional and keyboard accessible.
- Present measured proof and selected work before the skills inventory.
- Group the working stack into four evidence-backed text areas instead of a tag wall.
- Keep the four headline proof points in a two-by-two grid on mobile to reduce page length without hiding evidence.
- On mobile, make the homepage surface full-width without an outer border or rounded frame. Preserve internal section and project-card borders.
- Show only projects with a public case-study page. Do not use placeholder cards or inactive filters.
- Keep each homepage project preview to a real artefact, title, concise teaser, and direct case-study link. Put metrics, personal contribution, and technical detail inside the case study.
- Keep the three project families visible: modern full-stack product, connected-machine/edge systems, and controlled regulated delivery.
- State evidence boundaries beside the relevant claim. For Automation Release Control, distinguish the GAMP 5 lifecycle of the release system from the separate validation of deployed PLC software.
- Preserve `#featured-work` on the first project card so project-page back links remain valid.

## Portrait Usage

- Use `assets/samuel-marti-header.webp` as the small circular identity mark in the homepage and case-study headers.
- Keep the homepage hero text-only. Do not render a large profile portrait in the introduction.
- The header image uses a tight face-and-upper-shoulders crop and remains decorative because the adjacent name identifies Samuel.
- Preserve `assets/samuel-marti.png` as the non-rendered source portrait.

## Editorial Voice

- Use `Samuel A. Marti` as the public name in visible copy, metadata, accessibility labels, and page titles.
- Use SAM writing style: direct, structured, evidence-led, and explicit about cause and effect.
- The homepage uses professional mode: state the contribution, show owned work, and connect implementation to operational value.
- Project pages use technical mode: problem, requirements, decision, implementation, validation, limitation, and result.
- Put evidence before self-description. Prefer shipped scope, measured outcomes, and owned responsibility over promotional adjectives.
- Preserve uncertainty and evidence boundaries. Do not invent savings, measurements, citations, or experience.
- Do not use em dashes, en dashes, or hyphens as sentence punctuation. Use a full stop, comma, colon, or separate sentence instead. Rewrite visible compound phrases without hyphens when the meaning remains clear.

## Change Log

### 2026-08-19

- Reframed the Factory of the Future work around product direction, government collaboration, direct engineering, factory validation, and explicit maturity boundaries.
- Added the editorial rule that visible copy must not use dashes or hyphens as punctuation.

### 2026-08-18

- Added a compact `My path` section before selected work, with a concise career progression and an optional long-form story in a native disclosure.
- Removed the homepage outer frame and page margin on mobile while preserving the desktop paper treatment and internal separators.
- Reduced the homepage headline, project titles, section copy, and about text to match the shorter preview cards while preserving readable mobile body sizes.
- Reduced homepage project previews to an image, title, concise teaser, and case-study link, then aligned all three cards in one desktop row.
- Simplified the mobile homepage footer into a compact two-row link layout with one centered copyright line.
- Replaced the two-line mobile menu mark with a conventional three-line hamburger that becomes an X when open.
- Restored the small circular identity portrait in the homepage header while keeping the hero text-only.
- Simplified the homepage with solid surfaces, plain section labels, lighter project cards, text-based skill groups, larger small text, and more compact mobile evidence grids.
- Removed profile imagery from the homepage header and hero, then collapsed the introduction into a single-column layout.
- Repositioned the first screen around full-stack software for connected industrial products.
- Moved project evidence before skills and expanded the index from a thin strip into three evidence-rich cards.
- Added public PULSE and connected-machine case studies using real product artefacts and clearly labelled reconstructions.
- Reduced the skills inventory from six generic groups to four evidence-backed engineering areas.
- Added U.S. work authorization, relocation availability, LinkedIn, and personal email contact actions.
- Added route-specific social metadata and a portfolio social-preview card.
- Corrected narrow-screen width calculations and hardened long headings, status copy, and actions against overflow.
- Optimized the homepage portrait and new project images for web delivery.

### 2026-08-12

- Rebuilt the homepage in the case study's dark paper and orange-accent style.
- Reordered the content so the full skills inventory appears before the public project index.
- Removed project filters and unpublished placeholder projects; the index now contains one complete case-study card.
- Standardized the public name as `Samuel A. Marti` across the site and repository description.
- Rewrote the homepage and case-study copy in SAM writing style while preserving factual claims and evidence boundaries.
- Replaced the `SM` header monogram with a header-specific portrait on the homepage and case-study page.
- Reduced semantic heading sizes across the homepage and case-study page for more balanced wrapping and fit.
