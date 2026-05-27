import StoryStore from '../store/storyStore.js';
import StoryListView from '../views/storyListView.js';
import { showLoading } from '../utils/dom.js';

const StoryListPresenter = {
  async init() {
    showLoading();
    const result = await StoryStore.getAllStories();

    StoryListView.render({
      stories: result.listStory || [],
      message: '',
      onDelete: (id) => this.deleteStory(id),
    });
  },

  async deleteStory(id) {
    const confirmed = window.confirm('Hapus cerita ini? Tindakan ini tidak bisa dibatalkan.');
    if (!confirmed) return;

    await StoryStore.deleteStory(id);
    this.init();
  },
};

export default StoryListPresenter;
