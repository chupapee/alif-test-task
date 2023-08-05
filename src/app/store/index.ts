import { cartSlice } from '@pages/cart';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@shared/api/baseApi';

const rootReducer = {
	[baseApi.reducerPath]: baseApi.reducer,
	[cartSlice.name]: cartSlice.reducer,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
