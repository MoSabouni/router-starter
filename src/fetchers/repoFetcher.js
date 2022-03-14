import { GITHUB_API_BASE_URL } from '../constants.js';
import { fetchCachedData } from '../lib/fetchData.js';

async function fetchRepo(owner, repoName) {
  const repo = await fetchCachedData(
    `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}`
  );
  const contributors = await fetchCachedData(
    `${repo.contributors_url}?per_page=100`
  );
  return { repo, contributors };
}

export default fetchRepo;
