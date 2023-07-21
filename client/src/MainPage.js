import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

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
      method: 'DELETE',
    }).then(() => navigate('/login'));
  }

  const moviesToDisplay = movies.filter((movie) => movie.name.toLowerCase().includes(search.toLowerCase()));

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
  };

  const searchBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    width: '15%', // 15% of the page width
    margin: '0 auto', // Center horizontally
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <h1>Movie website</h1>
        <div className="navbar-buttons">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate('/user')}>Profile</button>
        </div>
      </nav>
      <div style={searchBarStyle}>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="movie-card-container">
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
