import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { title, year, image, rating, reviews } = movie;
  
  return (
    <div>
      <h2>{title}</h2>
      <p>Year: {year}</p>
      <p>User Rating: {rating}</p>
      <Link to={`/movies/${title}`}>
        <img src={image} alt={title} />
      </Link>
      <p>User Reviews: {reviews}</p>
    </div>
  );
};

export default MovieCard;