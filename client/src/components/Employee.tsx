import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Employee.module.css";
import { fetchAllEmployees } from "../Service/FetchEmployee";
import { handleDeleteEmployee } from "../Service/DeleteEmployee";
import Navbar from "./Navbar";

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

const Employee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee | "";
    direction: string;
  }>({
    key: "",
    direction: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEmployees(setEmployees, setFilteredEmployees);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value?.toString().toLowerCase().includes(term)
      )
    );
    setFilteredEmployees(filtered);
  };

  const sortEmployees = (key: keyof Employee) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredEmployees].sort((a, b) => {
      const valueA = a[key] ?? "";
      const valueB = b[key] ?? "";

      if (typeof valueA === "string" && typeof valueB === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredEmployees(sorted);
  };

  const deleteEmployee = async (id: string) => {
    await handleDeleteEmployee(id, setEmployees, setFilteredEmployees);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.headerContainer}>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <button
          className={styles.createButton}
          onClick={() => navigate("/createEmployee")}
        >
          Create Employee
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Name
              <button
                onClick={() => sortEmployees("name")}
                className={styles.sortButton}
              >
                Sort
              </button>
            </th>
            <th>
              Email
              <button
                onClick={() => sortEmployees("email")}
                className={styles.sortButton}
              >
                Sort
              </button>
            </th>
            <th>
              Mobile
              <button
                onClick={() => sortEmployees("mobile")}
                className={styles.sortButton}
              >
                Sort
              </button>
            </th>
            <th>
              Designation
              <button
                onClick={() => sortEmployees("designation")}
                className={styles.sortButton}
              >
                Sort
              </button>
            </th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.eid}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>
                {employee.image ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${employee.image}`}
                    alt="Employee"
                    className={styles.employeeImage}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button>Edit</button>
                <button onClick={() => deleteEmployee(employee.eid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
