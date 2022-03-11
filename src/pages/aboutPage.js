import { createElement } from '../lib/domHelpers.js';
import { navigateTo } from '../lib/hashRouter.js';
import createAboutView from '../views/aboutView.js';

const createAboutPage = () => {
  const root = createElement('div', { class: 'dialog-container' });

  const aboutView = createAboutView();
  root.appendChild(aboutView.root);

  aboutView.homeBtn.addEventListener('click', () => navigateTo('home'));

  return { root };
};

export default createAboutPage;
