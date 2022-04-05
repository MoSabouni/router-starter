import fetchData from '../lib/fetchData.js';

const fetchMovie = async (searchValue) => {
  const movies = await fetchData(
    `http://www.omdbapi.com/?t=${searchValue}&apikey=a09ae8d1`,
    { cache: true }
  );
  return movies;
};

export default fetchMovie;
