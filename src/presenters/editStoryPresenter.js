import StoryStore from '../store/storyStore.js';
import StoryFormView from '../views/storyFormView.js';
import StoryDetailView from '../views/storyDetailView.js';
import { readFileAsDataUrl } from '../utils/dom.js';

const getPayloadFromForm = async (formData, existingStory) => {
  const photoFile = formData.get('photo');
  const hasNewPhoto = photoFile && photoFile.size > 0;

  return {
    name: formData.get('name') || '',
    description: formData.get('description') || '',
    photoFile: hasNewPhoto ? photoFile : null,
    photoUrl: hasNewPhoto ? await readFileAsDataUrl(photoFile) : existingStory.photoUrl,
    lat: formData.get('lat') ? Number(formData.get('lat')) : null,
    lon: formData.get('lon') ? Number(formData.get('lon')) : null,
  };
};

const EditStoryPresenter = {
  async init(id) {
    try {
      const story = await StoryStore.getEditableStory(id);
      if (!story) {
        StoryDetailView.renderNotFound('Cerita ini tidak bisa diedit karena tidak ada di penyimpanan lokal.');
        return;
      }

      StoryFormView.render({
        mode: 'edit',
        story,
        onSubmit: (formData) => this.submit(id, formData, story),
      });
    } catch (error) {
      StoryDetailView.renderNotFound(error.message);
    }
  },

  async submit(id, formData, existingStory) {
    try {
      const payload = await getPayloadFromForm(formData, existingStory);
      const validation = StoryStore.validateStory(payload, { requirePhoto: false });

      if (!validation.isValid) {
        StoryFormView.render({
          mode: 'edit',
          story: { ...existingStory, ...payload },
          errors: validation.errors,
          message: 'Periksa kembali bagian yang ditandai.',
          onSubmit: (nextFormData) => this.submit(id, nextFormData, existingStory),
        });
        return;
      }

      const updatedStory = await StoryStore.updateStory(id, payload);
      window.location.hash = `#/detail/${updatedStory.id}`;
    } catch (error) {
      StoryFormView.render({
        mode: 'edit',
        story: existingStory,
        message: error.message,
        onSubmit: (nextFormData) => this.submit(id, nextFormData, existingStory),
      });
    }
  },
};

export default EditStoryPresenter;
