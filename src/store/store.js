import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../components/posts/postsSlice';
import usersReducer from '../components/users/usersSlice';
import notificationsReducer from '../components/notifications/notificationsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer
  }
});