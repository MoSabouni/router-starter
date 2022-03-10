//@ts-check
import { createElement } from '../lib/dom-helpers.js';

const createRepoListItem = (repo) => {
  const li = createElement('li', { class: 'list-item whiteframe' });
  li.appendChild(createElement('div', { text: repo.name }));

  return { root: li };
};

export default createRepoListItem;
