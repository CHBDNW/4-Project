
import React, { useState } from 'react';

function Login({ setUser, navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const userLogin = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      })
      .then(r => {
        if(r.ok) { 
          return r.json()
        }})
      .then(r => {
        setUsername('');
        setPassword('');
        console.log('signed in')
        navigate('/')
      }
      )}
  function handleSignupClick() {
    navigate('/signup')
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignupClick}>Signup</button>
    </div>
  );
}

export default Login