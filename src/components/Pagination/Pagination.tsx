import { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { MoviesI } from '../../interfaces/movies/movies-i';
import { setPage } from '../../store/reducers/moviesReducer';
import styles from './style.module.scss';

interface PaginationPropsI {
	movies: MoviesI;
	currentPage: number;
}

const Pagination: React.FC<PaginationPropsI> = ({ movies, currentPage }) => {
	const [totalPages, setTotalPages] = useState<number>(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const totalPages = Math.min(500, movies.totalPages);
		setTotalPages(totalPages);
	}, [movies.totalPages]);

	const handleNextPage = (): void => {
		if (currentPage < totalPages) {
			dispatch(setPage(currentPage + 1));
		} else if (currentPage === totalPages && totalPages < 500) {
			// add new page if the current page is the last one
			setTotalPages(totalPages + 1);
			dispatch(setPage(currentPage + 1));
		}
	};

	const handlePrevPage = (): void => {
		if (currentPage > 1) {
			dispatch(setPage(currentPage - 1));
		}
	};

	const handlePageClick = (page: number): void => {
		dispatch(setPage(page));
	};

	const renderPageNumbers = (): JSX.Element[] => {
		const pageNumbers = [];
		const startPage = Math.max(1, currentPage - 5);
		const endPage = Math.min(totalPages, startPage + 10);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageClick(i)}
					className={`${styles.pageStepper} ${
						i === currentPage ? styles.currentPage : ''
					}`}
				>
					{i}
				</button>,
			);
		}

		return pageNumbers;
	};

	return (
		<div className={styles.paginationWrapper}>
			<button
				onClick={() => handlePageClick(1)}
				disabled={currentPage === 1}
				className={styles.prevStartBtn}
			>
				<MdSkipPrevious />
			</button>
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className={styles.prevBtn}
			>
				<GrPrevious />
			</button>
			{renderPageNumbers()}
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={styles.nextBtn}
			>
				<GrNext />
			</button>
			<button
				onClick={() => handlePageClick(totalPages)}
				disabled={currentPage === totalPages}
				className={styles.nextSkipBtn}
			>
				<MdSkipNext />
			</button>
		</div>
	);
};

export default Pagination;
