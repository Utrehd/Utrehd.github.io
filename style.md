# Portfolio Style Decisions

This file records site-wide visual decisions for the portfolio. Project-specific exceptions belong in the project's own `style.md`.

## Visual System

- Use the same dark paper surface, fine borders, orange active labels, and restrained hierarchy as the Automation Release Control case study.
- Use orange for active labels, primary actions, and small directional details. Do not use it for long body copy.
- Keep normal text at a high-contrast gray (`#d4d9dd`) and reserve pure off-white (`#f4f5f3`) for headings and important values.
- Use real project artefacts as the primary visual material. Decorative diagrams or metrics must support the content, not compete with it.

## Heading Scale

- Use Outfit for all headings and Inter for body copy.
- Keep the homepage H1 at `clamp(2.15rem, 4.7vw, 3.15rem)` with open `0.01em` tracking.
- Keep the project-card title at `clamp(1.85rem, 3.2vw, 2.35rem)`.
- Use small uppercase section headings inside orange active-label bars, following the Lineup selector reference.
- On mobile, reduce the homepage H1 to `clamp(2.05rem, 9.6vw, 2.25rem)` and the project title to `1.75rem`.
- The restrained scale reduces wrapping and keeps the title, portrait, skills, and project artefact in balance.

## Homepage Structure

- Keep the introduction compact. It must state full-stack, edge, and connected-industrial scope before the first scroll.
- Present measured proof and selected work before the skills inventory.
- Group the working stack into four evidence-backed areas instead of an exhaustive tag wall.
- Show only projects with a public case-study page. Do not use placeholder cards or inactive filters.
- Give each project a substantial editorial card with a real artefact or labelled reconstruction, concrete scope, personal contribution, result, and direct case-study link.
- Keep the three project families visible: modern full-stack product, connected-machine/edge systems, and controlled regulated delivery.
- State evidence boundaries beside the relevant claim. For Automation Release Control, distinguish the GAMP 5 lifecycle of the release system from the separate validation of deployed PLC software.
- Preserve `#featured-work` on the first project card so project-page back links remain valid.

## Portrait Usage

- Keep the homepage identity and introduction text-only. Do not render a profile image in the homepage header or hero.
- Use `assets/samuel-marti-header.webp` only in the case-study page headers.
- The header image uses a tight face-and-upper-shoulders crop and remains decorative because the adjacent name identifies Samuel.
- Preserve `assets/samuel-marti.png` as the non-rendered source portrait.

## Editorial Voice

- Use `Samuel A. Marti` as the public name in visible copy, metadata, accessibility labels, and page titles.
- Use SAM writing style: direct, structured, evidence-led, and explicit about cause and effect.
- The homepage uses professional mode: state the contribution, show owned work, and connect implementation to operational value.
- Project pages use technical mode: problem, requirements, decision, implementation, validation, limitation, and result.
- Put evidence before self-description. Prefer shipped scope, measured outcomes, and owned responsibility over promotional adjectives.
- Preserve uncertainty and evidence boundaries. Do not invent savings, measurements, citations, or experience.

## Change Log

### 2026-08-18

- Removed profile imagery from the homepage header and hero, then collapsed the introduction into a single-column layout.
- Repositioned the first screen around full-stack software for connected industrial products.
- Moved project evidence before skills and expanded the index from a thin strip into three evidence-rich cards.
- Added public PULSE and connected-machine case studies using real product artefacts and clearly labelled reconstructions.
- Reduced the skills inventory from six generic groups to four evidence-backed engineering areas.
- Added U.S. work authorization, relocation availability, résumé, LinkedIn, GitHub, and full-time contact actions.
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
