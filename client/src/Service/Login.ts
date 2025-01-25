import axios from "axios";
import type { RegisterData } from "../Interface/RegisterData";
import toast from "react-hot-toast";

export const handleRegister = async ({
  email,
  password,
  navigate,
}: RegisterData) => {
  console.log("login ");
  console.log(`${import.meta.env.VITE_BASE_URL}/auth/login`);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    console.log("login sucessful");
    toast.success("Login successful!");
    const { token, name } = response.data;
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", name);
      console.log("Token saved to localStorage");
    } else {
      console.error("No token received from server");
    }
    navigate("/dashboard");
  } catch (error: any) {
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};
