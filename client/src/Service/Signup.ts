import axios from "axios";

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
    console.log("Signup completed");
    navigate("/");
  } catch (error: any) {
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    } else {
      console.error("Signup error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  }
};
