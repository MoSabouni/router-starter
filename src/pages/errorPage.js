//@ts-check
import { createElement } from '../lib/domHelpers.js';
import { navigateTo } from '../lib/hashRouter.js';

const createErrorPage = () => {
  const root = createElement('div', {
    class: 'alert alert-error',
  });

  root.appendChild(
    createElement('div', { text: 'Oops... something went wrong' })
  );

  const homeBtn = createElement('button', {
    type: 'button',
    text: 'Back to home page',
  });
  root.appendChild(homeBtn);

  homeBtn.addEventListener('click', () => navigateTo('home'));

  return { root };
};

export default createErrorPage;
