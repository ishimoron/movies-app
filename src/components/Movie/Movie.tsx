import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { MovieImgE } from '../../enums/movies/movie-e';
import { TrailerVideoE } from '../../enums/movies/movie-trailer-e';
import {
	MovieDetailsI,
	ProductionCountry,
} from '../../interfaces/movies/movie-details-i';
import { MovieTrailerI } from '../../interfaces/movies/movie-trailer-i';
import { useGetMovieQuery, useGetMovieTrailerQuery } from '../../store/api/moviesApi';
import Loading from '../Loading/Loading';
import styles from './style.module.scss';

const Movie: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const movieId = Number(id);
	const { data, isLoading } = useGetMovieQuery(movieId);
	const { data: trailer } = useGetMovieTrailerQuery(movieId);
	const [trailerVideo, setTrailerVideo] = useState<MovieTrailerI>();
	const movie = data as MovieDetailsI;
	console.log(movie, 'movie');

	useEffect(() => {
		const getTrailerVideo = () => {
			if (trailer) {
				const trailerVideoData = trailer.results.filter(
					video => video.type === 'Trailer' && video.site === 'YouTube',
				);
				// set first founded trailer to trailerVideo, important video site equal 'YouTube'
				setTrailerVideo(trailerVideoData[0]);
			}
		};
		getTrailerVideo();
	}, [trailer]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className={styles.container}>
			<div
				className={styles.background}
				style={{
					backgroundImage: `url(${MovieImgE.IMG_URL}/${movie.backdrop_path})`,
				}}
			/>
			<div className={styles.movieContent}>
				<div className={styles.content}>
					<div className={styles.header}>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt='Poster'
							className={styles.poster}
						/>
						<div>
							<div>
								<h1 className={styles.title}>{movie.title}</h1>
								{movie.adult && (
									<div className={styles.adult}>{movie.adult && '18+'}</div>
								)}
							</div>

							<div className={styles.info}>
								<p className={styles.movieRating}>
									<FaStar /> {movie.vote_average.toFixed(1)}
								</p>
								<p className={styles.genreText}>
									Genre:{' '}
									{movie.genres.map((genre, index) => (
										<span
											className={styles.genre}
											key={genre.id}
										>
											{genre.name}
											{/* add , for not last element */}
											{index !== movie.genres.length - 1 && ','}
										</span>
									))}
								</p>
								<p className={styles.runningText}>Running time: {movie.runtime} min</p>
								<p className={styles.budget}>
									Budget: {movie.budget > 0 ? movie.budget : 'N/A'} <FaDollarSign />
								</p>
								<p className={styles.countryText}>
									Country:{' '}
									{movie.production_countries.map((country: ProductionCountry, index) => (
										<span
											className={styles.country}
											key={country.name}
										>
											{country.name}
											{index !== movie.production_countries.length - 1 && ','}
										</span>
									))}
								</p>
								<p className={styles.releaseDate}>Release date: {movie.release_date}</p>

								{movie.homepage && (
									<div>
										Home page:
										<Link to={movie.homepage}>
											<span className={styles.learnMore}>Learn more</span>
										</Link>
									</div>
								)}

								<div className={styles.companyList}>
									{movie.production_companies.map(company => (
										<div
											className={styles.company}
											key={company.id}
										>
											{company.logo_path ? (
												<img src={`${MovieImgE.IMG_URL}${company.logo_path}`} />
											) : (
												<p>{company.name}</p>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<p className={styles.overview}>{movie.overview}</p>
					{movie.tagline && <p className={styles.tagline}>Tagline: {movie.tagline}</p>}
					{trailerVideo && trailerVideo.key && (
						<ReactPlayer
							url={`${TrailerVideoE.VIDEO_URL}${trailerVideo.key}`}
							controls={true}
							width='100%'
							style={{ marginTop: 10 }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Movie;
