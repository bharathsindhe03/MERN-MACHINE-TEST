import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import styles from './Employee.module.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    // Fetch employees from backend
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/employees');
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle search filtering
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredEmployees(filtered);
  };

  // Function to sort employees
  const sortEmployees = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (key === 'time') {
        // Special handling for dates
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredEmployees(sortedEmployees);
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEmployees = employees.filter((employee) => employee.eid !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        alert('Employee deleted successfully');
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <>
      <Navbar />
      <a href="/createEmployee">Create Employee</a>
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
                  Id{' '}
                  <button onClick={() => sortEmployees('eid')} className={styles.button}>Sort</button>
                </th>
                <th>Image</th>
                <th className={styles.th}>
                  Name{' '}
                  <button onClick={() => sortEmployees('name')} className={styles.button}>Sort</button>
                </th>
                <th className={styles.th}>
                  Email{' '}
                  <button onClick={() => sortEmployees('email')} className={styles.button}>Sort</button>
                </th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th className={styles.th}>
                  Create Date{' '}
                  <button onClick={() => sortEmployees('time')} className={styles.button}>Sort</button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index} className={styles.tr}>
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
