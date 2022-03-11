//@ts-check
import { createElement } from './lib/domHelpers.js';
import createRouter from './lib/hashRouter.js';
import routes from './pages/routes.js';

const loadApp = () => {
  const appRoot = document.getElementById('app-root');
  const routerOutlet = createElement('div', { id: 'router-outlet' });
  appRoot.appendChild(routerOutlet);

  createRouter(routes);
};

window.addEventListener('load', loadApp);
