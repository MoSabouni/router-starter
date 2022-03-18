import { LOG_LEVEL } from './constants.js';
import data from './data.js';
// import routes from './pages/routes.js'
import routes from './example/pages/routes.js';
import createRouter from './lib/hashRouter.js';
import log from './lib/logger.js';

function loadApp() {
  // Set the desired log level
  log.setLevel(LOG_LEVEL);
  log.info('application', 'started');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging
  const routerOutlet = document.createElement('div');
  routerOutlet.id = 'router-outlet';
  appRoot.appendChild(routerOutlet);

  // Create and start the router
  const router = createRouter(routes, routerOutlet, { ...data });
  router.start();
}

window.addEventListener('load', loadApp);
