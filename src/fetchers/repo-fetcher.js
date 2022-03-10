import { GITHUB_API_BASE_URL } from '../constants.js';
import { fetchCachedData } from '../lib/fetch-data.js';

const fetchRepo = async (owner, repoName) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}`;
  return fetchCachedData(url);
};

export default fetchRepo;
