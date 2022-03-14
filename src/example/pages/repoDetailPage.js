import fetchRepo from '../fetchers/repoFetcher.js';
import { navigateTo } from '../../lib/hashRouter.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(context, [owner, repoName]) {
  const repoView = createRepoDetailView({ onBack: () => navigateTo('repos') });

  // Clear any previous error
  context.error = null;

  (async () => {
    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      repoView.update({ repo, contributors });
    } catch (err) {
      console.error(err.message);
      context.error = err;
      navigateTo('error');
    }
  })();

  return repoView;
}

export default createRepoDetailPage;
