import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice.js';
import detailReducer from '../features/detail/detailSlice.js';

// a function so tests can make a fresh store, preloadedState lets them start with data
export const makeStore = (preloadedState) =>
  configureStore({
    reducer: {
      posts: postsReducer,
      detail: detailReducer,
    },
    preloadedState,
  });

export const store = makeStore();
