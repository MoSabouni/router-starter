//@ts-check
import { navigateTo } from '../lib/hashRouter.js';
import { createElement, clearElement } from '../lib/domHelpers.js';
import createRepoListItemView from '../views/repoListItemView.js';
import createHeaderView from '../views/headerView.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createLoadingIndicator from '../views/loadingIndicator.js';

const createReposPage = (context) => {
  const root = createElement('div', { class: 'repos-container' });

  const headerContent = createElement('div', { class: 'header-content' });
  const homeBtn = createElement('button', { type: 'button', text: 'Home' });
  headerContent.appendChild(homeBtn);
  homeBtn.addEventListener('click', () => navigateTo('home'));

  const headerTitle = createElement('div', { text: 'HYF Repositories' });
  headerContent.appendChild(headerTitle);

  const headerView = createHeaderView(headerContent);
  root.appendChild(headerView.root);

  const container = createElement();
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  context.error = null;

  (async () => {
    try {
      const repos = await fetchRepos();

      // Remove loading indicator
      clearElement(container);

      const repoList = createElement('ul', { class: 'no-bullets' });
      container.appendChild(repoList);

      const onClick = (repo) => {
        navigateTo('repo', repo.owner.login, repo.name);
      };

      repos.forEach((repo) => {
        const listItemView = createRepoListItemView({ repo, onClick });
        repoList.appendChild(listItemView.root);
      });
    } catch (err) {
      console.error(err.message);
      context.error = err;
      navigateTo('error');
    }
  })();

  return { root };
};

export default createReposPage;
