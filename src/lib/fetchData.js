//@ts-check
import { DEBUG } from '../constants.js';

/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */
const cache = new Map();

/**
 * Fetch data using an HTTP GET request.
 * @param {string} url The url to fetch from.
 */
export async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}  ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch data using an HTTP GET request and cache the response.
 * @param {string} url The url to fetch from.
 */
export async function fetchCachedData(url) {
  let data = cache.get(url);
  if (data) {
    if (DEBUG) {
      console.log(`cache hit: ${url}`);
    }
    return data;
  }

  if (DEBUG) {
    console.warn(`cache miss: ${url}`);
  }

  data = await fetchData(url);
  cache.set(url, data);
  return data;
}
