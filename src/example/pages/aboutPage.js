import { navigateTo } from '../../lib/hashRouter.js';
import createAboutView from '../views/aboutView.js';

function createAboutPage() {
  return createAboutView({ onClick: () => navigateTo('home') });
}

export default createAboutPage;
