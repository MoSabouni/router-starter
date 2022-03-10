import { GITHUB_API_BASE_URL } from '../constants.js';
import { fetchCachedData } from '../lib/fetch-data.js';

const fetchRepos = async () => {
  const url = `${GITHUB_API_BASE_URL}/orgs/HackYourFuture/repos?per_page=100`;
  const repos = await fetchCachedData(url);
  repos.sort((a, b) => a.name.localeCompare(b.name));
  return repos;
};

export default fetchRepos;
