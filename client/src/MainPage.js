// main_page.js
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/movies') 
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            name={movie.name}
            year={movie.year}
            rating={movie.rating}
            img_link={movie.img_link}
          />
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default MainPage;

// handle click 