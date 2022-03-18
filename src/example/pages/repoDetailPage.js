import router from '../../lib/router.js';
import log from '../../lib/logger.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(owner, repoName) {
  const props = { onBack: () => router.navigateTo('repos') };
  const repoView = createRepoDetailView(props);

  const getData = async () => {
    router.updateState({ error: null, loading: true });

    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      router.updateState({ repo, contributors, loading: false });
    } catch (error) {
      log.error('createRepoDetailPage', error.message);
      router.updateState({ error, loading: false });
      router.navigateTo('error');
      return;
    }
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
