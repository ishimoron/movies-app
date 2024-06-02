import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieDetailsI } from '../../interfaces/movies/movie-details-i'
import { GenresResponseI } from '../../interfaces/movies/movie-genres-i'
import { MovieTrailerResponseI } from '../../interfaces/movies/movie-trailer-i'
import { MovieApiResponseI, MoviesI } from '../../interfaces/movies/movies-i'

export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.themoviedb.org/3',
		headers: {
			Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
		},
	}),
	endpoints: builder => ({
		getMovies: builder.query<MoviesI, number>({
			query: pageId => `/movie/top_rated?language=en-US&page=${pageId}`,
			transformResponse: (response: MovieApiResponseI): MoviesI => {
				return {
					page: response.page,
					totalPages: response.total_pages,
					results: response.results.slice(0, 10),
				};
			},
		}),
		getMovie: builder.query<MovieDetailsI, number>({
			query: movieId => `/movie/${movieId}?language=en-US`,
		}),
		getMovieTrailer: builder.query<MovieTrailerResponseI, number>({
			query: movieId => `/movie/${movieId}/videos?language=en-US`,
		}),
		getGenres: builder.query<GenresResponseI, void>({
			query: () => `/genre/movie/list?language=en`,
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useGetMovieQuery,
	useGetMovieTrailerQuery,
	useGetGenresQuery,
} = moviesApi;
