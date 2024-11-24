import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import styles from './Employee.module.css';

const Employee = () => {
  // State to hold the list of employees and the filtered employees
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Fetch the list of employees from the backend when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Sending request to the backend to fetch employees
        const response = await fetch('http://localhost:5000/employees');
        const data = await response.json(); // Converting the response to JSON
        setEmployees(data); // Saving employees in state
        setFilteredEmployees(data); // Initial list for filtered employees
      } catch (error) {
        console.error('Error fetching employees:', error); // Log any error that occurs
      }
    };

    fetchEmployees(); // Call the function to fetch employees
  }, []);

  // Function to handle search input and filter employees
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // Convert the search term to lowercase
    setSearchTerm(term); // Update the search term in state
    const filtered = employees.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(term) // Check if any field contains the search term
      )
    );
    setFilteredEmployees(filtered); // Update the filtered list of employees
  };

  // Function to handle sorting of employees by a given key
  const sortEmployees = (key) => {
    let direction = 'asc'; // Default direction is ascending
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'; // If already sorted in ascending order, change to descending
    }

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (key === 'time') {
        // Special sorting for date fields
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA; // Sort by date
      }

      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1; // Sort alphabetically for non-date fields
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction }); // Set sorting configuration in state
    setFilteredEmployees(sortedEmployees); // Update the filtered list of employees after sorting
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE', // Sending a DELETE request to remove the employee
      });

      if (response.ok) {
        // If the response is successful, filter out the deleted employee from the list
        const updatedEmployees = employees.filter((employee) => employee.eid !== id);
        setEmployees(updatedEmployees); // Update the state with the remaining employees
        setFilteredEmployees(updatedEmployees); // Also update the filtered list
        alert('Employee deleted successfully'); // Show success message
      } else {
        console.error('Failed to delete employee'); // Log if deletion failed
      }
    } catch (error) {
      console.error('Error deleting employee:', error); // Log any error that occurs
    }
  };

  return (
    <>
      <Navbar /> {/* Navigation bar component */}
      <a href="/createEmployee">Create Employee</a> {/* Link to create a new employee */}
      <div>
        <h2>Employee List</h2>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearch} // Handle input change for search
          className={styles.searchInput}
        />
        {filteredEmployees.length === 0 ? (
          <p>No employees available.</p> // If no employees match the search, show this message
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  Id{' '}
                  <button onClick={() => sortEmployees('eid')} className={styles.button}>Sort</button>
                </th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>
                  Name{' '}
                  <button onClick={() => sortEmployees('name')} className={styles.button}>Sort</button>
                </th>
                <th className={styles.th}>
                  Email{' '}
                  <button onClick={() => sortEmployees('email')} className={styles.button}>Sort</button>
                </th>
                <th className={styles.th}>Mobile</th>
                <th className={styles.th}>Designation</th>
                <th className={styles.th}>Gender</th>
                <th className={styles.th}>Course</th>
                <th className={styles.th}>
                  Create Date{' '}
                  <button onClick={() => sortEmployees('time')} className={styles.button}>Sort</button>
                </th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>{employee.eid}</td>
                  <td className={styles.td}>
                    {employee.image && (
                      <img
                        src={`http://localhost:5000${employee.image}`} // Display employee image
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
                  <td className={styles.td}>{employee.course.join(', ')}</td>
                  <td className={styles.td}>{new Date(employee.time).toLocaleDateString()}</td>
                  <td className={styles.td}>
                    <a href={`/employees/edit/${employee.eid}`} className={styles.button}>Edit</a>
                    <a onClick={() => deleteEmployee(employee.eid)} className={styles.button}>Delete</a>
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
