import { useState } from "react";

import style from "./Login.module.css";
import { handleRegister } from "../../Service/Login";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // State to handle registration form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    await handleRegister({ email, password, navigate }); // Pass navigate as a parameter
  };
  return (
    <div className={style.registerContainer}>
      <form onSubmit={onSubmit} className={style.registerForm}>
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

        {/* Submit Button */}
        <button type="submit" className={style.registerButton}>
          Login
        </button>
        <div>
          <Link to="/signup" className={style.link}>
            No account yet? Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
