// main_page.js
import React from 'react';

function MainPage() {
  const[movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/movies")
      .then((r) => r.json())
      .then(setMovies);
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} title={movie.name} image={movie.img_link} rating = {movie.rating} reviews={movie.reviews}/>
      ))}
    </div>
  );
};

export default MainPage;



// handle click 