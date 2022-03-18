import { navigateTo } from '../../lib/hashRouter.js';
import { log } from '../../lib/logger.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(state, owner, repoName) {
  const props = { onBack: () => navigateTo('repos') };
  const repoView = createRepoDetailView(props);

  const getData = async () => {
    state.error = null;
    state.loading = true;
    repoView.update(state);

    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      state.repo = repo;
      state.contributors = contributors;
    } catch (err) {
      log.error('createRepoDetailPage', err.message);
      navigateTo('error');
      return;
    } finally {
      state.loading = false;
    }

    repoView.update(state);
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
