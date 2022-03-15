import { navigateTo } from '../../lib/hashRouter.js';
import createAboutView from '../views/aboutView.js';

function createAboutPage() {
  const props = { onClick: () => navigateTo('home') };
  return createAboutView(props);
}

export default createAboutPage;
