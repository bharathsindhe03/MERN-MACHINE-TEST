import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleEditEmployee = async (
  e: React.FormEvent,
  employee: any,
  id: string | undefined,
  newImage: File | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const navigate = useNavigate();
  e.preventDefault();
  if (!employee) return;

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
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      navigate("/employees");
    } else {
      throw new Error("Failed to update employee");
    }
  } catch (err: any) {
    console.error("Error updating employee:", err.message);
    setError(err.message);
  }
};

export default handleEditEmployee;
