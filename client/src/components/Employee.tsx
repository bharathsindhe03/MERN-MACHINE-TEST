import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Employee.module.css";
import { fetchAllEmployees } from "../Service/FetchAllEmployee";
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

export default function Employee() {
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

  const editEmployee = async (id: string) => {
    navigate(`/employees/edit/${id}`);
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
        <a
          className={styles.createButton}
          onClick={() => navigate("/createEmployee")}
        >
          Create Employee
        </a>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Name
              <a
                onClick={() => sortEmployees("name")}
                className={styles.sortButton}
              >
                {sortConfig.key === "name" && sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"}
              </a>
            </th>
            <th>
              Email
              <a
                onClick={() => sortEmployees("email")}
                className={styles.sortButton}
              >
                {sortConfig.key === "email" && sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"}
              </a>
            </th>
            <th>
              Mobile
              <a
                onClick={() => sortEmployees("mobile")}
                className={styles.sortButton}
              >
                {sortConfig.key === "mobile" && sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"}
              </a>
            </th>
            <th>
              Designation
              <a
                onClick={() => sortEmployees("designation")}
                className={styles.sortButton}
              >
                {sortConfig.key === "designation" &&
                sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"}
              </a>
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
                    src={`${import.meta.env.VITE_BASE_URL}${employee.image}`}
                    alt="Employee"
                    className={styles.employeeImage}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <a onClick={() => editEmployee(employee.eid)}>Edit</a> -
                <a onClick={() => deleteEmployee(employee.eid)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
