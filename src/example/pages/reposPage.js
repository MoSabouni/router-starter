import fetchRepos from '../fetchers/reposFetcher.js';
import { navigateTo } from '../../lib/hashRouter.js';
import createReposView from '../views/reposView.js';

function createReposPage(state) {
  const reposView = createReposView({
    onHomeClick: () => navigateTo('home'),
    onItemClick: (repo) => navigateTo('repo', repo.owner.login, repo.name),
  });

  state.error = null;
  state.loading = true;
  reposView.update(state);

  (async () => {
    try {
      state.repos = await fetchRepos();
    } catch (err) {
      console.error(err.message);
      state.error = err;
    }

    state.loading = false;
    reposView.update(state);
  })();

  return reposView;
}

export default createReposPage;
