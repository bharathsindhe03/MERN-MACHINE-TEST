import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Employee {
  eid: string;
  image?: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  time: string;
}

export const handleDeleteEmployee = async (
  id: string,
  setEmployees: Dispatch<SetStateAction<Employee[]>>,
  setFilteredEmployees: Dispatch<SetStateAction<Employee[]>>
) => {
  if (!id) return;

  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}employees/${id}`
    );

    if (response.status === 200) {
      setEmployees((prev) => prev.filter((employee) => employee.eid !== id));
      setFilteredEmployees((prev) =>
        prev.filter((employee) => employee.eid !== id)
      );
      alert("Employee deleted successfully.");
    } else {
      alert("Failed to delete employee.");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    alert("An error occurred while deleting the employee. Please try again.");
  }
};
