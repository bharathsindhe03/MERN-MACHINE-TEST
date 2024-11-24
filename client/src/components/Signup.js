import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // State to store the input values for name, email, and password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make a POST request to the backend to create a new user
      const response = await axios.post('http://localhost:5000/auth/signup', { name, email, password });
      alert(response.data.message); // Show success message from the backend
    } catch (error) {
      alert(error.response.data.error); // Show error message from the backend
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}> {/* Handle form submission */}
        {/* Input field for the user's name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on change
          required
        />
        {/* Input field for the user's email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required
        />
        {/* Input field for the user's password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required
        />
        {/* Submit button to trigger the form submission */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
