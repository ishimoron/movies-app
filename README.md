### DEMO - https://movies-app-mpxh.vercel.app/

## ✌️ Greetings, thank you for your time. For your comfort, I've uploaded a demo.

# Running Application

1.  **Clone the Repository**
    
    First, clone the repository to your local machine. Open a terminal and run the following command:
    
    `git clone https://github.com/ishimoron/movies-app.git` 
  

2.  **Navigate to the Application Directory**
    
    Change directory to the application root:
    
    `cd movies-app` 
    
    (Optional) Replace `movies-app` with the path where you cloned the repository.


3.  **Install Dependencies**

    Run the following command in your terminal:

    `npm install`

    This command uses npm, a build automation tool, to download all the libraries specified in the project's package.json file and install them in the local repository.


4.  **Run Application**

    Run the following command in your terminal:

    `npm run dev`

    This command executes running app locally.

 5.  **Change auth credentials in .env (optional)**

   In root directory you can replace my `TMDB` auth credentials with your

  open .env in root diretory
  change 
  `VITE_AUTHORIZATION_TOKEN=your TMDB auth token`
  `VITE_API_KEY=your TMDB API key`
    
#

# Application Features

- **Checking for Company Image Links**: The application checks for the presence of a link to the company image. If the link is not available, text is displayed instead.

- **Genre Filtering**: Users can activate genre filters. When navigating to the next page, the list of movies will be filtered based on the selected genres. If a movie matches the selected genres, it will be added to the list.

- **No Results Message**: When selecting a genre with no matching movies, a message indicating empty results is displayed.

- **Resetting Filters**: Applying a filter and navigating between pages will continuously add filtered movies to the list. However, clicking the "Reset Filters" button displays movies from the current page without applying filters.

- **Page Navigation**: When moving between pages, the application automatically scrolls to the top. If filtering is enabled, elements are added to the end of the list without scrolling.

- **Returning from Movie Description**: If the movie list is filtered by genre, and a user navigates to the description of any movie and returns, the list with the same filter is displayed.

# API Features

## Overview

The Movies API provides endpoints to fetch information about movies, including details, trailers, and genres.

## Base URL

`https://api.themoviedb.org/3`

## Authentication

The API requires an authorization token in the headers.

### Headers

```json
{
  "Authorization": "YourAuthorizationTokenHere"
}
```

## Endpoints

### getMovies

Fetches a list of top-rated movies.

- Method: `GET`
- Path: `/movie/top_rated`
- Parameters:
  - `pageId`: Page number (integer)
- Response:
  - `MoviesI`

### getMovie

Fetches details of a specific movie.

- Method: `GET`
- Path: `/movie/:movieId`
- Parameters:
  - `movieId`: ID of the movie (integer)
- Response:
  - `MovieDetailsI`

### getMovieTrailer

Fetches trailers of a specific movie.

- Method: `GET`
- Path: `/movie/:movieId/videos`
- Parameters:
  - `movieId`: ID of the movie (integer)
- Response:
  - `MovieTrailerResponseI`

### getGenres

Fetches a list of movie genres.

- Method: `GET`
- Path: `/genre/movie/list`
- Response:
  - `GenresResponseI`

### Usage

```javascript
import { useGetMoviesQuery, useGetMovieQuery, useGetMovieTrailerQuery, useGetGenresQuery } from './moviesApi';

const { data: moviesData, error: moviesError, isLoading: moviesIsLoading } = useGetMoviesQuery(1);
const { data: movieData, error: movieError, isLoading: movieIsLoading } = useGetMovieQuery(movieId);
const { data: trailerData, error: trailerError, isLoading: trailerIsLoading } = useGetMovieTrailerQuery(movieId);
const { data: genresData, error: genresError, isLoading: genresIsLoading } = useGetGenresQuery();

```
