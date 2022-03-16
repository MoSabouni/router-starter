import log from '../../lib/logger.js';
import createLoadingIndicator from './loadingIndicator.js';
import createRepoListItemView from './repoListItemView.js';
import createToolbarView from './toolbarView.js';

function createReposView(props) {
  const root = document.createElement('div');
  root.className = 'repos-container';
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <button type="button" id="btn-home">
          <i class="fa-solid fa-house"></i>
        </button>
        <div>HYF Repositories</div>
      </div>
    </header>
  `;

  const btnHome = root.querySelector('#btn-home');
  btnHome.addEventListener('click', props.onHomeClick);

  const toolbarView = createToolbarView(props);
  root.appendChild(toolbarView.root);

  const container = document.createElement('div');
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const render = (state) => {
    toolbarView.update(state);

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
  };

  const update = (state) => {
    log.debug('reposView', 'update:', state);
    render(state);
  };

  return { root, update };
}

export default createReposView;
