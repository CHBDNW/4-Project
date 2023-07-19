import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="movie-page">
      <h1>{movie.name}</h1>
      <img src={movie.img_link} alt={movie.name} />
      <p>{movie.year}</p>
      <p>User Rating: {movie.rating}</p>
      <div>
        <h3>User Reviews:</h3>
        {movie.reviews.map((review) => (
          <div key={review.id}>
            {/* <p>User: {review.user.username}</p> */}
            <p>Review: {review.user_review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
