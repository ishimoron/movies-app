import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { MovieI } from '../../interfaces/movies/movies-i';
import { useGetGenresQuery } from '../../store/api/moviesApi';
import { setGenre } from '../../store/reducers/moviesReducer';
import styles from './style.module.scss';

interface FilterPropsI {
	setFilteredMovies: React.Dispatch<React.SetStateAction<MovieI[]>>;
}

const Filter: React.FC<FilterPropsI> = ({ setFilteredMovies }) => {
	const { data } = useGetGenresQuery();
	const dispatch = useAppDispatch();

	const { filteredGenre } = useAppSelector(state => state.movies);

	const genreHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const genreId = Number(e.target.value);
		dispatch(setGenre(genreId));
	};

	const resetFiltersHandler = () => {
		dispatch(setGenre(0));
		setFilteredMovies([]);
	};

	return (
		<div className={styles.filterWrapper}>
			<select
				onChange={e => genreHandler(e)}
				value={filteredGenre}
				className={styles.genreSelect}
			>
				<option value='0'>Filter by genre</option>
				{data?.genres &&
					data?.genres.length > 0 &&
					data.genres.map(genre => (
						<option
							value={genre.id}
							key={genre.id}
						>
							{genre.name}
						</option>
					))}
			</select>

			<button
				onClick={() => resetFiltersHandler()}
				className={styles.resetFilter}
			>
				reset filters
			</button>
		</div>
	);
};

export default Filter;
