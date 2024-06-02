import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from './api/moviesApi'
import moviesReducer from './reducers/moviesReducer'

export const store = configureStore({
	reducer: {
		[moviesApi.reducerPath]: moviesApi.reducer,
		movies: moviesReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(moviesApi.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
