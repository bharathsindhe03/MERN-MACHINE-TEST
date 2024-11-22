import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate is used here instead of useHistory

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: ''
  });

  useEffect(() => {
    // Fetch employee data by ID
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
      const data = await response.json();

      // Redirect back to employee list after successful edit
      navigate('/employees'); // Use navigate to redirect
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
        />
        <br />

        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleInputChange}
        />
        <br />

        <label>Designation:</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleInputChange}
        />
        <br />

        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={employee.gender}
          onChange={handleInputChange}
        />
        <br />

        <label>Course:</label>
        <input
          type="text"
          name="course"
          value={employee.course.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'course', value: e.target.value.split(',') } })}
        />
        <br />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={employee.image}
          onChange={handleInputChange}
        />
        <br />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
