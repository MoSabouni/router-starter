import fetchRepo from '../fetchers/repoFetcher.js';
import { navigateTo } from '../../lib/hashRouter.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(state, [owner, repoName]) {
  const repoView = createRepoDetailView({ onBack: () => navigateTo('repos') });

  // Clear any previous error
  state.error = null;
  state.loading = true;
  repoView.update(state);

  (async () => {
    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      state.repo = repo;
      state.contributors = contributors;
    } catch (err) {
      console.error(err.message);
      state.error = err;
    }

    state.loading = false;
    repoView.update(state);
  })();

  return repoView;
}

export default createRepoDetailPage;
