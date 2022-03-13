function createReposHeaderContentView(props) {
  const root = document.createElement('div');
  root.className = 'header-content';

  root.innerHTML = String.raw`
    <button type="button">Home</button>
    <div>HYF Repositories</div>
  `;

  const homeButton = root.querySelector('button');
  homeButton.addEventListener('click', props.onHomeClick);

  return { root };
}

export default createReposHeaderContentView;
