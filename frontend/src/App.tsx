"use client"

import './App.css';
import Home from './layout/Home/Home'
import Document from './layout/Document/Document';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
      
      <div className='app' >  

        <div className='router-container'>
          <Routes>
            
            <Route path="/" element={<Home />}/>
            <Route path='/Document' element={<Document/>} />


          </Routes>
        </div>
       
          
      </div>  );}
export default App;
