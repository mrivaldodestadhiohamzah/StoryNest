import StoryStore from '../store/storyStore.js';
import StoryFormView from '../views/storyFormView.js';
import { readFileAsDataUrl } from '../utils/dom.js';

const getPayloadFromForm = async (formData, existingStory = {}) => {
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

const AddStoryPresenter = {
  init() {
    StoryFormView.render({
      mode: 'create',
      onSubmit: (formData) => this.submit(formData),
    });
  },

  async submit(formData) {
    try {
      StoryFormView.render({
        mode: 'create',
        isSubmitting: true,
        onSubmit: (nextFormData) => this.submit(nextFormData),
      });

      const payload = await getPayloadFromForm(formData);
      const validation = StoryStore.validateStory(payload);
      if (!validation.isValid) {
        StoryFormView.render({
          mode: 'create',
          story: payload,
          errors: validation.errors,
          message: 'Periksa kembali bagian yang ditandai.',
          onSubmit: (nextFormData) => this.submit(nextFormData),
        });
        return;
      }

      const story = await StoryStore.createStory(payload);
      window.location.hash = `#/detail/${story.id}`;
    } catch (error) {
      StoryFormView.render({
        mode: 'create',
        message: error.message,
        onSubmit: (nextFormData) => this.submit(nextFormData),
      });
    }
  },
};

export default AddStoryPresenter;
