import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getComments, getPost } from '../../api/lemmy.js';

// skips the request if this post's data is loading or already saved, unless forced
const shouldFetch = (entry, force) => {
  if (entry?.status === 'loading') return false;
  if (force) return true;
  return !entry || entry.status === 'failed';
};

// loads a post that isn't in any saved feed, for direct links and page refreshes
export const fetchPost = createAsyncThunk(
  'detail/fetchPost',
  async ({ postId }) => getPost(postId),
  {
    condition: ({ postId, force }, { getState }) =>
      shouldFetch(getState().detail.posts[postId], force),
  },
);

// loads one post's comments, saved so reopening the post costs no request
export const fetchComments = createAsyncThunk(
  'detail/fetchComments',
  async ({ postId }) => getComments(postId),
  {
    condition: ({ postId, force }, { getState }) =>
      shouldFetch(getState().detail.comments[postId], force),
  },
);

// pending, fulfilled, and rejected look the same for posts and comments,
// so this builds the three handlers for whichever group is passed in
const addEntryCases = (builder, thunk, group) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      const id = action.meta.arg.postId;
      state[group][id] = { ...state[group][id], status: 'loading', error: null };
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const id = action.meta.arg.postId;
      state[group][id] = { item: action.payload, status: 'succeeded', error: null };
    })
    .addCase(thunk.rejected, (state, action) => {
      const id = action.meta.arg.postId;
      state[group][id] = { ...state[group][id], status: 'failed', error: action.error.message };
    });
};

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    posts: {}, // { 123: { item, status, error } }
    comments: {}, // { 123: { item: [comments], status, error } }
  },
  reducers: {},
  extraReducers: (builder) => {
    addEntryCases(builder, fetchPost, 'posts');
    addEntryCases(builder, fetchComments, 'comments');
  },
});

export default detailSlice.reducer;

// looks through every saved feed first, then the posts loaded one at a time
export const selectPostById = (state, id) => {
  for (const feed of Object.values(state.posts.cache)) {
    const found = feed.items.find((p) => p.post.id === id);
    if (found) return found;
  }
  return state.detail.posts[id]?.item ?? null;
};

export const selectPostEntry = (state, id) => state.detail.posts[id];
export const selectCommentsEntry = (state, id) => state.detail.comments[id];
