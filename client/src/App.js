import logo from './logo.svg';
import './App.css';
import Login from'./Login'
import { useState, useEffect } from 'react';
function App() {

  const [loggedIn, setLogin] = useState(false)
  useEffect(() => {
    fetch('http://127.0.0.1:5555/user/3')
    .then(r => r.json())
    .then(r => console.log(r))}, []
  )
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
