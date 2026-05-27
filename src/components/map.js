import { escapeHtml } from '../utils/dom.js';

const normalizeCoordinate = (value, min, max) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 50;
  return ((number - min) / (max - min)) * 100;
};

export const createMap = (stories = []) => {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const storiesWithLocation = stories.filter((story) => Number.isFinite(Number(story.lat)) && Number.isFinite(Number(story.lon)));

  if (!storiesWithLocation.length) {
    mapElement.innerHTML = `
      <div class="map-fallback">
        <strong>Belum ada lokasi cerita.</strong>
        <span>Tambahkan garis lintang dan garis bujur untuk melihat titik cerita di panel lokasi.</span>
      </div>
    `;
    return;
  }

  mapElement.innerHTML = `
    <div class="static-map" aria-label="Panel lokasi cerita">
      <div class="map-grid"></div>
      ${storiesWithLocation.map((story) => {
        const left = normalizeCoordinate(story.lon, -180, 180);
        const top = 100 - normalizeCoordinate(story.lat, -90, 90);

        return `
          <a
            class="map-pin"
            href="#/detail/${escapeHtml(story.id)}"
            style="left:${left}%; top:${top}%;"
            aria-label="Buka cerita ${escapeHtml(story.name)}"
            title="${escapeHtml(story.name)}"
          >
            <span></span>
          </a>
        `;
      }).join('')}
    </div>
    <div class="map-fallback map-summary">
      <strong>${storiesWithLocation.length} cerita memiliki titik lokasi.</strong>
      <span>Panel ini adalah visual statis frontend-only berdasarkan garis lintang dan garis bujur yang tersimpan di browser.</span>
    </div>
  `;
};
