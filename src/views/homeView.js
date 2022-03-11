import { createElement } from '../lib/domHelpers.js';
import createButtonView from './buttonView.js';

const content = {
  title: 'Router Starter Application',
  description:
    'Features a hash-based router written in plain vanilla JavaScript. This example uses the GitHub API to lists repositories from the HackYourFuture organization.',
};

const createHomeView = () => {
  const root = createElement('div', {
    class: 'dialog-container',
  });

  const title = createElement('h1', { text: content.title });
  root.appendChild(title);

  const description = createElement('p', { text: content.description });
  root.appendChild(description);

  const buttonContainer = createElement('div', { class: 'button-container' });
  root.appendChild(buttonContainer);

  const { root: startBtn } = createButtonView('Start');
  buttonContainer.appendChild(startBtn);

  const { root: aboutBtn } = createButtonView('About');
  buttonContainer.appendChild(aboutBtn);

  return { root, startBtn, aboutBtn };
};

export default createHomeView;
