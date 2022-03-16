import { navigateTo } from '../../lib/hashRouter.js';
import log from '../../lib/logger.js';
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

  const getData = async () => {
    state.error = null;
    state.loading = true;
    reposView.update(state);

    try {
      state.repos = await fetchRepos(state.organization);
    } catch (err) {
      log.error('createReposPage', err.message);
      navigateTo('error');
      return;
    } finally {
      state.loading = false;
    }
    reposView.update(state);
  };

  getData();

  return reposView;
}

export default createReposPage;
