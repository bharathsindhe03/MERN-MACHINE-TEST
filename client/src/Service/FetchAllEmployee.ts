import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import type { Employee } from "../Interface/Employee";
import { toast } from "react-toastify";
// Function to fetch all employees
export const fetchAllEmployees = async (
  setEmployees: Dispatch<SetStateAction<Employee[]>>,
  setFilteredEmployees: Dispatch<SetStateAction<Employee[]>>
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/employees`
    );
    const data: Employee[] = response.data;
    setEmployees(data);
    setFilteredEmployees(data);
  } catch (error: any) {
    console.error("Error fetching employees:", error.message);
    toast.error("Failed to fetch employees. Please try again later.");
  }
};
