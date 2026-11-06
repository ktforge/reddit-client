import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice.js';
import detailReducer from '../features/detail/detailSlice.js';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    detail: detailReducer,
  },
});
