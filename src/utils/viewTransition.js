export const setupTransition = () => {
  if (document.startViewTransition) {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#/"], a[href^="#stories-section"]');
      if (link) {
        event.preventDefault();
        document.startViewTransition(() => {
          window.location.href = link.href;
        });
      }
    });
  }
};
