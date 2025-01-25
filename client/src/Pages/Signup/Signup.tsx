import { useState } from "react";
import style from "./Signup.module.css";
import { handleSignup } from "../../Service/Signup";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignup({ name, email, password, navigate });
  };

  return (
    <div className={style.signup_container}>
      <form onSubmit={onSubmit} className={style.signup_form}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={style.input_field}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input_field}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input_field}
          required
        />

        <button type="submit" className={style.signup_button}>
          Signup
        </button>
        <Link to="/" className={style.link}>
          Already have an account? Login here
        </Link>
      </form>
    </div>
  );
}
