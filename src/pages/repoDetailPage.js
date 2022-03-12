//@ts-check
import { createElement, clearElement } from '../lib/domHelpers.js';
import { navigateTo } from '../lib/hashRouter.js';
import createContributorListView from '../views/contributorListView.js';
import createRepoDetailView from '../views/repoDetailView.js';
import createHeaderView from '../views/headerView.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createLoadingIndicator from '../views/loadingIndicator.js';

const createRepoDetailPage = (context, owner, repoName) => {
  const root = createElement();

  const backBtn = createElement('button', {
    type: 'button',
    text: 'Back to repositories',
  });
  backBtn.addEventListener('click', () => navigateTo('repos'));

  const headerView = createHeaderView(backBtn);
  root.appendChild(headerView.root);

  const container = createElement('div', { class: 'repo-detail-container' });
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  (async () => {
    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);

      // Remove loading indicator
      clearElement(container);

      const repoView = createRepoDetailView(repo);

      container.appendChild(repoView.root);
      const contributorsView = createContributorListView(contributors);
      container.appendChild(contributorsView.root);
    } catch (err) {
      console.error(err.message);
      navigateTo('error');
    }
  })();

  return { root };
};

export default createRepoDetailPage;
