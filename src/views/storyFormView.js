import { escapeHtml, showMessage } from '../utils/dom.js';

const StoryFormView = {
  render({
    mode = 'create',
    story = {},
    errors = {},
    message = '',
    isSubmitting = false,
    onSubmit,
  }) {
    const main = document.getElementById('main-content');
    const isEdit = mode === 'edit';
    const title = isEdit ? 'Edit Cerita' : 'Tulis Cerita Baru';
    const description = isEdit
      ? 'Perbarui judul, isi, foto, atau titik lokasi cerita lokal kamu.'
      : 'Isi cerita dengan judul yang jelas, foto pendukung, dan titik lokasi opsional.';

    main.innerHTML = `
      <section class="form-shell" aria-labelledby="form-title">
        <p class="eyebrow">StoryNest</p>
        <h1 id="form-title">${title}</h1>
        <p class="form-intro">${description}</p>
        ${message ? showMessage(message, message.includes('berhasil') ? 'success' : 'error') : ''}
        <form class="story-form" id="story-form" novalidate>
          <div class="field">
            <label for="story-title">Judul cerita</label>
            <input id="story-title" name="name" type="text" value="${escapeHtml(story.name || '')}" maxlength="80" required autocomplete="off" aria-describedby="title-help title-error">
            <span class="field-help" id="title-help">3-80 karakter.</span>
            <span class="field-error" id="title-error">${escapeHtml(errors.name || '')}</span>
          </div>

          <div class="field">
            <label for="story-description">Isi cerita</label>
            <textarea id="story-description" name="description" maxlength="1200" required aria-describedby="description-help description-error">${escapeHtml(story.description || '')}</textarea>
            <span class="field-help" id="description-help">10-1200 karakter. Sisa <span id="remaining-count">1200</span> karakter.</span>
            <span class="field-error" id="description-error">${escapeHtml(errors.description || '')}</span>
          </div>

          <div class="field">
            <label for="story-photo">Foto cerita</label>
            <input id="story-photo" name="photo" type="file" accept="image/*" ${isEdit ? '' : 'required'} aria-describedby="photo-help photo-error">
            <span class="field-help" id="photo-help">${isEdit ? 'Biarkan kosong jika ingin memakai foto lama.' : 'Gunakan JPG, PNG, atau WebP.'}</span>
            <span class="field-error" id="photo-error">${escapeHtml(errors.photo || '')}</span>
          </div>

          <div class="photo-preview ${story.photoUrl ? 'is-visible' : ''}" id="photo-preview">
            <img src="${escapeHtml(story.photoUrl || '')}" alt="Pratinjau foto cerita">
          </div>

          <div class="message">
            Data garis lintang dan garis bujur diperlukan agar sistem dapat mengetahui posisi lokasi secara akurat pada peta. Informasi ini digunakan untuk menentukan lokasi toko, cabang, atau area pengguna dengan lebih tepat.
          </div>

          <div class="field">
            <label for="story-lat">Garis Lintang (opsional)</label>
            <input id="story-lat" name="lat" type="number" step="any" min="-90" max="90" value="${escapeHtml(story.lat ?? '')}" placeholder="Contoh: -6.200000" aria-describedby="lat-help lat-error" title="Menunjukkan posisi lokasi dari utara ke selatan pada peta.">
            <span class="field-help" id="lat-help">Menunjukkan posisi lokasi dari utara ke selatan pada peta.</span>
            <span class="field-error" id="lat-error">${escapeHtml(errors.lat || '')}</span>
          </div>

          <div class="field">
            <label for="story-lon">Garis Bujur (opsional)</label>
            <input id="story-lon" name="lon" type="number" step="any" min="-180" max="180" value="${escapeHtml(story.lon ?? '')}" placeholder="Contoh: 106.816666" aria-describedby="lon-help lon-error" title="Menunjukkan posisi lokasi dari barat ke timur pada peta.">
            <span class="field-help" id="lon-help">Menunjukkan posisi lokasi dari barat ke timur pada peta.</span>
            <span class="field-error" id="lon-error">${escapeHtml(errors.lon || '')}</span>
          </div>

          <div class="form-actions">
            <button class="button button-primary" type="submit" ${isSubmitting ? 'disabled' : ''}>${isSubmitting ? 'Menyimpan...' : 'Simpan Cerita'}</button>
            <a class="button button-secondary" href="${isEdit ? `#/detail/${story.id}` : '#/'}">Batal</a>
          </div>
        </form>
      </section>
    `;

    const form = document.getElementById('story-form');
    const descriptionInput = document.getElementById('story-description');
    const remainingCount = document.getElementById('remaining-count');
    const photoInput = document.getElementById('story-photo');
    const photoPreview = document.getElementById('photo-preview');
    const photoPreviewImage = photoPreview.querySelector('img');

    const updateRemainingCount = () => {
      remainingCount.textContent = Math.max(0, 1200 - descriptionInput.value.length);
    };

    descriptionInput.addEventListener('input', updateRemainingCount);
    updateRemainingCount();

    photoInput.addEventListener('change', () => {
      const file = photoInput.files?.[0];
      if (!file) return;

      photoPreviewImage.src = URL.createObjectURL(file);
      photoPreview.classList.add('is-visible');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      onSubmit(new FormData(form));
    });
  },
};

export default StoryFormView;
