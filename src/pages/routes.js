import createHomePage from './homePage.js';
import createMoviePage from './moviePage.js';

const routes = [
    { path: 'home', page: createHomePage, default: true },
    { path: 'movie', page: createMoviePage }
];

export default routes;
