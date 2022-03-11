//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createHeaderView = (childRoot) => {
  const header = createElement('header', { class: 'header' });

  if (childRoot) {
    header.appendChild(childRoot);
  }

  return { root: header };
};

export default createHeaderView;
