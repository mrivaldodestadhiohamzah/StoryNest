# StoryNest

StoryNest is a small web app for writing and managing short stories. It includes a story list, a writing form, detail pages, simple search and sorting, and browser-based saving with `localStorage`.

I built this project as a frontend-only app, so it can run from a static host without a backend or database.

## Live Demo

- Live site: [https://mrivaldodestadhiohamzah.github.io/StoryNest/](https://mrivaldodestadhiohamzah.github.io/StoryNest/)
- Source code: [https://github.com/mrivaldodestadhiohamzah/StoryNest](https://github.com/mrivaldodestadhiohamzah/StoryNest)

## Features

- Browse demo stories
- Add a new story with an image and optional location data
- Edit and delete saved stories
- Search stories by title or content
- Sort stories by newest or oldest
- View a detail page for each story
- See saved story locations in a static location panel
- Save user-created stories in the browser with `localStorage`

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- JavaScript modules
- `localStorage`
- GitHub Actions
- GitHub Pages

## Folder Structure

```text
/
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- assets/
|   `-- sn-logo.png
|-- scripts/
|   |-- build.js
|   `-- serve-static.js
|-- src/
|   |-- components/
|   |-- presenters/
|   |-- routes/
|   |-- store/
|   |-- utils/
|   `-- views/
|-- index.html
|-- script.js
|-- style.css
|-- package.json
|-- .gitignore
`-- README.md
```

## Run Locally

Install dependencies. The project has no third-party runtime packages, but this keeps the npm scripts available:

```bash
npm install
```

Start the local static server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4174/
```

## Build

Create the production files:

```bash
npm run build
```

The output is generated in `dist/`. That folder is ignored because GitHub Actions rebuilds it for deployment.

## Preview The Build

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4175/
```

## Editing The Project

- Edit the page shell in `index.html`.
- Edit the main styles in `style.css`.
- Edit routing and app startup in `script.js` and `src/routes/router.js`.
- Edit demo story data in `src/store/localStoryStore.js`.
- Add images to `assets/` and use short, readable filenames.

## Deployment

This repository uses GitHub Actions to publish the static site to GitHub Pages.

To deploy from a GitHub repository:

1. Push the project to GitHub.
2. Open the repository settings.
3. Go to `Settings` > `Pages`.
4. Set the source to `GitHub Actions`.
5. Push to the default branch.
6. Wait for the Pages workflow to finish.

The app uses hash routes such as `#/add` and `#/detail/story-id`, so direct refreshes still work on GitHub Pages.

## Contact

- Email: [mrivaldodestadhiohamzah@gmail.com](mailto:mrivaldodestadhiohamzah@gmail.com)
- LinkedIn: [linkedin.com/in/mrivaldodhz](https://www.linkedin.com/in/mrivaldodhz/)
- GitHub: [github.com/mrivaldodestadhiohamzah](https://github.com/mrivaldodestadhiohamzah)
- WhatsApp: [089624574877](https://wa.me/6289624574877)

## Notes

- No backend is required.
- No API key or private credential is needed.
- User-created stories are saved only in the visitor's browser.
