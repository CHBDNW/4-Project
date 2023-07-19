import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const MovieCard = ({ id, name, img_link, rating, year, reviews }) => {
  return (
    <div className="movie-card">
      <Link to={`/movies/${id}`}>
        <img src={img_link} alt={name} />
      </Link>
      <div className="movie-details">
        <h2>{name}</h2>
        <p>{year}</p>
        <p>User Rating: {rating}</p>
        <div>
          <h3>User Reviews:</h3>
          {reviews.map((review) => (
            <div key={review.id}>
              {/* <p>User: {review.user.username}</p> */}
              <p>Review: {review.user_review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
