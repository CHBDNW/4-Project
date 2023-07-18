import React from 'react';


const MovieCard = ({ id, name, img_link, rating, reviews }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Rating: {rating}</p>
      <p>Reviews: {reviews}</p>
      <img src={img_link} alt={name} />
    </div>
  );
};

export default MovieCard;