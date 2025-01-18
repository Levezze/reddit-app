import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../../features/auth/authSlice';
import subredditsReducer from '../../features/subreddits/subredditSlice';
import { subredditsApi } from '../../services/subredditsAPI';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subreddits: subredditsReducer,
    [subredditsApi.reducerPath]: subredditsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subredditsApi.middleware),
})

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

