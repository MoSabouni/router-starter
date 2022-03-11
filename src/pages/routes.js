//@ts-check
import createHomePage from './homePage.js';
import createReposPage from './reposPage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createErrorPage from './errorPage.js';
import createAboutPage from './aboutPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'about', page: createAboutPage },
  { path: 'repos', page: createReposPage },
  { path: 'repo', page: createRepoDetailPage },
  { path: 'error', page: createErrorPage },
];

export default routes;
