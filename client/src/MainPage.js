import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Search from './Search';
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  
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
    .then(() => navigate('/login'));
  }

  const moviesToDisplay = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <nav className="navbar">
        <h1>Main Page</h1>
        <div className="navbar-buttons">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate('/user')}>Profile</button>
        </div>
      </nav>
      <div className="movie-card-container">
        <Search search={search} setSearch={setSearch} />
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
    </div>
  );
}

export default MainPage;

