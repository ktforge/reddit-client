const BASE = 'https://lemmy.world/api/v3';

// shared fetch helper: turns bad responses and rate limits into readable errors
async function request(path, params) {
  const url = `${BASE}${path}?${new URLSearchParams(params)}`;
  const response = await fetch(url);
  const data = await response.json().catch(() => ({})); // some errors aren't json

  if (response.status === 429 || data.error === 'rate_limit_error') {
    throw new Error('rate_limit');
  }
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

// hot posts for the home feed, or for one community when a name is passed
export async function getPosts(community) {
  const params = { sort: 'Hot', limit: 20, type_: 'All' };
  if (community) params.community_name = community;
  const data = await request('/post/list', params);
  return data.posts;
}
