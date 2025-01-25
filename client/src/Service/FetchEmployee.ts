import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import type { Employee } from "../Interface/Employee";

// Function to fetch a single employee
export const fetchEmployee = async (
  id: string,
  setEmployee: Dispatch<SetStateAction<Employee | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/employees/${id}`
    );
    setEmployee(response.data);
  } catch (err: any) {
    console.error("Error fetching employee data:", err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
