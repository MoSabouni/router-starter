import createHeaderView from './headerView.js';
import createReposHeaderContentView from './reposHeaderContentView.js';
import createLoadingIndicator from './loadingIndicator.js';
import createRepoListItemView from './repoListItemView.js';

function createReposView(props) {
  const root = document.createElement('div');
  root.className = 'repos-container';

  const headerContent = createReposHeaderContentView(props);
  const headerView = createHeaderView(headerContent.root);
  root.appendChild(headerView.root);

  const container = document.createElement('div');
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const update = ({ repos }) => {
    // clear loading indicator
    container.innerHTML = '';

    const repoList = document.createElement('ul');
    repoList.className = 'no-bullets';
    container.appendChild(repoList);

    repos.forEach((repo) => {
      const listItemView = createRepoListItemView({
        repo,
        onItemClick: props.onItemClick,
      });
      repoList.appendChild(listItemView.root);
    });
  };

  return { root, update };
}

export default createReposView;
