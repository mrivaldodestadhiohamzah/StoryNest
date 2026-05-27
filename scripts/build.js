import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const filesToCopy = [
  'index.html',
  'script.js',
  'style.css',
  'assets/SNlogo.png',
  'src/components/map.js',
  'src/presenters/addStoryPresenter.js',
  'src/presenters/editStoryPresenter.js',
  'src/presenters/storyDetailPresenter.js',
  'src/presenters/storyListPresenter.js',
  'src/routes/router.js',
  'src/store/localStoryStore.js',
  'src/store/storyStore.js',
  'src/utils/dom.js',
  'src/utils/viewTransition.js',
  'src/views/addStoryView.js',
  'src/views/storyDetailView.js',
  'src/views/storyFormView.js',
  'src/views/storyListView.js',
];

const outDir = 'dist';

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await Promise.all(filesToCopy.map(async (file) => {
  const destination = join(outDir, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(file, destination);
}));

await writeFile(join(outDir, '.nojekyll'), '');

console.log(`Built StoryNest static site in ${outDir}/`);
