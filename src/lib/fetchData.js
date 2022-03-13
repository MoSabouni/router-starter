//@ts-check
/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */
const cache = new Map();

/**
 * Fetch data using an HTTP GET request.
 * @param {string} url The url to fetch from.
 */
export const fetchData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}  ${res.statusText}`);
  }
  return res.json();
};

/**
 * Fetch data using an HTTP GET request and cache the response.
 * @param {string} url The url to fetch from.
 */
export const fetchCachedData = async (url) => {
  let data = cache.get(url);
  if (data) {
    console.log(`cache hit: ${url}`);
    return data;
  }

  console.warn(`cache miss: ${url}`);

  data = await fetchData(url);
  cache.set(url, data);
  return data;
};
