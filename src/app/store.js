import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice.js';

// comments get their own slice in the next step
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
