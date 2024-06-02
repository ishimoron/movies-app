import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { MovieI } from '../../interfaces/movies/movies-i';
import { useGetMoviesQuery } from '../../store/api/moviesApi';
import { addMovies } from '../../store/reducers/moviesReducer';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading';
import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import styles from './style.module.scss';

const MoviesList: React.FC = () => {
	const dispatch = useAppDispatch();
	const [visitedPage, setVisitedPage] = useState<number[]>([]);
	const [filteredMovies, setFilteredMovies] = useState<MovieI[]>([]);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [isFiltering, setIsFiltering] = useState<boolean>(false);
	const [userStartedSearching, setUserStartedSearching] = useState<boolean>(false);
	const {
		globalMoviesSearch,
		filteredGenre,
		page: currentPage,
	} = useAppSelector(state => state.movies);
	const { data: movies, isLoading, error } = useGetMoviesQuery(currentPage);

	useEffect(() => {
		if (!filteredGenre) {
			setFilteredMovies([]);
		}
	}, [currentPage, filteredGenre, movies]);

	const applyFilters = () => {
		let filtered = globalMoviesSearch;
		setIsSearching(true);
		if (filteredGenre !== undefined && filteredGenre > 1) {
			filtered = filtered?.filter((movie: MovieI) =>
				movie.genre_ids.includes(filteredGenre),
			);
		}

		if (filtered !== undefined && filteredGenre !== 0) {
			setFilteredMovies(filtered);
		}
	};

	useEffect(() => {
		if (filteredMovies.length === 0 && filteredGenre !== undefined && filteredGenre > 1) {
			setIsFiltering(true);
		} else {
			setIsFiltering(false);
		}
	}, [filteredGenre, filteredMovies]);

	useEffect(() => {
		if (filteredGenre !== undefined && filteredGenre > 1) {
			applyFilters();
		}
	}, [filteredGenre, globalMoviesSearch]);

	useEffect(() => {
		if (filteredMovies.length === 0) {
			// scroll to top when switch page to see films from beginning
			window.scrollTo(0, 0);
			setIsSearching(false);
		} else {
			setIsSearching(true);
		}
	}, [currentPage, filteredMovies]);

	useEffect(() => {
		if (filteredMovies.length === 0) {
			setIsSearching(false);
		}
	}, [filteredMovies, isSearching]);

	useEffect(() => {
		if (!visitedPage.includes(currentPage) && movies) {
			setVisitedPage(prev => [...prev, currentPage]);
			dispatch(addMovies(movies));
		}
	}, [movies]);

	if (error) {
		console.error(error);
	}

	if (isLoading) {
		return <Loading />;
	}

	const filterMovies = (text: string): void => {
		if (text.trim() !== '') {
			setIsSearching(true);

			const filteredMovies = globalMoviesSearch?.filter((movie: MovieI) =>
				movie.title.toLowerCase().includes(text.toLowerCase()),
			);

			if (filteredMovies) {
				setFilteredMovies(filteredMovies);
				setUserStartedSearching(true);
			}
		} else {
			setIsSearching(false);
			setUserStartedSearching(false);
			setFilteredMovies([]);
		}
	};

	const moviesCondition =
		filteredMovies.length > 0 && isSearching ? filteredMovies : movies?.results;

	return (
		<div className={styles.moviesContainer}>
			<div className={styles.filterAndSearching}>
				<Search
					filterMovies={filterMovies}
					setIsSearching={setIsSearching}
				/>
				<Filter setFilteredMovies={setFilteredMovies} />
			</div>
			{/* if no search results */}
			{!isSearching && userStartedSearching && filteredMovies.length === 0 && (
				<div className={styles.nothingFound}>Nothing found</div>
			)}
			{/* if no filters(genres) results */}
			{isFiltering && filteredMovies.length === 0 && (
				<div className={styles.nothingFound}>Nothing filtered</div>
			)}

			<div className={styles.moviesWrapper}>
				{moviesCondition &&
					moviesCondition.map((movie: MovieI) => (
						<MovieItem
							movie={movie}
							key={movie.id}
						/>
					))}
			</div>
			<div className={styles.pagination}>
				{movies && (
					<Pagination
						movies={movies}
						currentPage={currentPage}
					/>
				)}
			</div>
		</div>
	);
};

export default MoviesList;
