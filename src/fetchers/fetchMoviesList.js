import fetchData from '../lib/fetchData.js';

const fetchMoviesList = async (searchValue) => {
  const moviesList = await fetchData(
    `https://www.omdbapi.com/?s=${searchValue}&apikey=a09ae8d1`,
    { cache: true }
  );
  return moviesList;
};

export default fetchMoviesList;
