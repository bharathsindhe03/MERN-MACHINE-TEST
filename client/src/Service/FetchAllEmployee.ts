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

// Function to fetch all employees
export const fetchAllEmployees = async (
  setEmployees: Dispatch<SetStateAction<Employee[]>>,
  setFilteredEmployees: Dispatch<SetStateAction<Employee[]>>
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}employees`
    );
    const data: Employee[] = response.data;
    setEmployees(data);
    setFilteredEmployees(data);
  } catch (error: any) {
    console.error("Error fetching employees:", error.message);
    alert("Failed to fetch employees. Please try again later.");
  }
};
