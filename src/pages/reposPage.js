import { navigateTo } from '../lib/hashRouter.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

const createReposPage = (context) => {
  const onHomeClick = () => navigateTo('home');
  const onItemClick = (repo) => {
    navigateTo('repo', repo.owner.login, repo.name);
  };

  const reposView = createReposView({ onHomeClick, onItemClick });

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
};

export default createReposPage;
