import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to hold the email and password values entered by the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation after login

  // Function to handle form submission and user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the backend to authenticate the user
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      // Show the success message returned from the backend
      alert(response.data.message);

      // Save the JWT token returned by the backend in localStorage for further authentication
      localStorage.setItem('token', response.data.token);

      // Redirect the user to the dashboard page after successful login
      navigate('/dashboard');
    } catch (error) {
      // Handle errors in login process
      if (error.response && error.response.data && error.response.data.error) {
        // Show the backend error message if it exists
        alert(error.response.data.error);
      } else {
        // Log and show a general error message if there's an unexpected error
        console.error('Login error:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}> {/* Handle form submission */}
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required
        />
        
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required
        />
        
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
