import { createElement } from './lib/dom-helpers.js';
import createRouter from './lib/hash-router.js';
import routes from './pages/routes.js';

const loadApp = () => {
  const appRoot = document.getElementById('app-root');
  const routerOutlet = createElement('div', { id: 'router-outlet' });
  appRoot.appendChild(routerOutlet);

  createRouter(routes);
};

window.addEventListener('load', loadApp);
