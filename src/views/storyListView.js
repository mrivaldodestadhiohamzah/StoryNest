import { createMap } from '../components/map.js';
import { escapeHtml, formatDate, logoSrc, showMessage, truncate } from '../utils/dom.js';

const renderStoryCard = (story) => {
  const sourceLabel = story.source === 'demo' ? 'Cerita Demo' : 'Cerita Tersimpan';
  const updatedLabel = story.updatedAt && story.updatedAt !== story.createdAt
    ? `Diperbarui ${formatDate(story.updatedAt)}`
    : `Dibuat ${formatDate(story.createdAt)}`;

  return `
    <article class="story-card">
      <img src="${escapeHtml(story.photoUrl)}" alt="Foto cerita ${escapeHtml(story.name)}" loading="lazy">
      <div class="story-card-body">
        <span class="badge">${sourceLabel}</span>
        <h3>${escapeHtml(story.name)}</h3>
        <p>${escapeHtml(truncate(story.description, 170))}</p>
        <div class="story-meta">
          <span>${escapeHtml(updatedLabel)}</span>
        </div>
        <div class="card-actions">
          <a class="button button-secondary" href="#/detail/${escapeHtml(story.id)}">Baca</a>
          <a class="button button-secondary" href="#/edit/${escapeHtml(story.id)}">Edit</a>
          <button class="button button-danger" type="button" data-delete-id="${escapeHtml(story.id)}">Hapus</button>
        </div>
      </div>
    </article>
  `;
};

const getFilteredStories = (stories, query, sortOrder) => {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredStories = normalizedQuery
    ? stories.filter((story) => `${story.name} ${story.description}`.toLowerCase().includes(normalizedQuery))
    : stories;

  return [...filteredStories].sort((a, b) => {
    const newest = new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    return sortOrder === 'oldest' ? -newest : newest;
  });
};

const StoryListView = {
  render({ stories = [], message = '', onDelete }) {
    const main = document.getElementById('main-content');
    const demoCount = stories.filter((story) => story.source === 'demo').length;
    const savedCount = stories.length - demoCount;

    main.innerHTML = `
      <section class="hero" aria-labelledby="home-title">
        <div class="hero-copy">
          <p class="eyebrow">StoryNest</p>
          <h1 id="home-title">Simpan cerita kecil dengan tampilan yang hangat.</h1>
          <p>Tulis, cari, baca, edit, dan kelola cerita dalam ruang yang sederhana, rapi, dan nyaman dipakai di perangkat apa pun.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#/add">Tulis Cerita</a>
            <a class="button button-secondary" href="#stories-section">Lihat Koleksi</a>
          </div>
        </div>
        <div class="hero-logo-panel" aria-hidden="true">
          <img src="${logoSrc}" alt="">
          <div class="hero-stats">
            <div class="stat"><strong>${stories.length}</strong><span>Total cerita</span></div>
            <div class="stat"><strong>${savedCount}</strong><span>Tersimpan lokal</span></div>
            <div class="stat"><strong>${demoCount}</strong><span>Contoh cerita</span></div>
          </div>
        </div>
      </section>

      ${message ? showMessage(message, message.includes('lokal') ? 'success' : 'error') : ''}

      <section class="map-panel" aria-labelledby="map-title">
        <div class="map-panel-header">
          <h2 id="map-title">Peta Cerita</h2>
          <span class="story-meta">${stories.length} cerita</span>
        </div>
        <div id="map"></div>
      </section>

      <section id="stories-section" aria-labelledby="stories-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Koleksi</p>
            <h2 id="stories-title">Daftar Cerita</h2>
          </div>
          <a class="button button-primary" href="#/add">Tambah Cerita</a>
        </div>
        <div class="toolbar" role="search">
          <input class="search-field" id="story-search" type="search" placeholder="Cari judul atau isi cerita..." aria-label="Cari cerita">
          <select class="select-field" id="story-sort" aria-label="Urutkan cerita">
            <option value="newest">Terbaru dulu</option>
            <option value="oldest">Terlama dulu</option>
          </select>
        </div>
        <div id="story-results" aria-live="polite"></div>
      </section>
    `;

    const searchInput = document.getElementById('story-search');
    const sortInput = document.getElementById('story-sort');
    const resultsElement = document.getElementById('story-results');

    const renderResults = () => {
      const filteredStories = getFilteredStories(stories, searchInput.value, sortInput.value);
      if (!filteredStories.length) {
        resultsElement.innerHTML = `
          <div class="empty-state">
            <img src="${logoSrc}" alt="StoryNest Logo">
            <h3>${stories.length ? 'Cerita tidak ditemukan' : 'Belum ada cerita'}</h3>
            <p>${stories.length ? 'Coba kata kunci lain atau ubah urutan cerita.' : 'Mulai koleksi pertama kamu dengan cerita singkat dan foto pendukung.'}</p>
            <a class="button button-primary" href="#/add">Tulis Cerita</a>
          </div>
        `;
        return;
      }

      resultsElement.innerHTML = `<div class="stories-grid">${filteredStories.map(renderStoryCard).join('')}</div>`;
      resultsElement.querySelectorAll('[data-delete-id]').forEach((button) => {
        button.addEventListener('click', () => onDelete(button.dataset.deleteId));
      });
    };

    searchInput.addEventListener('input', renderResults);
    sortInput.addEventListener('change', renderResults);
    renderResults();
    createMap(stories);
  },
};

export default StoryListView;
