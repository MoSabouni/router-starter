import log from '../../lib/logger.js';
import createContributorListView from './contributorListView.js';
import createLoadingIndicator from './loadingIndicator.js';

function createRepoDetailView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
  <header class="header">
    <div class="header-content">
      <button type="button" id="btn-back">
      <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div>Repository Details</div>
    </div>
  </header>
  `;

  const btnBack = root.querySelector('#btn-back');
  btnBack.addEventListener('click', props.onBack);

  const container = document.createElement('div');
  container.className = 'repo-detail-container';
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const render = (state) => {
    if (state.loading) {
      loadingIndicator.root.hidden = false;
      return;
    }

    loadingIndicator.root.hidden = true;

    if (state.error) {
      throw new Error('Unexpected call to `update()`');
    }

    const { repo } = state;

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

    const contributorsView = createContributorListView({
      contributors: state.contributors,
    });
    container.appendChild(contributorsView.root);
  };

  const update = (state) => {
    log.debug('repoDetailView', 'update:', state);
    render(state);
  };

  return { root, update };
}

export default createRepoDetailView;
