# Portfolio Style Decisions

This file records site-wide visual decisions for the portfolio. Project-specific exceptions belong in the project's own `style.md`.

## H1 Page Titles

- Use Outfit at weight 700 for every page-level `h1`.
- Use slightly open `0.01em` letter spacing. This replaces the former compact negative tracking.
- Keep the homepage title at `clamp(2.65rem, 5vw, 4.35rem)` with `1.05` line height.
- Keep long-form case-study titles at `clamp(2.8rem, 5.6vw, 5rem)` with `1.02` line height.
- At mobile widths, use `clamp(2.35rem, 10.5vw, 3.15rem)` on the homepage and `clamp(2.45rem, 11vw, 3.45rem)` on case studies.
- Do not apply this rule to section-level `h2` elements; their tighter display treatment remains unchanged.

The smaller scale gives page titles less visual dominance, while positive tracking makes them feel more deliberate and easier to scan in the dark theme.

## Change Log

### 2026-08-12

- Established the shared H1 size and tracking rule across the homepage and project pages.
