import { navigateTo } from '../../lib/hashRouter.js';
import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = {
    onStart: () => navigateTo('repos'),
    onAbout: () => navigateTo('about'),
  };
  return createHomeView(props);
}

export default createHomePage;
