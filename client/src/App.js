import './App.css';
import Login from'./Login'
import MainPage from './MainPage';
import Signup from './Signup';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    fetch('/check_session')
    .then(r => {
      if(r.ok) {
         return r.json()
        }
      })
    .then(r => {
      setUser(r)
    }
    )}, []
  )
  if(!user) {
    navigate('/login')
  }
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />}/> 
        <Route path="/login" element={<Login user={user} setUser={setUser} navigate={navigate} />}/> 
        <Route path="/signup" element={<Signup setUser={setUser} navigate={navigate}/>}/>
      </Routes>
        
    </div>
  );

}

export default App;
