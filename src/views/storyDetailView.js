import { escapeHtml, formatDate, showMessage } from '../utils/dom.js';

const StoryDetailView = {
  render(story, { errorMessage = '', onDelete } = {}) {
    const main = document.getElementById('main-content');
    const sourceLabel = story.source === 'demo' ? 'Cerita Demo' : 'Cerita Tersimpan';
    const updatedInfo = story.updatedAt && story.updatedAt !== story.createdAt
      ? `<span>Diperbarui ${formatDate(story.updatedAt)}</span>`
      : '';

    main.innerHTML = `
      ${errorMessage ? showMessage(errorMessage, 'error') : ''}
      <article class="detail-shell">
        <div class="detail-heading">
          <p class="eyebrow">${sourceLabel}</p>
          <h1>${escapeHtml(story.name)}</h1>
          <div class="story-meta">
            <span>Dibuat ${formatDate(story.createdAt)}</span>
            ${updatedInfo}
          </div>
        </div>
        <div class="detail-media">
          <img src="${escapeHtml(story.photoUrl)}" alt="Foto cerita ${escapeHtml(story.name)}">
        </div>
        <p class="detail-description">${escapeHtml(story.description)}</p>
        <div class="detail-actions">
          <a class="button button-secondary" href="#/">Kembali</a>
          <a class="button button-primary" href="#/edit/${escapeHtml(story.id)}">Edit Cerita</a>
          <button class="button button-danger" type="button" data-delete-id="${escapeHtml(story.id)}">Hapus</button>
        </div>
      </article>
    `;

    const deleteButton = main.querySelector('[data-delete-id]');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => onDelete(deleteButton.dataset.deleteId));
    }
  },

  renderNotFound(message = 'Cerita tidak ditemukan.') {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <section class="detail-shell not-found">
        <p class="eyebrow">Tidak ditemukan</p>
        <h1>Cerita belum tersedia</h1>
        <p class="detail-description">${escapeHtml(message)}</p>
        <a class="button button-primary" href="#/">Kembali ke Beranda</a>
      </section>
    `;
  },
};

export default StoryDetailView;
