import {configureStore} from '@reduxjs/toolkit';
import cartTotalItemSlice from './features/cartTotalItemSlice';
import { baseApi } from './api/baseApi';
import searchSlice from './features/searchSlice';

export const store = configureStore({
  reducer: {
    searchReducer:searchSlice,
    cartItemReducer: cartTotalItemSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cartItemReducer.products));
});
 
 // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


