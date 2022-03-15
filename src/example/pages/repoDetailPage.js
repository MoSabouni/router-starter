import { DEBUG } from '../../constants.js';
import { navigateTo } from '../../lib/hashRouter.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(state, [owner, repoName]) {
  const repoView = createRepoDetailView({ onBack: () => navigateTo('repos') });

  // Clear any previous error
  state.error = null;
  // Indicate we are about to load (should show spinner)
  state.loading = true;
  // Update the view
  repoView.update(state);

  (async () => {
    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      state.repo = repo;
      state.contributors = contributors;
    } catch (err) {
      if (DEBUG) {
        console.error(err.message);
      }
      navigateTo('error');
    }

    state.loading = false;
    repoView.update(state);
  })();

  return repoView;
}

export default createRepoDetailPage;
