import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup from './layout/Signup/Signup.tsx'
import Login from './Login.tsx'
const router =createBrowserRouter([
  {path:"/",element: <App />},
  {path:"/signup",element: <Signup />},
  {path:"/login",element: <Login />},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
