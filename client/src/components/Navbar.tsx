import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import the CSS module for styling

const Navbar = () => {
  // State to store the employee name fetched from the token
  const [employeeName, setEmployeeName] = useState("");
  const navigate = useNavigate(); // Hook for navigating programmatically

  // useEffect hook to decode the JWT token and retrieve the employee name
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (token) {
      try {
        // Decode the JWT token (second part of the token contains the payload)
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload using base64
        setEmployeeName(decodedToken.name || "User"); // Set employee name or default to 'User'
      } catch (error) {
        console.error("Invalid token format:", error);
        setEmployeeName("User"); // Fallback to 'User' if token decoding fails
      }
    }
  }, []); // Empty dependency array means this runs once after the component mounts

  // Handle logout: Remove token, reset employee name, and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage

    setEmployeeName(""); // Clear the stored employee name
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className={styles.navbar}>
      {" "}
      {/* Navbar container */}
      <div>
        <Link to="/dashboard" className={styles.link}>
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
