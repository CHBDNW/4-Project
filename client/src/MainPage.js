import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';

function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="movie-card-container">
      <h1>Main Page</h1>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <MovieCard
              id={movie.id}
              name={movie.name}
              year={movie.year}
              rating={movie.rating}
              img_link={movie.img_link}
              reviews={movie.reviews}
            />
          </Link>
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}
export default MainPage;
