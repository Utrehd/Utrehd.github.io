# Automation Release Control - Style Decisions

This file is the visual source of truth for the Automation Release Control case study. Update it whenever a design decision changes.

## Naming

- Public project name: **Automation Release Control**.
- The name is domain-first and describes the system's function without the generic word "platform."
- The published URL remains `/projects/controlled-release-platform/` to preserve existing links.

## Intent

- Present a long-form technical case study with the reading order of a paper.
- Keep the full web experience in the PULSE dark theme.
- Use orange to expose hierarchy and primary action, not as decoration or body-copy color.
- Preserve legibility for long reading sessions at desktop and 350px mobile widths.

## Editorial Voice

- Follow SAM technical writing style: define the problem early, expose the reasoning chain, and connect implementation decisions to operational consequences.
- Lead with plain language that a non-specialist can understand; introduce terms such as release records, installed state, and deployment targets only after explaining the practical workflow.
- Use first person for decisions and owned work; use the system as the subject when describing behavior or evidence.
- State the financial evidence boundary explicitly. Operational impact is supported; audited monetary savings are not available and must not be invented.

## PULSE Reference Pattern

The section-label pattern is based on the PULSE lineup selector contract:

```html
<div class="activePlanHead">
    <span class="activeLabel">Lineup template</span>
</div>
```

Portfolio equivalent:

```html
<div class="paper-active-head">
    <span class="paper-active-label">Executive Summary</span>
</div>
```

The local PULSE lineup treatment provides the typography baseline: Outfit, uppercase, weight 800, and `0.16em` tracking. Labels use the PULSE orange family.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| Canvas | `#0D1218` | Browser and page background |
| Paper | `#101820` | Main long-form reading surface |
| Surface | `#17212C` | Cards, callouts, TOC, diagrams |
| Surface strong | `#1F2935` | Elevated cards and title metadata |
| Primary text | `#F4F4F4` | Titles and essential values |
| Body text | `#B6C0CB` | Paragraphs |
| Muted text | `#7F8B98` | Metadata and supporting labels |
| Border | `rgba(255, 255, 255, 0.10)` | Surface boundaries |
| Border subtle | `rgba(255, 255, 255, 0.06)` | Internal separators |
| PULSE orange | `#FFA500` | Active labels and primary CTA |
| Orange soft | `#FFB347` | Hover and secondary orange text |
| Standard blue | `#42A5D5` | Control/governance architecture lane |
| Positive green | `#63DC78` | Delivery/outcome architecture lane |

## Title and Subtitle System

1. Every major section starts with `.paper-active-head > .paper-active-label`.
   The Executive Summary uses this label as its semantic H2 instead of repeating the section with a second display title.
2. Labels are orange, uppercase, Outfit, `0.72rem`, weight 800, and `0.16em` tracking.
3. A subtle orange-to-transparent rule extends from the label to reinforce reading order.
4. The document title is white Outfit at weight 700 with slightly open `0.01em` tracking.
5. Section titles are white Outfit and remain semantic `h2` elements.
6. Card titles use white Outfit; supporting labels use orange or lane-specific color.
7. Body copy remains Mulish in muted white. Orange is never used for paragraphs.
8. Case-study section H2s use the restrained site scale, while supporting card H3s remain at `1rem`.

## Dark Paper Surfaces

- The case study remains dark from browser canvas through the paper shell and footer.
- Depth comes from surface contrast, fine borders, and restrained shadows.
- No white cards or light content panels are used in the web view.
- The architecture drawing uses a dark grid with colored lane borders; color is paired with text labels and lane numbers.

## Orange Usage

- Use `#FFA500` for active section labels and the primary email action.
- Use `#FFB347` for hover states or softer emphasis.
- Do not use orange for dense text, neutral metadata, or entire panel backgrounds.
- Orange callouts use a translucent background and retain a text label so meaning does not rely on color alone.

## Layout and Accessibility

- Long-form body measure stays constrained within the paper grid.
- Title metadata labels use `0.74rem` at weight 700; metadata values use `1.02rem` at weight 500 with `1.5` line height.
- The four title-metadata fields are Role, Context, Period, and Where. Fleet reach belongs in the evidence sections, not the title block.
- Section numbering provides a non-color navigation cue.
- Focus outlines use orange soft with a visible offset.
- Mobile targets remain at least 44px where interactive.
- All primary content must have zero horizontal overflow at 350px and 1080px.
- Reduced-motion behavior comes from the shared portfolio stylesheet.

## Responsive Rules

- Desktop: sticky table of contents plus reading column.
- Tablet: table of contents becomes an inline index.
- Mobile: single-column paper; architecture lanes stack vertically with directional arrows.
- Skill labels wrap naturally and never force horizontal scrolling.

## Change Log

### 2026-08-12

- Made the engineering-capacity outcome concrete by adding the approximate one-hour baseline, the few-click workflow, and device feedback as the basis for release confidence.

- Shortened the dashboard caption while retaining ownership, interface scope, fictionalized-data disclosure, and the full-resolution action.

- Increased the shared dark-theme body color from `#b6c0cb` to `#c7d0d9`. This raises normal-text contrast on the `#101820` paper from 9.71:1 to 11.46:1 while preserving `#f4f4f4` for headings and `#7f8b98` for deliberately secondary captions.

- Added the dashboard evidence image at the start of the Solution section, before the architecture drawing. The image uses the original 1774×887 PDF asset, a restrained dark-frame treatment, an orange evidence label, a full-resolution link, and a clear disclosure that the interface is a recreation with fictionalized operational data.

- Removed sentence-style subtitles from the five remaining paper sections and promoted each orange section label to the accessible H2, matching the Executive Summary hierarchy.

- Rewrote the Executive Summary opening as a plain-language sequence: define the system, explain the remote release workflow, and close with installed-version verification.

- Added `GAMP 5` as a separate skill label beside `GMP / CSV` so the framework is explicit and easy to scan.

- Rewrote the title thesis around the user workflow—approve, deploy, and confirm—instead of listing technical concepts.
- Replaced the title-block Reach field with `Where: Lonza Visp, CH`; the 150+ target scope remains in the case-study evidence.
- Removed the redundant Executive Summary display title and promoted the existing section label to the accessible H2.
- Increased metadata text size, reduced its weight, and added vertical spacing to improve scanning without changing the four-field structure.
- Replaced the executive-summary opening with a plain-language explanation of how software moved from approval to a verified version on each device.
- Rewrote the case narrative to lead with ownership and evidence, make cause and effect explicit, and retain the financial limitation.
- Corrected the project period to `2024` and increased title-metadata size, contrast, and spacing for readability.
- Reduced H1, H2, H3, and footer-heading sizes to improve line fit across desktop and mobile.
- Reduced the case-study H1 scale and opened its tracking to `0.01em`, following the site-wide H1 rule in [`../../style.md`](../../style.md).
- Renamed the public case study from "Controlled Release Platform" to "Automation Release Control."
- Established the paper structure and responsive system drawing.
- Converted the complete case study from light paper surfaces to the PULSE dark theme.
- Replaced generic eyebrows with lineup-selector-inspired active label heads.
- Standardized orange hierarchy and documented its usage boundaries.
