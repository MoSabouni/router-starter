function createReposHeaderContentView(props) {
  const root = document.createElement('div');
  root.className = 'header-content';

  root.innerHTML = String.raw`
    <button type="button" id="btn-home">Home</button>
    <div>HYF Repositories</div>
  `;

  const btnHome = root.querySelector('#btn-home');
  btnHome.addEventListener('click', props.onHomeClick);

  return { root };
}

export default createReposHeaderContentView;
