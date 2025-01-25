import axios from "axios";
import type { FormData } from "../Interface/FormData"; // Import shared FormData interface
import toast from "react-hot-toast";

export const handleCreate = async (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  navigate: (path: string) => void // Accept navigate function
) => {
  const formDataObj = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formDataObj.append(key, v));
    } else if (value) {
      formDataObj.append(key, value);
    }
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/employees/create`,
      formDataObj,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 201) {
      toast.success("Employee Created successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        image: null,
      });
      navigate("/employees");
    }
  } catch (error: any) {
    console.error("Error creating employee:", error);
    alert(error.response?.data?.message || "An error occurred.");
  }
};
