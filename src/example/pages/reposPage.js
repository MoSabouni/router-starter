import { appState } from '../../lib/appState.js';
import { navigateTo } from '../../lib/hashRouter.js';
import {log} from '../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage(state) {
  const props = {
    onHomeClick: () => navigateTo('home'),
    onItemClick: (repo) => navigateTo('repo', repo.owner.login, repo.name),
    onFilterInput: (e) => {
      state.filter = e.target.value.trim().toLowerCase();
      reposView.update(state);
    },
    onClearFilter: () => {
      state.filter = '';
      reposView.update(state);
    },
    onOrganizationChange: (e) => {
      state.organization = e.target.value;
      getData();
    },
  };

  const reposView = createReposView(props);
  const unsubscribe = appState.subscribe(reposView.update);

  const getData = async () => {
    appState.update({ error: null, loading: true });

    try {
      const repos = await fetchRepos(state.organization);
      appState.update({ repos, loading: false });
    } catch (error) {
      log.error('createReposPage', error.message);
      appState.update({ error, loading: false });
      navigateTo('error');
      return;
    }
  };

  getData();

  return { root: reposView.root, willUnmount: unsubscribe };
}

export default createReposPage;
