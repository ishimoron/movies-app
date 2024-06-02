export interface MovieI {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MoviesI {
	page: number;
	results: MovieI[];
	globalMoviesSearch?: MovieI[];
	totalPages: number;
}

export interface MoviesDefaultState {
	page: number;
	results: MovieI[];
	globalMoviesSearch?: MovieI[];
	filteredGenre?: number;
}

export interface MovieApiResponseI {
	page: number;
	results: MovieI[];
	total_pages: number;
}
