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

// one post by id, used when the detail page is opened straight from a link
export async function getPost(id) {
  const data = await request('/post', { id });
  return data.post_view;
}

// up to 50 comments for a post, sorted hot, replies included
export async function getComments(postId) {
  const params = { post_id: postId, sort: 'Hot', limit: 50, type_: 'All' };
  const data = await request('/comment/list', params);
  return data.comments;
}

// posts matching a search term, inside one community when a name is passed
export async function searchPosts(term, community) {
  const params = { q: term, type_: 'Posts', sort: 'TopAll', limit: 20 };
  if (community) params.community_name = community;
  const data = await request('/search', params);
  return data.posts;
}
