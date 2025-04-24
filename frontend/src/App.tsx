"use client"

import './App.css';
import Home from './layout/Home/Home'
import Document from './layout/Document/Document';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './layout/Admin/Admin';
import { useState } from 'react';
import Login from './layout/Login/Login';
import Signup from './layout/Signup/Signup';

function App() {

  const [user, setUser] = useState(
                              {
                                userName:null,
                                Email: null,
                                password:null,
                                user_role: 'student'
                              }
                            )
  return (
      
      <div className='app' >  

        <div className='router-container'>
          <Routes>
            
            <Route path="/" element={<Home />}/>
            <Route path='/Document' element={<Document/>} />
            <Route path='/admin' element={<Admin user={user} setUser={setUser} />} />
            <Route path='/Login' element= {<Login user = {user} setUser={setUser} />} />
            <Route path='/admin/Login' element= {<Login user = {user} setUser={setUser} />} />
            <Route path= '/Signup' element= {<Signup user = {user} setUser = {setUser} />} />


          </Routes>
        </div>
       
          
      </div>  );}
export default App;
