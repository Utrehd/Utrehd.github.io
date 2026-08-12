# Portfolio Style Decisions

This file records site-wide visual decisions for the portfolio. Project-specific exceptions belong in the project's own `style.md`.

## Heading Scale

- Use Outfit at weight 700 for every page-level `h1`.
- Use slightly open `0.01em` letter spacing. This replaces the former compact negative tracking.
- Keep the homepage H1 at `clamp(2.5rem, 4.7vw, 4rem)` and case-study H1 at `clamp(2.65rem, 5vw, 4.6rem)`.
- Keep primary homepage H2s at `clamp(2rem, 3.4vw, 3.2rem)` and case-study H2s at `clamp(1.8rem, 3.35vw, 2.9rem)`.
- Keep the featured-project H3 at `clamp(1.9rem, 3.7vw, 3.35rem)`; compact-card H3s use `1.48rem`.
- Use `1rem` for supporting H3/H4 card titles so they remain distinct from body copy without dominating their panels.
- Mobile overrides reduce the homepage H1 to `clamp(2.2rem, 9.6vw, 2.85rem)`, the case-study H1 to `clamp(2.3rem, 10.5vw, 3.1rem)`, and large homepage H2/H3 titles to roughly `1.9–2.75rem`.

The restrained scale reduces line wrapping, improves card fit, and preserves a clear H1 → H2 → H3/H4 reading hierarchy.

## Change Log

### 2026-08-12

- Reduced every semantic heading level across the homepage and case-study page for more balanced wrapping and fit.
- Established the shared H1 size and tracking rule across the homepage and project pages.
