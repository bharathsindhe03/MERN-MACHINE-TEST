import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  // State to handle registration form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // API call for registration
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      alert(response.data.message); // Show success message

      // Navigate to login page on successful registration
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(error.response.data.error); // Show backend error message
      } else {
        console.error("Registration error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={style.registerContainer}>
      <form onSubmit={handleRegister} className={style.registerForm}>
        <h2 className={style.registerTitle}>Login</h2>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={style.inputField}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={style.inputField}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className={style.inputField}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button type="submit" className={style.registerButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
