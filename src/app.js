import createRouter from './lib/hashRouter.js';
import routes from './example/pages/routes.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');
  const routerOutlet = document.createElement('div');
  routerOutlet.id = 'router-outlet';
  appRoot.appendChild(routerOutlet);

  createRouter(routes, routerOutlet);
}

window.addEventListener('load', loadApp);
