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

- Keep the introduction compact. It establishes Samuel's scope and evidence but does not compete with the work sections.
- Present skills before projects.
- Group the complete working skill inventory into six readable areas instead of one undifferentiated tag wall.
- Show only projects with a public case-study page. Do not use placeholder cards or inactive filters.
- Give each project one large editorial card with a real artefact, concrete scope, role, result, technology labels, and a direct case-study link.
- Keep the entire project index section at or below 140px. Treat it as a compact navigation row with a thumbnail, one-line summary, and case-study link; move all detailed facts and technology labels to the project page.
- State evidence boundaries beside the relevant claim. For Automation Release Control, distinguish the GAMP 5 lifecycle of the release system from the separate validation of deployed PLC software.
- Preserve `#featured-work` on the first project card so project-page back links remain valid.

## Header Portrait

- Use `assets/samuel-marti-header.webp` in the shared 42px brand mark on every page.
- The image uses a tight face-and-upper-shoulders crop so Samuel remains recognizable at header-icon size.
- Keep the orange border and dark fallback surface around the image.
- Treat the header portrait as decorative because the adjacent name and the parent link's accessible label already identify Samuel.
- Preserve `assets/samuel-marti.png` as the original portrait and use it in the homepage introduction.

## Editorial Voice

- Use `Samuel A. Marti` as the public name in visible copy, metadata, accessibility labels, and page titles.
- Use SAM writing style: direct, structured, evidence-led, and explicit about cause and effect.
- The homepage uses professional mode: state the contribution, show owned work, and connect implementation to operational value.
- Project pages use technical mode: problem, requirements, decision, implementation, validation, limitation, and result.
- Put evidence before self-description. Prefer shipped scope, measured outcomes, and owned responsibility over promotional adjectives.
- Preserve uncertainty and evidence boundaries. Do not invent savings, measurements, citations, or experience.

## Change Log

### 2026-08-12

- Rebuilt the homepage in the case study's dark paper and orange-accent style.
- Reordered the content so the full skills inventory appears before the public project index.
- Removed project filters and unpublished placeholder projects; the index now contains one complete case-study card.
- Standardized the public name as `Samuel A. Marti` across the site and repository description.
- Rewrote the homepage and case-study copy in SAM writing style while preserving factual claims and evidence boundaries.
- Replaced the `SM` header monogram with a header-specific portrait on the homepage and case-study page.
- Reduced semantic heading sizes across the homepage and case-study page for more balanced wrapping and fit.
