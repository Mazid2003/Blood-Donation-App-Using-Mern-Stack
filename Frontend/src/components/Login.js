import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setShowRegister }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userData, setUserData] = useState(null); // Store user data after successful login

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    const userCredentials = { email: loginEmail, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userCredentials);

      // Save user data to state and JWT token in localStorage
      setUserData(response.data.user); 
      localStorage.setItem('token', response.data.token); // Store the JWT token

      alert(response.data.msg);
      setLoginEmail('');
      setPassword('');
    } catch (error) {
      setLoginError('Invalid email or password.');
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      {loginError && <p className="error">{loginError}</p>}
      {userData && (
        <div>
          <h3>Welcome, {userData.name}!</h3>
          <p>Email: {userData.email}</p>
          <p>Mobile: {userData.mobile}</p>
          <p>Age: {userData.age}</p>
          <p>Blood Group: {userData.bloodGroup}</p>
          <p>Location: {userData.location}</p>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="toggle-text">
        Don't have an account? <span onClick={() => setShowRegister(true)}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
