import { createElement } from '../lib/domHelpers.js';

const createButtonView = (text) => {
  const button = createElement('button', { type: 'button', text });
  return { root: button };
};

export default createButtonView;
