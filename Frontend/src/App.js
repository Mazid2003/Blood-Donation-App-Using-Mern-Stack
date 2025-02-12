import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="container">
      <h1>Blood Donor's Registration</h1>
      <div className="form-container">
        {showRegister ? <Register setShowRegister={setShowRegister} /> : <Login setShowRegister={setShowRegister} />}
      </div>
    </div>
  );
};

export default App;
