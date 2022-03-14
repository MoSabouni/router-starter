import fetchRepos from '../fetchers/reposFetcher.js';
import { navigateTo } from '../../lib/hashRouter.js';
import createReposView from '../views/reposView.js';

function createReposPage(context) {
  const reposView = createReposView({
    onHomeClick: () => navigateTo('home'),
    onItemClick: (repo) => navigateTo('repo', repo.owner.login, repo.name),
  });

  context.error = null;

  (async () => {
    try {
      const repos = await fetchRepos();
      reposView.update({ repos });
    } catch (err) {
      console.error(err.message);
      context.error = err;
      navigateTo('error');
    }
  })();

  return reposView;
}

export default createReposPage;
