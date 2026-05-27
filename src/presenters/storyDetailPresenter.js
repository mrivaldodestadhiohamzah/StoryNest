import StoryStore from '../store/storyStore.js';
import StoryDetailView from '../views/storyDetailView.js';
import { showLoading } from '../utils/dom.js';

const StoryDetailPresenter = {
  async init(id) {
    showLoading('Membuka cerita...');

    try {
      const result = await StoryStore.getStoryDetail(id);
      StoryDetailView.render(result.story, {
        onDelete: (storyId) => this.deleteStory(storyId),
      });
    } catch (error) {
      StoryDetailView.renderNotFound(error.message);
    }
  },

  async deleteStory(id) {
    const confirmed = window.confirm('Hapus cerita ini? Tindakan ini tidak bisa dibatalkan.');
    if (!confirmed) return;

    await StoryStore.deleteStory(id);
    window.location.hash = '#/';
  },
};

export default StoryDetailPresenter;
