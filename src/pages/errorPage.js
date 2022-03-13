//@ts-check
import { createElement } from '../lib/domHelpers.js';
import { navigateTo } from '../lib/hashRouter.js';

const createErrorPage = (context) => {
  const root = createElement('div', {
    class: 'dialog-container',
  });
  createElement('div', {
    class: 'alert alert-error',
    text: context.error?.message ?? 'Oops... something went wrong.',
    appendTo: root,
  });
  const homeBtn = createElement('button', {
    type: 'button',
    text: 'Back to home page',
    appendTo: root,
  });

  homeBtn.addEventListener('click', () => navigateTo('home'));

  return { root };
};

export default createErrorPage;
