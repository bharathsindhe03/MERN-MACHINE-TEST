import { useState } from "react";
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-center mb-6 text-xl font-semibold text-gray-800">
          Login
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            No account yet? Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
