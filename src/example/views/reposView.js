import createHeaderView from './headerView.js';
import createReposHeaderContentView from './reposHeaderContentView.js';
import createLoadingIndicator from './loadingIndicator.js';
import createRepoListItemView from './repoListItemView.js';
import { DEBUG } from '../../constants.js';

function createReposView(props) {
  const root = document.createElement('div');
  root.className = 'repos-container';

  const headerContent = createReposHeaderContentView(props);
  const headerView = createHeaderView({ content: headerContent.root });
  root.appendChild(headerView.root);

  const container = document.createElement('div');
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();

  const update = (state) => {
    if (DEBUG) {
      console.log('repos', state);
    }

    if (state.loading) {
      container.appendChild(loadingIndicator.root);
    } else {
      container.removeChild(loadingIndicator.root);
    }

    if (state.error) {
      // TODO: render error to the DOM
      console.log(state.error.message);
      return;
    }

    if (state.loading) {
      return;
    }

    // clear loading indicator
    container.innerHTML = '';

    const repoList = document.createElement('ul');
    repoList.className = 'no-bullets';
    container.appendChild(repoList);

    state.repos.forEach((repo) => {
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
