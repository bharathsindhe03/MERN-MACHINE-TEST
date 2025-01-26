import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [employeeName, setEmployeeName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setEmployeeName(username || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setEmployeeName("User");
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/" className={styles.link}>
          Home
        </Link>
      </div>
      <div>
        <Link to="/employees" className={styles.link}>
          Employee List
        </Link>
      </div>
      <div className={styles.employeeName}>
        <strong>{employeeName}</strong>
      </div>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </nav>
  );
}
