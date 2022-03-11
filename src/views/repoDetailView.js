//@ts-check
import { createElement } from '../lib/domHelpers.js';
import createContributorView from './contributorView.js';

function createRepoDetailView(repo) {
  const container = createElement('section', {
    class: 'repo-container whiteframe',
  });

  const cardContainer = createElement('div', {
    class: 'card-container',
  });
  container.appendChild(cardContainer);

  const table = createElement('table');
  cardContainer.appendChild(table);

  const tbody = createElement('tbody');
  table.appendChild(tbody);

  const repoNameView = createContributorView('Repository');
  tbody.appendChild(repoNameView.root);

  repoNameView.valueText.appendChild(
    createElement('a', {
      href: repo.html_url,
      target: '_blank',
      text: repo.name,
    })
  );

  const descriptionView = createContributorView(
    'Description',
    repo.description || ''
  );
  tbody.appendChild(descriptionView.root);

  const forksView = createContributorView('Forks', repo.forks);
  tbody.appendChild(forksView.root);

  const lastUpdatedView = createContributorView(
    'Updated',
    new Date(repo.updated_at).toLocaleString()
  );

  tbody.appendChild(lastUpdatedView.root);

  return { root: container };
}

export default createRepoDetailView;
