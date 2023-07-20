import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserContent({ setUser, user }) {
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user/${user.id}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
      })
      .then(r => {
        setUser(r);
      });
  }, [setUser]);

  const handleDeleteReview = (reviewId) => {
    fetch(`http://127.0.0.1:5555/reviews/${reviewId}`, {
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
          console.log('Failed to delete review.');
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <Link to='/' style={styles.link}>Movies</Link>
      </nav>
      <h2 style={styles.username}>Welcome: {user.username}</h2>
      <img src={user.img_url} alt="user" style={styles.userImage} />
      <div style={styles.reviewsList}>
        <h3>Your reviews:</h3>
        {user.reviews.map(review => {
          return <div key={review.id} style={styles.reviewItem}>{review.user_review}
          <button onClick={() => handleDeleteReview(review.id)}>Delete this review</button>
          </div>;
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
};

export default UserContent;
