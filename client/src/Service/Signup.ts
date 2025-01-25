import axios from "axios";
import toast from "react-hot-toast";

interface SignupData {
  name: string;
  email: string;
  password: string;
  navigate: (path: string) => void;
}

export const handleSignup = async ({
  name,
  email,
  password,
  navigate,
}: SignupData) => {
  try {
    console.log("Signup in progress...");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/signup`,
      {
        name,
        email,
        password,
      }
    );

    alert(response.data.message);
    toast.success("Signup successful! Please login to continue.");

    navigate("/");
  } catch (error: any) {
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    } else {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};
