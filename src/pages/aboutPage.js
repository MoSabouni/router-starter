import { navigateTo } from '../lib/hashRouter.js';
import createAboutView from '../views/aboutView.js';

const createAboutPage = () => {
  const root = document.createElement('div');
  root.className = 'dialog-container';

  const onClick = () => navigateTo('home');

  const aboutView = createAboutView({ onClick });
  root.appendChild(aboutView.root);

  return { root };
};

export default createAboutPage;
