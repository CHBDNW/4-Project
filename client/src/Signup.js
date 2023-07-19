import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Signup({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    let navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

    const handleImgChange = (event) => {
        setImgUrl(event.target.value);
      };

      function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
            img_url: e.target.imgUrl.value,
        }
        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
          .then(r => {
            if(r.ok) {
               return r.json()
            }
            else {
              throw new Error('Login request failed');
            }
          })
          .then(r => {
          setUsername('');
          setPassword('');
          setImgUrl('');
          console.log('executed')
          navigate('/')
        })
        .catch((error) => {
          console.error('Error occurred during signup:', error);
          alert('Invalid input')
        });
      }
    return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image Url:</label>
          <input
            type="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={handleImgChange}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
    )
}
export default Signup