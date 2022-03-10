import createHomePage from './homePage.js';
import createReposPage from './reposPage.js';
import createErrorPage from './errorPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'repos', page: createReposPage },
  { path: 'error', page: createErrorPage },
];

export default routes;
