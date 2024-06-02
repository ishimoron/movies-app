import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Movie from './components/Movie/Movie';
import MoviesList from './components/MoviesList/MoviesList';

const Router: React.FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<MoviesList />}
			/>
			<Route
				path='/movie/:id'
				element={<Movie />}
			/>
		</Routes>
	);
};

export default Router;
