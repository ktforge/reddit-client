import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeStore } from '../../app/store.js';
import { fetchPosts, setCommunity, setSearchTerm, selectCurrentPosts } from './postsSlice.js';
import { getPosts, searchPosts } from '../../api/lemmy.js';
import { mockPosts } from '../../data/mockPosts.js';

// swaps the real api for fake functions, so tests never hit the network
vi.mock('../../api/lemmy.js', () => ({
  getPosts: vi.fn(),
  searchPosts: vi.fn(),
}));

describe('postsSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clears the search when a community is picked', () => {
    const store = makeStore();
    store.dispatch(setSearchTerm('  keyboard  '));
    expect(store.getState().posts.searchTerm).toBe('keyboard'); // trimmed

    store.dispatch(setCommunity('technology'));
    expect(store.getState().posts.community).toBe('technology');
    expect(store.getState().posts.searchTerm).toBe('');
  });

  it('saves fetched posts and reads them back', async () => {
    getPosts.mockResolvedValue(mockPosts);
    const store = makeStore();

    await store.dispatch(fetchPosts({ community: null }));

    expect(store.getState().posts.status).toBe('succeeded');
    expect(selectCurrentPosts(store.getState())).toHaveLength(mockPosts.length);
  });

  it('uses the cache instead of asking the api twice', async () => {
    getPosts.mockResolvedValue(mockPosts);
    const store = makeStore();

    await store.dispatch(fetchPosts({ community: null }));
    await store.dispatch(fetchPosts({ community: null }));

    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  it('asks again when forced, like the retry button', async () => {
    getPosts.mockResolvedValue(mockPosts);
    const store = makeStore();

    await store.dispatch(fetchPosts({ community: null }));
    await store.dispatch(fetchPosts({ community: null, force: true }));

    expect(getPosts).toHaveBeenCalledTimes(2);
  });

  it('uses search instead of the feed when there is a term', async () => {
    searchPosts.mockResolvedValue([mockPosts[1]]);
    const store = makeStore();

    await store.dispatch(fetchPosts({ community: 'technology', term: 'keyboard' }));

    expect(searchPosts).toHaveBeenCalledWith('keyboard', 'technology');
    expect(getPosts).not.toHaveBeenCalled();
  });

  it('stores the error when a request fails', async () => {
    getPosts.mockRejectedValue(new Error('rate_limit'));
    const store = makeStore();

    await store.dispatch(fetchPosts({ community: null }));

    expect(store.getState().posts.status).toBe('failed');
    expect(store.getState().posts.error).toBe('rate_limit');
  });
});
