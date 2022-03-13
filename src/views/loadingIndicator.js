import { createElement } from '../lib/domHelpers.js';

const createLoadingIndicator = () => {
  const root = createElement('div', { class: 'loading-indicator' });
  const container = createElement('div', { class: 'spin', appendTo: root });
  createElement('i', {
    class: 'fa-solid fa-spinner fa-2xl',
    appendTo: container,
  });
  return { root };
};

export default createLoadingIndicator;
