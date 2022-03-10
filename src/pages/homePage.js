//@ts-check
import { createElement } from '../lib/dom-helpers.js';
import { navigateTo } from '../lib/hash-router.js';

const createHomePage = () => {
  const root = createElement('div', {
    class: 'whiteframe',
  });

  const container = createElement('div', { class: 'dialog-container' });
  root.appendChild(container);

  // To keep things simple, let's use an HTML template here.
  const introTemplate = document.getElementById('intro');
  //@ts-ignore
  container.appendChild(introTemplate.content.cloneNode(true));

  const startBtn = createElement('button', {
    type: 'button',
    text: 'Demo',
  });
  container.appendChild(startBtn);

  startBtn.addEventListener('click', () => navigateTo('repos'));

  return root;
};

export default createHomePage;
