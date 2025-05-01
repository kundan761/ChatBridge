import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { mobileNumber: mobileNumber , password: '12345678'});
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('userId', response.data._id);
      navigate('/chat');
    } catch (err) {
      setError('Failed to login. Please check your mobile number.', err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
