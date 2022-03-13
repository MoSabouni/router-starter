//@ts-check
import { createElement } from '../lib/domHelpers.js';
import createContributorView from './contributorView.js';

function createRepoDetailView(repo) {
  const root = createElement('section', {
    class: 'repo-container whiteframe',
  });
  const cardContainer = createElement('div', {
    class: 'card-container',
    appendTo: root,
  });
  const table = createElement('table', { appendTo: cardContainer });
  const tbody = createElement('tbody', { appendTo: table });
  const repoNameView = createContributorView({ label: 'Repository' });
  tbody.appendChild(repoNameView.root);

  repoNameView.valueText.appendChild(
    createElement('a', {
      href: repo.html_url,
      target: '_blank',
      text: repo.name,
    })
  );

  const descriptionView = createContributorView({
    label: 'Description',
    value: repo.description || '',
  });
  tbody.appendChild(descriptionView.root);

  const forksView = createContributorView({
    label: 'Forks',
    value: repo.forks,
  });
  tbody.appendChild(forksView.root);

  const lastUpdatedView = createContributorView({
    label: 'Updated',
    value: new Date(repo.updated_at).toLocaleString(),
  });

  tbody.appendChild(lastUpdatedView.root);

  return { root };
}

export default createRepoDetailView;
