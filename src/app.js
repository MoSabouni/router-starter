import { USE_EXAMPLE } from './constants.js';
import exampleRoutes from './example/pages/routes.js';
import createRouter from './lib/hashRouter.js';
import appRoutes from './pages/routes.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');
  const routerOutlet = document.createElement('div');
  routerOutlet.id = 'router-outlet';
  appRoot.appendChild(routerOutlet);

  const routes = USE_EXAMPLE ? exampleRoutes : appRoutes;

  createRouter(routes, routerOutlet);
}

window.addEventListener('load', loadApp);
