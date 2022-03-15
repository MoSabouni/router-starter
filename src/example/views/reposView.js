import createHeaderView from './headerView.js';
import createReposHeaderContentView from './reposHeaderContentView.js';
import createLoadingIndicator from './loadingIndicator.js';
import createRepoListItemView from './repoListItemView.js';
import { DEBUG } from '../../constants.js';
import createFilterView from './filterView.js';

function createReposView(props) {
  const root = document.createElement('div');
  root.className = 'repos-container';

  const headerContent = createReposHeaderContentView(props);
  const headerView = createHeaderView({ content: headerContent.root });
  root.appendChild(headerView.root);

  const filterView = createFilterView(props);
  root.appendChild(filterView.root);

  const container = document.createElement('div');
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const update = (state) => {
    if (DEBUG) console.log('repos', state);

    if (state.loading) {
      loadingIndicator.root.hidden = false;
      return;
    }

    loadingIndicator.root.hidden = true;

    if (state.error) {
      throw new Error('Unexpected call to `update()`');
    }

    // clear loading indicator
    container.innerHTML = '';

    const repoList = document.createElement('ul');
    repoList.className = 'no-bullets';
    container.appendChild(repoList);

    let { repos } = state;
    if (state.filter) {
      repos = repos.filter((repo) =>
        repo.name.toLowerCase().startsWith(state.filter)
      );
    }

    repos.forEach((repo) => {
      const listItemView = createRepoListItemView({
        repo,
        onItemClick: props.onItemClick,
      });
      repoList.appendChild(listItemView.root);
    });

    filterView.update(state);
  };

  return { root, update };
}

export default createReposView;
