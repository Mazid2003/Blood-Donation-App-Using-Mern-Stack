import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setShowRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = { name, email, mobile, age, bloodGroup, location, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/Register', newUser);
      alert(response.data.msg);
      setName('');
      setEmail('');
      setMobile('');
      setAge('');
      setBloodGroup('');
      setLocation('');
      setPassword('');
      setConfirmPassword('');
      setShowRegister(false); // Switch to login after successful registration
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required placeholder="Enter your mobile number" />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="Enter your age" />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Enter your location" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm your password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="toggle-text">Already have an account? <span onClick={() => setShowRegister(false)}>Login</span></p>
    </div>
  );
};

export default Register;
