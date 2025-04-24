import React from 'react';
import axios from 'axios';

import { useLocation, useNavigate, Link  } from 'react-router-dom';

import './Login.scss';

const Login = ({ user, setUser }) => {

    const navigate = useNavigate();
    const location = useLocation();
  // handle input changes
  const handleEmail = (e) => {
    setUser({ ...user, Email: e.target.value });
  };

  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const isAdminRoute = location.pathname.includes('/admin');
  
      // Pre-set user_role based on route if not already set
      // if (isAdminRoute && user.user_role !== 'admin') {
      //   setUser({ ...user, user_role: 'admin' });
      // }
  
      const response = await axios.post('http://127.0.0.1:5000/loginInfo', {
        email: user.Email,
        password: user.password,
        user_role: isAdminRoute ? 'admin' : user.user_role
      });
  
      console.log('Login response:', response.data);
  
      const { user_role, status } = response.data;
  
      if (status === 'success') {
        if (user_role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
  
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <div className="login">
      <div className="login-content-container">
        <div className="login-header-container">
          <h1>Login</h1>
        </div>

        <div className="login-content">
          <div className="login-username-container">
            <p id="username">Email</p>
            <div className="hero-searchbar-container">
              <input
                className="search-input"
                type="email"
                placeholder="Enter your email"
                value={user.Email || ''}
                onChange={handleEmail}
                required
              />
            </div>
          </div>

          <div className="login-password-container">
            <p id="password">Password</p>
            <div className="hero-searchbar-container">
              <input
                className="search-input"
                type="password"
                placeholder="Enter your password"
                value={user.password || ''}
                onChange={handlePassword}
                required
              />
            </div>
          </div>

          <div className="login-button-container">
            <button id="login-button" onClick={handleLogin}>

                Login
      
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
