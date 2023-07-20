import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Search from './Search';
import { useNavigate } from "react-router-dom"

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('')
  let navigate = useNavigate()
  useEffect(() => {
    fetch('http://localhost:5555/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  function handleLogout() {
    fetch('logout', {
      method: 'DELETE'
    })
    .then(r => r)
    .then(r => navigate('/login'))
  }
  const moviesToDisplay = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="movie-card-container">
      <h1>Main Page</h1>
      <Search search={search} setSearch={setSearch} />
      <button onClick={handleLogout}>Logout</button>
      {moviesToDisplay.length > 0 ? (
        moviesToDisplay.map((movie) => (
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
