import fetchData from '../lib/fetchData.js';

const fetchMoviesById = async (imdbId) => {
  const movies = await fetchData(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=a09ae8d1`,
    { cache: true }
  );
  return movies;
};

export default fetchMoviesById;
