function createContributorListItemView({ contributor }) {
  const li = document.createElement('li');

  li.innerHTML = String.raw`
    <a href="${contributor.html_url}" class="contributor-item"  target="_blank">
    <img src="${contributor.avatar_url}" alt="${contributor.login}"  
        class="contributor-avatar" />
      <div class="contributor-data">
        <div>${contributor.login}</div>
        <div class="contributor-badge">${contributor.contributions}</div>
      </div>
    </a>
  `;

  return { root: li };
}

export default createContributorListItemView;
