import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, searchPosts } from '../../api/lemmy.js';

const CACHE_MS = 5 * 60 * 1000; // reuse a feed for 5 minutes before asking the api again
const EMPTY = []; // one shared empty array so selectors don't cause extra renders

// cache key for a feed or a search, home has no community name
const keyFor = (community, term) =>
  term ? `search:${community ?? 'all'}:${term.toLowerCase()}` : community ?? 'home';

// loads a feed or search results, skipped when a fresh copy is cached unless force is true
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ community, term }) => (term ? searchPosts(term, community) : getPosts(community)),
  {
    condition: ({ community, term, force }, { getState }) => {
      const { posts } = getState();
      const key = keyFor(community, term);
      if (posts.status === 'loading' && posts.loadingKey === key) return false; // already on its way
      if (force) return true;
      const cached = posts.cache[key];
      return !cached || Date.now() - cached.fetchedAt > CACHE_MS;
    },
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    community: null, // null means home
    searchTerm: '', // empty means no search
    cache: {}, // { home: { items, fetchedAt }, technology: { ... } }
    status: 'idle', // idle, loading, succeeded, or failed
    error: null,
    requestId: null, // id of the newest request, older ones get ignored
    loadingKey: null, // which feed is loading, so the same one isn't requested twice
  },
  reducers: {
    // picking a community also clears the search
    setCommunity(state, action) {
      state.community = action.payload;
      state.searchTerm = '';
      state.error = null;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.trim();
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.requestId = action.meta.requestId;
        state.loadingKey = keyFor(action.meta.arg.community, action.meta.arg.term);
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // always save the result, even from an older request
        const key = keyFor(action.meta.arg.community, action.meta.arg.term);
        state.cache[key] = { items: action.payload, fetchedAt: Date.now() };
        if (action.meta.requestId === state.requestId) state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        if (action.meta.requestId !== state.requestId) return; // a newer request took over
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCommunity, setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;

export const selectCommunity = (state) => state.posts.community;
export const selectSearchTerm = (state) => state.posts.searchTerm;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectCurrentPosts = (state) =>
  state.posts.cache[keyFor(state.posts.community, state.posts.searchTerm)]?.items ?? EMPTY;
