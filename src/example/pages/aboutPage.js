import router from '../../lib/router.js';
import createAboutView from '../views/aboutView.js';

function createAboutPage() {
  const props = { onClick: () => router.navigateTo('home') };
  return createAboutView(props);
}

export default createAboutPage;
