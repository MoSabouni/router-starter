import fetchData from '../lib/fetchData.js';

const fetchMovies = async (searchValue) => {
  const movies = await fetchData(
    `http://www.omdbapi.com/?s=${searchValue}&apikey=a09ae8d1`,
    { cache: true }
  );
  return movies;
};

export default fetchMovies;
