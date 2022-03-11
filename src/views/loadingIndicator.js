import { createElement } from '../lib/domHelpers.js';

const createLoadingIndicator = () => {
  const root = createElement('div', { class: 'loading-indicator' });

  const container = createElement('div', { class: 'spin' });
  root.appendChild(container);

  const spinner = createElement('i', { class: 'fa-solid fa-spinner fa-2xl' });
  container.appendChild(spinner);

  return { root };
};

export default createLoadingIndicator;
