import './App.css';
import Login from'./Login'
import Navbar from './Navbar';
import { Routes, Route, useNavigate } from "react-router-dom"
import Signup from './Signup';
import { useState, useEffect } from 'react';
import MainPage from './MainPage';

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
      console.log(user)
    }
    )}, []
  )
  console.log(user)
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={user ? <MainPage /> : <Login user={user} setUser={setUser} navigate={navigate} />}/> 
        <Route path="/signup" element={<Signup setUser={setUser} navigate={navigate}/>}/>
      </Routes>
        
    </div>
  );
  
}

export default App;
