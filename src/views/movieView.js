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

  searchButton.addEventListener('click', props.onClick);
  inputSearch.addEventListener('input', props.onInput);

  // creating main movie
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

  const renderMovie = (movie) => {
    root.appendChild(movieContainer);
    movieTitle.textContent = movie.Title;
    moviePoster.src = movie.Poster;
    moviePlot.textContent = movie.Plot;
    movieInfo.textContent = `Information:\r\n
    Rating: ${movie.imdbRating}\r\n
    Year: ${movie.Year}\r\n
    Seasons: ${movie.totalSeasons}\r\n
    Genre: ${movie.Genre}\r\n
    Actors: ${movie.Actors}\r\n
    Writer: ${movie.Writer}`;
  };

  // creating suggestion movies list
  const moviesListContainer = document.createElement('div');
  moviesListContainer.className = 'movies-list-container';

  const renderMoviesList = (moviesList) => {
    root.appendChild(moviesListContainer);

    moviesList.Search.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      moviesListContainer.appendChild(movieCard);

      const moviesListTitle = document.createElement('button');
      moviesListTitle.className = 'movies-list-title';
      moviesListTitle.textContent = movie.Title;
      movieCard.appendChild(moviesListTitle);
      moviesListTitle.addEventListener('click', () =>
        props.onMovieClick(movie.imdbID)
      );

      const movieListPoster = document.createElement('img');
      movieListPoster.className = 'movie-list-poster';
      movieListPoster.src = movie.Poster;
      movieListPoster.alt = movie.Title;
      movieCard.appendChild(movieListPoster);
    });
  };

  // Loading indicator
  const loadingIndicator = createLoadingIndicator();
  root.appendChild(loadingIndicator.root);
  loadingIndicator.root.hidden = true;
  // update function is fired whenever there is state update from router
  const update = (state) => {
    const { movie, moviesList, error, loading } = state;
    if (loading) {
      loadingIndicator.root.hidden = false;
      return;
    }
    loadingIndicator.root.hidden = true;

    if (error) {
      return;
    }

    renderMovie(movie);
    moviesListContainer.innerHTML = '';
    renderMoviesList(moviesList);
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

  return { root };
}

export default createMovieView;
