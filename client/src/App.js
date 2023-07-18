import logo from './logo.svg';
import './App.css';
import Login from'./Login'
import Navbar from './Navbar';
import { Routes, Route, useNavigate } from "react-router-dom"
import Signup from './Signup';
import { useState, useEffect } from 'react';


function App() {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    fetch('/check_session')
    .then(r => r.json())
    .then(r => {
      if(r.ok) {
        setUser(r)
        console.log(user)
        console.log(r)
      }
      else {
        navigate('/login')
      }
      
    })}, []
  )
  
  return (
    <div className="App">
      
      <Routes>
        {/* <Route path="/" element={<MainPage />}/> */}
        <Route path="/login" element={<Login setUser={setUser} />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
        
    </div>
  );
  
}

export default App;
