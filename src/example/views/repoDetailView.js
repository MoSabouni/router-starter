import createLoadingIndicator from './loadingIndicator.js';
import createHeaderView from './headerView.js';
import createContributorListView from './contributorListView.js';
import { DEBUG } from '../../constants.js';

function createRepoDetailView(props) {
  const root = document.createElement('div');

  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.textContent = 'Back to repositories';
  backBtn.addEventListener('click', props.onBack);

  const headerView = createHeaderView({ content: backBtn });
  root.appendChild(headerView.root);

  const container = document.createElement('div');
  container.className = 'repo-detail-container';
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const update = (state) => {
    if (DEBUG) console.log('repo detail state', state);

    if (state.loading) {
      loadingIndicator.root.hidden = false;
      return;
    }

    loadingIndicator.root.hidden = true;

    if (state.error) {
      throw new Error('Unexpected call to `update()`');
    }

    const { repo, contributors } = state;

    container.innerHTML = String.raw`
      <section class="repo-container whiteframe">
        <div class="card-container">
          <table>
            <tbody>
              <tr>
                <th>Repository:</td>
                <td>
                  <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </td>
              <tr>
                <th>Description:</td>
                <td>${repo.description || '(none)'}</td>
              </tr>
              <tr>
                <th>Fork:</td>
                <td>${repo.forks}</td>
              </tr>
              <tr>
                <th>Updated:</td>
                <td>${new Date(repo.updated_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `;

    const contributorsView = createContributorListView({ contributors });
    container.appendChild(contributorsView.root);
  };

  return { root, update };
}

export default createRepoDetailView;
