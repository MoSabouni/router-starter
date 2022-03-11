import { createElement } from '../lib/domHelpers.js';
import createButtonView from './buttonView.js';

const content = {
  title: 'Router Starter Application',
  description:
    'This starter application implements and demonstrates a standard application architecture, featuring a hash-based router. The architecture includes the following:',
  bullets: [
    'A standard folder structure.',
    'Standard application functions that interact in predefined ways.',
    'A prescribed naming convention for the standard application functions.',
    'Prescribed function signatures and return value for standard application functions.',
    'Provides library functions for element creation, hash-based routing and (cached) data fetching.',
  ],
};

const createAboutView = () => {
  const root = createElement('div', { class: 'centered' });

  const title = createElement('h1', { text: content.title });
  root.appendChild(title);

  const description = createElement('p', { text: content.description });
  root.appendChild(description);

  const ul = document.createElement('ul');
  root.appendChild(ul);
  content.bullets.forEach((bullet) => {
    const li = createElement('li', { text: bullet });
    ul.appendChild(li);
  });

  const buttonContainer = createElement('div', { class: 'button-container' });
  root.appendChild(buttonContainer);

  const { root: homeBtn } = createButtonView('Home');
  buttonContainer.appendChild(homeBtn);

  return { root, homeBtn };
};

export default createAboutView;
