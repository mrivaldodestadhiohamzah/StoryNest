export const logoSrc = './assets/SNlogo.png';

export const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const formatDate = (value) => {
  if (!value) return 'Tanggal tidak tersedia';

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const truncate = (value = '', maxLength = 150) => {
  const cleanValue = String(value).trim();
  if (cleanValue.length <= maxLength) return cleanValue;
  return `${cleanValue.slice(0, maxLength).trim()}...`;
};

export const setActiveNav = () => {
  const currentPath = window.location.hash.slice(1) || '/';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
};

export const showLoading = (message = 'Memuat cerita...') => {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="loading" role="status" aria-live="polite">${escapeHtml(message)}</div>`;
};

export const showMessage = (message, type = 'error') => `
  <div class="message message-${type}" role="${type === 'error' ? 'alert' : 'status'}">
    ${escapeHtml(message)}
  </div>
`;

export const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Foto gagal dibaca. Coba pilih file lain.'));
  reader.readAsDataURL(file);
});
