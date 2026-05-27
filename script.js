import router from './src/routes/router.js';
import { setupTransition } from './src/utils/viewTransition.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  setupTransition();
  router();
});