import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from backend
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Navbar />
      <a href="/createEmployee">Create Employee</a>
      <div>
        <h2>Employee List</h2>
        {employees.length === 0 ? (
          <p>No employees available.</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course.join(', ')}</td>
                  <td>
                    {employee.image && (
                      <img
                        src={`http://localhost:5000${employee.image}`}
                        alt="Employee"
                        width="50"
                        height="50"
                      />
                    )}
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
