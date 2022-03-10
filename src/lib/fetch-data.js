const cache = new Map();

export const fetchData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }
  return res.json();
};

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
