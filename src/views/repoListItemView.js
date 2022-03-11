//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createRepoListItem = (repo) => {
  const li = createElement('li', { class: 'list-item whiteframe' });

  const repoName = createElement('span', { text: repo.name });
  li.appendChild(repoName);

  const arrow = createElement('i', { class: 'fa-solid fa-chevron-right' });
  li.appendChild(arrow);

  return { root: li };
};

export default createRepoListItem;
