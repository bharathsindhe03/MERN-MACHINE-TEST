import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
  navigate: (path: string) => void;
}

export const handleRegister = async ({
  email,
  password,
  navigate,
}: RegisterData) => {
  console.log("login ");
  console.log(`${import.meta.env.VITE_BASE_URL}auth/login`);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}auth/login`,
      {
        email,
        password,
      }
    );
    console.log("login sucessful");
    alert(response.data.message);
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
      alert(error.response.data.error);
    } else {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  }
};
