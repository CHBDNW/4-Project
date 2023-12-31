import './App.css';
import Login from'./Login'
import { Routes, Route, useNavigate } from "react-router-dom"
import Signup from './Signup';
import { useState, useEffect } from 'react';
import MainPage from './MainPage';
import MoviePage from './MoviePage';
import UserContent from './UserContent';

function App() {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    fetch('check_session')
    .then(r => {
      if(r.ok) {
         console.log('working now')
         return r.json()
      }
      else{
        navigate('/login')
      }
    })
    .then(r => {
      setUser(r)
    })
      }, [setUser])
  
  
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />}/> 
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/> 
        <Route path="/signup" element={<Signup setUser={setUser}/>}/>
        <Route path="/movies/:id" element={<MoviePage user={user} />} />
        <Route path="/user" element={<UserContent setUser={setUser} user={user}/>} />
      </Routes>
        
    </div>
  );
  
}

export default App;
