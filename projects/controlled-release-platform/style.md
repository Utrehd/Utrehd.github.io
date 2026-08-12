# Controlled Release Platform - Style Decisions

This file is the visual source of truth for the Controlled Release Platform case study. Update it whenever a design decision changes.

## Intent

- Present a long-form technical case study with the reading order of a paper.
- Keep the full web experience in the PULSE dark theme.
- Use orange to expose hierarchy and primary action, not as decoration or body-copy color.
- Preserve legibility for long reading sessions at desktop and 350px mobile widths.

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
2. Labels are orange, uppercase, Outfit, `0.72rem`, weight 800, and `0.16em` tracking.
3. A subtle orange-to-transparent rule extends from the label to reinforce reading order.
4. The document title is white Outfit at weight 700 with compact negative tracking.
5. Section titles are white Outfit and remain semantic `h2` elements.
6. Card titles use white Outfit; supporting labels use orange or lane-specific color.
7. Body copy remains Mulish in muted white. Orange is never used for paragraphs.

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

- Established the paper structure and responsive system drawing.
- Converted the complete case study from light paper surfaces to the PULSE dark theme.
- Replaced generic eyebrows with lineup-selector-inspired active label heads.
- Standardized orange hierarchy and documented its usage boundaries.
