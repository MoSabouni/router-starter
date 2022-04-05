function createMovieView(props) {
  const root = document.createElement('div');
  root.className = 'main-root';

  const movieContainer = document.createElement('div');
  movieContainer.className = 'movie-container';

  const movieInfoContainer = document.createElement('div');
  movieInfoContainer.className = 'movie-info-container';
  movieContainer.appendChild(movieInfoContainer);

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = props.title;
  root.appendChild(title);

  const inputSearch = document.createElement('input');
  inputSearch.className = 'input-search';
  inputSearch.setAttribute('type', 'Search');
  root.appendChild(inputSearch);

  const searchButton = document.createElement('button');
  searchButton.className = 'search-button';
  searchButton.setAttribute('type', 'button');
  searchButton.textContent = props.searchButtonText;
  root.appendChild(searchButton);

  // creating all movie info HTML
  const moviePoster = document.createElement('img');
  moviePoster.className = 'movie-poster';
  moviePoster.alt = 'movie poster';
  movieContainer.appendChild(moviePoster);

  const movieTitle = document.createElement('h1');
  movieTitle.className = 'movie-title';
  movieInfoContainer.appendChild(movieTitle);

  const moviePlot = document.createElement('h3');
  moviePlot.className = 'movie-plot';
  movieInfoContainer.appendChild(moviePlot);

  const movieInfo = document.createElement('h4');
  movieInfo.setAttribute('style', 'white-space: pre;');
  movieInfoContainer.appendChild(movieInfo);

  searchButton.addEventListener('click', props.onClick);
  inputSearch.addEventListener('input', props.onInput);

  const loadingIndicator = createLoadingIndicator();
  root.appendChild(loadingIndicator.root);
  loadingIndicator.root.hidden = true;

  const update = (state) => {
    const { movies, error, loading } = state;
    if (loading) {
      loadingIndicator.root.hidden = false;
      return;
    }
    loadingIndicator.root.hidden = true;

    if (error) {
      return;
    }
    root.appendChild(movieContainer);

    movieTitle.textContent = movies.Title;
    moviePoster.src = movies.Poster;
    moviePlot.textContent = movies.Plot;
    movieInfo.textContent = `Information:\r\n
    Rating: ${movies.imdbRating}\r\n
    Year: ${movies.Year}\r\n
    Seasons: ${movies.totalSeasons}\r\n
    Genre: ${movies.Genre}\r\n
    Actors: ${movies.Actors}\r\n
    Writer: ${movies.Writer}`;
  };

  return { root, update };
}

function createLoadingIndicator() {
  const root = document.createElement('div');
  root.className = 'loading-indicator';

  const spin = document.createElement('div');
  spin.className = 'spin';
  root.appendChild(spin);

  const spinner = document.createElement('i');
  spinner.className = 'fa-solid fa-spinner fa-2xl';
  spin.appendChild(spinner);

  // root.innerHTML = String.raw`
  //   <div class="spin">
  //     <i class="fa-solid fa-spinner fa-2xl"></i>
  //   </div>
  // `;

  return { root };
}

export default createMovieView;
