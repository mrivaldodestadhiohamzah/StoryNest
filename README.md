# StoryNest

StoryNest is a frontend-only story web app. It lets users view demo stories, add new stories, edit stories, delete stories, search stories, sort stories, and save changes in `localStorage`.

The app does not use a backend, API server, database, authentication server, or environment variables. It is ready to deploy as a static website on GitHub Pages.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript ES modules
- `localStorage` for browser-side saved data
- GitHub Actions for GitHub Pages deployment

## Install

This project has no external runtime dependencies. Install is optional, but running it keeps the usual npm workflow familiar:

```bash
npm install
```

## Run Locally

Use the included static preview script:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4174/
```

## Build

Create the static production output:

```bash
npm run build
```

The deployable files will be generated in:

```text
dist/
```

## Preview The Build

After building, preview the exact static output:

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4175/
```

## Deploy To GitHub Pages

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/pages.yml
```

The workflow builds the static site and deploys the `dist/` folder to GitHub Pages.

### GitHub Setup

1. Push this project to a GitHub repository named `StoryNest`.
2. Open the repository on GitHub.
3. Go to `Settings` > `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push to the `main` or `master` branch.
6. Wait for the `Deploy StoryNest to GitHub Pages` action to finish.

Your website will be available at:

```text
https://mrivaldodestadhiohamzah.github.io/StoryNest/
```

This URL uses your GitHub username: `mrivaldodestadhiohamzah`.

## Notes For GitHub Pages

- StoryNest uses hash routing, such as `#/add` and `#/detail/story-id`, so refreshing pages works on GitHub Pages.
- Asset paths are relative, so CSS, JavaScript, and the logo work under `/StoryNest/`.
- The generated `.nojekyll` file prevents GitHub Pages from ignoring folders or files that start with underscores.
- User-created stories are saved in each visitor's browser using `localStorage`.
