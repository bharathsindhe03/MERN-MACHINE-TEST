import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

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
    setEmployeeName(''); // Clear employee name
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/employees" className={styles.link}>Employee List</Link>
      </div>
      <div className={styles['employee-name']}>
        <strong>{employeeName}</strong>
      </div>
      <button onClick={handleLogout} className={styles.button}>Logout</button>
    </nav>
  );
};

export default Navbar;
