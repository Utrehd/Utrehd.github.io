# Samuel A. Marti — portfolio

A static, responsive portfolio designed for GitHub Pages. The featured Automation Release Control case study covers a system used to control and automate updates across 150+ PLCs.

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

## Edit next

- Replace or refine the three supporting project summaries.
- Add a social preview image and `og:image` metadata.
- Add a custom domain in a `CNAME` file if desired.
- Confirm the public contact links before publishing.
