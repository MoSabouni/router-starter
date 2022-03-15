import { DEBUG } from '../../constants.js';
import { navigateTo } from '../../lib/hashRouter.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(state, [owner, repoName]) {
  const repoView = createRepoDetailView({ onBack: () => navigateTo('repos') });

  (async () => {
    state.error = null;
    state.loading = true;
    repoView.update(state);

    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      state.repo = repo;
      state.contributors = contributors;
    } catch (err) {
      if (DEBUG) console.error(err.message);

      navigateTo('error');
      return;
    } finally {
      state.loading = false;
    }

    repoView.update(state);
  })();

  return repoView;
}

export default createRepoDetailPage;
