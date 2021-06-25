import { createSlice, /*nanoid,*/ createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../api/client';
//import { sub } from 'date-fns';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState ({
  status: 'idle',
  error: null
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete post object, including unique ID
    return response.post
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      reactionAdded(state, action) {
          const { postId, reaction } = action.payload
          const existingPost = state.entities[postId]
          if (existingPost) {
            existingPost.reactions[reaction]++
          }
        },
        postUpdated(state, action) {
          const { id, title, content } = action.payload
          const existingPost = state.entities[id]
          if (existingPost) {
              existingPost.title = title
              existingPost.content = content
          }
        }
        // postAdded: {
        //     reducer(state, action) {
        //       state.posts.push(action.payload)
        //     },
        //     prepare(title, content, userId) {
        //       return {
        //         payload: {
        //           id: nanoid(),
        //           date: new Date().toISOString(),
        //           title,
        //           content,
        //           user: userId,
        //           reactions: {
        //             thumbsUp: 0,
        //             hooray: 0,
        //             heart: 0,
        //             rocket: 0,
        //             eyes: 0,
        //           },
        //         }
        //       }
        //     }
        //   },
    },
    extraReducers: {
      [fetchPosts.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPosts.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // add any fetched posts to the array 
        // Use the `upsertMany` reducer as a mutating  update utility.
        postsAdapter.upsertMany(state, action.payload)
      },
      [fetchPosts.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      },
      [addNewPost.fulfilled]: postsAdapter.addOne
      // Use the `addOne` reducer for the fulfilled case.
    }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`.
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);