import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [employeeName, setEmployeeName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setEmployeeName(username || "Guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setEmployeeName("User");
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
      {/* Logo or Brand Name */}
      <Link
        to="/"
        className="text-xl font-semibold text-white hover:text-gray-200 transition-colors duration-200"
      >
        Employee Dashboard
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/employees"
          className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-200"
        >
          Employee List
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white text-2xl"
      >
        {isMenuOpen ? "×" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-green-600 text-white w-48 py-4 px-6 rounded-lg shadow-lg md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/employees"
              className="text-lg font-medium hover:text-gray-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Employee List
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false); // Close the mobile menu
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* User info (Desktop only) */}
      <div className="hidden md:block text-lg font-semibold">
        {employeeName}
      </div>
    </nav>
  );
}
