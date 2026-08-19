# Samuel A. Marti — portfolio

A static, responsive portfolio designed for GitHub Pages. The site leads with full stack, agentic, and industrial edge engineering, supported by four public case studies:

- Factory of the Future
- PULSE Game Engineering
- Agentic Influencer Outreach CRM
- Automation Release Control

Live site: [utrehd.github.io](https://utrehd.github.io/)

## Source structure

- `index.html` contains the homepage content and semantic structure.
- `projects/*/index.html` contains complete static case studies. Shared header markup remains in each page so navigation and identity render without JavaScript.
- `styles.css` contains the shared design system and homepage components.
- `projects/case-study.css` contains case study layout and evidence components.
- `script.js` contains shared navigation, scroll progress, typewriter, reveal, and image viewer behavior.

The source follows SAM coding style: explicit flow, focused helpers, descriptive names, and shared behavior without unnecessary abstractions.

## Preview locally

From this directory:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`.

## Publish a new copy with GitHub CLI

Create an empty GitHub repository, then run:

```powershell
git init
git add .
git commit -m "Create portfolio draft"
git branch -M main
gh repo create samuel-marti-portfolio --public --source=. --remote=origin --push
```

In the repository on GitHub, open **Settings → Pages**, select **Deploy from a branch**, and choose `main` with the `/ (root)` folder. Future pushes to `main` will update the site.

## Public evidence policy

- Use real product artefacts or clearly labelled reconstructions.
- Do not publish confidential employer material, factory identifiers, or private operational data.
- State personal contribution and product maturity explicitly.
- Preserve evidence boundaries when a prototype did not reach production.
