import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MoviesDefaultState, MoviesI } from '../../interfaces/movies/movies-i'

const initialState: MoviesDefaultState = {
	page: 1,
	globalMoviesSearch: [],
	results: [],
	filteredGenre: 1,
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addMovies: (state, action: PayloadAction<MoviesI>) => {
			if (state.globalMoviesSearch) {
				action.payload.results.forEach(movie => {
					if (
						!state.globalMoviesSearch?.find(
							existingMovie => existingMovie.id === movie.id,
						)
					) {
						state.globalMoviesSearch?.push(movie);
					}
				});
			}
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setGenre: (state, action) => {
			state.filteredGenre = action.payload;
		}
	},
});

export const { addMovies, setPage, setGenre } = moviesSlice.actions;

export default moviesSlice.reducer;
