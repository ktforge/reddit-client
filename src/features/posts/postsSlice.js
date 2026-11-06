import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../api/lemmy.js';

const CACHE_MS = 5 * 60 * 1000; // reuse a feed for 5 minutes before asking the api again
const EMPTY = []; // one shared empty array so selectors don't cause extra renders

// cache key for a community, home has no community name
const keyFor = (community) => community ?? 'home';

// loads a feed, skipped when a fresh copy is cached unless force is true
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ community }) => getPosts(community),
  {
    condition: ({ community, force }, { getState }) => {
      const { posts } = getState();
      const key = keyFor(community);
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
    cache: {}, // { home: { items, fetchedAt }, technology: { ... } }
    status: 'idle', // idle, loading, succeeded, or failed
    error: null,
    requestId: null, // id of the newest request, older ones get ignored
    loadingKey: null, // which feed is loading, so the same one isn't requested twice
  },
  reducers: {
    setCommunity(state, action) {
      state.community = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.requestId = action.meta.requestId;
        state.loadingKey = keyFor(action.meta.arg.community);
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // always save the result, even from an older request
        const key = keyFor(action.meta.arg.community);
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

export const { setCommunity } = postsSlice.actions;
export default postsSlice.reducer;

export const selectCommunity = (state) => state.posts.community;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectCurrentPosts = (state) =>
  state.posts.cache[keyFor(state.posts.community)]?.items ?? EMPTY;
