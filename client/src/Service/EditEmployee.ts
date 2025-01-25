import axios from "axios";
import { toast } from "react-toastify";

const handleEditEmployee = async (
  e: React.FormEvent,
  employee: any,
  id: string,
  newImage: File | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("email", employee.email);
  formData.append("mobile", employee.mobile);
  formData.append("designation", employee.designation);
  formData.append("gender", employee.gender);
  formData.append("course", JSON.stringify(employee.course));
  if (newImage) formData.append("image", newImage);

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/employees/${id}`,
      formData
    );

    if (response.status === 200) {
      console.log("Employee updated:", response.data);
      toast.success("Employee updated successfully!");
      
    } else {
      throw new Error("Failed to update employee");
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data);
      setError(err.response?.data?.message || "An error occurred");
    } else {
      console.error("Unknown error:", err);
      setError("An unexpected error occurred");
    }
  }
};

export default handleEditEmployee;
