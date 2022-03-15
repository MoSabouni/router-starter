import { DEBUG } from '../../constants.js';
import { navigateTo } from '../../lib/hashRouter.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage(state) {
  const reposView = createReposView({
    onHomeClick: () => navigateTo('home'),
    onItemClick: (repo) => navigateTo('repo', repo.owner.login, repo.name),
    onFilterInput: (e) => {
      state.filter = e.target.value;
      reposView.update(state);
    },
  });

  (async () => {
    // No need to fetch again if we already have the data.
    if (!state.repos) {
      state.error = null;
      state.loading = true;
      reposView.update(state);

      try {
        state.repos = await fetchRepos();
      } catch (err) {
        if (DEBUG) console.error(err.message);

        navigateTo('error');
        return;
      } finally {
        state.loading = false;
      }
    }
    reposView.update(state);
  })();

  return reposView;
}

export default createReposPage;
