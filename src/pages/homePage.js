import { navigateTo } from '../lib/hashRouter.js';
import createHomeView from '../views/homeView.js';

function createHomePage() {
  return createHomeView({
    onStart: () => navigateTo('repos'),
    onAbout: () => navigateTo('about'),
  });
}

export default createHomePage;
