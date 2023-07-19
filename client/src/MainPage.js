// main_page.js
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Search from './Search';

function MainPage({navigate}) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('')
  useEffect(() => {
    fetch('http://localhost:5555/movies') 
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.log(error));
  }, []);

  function handleLogout() {
    fetch('logout', {
      method: 'DELETE'
    })
    .then(r => {
      if(r.ok) {
        return r
      }})
    .then(r => navigate('/login'))
  }
  const moviesToDisplay = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1>Main Page</h1>
      <Search search={search} setSearch={setSearch} />
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {moviesToDisplay.length > 0 ? (
        moviesToDisplay.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            name={movie.name}
            year={movie.year}
            rating={movie.rating}
            img_link={movie.img_link}
            reviews = {movie.reviews}
          />
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default MainPage;

