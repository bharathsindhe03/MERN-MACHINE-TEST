import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./Employee.module.css";

// Define the Employee type
interface Employee {
  eid: string;
  image?: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[]; // Ensure course is always an array
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

  // Fetch Employees on Component Mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/employees");
        const data: Employee[] = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Search Functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredEmployees(filtered);
  };

  // Sorting Functionality
  const sortEmployees = (key: keyof Employee) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      const valueA = a[key] ?? "";
      const valueB = b[key] ?? "";

      if (key === "time") {
        // Ensure valueA and valueB are strings, not arrays
        const dateA = Array.isArray(valueA)
          ? new Date(valueA[0])
          : new Date(valueA);
        const dateB = Array.isArray(valueB)
          ? new Date(valueB[0])
          : new Date(valueB);

        return direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // For non-date fields, perform a normal comparison
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredEmployees(sortedEmployees);
  };

  // Delete Employee
  const deleteEmployee = async (id: string) => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedEmployees = employees.filter(
          (employee) => employee.eid !== id
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        alert("Employee deleted successfully");
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ float: "right", display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "20px" }}>
          Total Count: {employees.length}
        </div>
        <a
          href="/createEmployee"
          style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}
        >
          Create Employee
        </a>
      </div>

      <div>
        <h2>Employee List</h2>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        {filteredEmployees.length === 0 ? (
          <p>No employees available.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  Unique Id
                  <span
                    onClick={() => sortEmployees("eid")}
                    className={styles.sortArrow}
                  >
                    {sortConfig.key === "eid" && sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"}
                  </span>
                </th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>
                  Name
                  <span
                    onClick={() => sortEmployees("name")}
                    className={styles.sortArrow}
                  >
                    {sortConfig.key === "name" && sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"}
                  </span>
                </th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Mobile No</th>
                <th className={styles.th}>Designation</th>
                <th className={styles.th}>Gender</th>
                <th className={styles.th}>Course</th>
                <th className={styles.th}>
                  Create Date
                  <span
                    onClick={() => sortEmployees("time")}
                    className={styles.sortArrow}
                  >
                    {sortConfig.key === "time" && sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"}
                  </span>
                </th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.eid} className={styles.tr}>
                  <td className={styles.td}>{employee.eid}</td>
                  <td className={styles.td}>
                    {employee.image && (
                      <img
                        src={`http://localhost:5000${employee.image}`}
                        alt="Employee"
                        width="50"
                        height="50"
                      />
                    )}
                  </td>
                  <td className={styles.td}>{employee.name}</td>
                  <td className={styles.td}>{employee.email}</td>
                  <td className={styles.td}>{employee.mobile}</td>
                  <td className={styles.td}>{employee.designation}</td>
                  <td className={styles.td}>{employee.gender}</td>
                  <td className={styles.td}>
                    {employee.course?.join(", ") ?? "N/A"}
                  </td>
                  <td className={styles.td}>
                    {new Date(employee.time).toLocaleDateString()}
                  </td>
                  <td className={styles.td}>
                    <a
                      href={`/employees/edit/${employee.eid}`}
                      className={styles.button}
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => deleteEmployee(employee.eid)}
                      className={styles.button}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Employee;
