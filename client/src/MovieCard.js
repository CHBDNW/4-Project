import React from 'react';

const MovieCard = ({ id, name, img_link, rating, reviews }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Rating: {rating}</p>
      <div>
        <h3>Reviews:</h3>
        {reviews.map(review => (
          <div key={review.id}>
            {/* <p>User: {review.user.username}</p> */}
            <p>Review: {review.user_review}</p>
          </div>
        ))}
      </div>
      <img src={img_link} alt={name} />
    </div>
  );
};

export default MovieCard;
