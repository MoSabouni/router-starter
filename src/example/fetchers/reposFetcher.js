import { GITHUB_API_BASE_URL } from '../../constants.js';
import fetchData from '../../lib/fetchData.js';

async function fetchRepos() {
  const url = `${GITHUB_API_BASE_URL}/orgs/HackYourFuture/repos?per_page=100`;
  const repos = await fetchData(url);
  repos.sort((a, b) => a.name.localeCompare(b.name));
  return repos;
}

export default fetchRepos;
