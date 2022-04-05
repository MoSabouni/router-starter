function createHomeView(props) {
  const root = document.createElement('div');
  root.className = 'main-root';

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = props.title;
  root.appendChild(title);

  const intro = document.createElement('h2');
  intro.className = 'intro';
  intro.textContent = props.intro;
  root.appendChild(intro);

  const moviesBtn = document.createElement('a');
  moviesBtn.className = 'movies-btn';
  moviesBtn.textContent = props.btnText;
  moviesBtn.href = props.btnHref;
  root.appendChild(moviesBtn);

  return { root };
}

export default createHomeView;
