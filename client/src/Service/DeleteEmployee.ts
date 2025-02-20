import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import type { Employee } from "../Interface/Employee";
import toast from "react-hot-toast";

export const handleDeleteEmployee = async (
  id: string,
  setEmployees: Dispatch<SetStateAction<Employee[]>>,
  setFilteredEmployees: Dispatch<SetStateAction<Employee[]>>
) => {
  if (!id) return;

  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/employees/${id}`
    );

    if (response.status === 200) {
      setEmployees((prev) => prev.filter((employee) => employee.eid !== id));
      setFilteredEmployees((prev) =>
        prev.filter((employee) => employee.eid !== id)
      );
      toast.success("Employee deleted successfully.");
    } else {
      toast.error("Failed to delete employee.");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    toast.error("An error occurred while deleting the employee. Please try again.");
  }
};
