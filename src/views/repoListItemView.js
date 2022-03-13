//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createRepoListItem = ({ repo, onClick }) => {
  const li = createElement('li', { class: 'list-item whiteframe' });
  createElement('span', { text: repo.name, appendTo: li });
  createElement('i', { class: 'fa-solid fa-chevron-right', appendTo: li });

  li.addEventListener('click', () => onClick(repo));
  return { root: li };
};

export default createRepoListItem;
