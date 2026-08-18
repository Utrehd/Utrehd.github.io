# Samuel A. Marti — portfolio

A static, responsive portfolio designed for GitHub Pages. The site leads with full-stack and connected-industrial product engineering, supported by three public case studies:

- Industrial Edge & Connected Machines
- PULSE Product Engineering
- Automation Release Control

Live site: [utrehd.github.io](https://utrehd.github.io/)

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
