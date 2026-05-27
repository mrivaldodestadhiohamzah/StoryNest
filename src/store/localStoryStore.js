const STORAGE_KEY = 'storynest:stories';

const storyImage = (accent, title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 675">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#fff8ef"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="675" fill="url(#bg)"/>
      <circle cx="710" cy="125" r="120" fill="#ffffff" opacity=".34"/>
      <circle cx="170" cy="560" r="160" fill="#171c2f" opacity=".08"/>
      <path d="M245 245c0-34 27-61 61-61h286c34 0 61 27 61 61v230c0 34-27 61-61 61H306c-34 0-61-27-61-61z" fill="#fff" opacity=".82"/>
      <path d="M315 285h210M315 337h270M315 389h225" stroke="#171c2f" stroke-width="24" stroke-linecap="round" opacity=".28"/>
      <text x="450" y="600" text-anchor="middle" fill="#171c2f" font-family="Arial, sans-serif" font-size="38" font-weight="700">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const demoStories = [
  {
    id: 'demo-quiet-corner',
    name: 'Sudut Toko yang Ramai Sore',
    description: 'Setiap sore, sudut kecil dekat jendela selalu menjadi tempat favorit pelanggan untuk membaca, menunggu hujan reda, dan berbagi cerita singkat.',
    photoUrl: storyImage('#f46f55', 'Cerita Sore'),
    lat: -6.2,
    lon: 106.816666,
    createdAt: '2026-05-19T09:30:00.000Z',
    updatedAt: '2026-05-19T09:30:00.000Z',
    source: 'demo',
  },
  {
    id: 'demo-morning-branch',
    name: 'Cabang Baru di Pagi Hari',
    description: 'Papan nama baru terpasang sebelum jam buka. Tim kecil berkumpul, menyiapkan meja, dan menyambut hari pertama dengan antusias.',
    photoUrl: storyImage('#f7b267', 'Cabang Baru'),
    lat: -7.257472,
    lon: 112.75209,
    createdAt: '2026-05-17T02:15:00.000Z',
    updatedAt: '2026-05-17T02:15:00.000Z',
    source: 'demo',
  },
  {
    id: 'demo-community-area',
    name: 'Area Komunitas yang Hangat',
    description: 'Ruang sederhana berubah menjadi tempat berkumpul. Ada cerita dari pelanggan lama, ide dari pengunjung baru, dan banyak percakapan kecil yang terasa dekat.',
    photoUrl: storyImage('#7fb7a8', 'Area Komunitas'),
    lat: -6.914744,
    lon: 107.60981,
    createdAt: '2026-05-14T11:45:00.000Z',
    updatedAt: '2026-05-14T11:45:00.000Z',
    source: 'demo',
  },
];

const safeParseStories = (rawStories) => {
  try {
    return rawStories ? JSON.parse(rawStories) : null;
  } catch {
    return null;
  }
};

const readStories = () => {
  const savedStories = safeParseStories(localStorage.getItem(STORAGE_KEY));
  return Array.isArray(savedStories) ? savedStories : demoStories;
};

const writeStories = (stories) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
};

const LocalStoryStore = {
  getAll() {
    return readStories();
  },

  getById(id) {
    return readStories().find((story) => story.id === id) || null;
  },

  create(payload) {
    const now = new Date().toISOString();
    const story = {
      id: `story-${Date.now()}`,
      name: payload.name.trim(),
      description: payload.description.trim(),
      photoUrl: payload.photoUrl,
      lat: payload.lat ?? null,
      lon: payload.lon ?? null,
      createdAt: now,
      updatedAt: now,
      source: 'local',
    };

    const stories = [story, ...readStories()];
    writeStories(stories);
    return story;
  },

  update(id, payload) {
    const stories = readStories();
    const storyIndex = stories.findIndex((story) => story.id === id);
    if (storyIndex === -1) return null;

    stories[storyIndex] = {
      ...stories[storyIndex],
      name: payload.name.trim(),
      description: payload.description.trim(),
      photoUrl: payload.photoUrl || stories[storyIndex].photoUrl,
      lat: payload.lat ?? null,
      lon: payload.lon ?? null,
      source: stories[storyIndex].source === 'demo' ? 'local' : stories[storyIndex].source,
      updatedAt: new Date().toISOString(),
    };

    writeStories(stories);
    return stories[storyIndex];
  },

  delete(id) {
    const stories = readStories();
    const nextStories = stories.filter((story) => story.id !== id);
    writeStories(nextStories);
    return nextStories.length !== stories.length;
  },
};

export default LocalStoryStore;
