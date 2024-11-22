import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const [employeeName, setEmployeeName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Simulate decoding a JWT token to get employee name
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setEmployeeName(decodedToken.name || 'User'); // Set the employee name or default to 'User'
      } catch (error) {
        console.error('Invalid token format:', error);
        setEmployeeName('User'); // Fallback if token decoding fails
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    onLogout(); // Optional callback for additional logout handling
    setEmployeeName('');
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/employees">Employee List</Link>
      </div>
      <div className="employee-name">
        <strong>{employeeName}</strong>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
