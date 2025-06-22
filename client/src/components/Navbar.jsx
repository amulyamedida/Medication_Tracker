import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleMedicationsClick = () => {
    const storedUser = localStorage.getItem('user');
    let user = null;

    try {
      user = storedUser && JSON.parse(storedUser);
    } catch {
      console.error('Invalid user data in localStorage');
    }

    if (!user || !user.email) {
      alert('⚠️ Please sign up or log in first!');
      return;
    }

    navigate('/medications');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo">HealthApp</h2>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <button onClick={handleMedicationsClick} className="nav-button">Medications</button>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
