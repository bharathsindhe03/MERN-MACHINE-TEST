import axios from "axios";

const handleEditEmployee = async (
  e: React.FormEvent,
  employee: any,
  id: string,
  newImage: string | null,
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
      `${import.meta.env.VITE_BASE_URL}employees/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 200) {
      alert("Employee updated successfully!");
    } else {
      throw new Error("Failed to update employee");
    }
  } catch (err: any) {
    console.error("Error updating employee:", err.message);
    setError(err.message);
  }
};

export default handleEditEmployee;
