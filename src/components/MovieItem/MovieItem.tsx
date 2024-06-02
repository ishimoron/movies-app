import { FaStar } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MovieImgE } from '../../enums/movies/movie-e';
import { MovieI } from '../../interfaces/movies/movies-i';
import styles from './style.module.scss';

interface MovieItemProps {
	movie: MovieI;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
	return (
		<div
			key={movie.id}
			className={styles.movieCard}
		>
			<Link to={`/movie/${movie.id}`}>
				<div className={styles.moviePoster}>
					<img
						src={`${MovieImgE.IMG_URL}/${movie.poster_path}`}
						alt={`${movie.title}`}
					/>
					<span className={styles.itemPlay}>
						<FaRegCirclePlay />
					</span>
				</div>
			</Link>
			<div className={styles.movieDetails}>
				<div>
					<Link to={`/movie/${movie.id}`}>
						<h1 className={styles.movieTitle}>{movie.title}</h1>
					</Link>
					{movie.adult && <div className={styles.adult}>{movie.adult && '18+'}</div>}
				</div>

				<p className={styles.movieOverview}>{movie.overview}</p>
				<div className={styles.movieInfo}>
					<span className={styles.movieRating}>
						<FaStar /> {movie.vote_average.toFixed(1)}
					</span>
					<span className={styles.dateRelease}>{movie.release_date}</span>
				</div>
			</div>
		</div>
	);
};

export default MovieItem;
