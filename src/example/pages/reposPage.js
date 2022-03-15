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

  // Clear any previous error
  state.error = null;
  // Indicate we are about to load (should show spinner)
  state.loading = true;
  // Update the view
  reposView.update(state);

  (async () => {
    try {
      state.repos = await fetchRepos();
      state.loading = false;
      reposView.update(state);
    } catch (err) {
      if (DEBUG) {
        console.error(err.message);
      }
      navigateTo('error');
    }
  })();

  return reposView;
}

export default createReposPage;
