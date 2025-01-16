import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [employeeName, setEmployeeName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      setEmployeeName(username || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("username");
    setEmployeeName("User"); 
    navigate("/login"); 
  };

  return (
    <nav className={styles.navbar}>
      {" "}
      {/* Navbar container */}
      <div>
        <Link to="/" className={styles.link}>
          Home
        </Link>
      </div>
      <div>
        {/* Link to employee list page */}
        <Link to="/employees" className={styles.link}>
          Employee List
        </Link>
      </div>
      <div className={styles["employee-name"]}>
        {" "}
        {/* Display employee name */}
        <strong>{employeeName}</strong>{" "}
        {/* Show the employee's name or 'User' */}
      </div>
      {/* Logout button */}
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
