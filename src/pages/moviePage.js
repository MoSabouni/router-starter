import createMovieView from '../views/movieView.js';
import fetchMovie from '../fetchers/fetchMovie.js';
import fetchMoviesById from '../fetchers/fetchMovieById.js';
import fetchMoviesList from '../fetchers/fetchMoviesList.js';
import router from '../lib/router.js';

function createMoviePage() {
  let searchValue;
  const props = {
    title: 'CORNFLIX',
    searchButtonText: 'Search',

    onInput: (event) => {
      searchValue = event.target.value;
    },
    onClick: () => {
      getData(searchValue);
    },
    onMovieClick: async (imdbID) => {
      router.updateState({
        loading: true,
        error: null,
        movies: null,
        moviesList: null,
      });

      let movie;
      let moviesList;
      try {
        movie = await fetchMoviesById(imdbID);
        moviesList = await fetchMoviesList(searchValue);
        router.updateState({ movie, moviesList, loading: false });
      } catch (error) {
        console.log(error);
        router.updateState({ loading: false, error });
      }
    },
  };
  const movieView = createMovieView(props);

  const getData = async (searchValue) => {
    router.updateState({
      loading: true,
      error: null,
      movies: null,
      moviesList: null,
    });

    let movie;
    let moviesList;
    try {
      movie = await fetchMovie(searchValue);
      moviesList = await fetchMoviesList(searchValue);
      router.updateState({ movie, moviesList, loading: false });
    } catch (error) {
      console.log(error);
      router.updateState({ loading: false, error });
    }
  };

  return movieView;
}

export default createMoviePage;
