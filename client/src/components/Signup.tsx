import { useState } from "react";
import style from "./Signup.module.css"; // Import the CSS module
import { handleSignup } from "../Service/Signup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State to store the input values for name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Handle the signup form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    await handleSignup({ name, email, password, navigate }); // Pass navigate as a parameter
  };

  return (
    <div className={style.signup_container}>
      <form onSubmit={onSubmit} className={style.signup_form}>
        <h2>Signup</h2>
        {/* Input field for the user's name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on change
          className={style.input_field}
          required
        />
        {/* Input field for the user's email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          className={style.input_field}
          required
        />
        {/* Input field for the user's password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          className={style.input_field}
          required
        />
        {/* Submit button to trigger the form submission */}
        <button type="submit" className={style.signup_button}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
