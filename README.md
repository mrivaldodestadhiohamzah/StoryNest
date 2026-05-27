# StoryNest

StoryNest is a modern, frontend-only storytelling web app. Visitors can browse demo stories, add their own stories, search and sort the collection, view story details, edit saved stories, delete stories, and see saved locations in a static visual location panel.

The project is intentionally simple and portfolio-friendly: no backend, no database, no API keys, no authentication server, and no environment variables. User-created data is stored in the browser with `localStorage`.

## Live Demo

[Open the live website](https://mrivaldodestadhiohamzah.github.io/StoryNest/)

## Features

- Responsive landing page and story collection
- Story cards with image, title, description, date, and actions
- Add, edit, and delete stories
- Search stories by title or content
- Sort stories by newest or oldest
- Story detail page
- Static location panel based on saved latitude and longitude
- Demo stories for first-time visitors
- Browser-only persistence with `localStorage`
- GitHub Pages deployment workflow

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript ES modules
- `localStorage`
- GitHub Actions
- GitHub Pages

## Project Structure

```text
/
├── .github/
│   └── workflows/
│       └── pages.yml
├── assets/
│   └── SNlogo.png
├── scripts/
│   ├── build.js
│   └── serve-static.js
├── src/
│   ├── components/
│   ├── presenters/
│   ├── routes/
│   ├── store/
│   ├── utils/
│   └── views/
├── index.html
├── script.js
├── style.css
├── package.json
├── .gitignore
└── README.md
```

## Run Locally

This project has no external runtime dependencies. You can install npm metadata if you want to use the included scripts:

```bash
npm install
```

Start a local static server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4174/
```

## Build

Generate the deployable static files:

```bash
npm run build
```

The generated output is placed in `dist/`. The `dist/` folder is ignored by Git because GitHub Actions rebuilds it during deployment.

## Preview The Build

After building, preview the generated static output:

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4175/
```

## Editing Content And Images

- Main HTML shell: `index.html`
- Main styling: `style.css`
- App entry point: `script.js`
- Demo story data: `src/store/localStoryStore.js`
- Logo and image assets: `assets/`

When adding images, use short lowercase or readable names such as `story-card.png`, `dashboard.png`, or `sn-logo.png`, then update the paths in HTML, CSS, JavaScript, or README files.

## Deployment

This project deploys through GitHub Actions using `.github/workflows/pages.yml`.

To publish with GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to `Settings` > `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to the default branch.
6. Wait for the Pages workflow to complete.

The app uses hash routing (`#/add`, `#/detail/:id`, `#/edit/:id`), so refreshing pages works correctly on GitHub Pages.

## Source Code

The source code is available in the current GitHub repository. Forks or copies can keep the same static deployment workflow without adding a backend.

## Contact

GitHub: [@mrivaldodestadhiohamzah](https://github.com/mrivaldodestadhiohamzah)

## Repository Safety

- No backend service is required.
- No API keys or private tokens are stored in the project.
- `.env` files are ignored.
- Generated folders such as `dist/`, `build/`, and `node_modules/` are ignored.
