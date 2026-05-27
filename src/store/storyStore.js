import LocalStoryStore from './localStoryStore.js';

const validateStory = ({ name, description, photoUrl, photoFile, lat, lon }, { requirePhoto = true } = {}) => {
  const errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = 'Judul minimal 3 karakter.';
  }

  if (name && name.length > 80) {
    errors.name = 'Judul maksimal 80 karakter.';
  }

  if (!description || description.trim().length < 10) {
    errors.description = 'Isi cerita minimal 10 karakter.';
  }

  if (description && description.length > 1200) {
    errors.description = 'Isi cerita maksimal 1200 karakter.';
  }

  if (lat !== null && lat !== undefined && (Number.isNaN(Number(lat)) || Number(lat) < -90 || Number(lat) > 90)) {
    errors.lat = 'Garis lintang harus berada di antara -90 dan 90.';
  }

  if (lon !== null && lon !== undefined && (Number.isNaN(Number(lon)) || Number(lon) < -180 || Number(lon) > 180)) {
    errors.lon = 'Garis bujur harus berada di antara -180 dan 180.';
  }

  if (requirePhoto && !photoUrl && !photoFile) {
    errors.photo = 'Tambahkan foto untuk melengkapi cerita.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const StoryStore = {
  validateStory,

  async getAllStories() {
    return {
      error: false,
      listStory: LocalStoryStore.getAll(),
      message: '',
    };
  },

  async getStoryDetail(id) {
    const story = LocalStoryStore.getById(id);

    if (!story) {
      throw new Error('Cerita tidak ditemukan di penyimpanan lokal.');
    }

    return { error: false, story };
  },

  async createStory(payload) {
    return LocalStoryStore.create(payload);
  },

  async getEditableStory(id) {
    return LocalStoryStore.getById(id);
  },

  async updateStory(id, payload) {
    return LocalStoryStore.update(id, payload);
  },

  async deleteStory(id) {
    return LocalStoryStore.delete(id);
  },
};

export default StoryStore;
