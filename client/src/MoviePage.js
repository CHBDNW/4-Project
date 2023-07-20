import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    fetch(`http://localhost:5555/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setReviews(data.reviews); 
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    fetch('http://localhost:5555/getUserId') 
      .then((response) => response.json())
      .then((data) => setUserId(data.userId))
      .catch((error) => console.log(error));
  }, []);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const handleAddReview = () => {
    fetch('http://localhost:5555/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_review: reviewText,
        movies_id: id,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setReviewText(''); 
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="movie-page">
      <h1>{movie.name}</h1>
      <img src={movie.img_link} alt={movie.name} />
      <p>{movie.year}</p>
      <p>User Rating: {movie.rating}</p>
      <div>
        <h3>User Reviews:</h3>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Review: {review.user_review}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default MoviePage;
