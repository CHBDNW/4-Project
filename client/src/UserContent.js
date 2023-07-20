import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function UserContent({setUser, user}) {
    useEffect(() => {
        fetch(`user/${user.id}`)
        .then(r => {
          if(r.ok) {
             return r.json()
          }
        })
        .then(r => {
          setUser(r)
          
        })
          }, [setUser])
    return (
        <div>
            <Link to='/'>movies</Link>
            <h2>Welcome: {user.username}</h2>
            <img src={user.img_url}  alt="user"/>
            <ol>Your reviews: {user.reviews.map((review) => {
                return <li key={review.id}>{review.user_review}</li>
            })}</ol>
        </div>
    )
}
export default UserContent