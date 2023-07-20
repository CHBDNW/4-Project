import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function UserContent({setUser, user}) {
    useEffect(() => {
        fetch(`http://localhost:5555/user/${user.id}`)
        .then(r => {
          if(r.ok) {
             return r.json()
          }
        })
        .then(r => {
          setUser(r)
          
        })
          }, [setUser])

          const handleDeleteReview = (reviewId) => {
            fetch(`http://localhost:5555/reviews/${reviewId}`, {
              method: 'DELETE',
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
        <div>
            <Link to='/'>movies</Link>
            <h2>Welcome: {user.username}</h2>
            <img src={user.img_url}  alt="user"/>
            <ol>Your reviews: {user.reviews.map((review) => {
                return <li key={review.id}>{review.user_review}
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                </li>
            })}</ol>
        </div>
    )
}
export default UserContent