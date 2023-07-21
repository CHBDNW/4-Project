import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserContent({ setUser, user }) {
  const [review, setReview] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user/${user.id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((r) => {
        setUser(r);
      });
  }, [setUser]);

  const handleDeleteReview = (reviewId) => {
    fetch(`/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          const updatedReviews = user.reviews.filter((review) => review.id !== reviewId);
          setUser({ ...user, reviews: updatedReviews });
        } else {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  function handleReviewChange(e) {
    setReview(e.target.value);
  }

  function handleUpdateReview(id) {
    // Assuming you have the data to update in a variable called 'data'
    const data = {
      user_review: review,
    };

    fetch(`/review/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        user.reviews.map((r) => {
          if (r.id === id) {
            return (r.user_review = review);
          }
          return r;
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>
          Movies
        </Link>
      </nav>
      <h2 style={styles.username}>Welcome: {user.username}</h2>
      <img src={user.img_url} alt="user" style={styles.userImage} />
      <div style={styles.reviewsList}>
        <h3>Your reviews:</h3>
        {user.reviews.map((review) => {
          return (
            <div key={review.id} style={styles.reviewItem}>
              {/* Add a parent container for textarea and buttons */}
              <div style={styles.reviewItemContent}>
                <h2>{review.movie.name}</h2>
                {/* Style the textarea here */}
                <textarea
                  defaultValue={review.user_review}
                  onChange={handleReviewChange}
                  style={styles.textarea} // Add the textarea style here
                />
                <button onClick={() => handleUpdateReview(review.id)}>Update this review</button>
                <button onClick={() => handleDeleteReview(review.id)}>Delete this review</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#777',
  },
  username: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  userImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '10px auto',
    display: 'block',
  },
  reviewsList: {
    margin: '20px 0',
  },
  reviewItem: {
    fontSize: '18px',
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
  },
  reviewItemContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px', // Set the maximum width for the container
    margin: '0 auto', // Center the container
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    resize: 'vertical',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center', // Center the text within the textarea
  },
};

export default UserContent;
