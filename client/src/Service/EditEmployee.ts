import axios from "axios";
import toast from "react-hot-toast";

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
      
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "An error occurred");
    } else {
      setError("An unexpected error occurred");
    }
  }
};

export default handleEditEmployee;
