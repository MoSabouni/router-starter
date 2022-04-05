import createMovieView from '../views/movieView.js';
import fetchMovies from '../fetchers/fetchMovies.js';
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
  };
  const movieView = createMovieView(props);

  const getData = async (searchValue) => {
    router.updateState({ loading: true, error: null, movies: null });
    let movies;
    try {
      movies = await fetchMovies(searchValue);
      router.updateState({ movies, loading: false });
    } catch (error) {
      console.log(error);
      router.updateState({ loading: false, error });
    }
  };

  return movieView;
}

export default createMoviePage;
