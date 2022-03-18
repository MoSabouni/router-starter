import router from '../../lib/router.js';
import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = {
    onStart: () => router.navigateTo('repos'),
    onAbout: () => router.navigateTo('about'),
  };
  return createHomeView(props);
}

export default createHomePage;
