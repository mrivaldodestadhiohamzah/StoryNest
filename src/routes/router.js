import StoryListPresenter from '../presenters/storyListPresenter.js';
import AddStoryPresenter from '../presenters/addStoryPresenter.js';
import StoryDetailPresenter from '../presenters/storyDetailPresenter.js';
import EditStoryPresenter from '../presenters/editStoryPresenter.js';
import { setActiveNav } from '../utils/dom.js';

const router = () => {
  const path = window.location.hash.slice(1) || '/';
  setActiveNav();

  if (path.startsWith('/add')) {
    AddStoryPresenter.init();
  } else if (path.startsWith('/edit/')) {
    const id = path.split('/')[2];
    EditStoryPresenter.init(id);
  } else if (path.startsWith('/detail/')) {
    const id = path.split('/')[2];
    StoryDetailPresenter.init(id);
  } else {
    StoryListPresenter.init();
  }
};

export default router;
