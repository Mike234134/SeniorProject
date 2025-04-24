import React from 'react';

import axios from 'axios';
import './Signup.scss'
import { useLocation, useNavigate, Link  } from 'react-router-dom';
 // adjust this path as needed

const Signup = ({ user, setUser }) => {
     const navigate = useNavigate();
     const location = useLocation();
  const handleEmail = (event) => {
    setUser({ ...user, Email: event.target.value });
  };

  const handleUserName = (event) => {
    setUser({ ...user, userName: event.target.value });
  };

  const handlePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const sendUserData = async () => {
    try {
        const isAdminRoute = location.pathname.includes('/admin');
        const userRole = isAdminRoute ? 'admin' : user.user_role;


      const data = {
        email: user.Email,
        username: user.userName,
        password: user.password,
        user_role: userRole
      };
      const response = await axios.post('http://127.0.0.1:5000/signupInfo', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Signup success:', response.data);
      // Optional: update local state if needed for further logic
      if (isAdminRoute && user.user_role !== 'admin') {
        setUser({ ...user, user_role: 'admin' });
      }

      if (response.data.status === 'success') {
        navigate(userRole === 'admin' ? '/admin' : '/');
      }
    } catch (error) {
      console.error('Error sending data to the backend', error);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const { Email, userName, password } = user;

    if (!Email || !userName || !password) {
      alert('Please fill in all fields');
      return;
    }

    sendUserData();
    console.log('Form submitted');
  };

  return (
    <div className='signup'>
      <div className='signup-content-container'>
        <div className='signup-header-container'>
          <h1>Sign up</h1>
        </div>

        <div className='signup-content'>
          <div className='signup-username-container'>
            <p className='label'>Email</p>
            <div className='signup-input-container'>
              <input
                className='search-input'
                type='email'
                placeholder='Enter your email'
                value={user.Email || ''}
                onChange={handleEmail}
                required
              />
            </div>
          </div>

          <div className='signup-username-container'>
            <p className='label'>Username</p>
            <div className='signup-input-container'>
              <input
                className='search-input'
                type='text'
                placeholder='Enter username'
                value={user.userName || ''}
                onChange={handleUserName}
                required
              />
            </div>
          </div>

          <div className='signup-password-container'>
            <p className='label'>Password</p>
            <div className='signup-input-container'>
              <input
                className='search-input'
                type='password'
                placeholder='Enter password'
                value={user.password || ''}
                onChange={handlePassword}
                required
              />
            </div>
          </div>

          <div className='signup-button-container'>
            <button id='signup-button' onClick={handleSignup}>

                Sign up
  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

