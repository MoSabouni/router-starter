import fetchRepo from '../fetchers/repoFetcher.js';
import { navigateTo } from '../lib/hashRouter.js';
import createRepoDetailView from '../views/repoDetailView.js';

const createRepoDetailPage = (context, [owner, repoName]) => {
  const onBack = () => navigateTo('repos');
  const root = document.createElement('div');

  const repoView = createRepoDetailView({ onBack });
  root.appendChild(repoView.root);

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

  return { root };
};

export default createRepoDetailPage;
