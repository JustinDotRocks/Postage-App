import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../components/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer
  }
});