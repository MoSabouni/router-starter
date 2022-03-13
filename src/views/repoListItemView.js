const createRepoListItem = ({ repo, onItemClick }) => {
  const li = document.createElement('li');
  li.className = 'list-item whiteframe';

  li.innerHTML = String.raw`
    <span>${repo.name}</span>
    <i class="fa-solid fa-chevron-right"></i>
  `;

  li.addEventListener('click', () => onItemClick(repo));
  return { root: li };
};

export default createRepoListItem;
