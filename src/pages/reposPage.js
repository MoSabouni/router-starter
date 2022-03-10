import { navigateTo } from '../lib/hash-router.js';
import { clearElement, createElement } from '../lib/dom-helpers.js';
import createRepoListItemView from '../views/repoListItemView.js';
import fetchRepos from '../fetchers/repos-fetcher.js';

const createReposPage = () => {
  const root = createElement();

  const homeBtn = createElement('button', { type: 'button', text: 'Home' });
  root.appendChild(homeBtn);
  homeBtn.addEventListener('click', () => navigateTo('home'));

  const container = createElement();
  root.appendChild(container);

  const loadingIndicator = createElement('p', { text: 'Loading...' });
  container.appendChild(loadingIndicator);

  // The fetched data will be rendered asynchronously
  (async () => {
    try {
      const repos = await fetchRepos();

      // Remove loading indicator
      clearElement(container);

      // Render fetched data
      const repoList = createElement('ul', { class: 'no-bullets' });
      container.appendChild(repoList);

      repos.forEach((repo) => {
        const listItemView = createRepoListItemView(repo);
        repoList.appendChild(listItemView.root);
      });
    } catch (err) {
      console.error(err.message);
      navigateTo('error');
    }
  })();

  return root;
};

export default createReposPage;
