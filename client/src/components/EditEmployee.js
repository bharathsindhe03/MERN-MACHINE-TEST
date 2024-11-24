import React, { useState, useEffect } from 'react'; // Importing React hooks
import { useParams, useNavigate } from 'react-router-dom'; // Importing React Router hooks for accessing params and navigation
import styles from './EditEmployee.module.css'; // Importing CSS module for styling

const EditEmployee = () => {
  const { id } = useParams(); // Getting employee ID from URL params
  const navigate = useNavigate(); // Hook to navigate to a different page after updating
  const [employee, setEmployee] = useState(null); // State to store employee data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors during fetch
  const [newImage, setNewImage] = useState(null); // State to store new image if uploaded

  const designations = ['HR', 'Manager', 'Sales']; // Predefined designations
  const coursesList = ['MCA', 'BCA', 'BSC']; // Predefined course options

  // useEffect hook to fetch employee data on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`); // Fetching employee data based on ID
        if (!response.ok) throw new Error('Failed to fetch employee data'); // Handling fetch error
        const data = await response.json(); // Parsing the JSON response
        setEmployee(data); // Setting employee data to state
        setLoading(false); // Setting loading to false once data is fetched
      } catch (err) {
        console.error('Error:', err);
        setError(err.message); // Setting error message if any error occurs
        setLoading(false); // Setting loading to false after error
      }
    };
    fetchEmployee(); // Calling the fetch function
  }, [id]); // Running the effect only when the ID changes

  // Handling input changes for text and select inputs
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'course') {
      // Handling checkbox changes for courses
      setEmployee((prev) => ({
        ...prev,
        course: checked
          ? [...(prev.course || []), value] // Adding selected course to the list
          : (prev.course || []).filter((c) => c !== value), // Removing unselected course
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value })); // Updating other fields
    }
  };

  // Handling image file changes
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Storing the selected file in state
  };

  // Handling form submission for updating employee data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    const formData = new FormData(); // Creating FormData object to send form data
    formData.append('name', employee.name); // Appending employee name
    formData.append('email', employee.email); // Appending employee email
    formData.append('mobile', employee.mobile); // Appending employee mobile
    formData.append('designation', employee.designation); // Appending employee designation
    formData.append('gender', employee.gender); // Appending employee gender
    formData.append('course', JSON.stringify(employee.course)); // Appending selected courses
    if (newImage) formData.append('image', newImage); // Appending new image if selected

    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'PUT', // Sending PUT request to update employee
        body: formData, // Sending form data in the request body
      });
      if (!response.ok) throw new Error('Failed to update employee'); // Error handling if update fails
      navigate('/employees'); // Redirecting to employees list page after successful update
    } catch (err) {
      console.error('Error updating employee:', err); // Logging error
    }
  };

  // Handling loading state
  if (loading) return <p>Loading...</p>; // Displaying loading message while data is being fetched
  // Handling error state
  if (error) return <p>Error: {error}</p>; // Displaying error message if an error occurred

  return (
    // Form for editing employee data
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles['form-group']}>
        <label>Name:</label>
        <input type="text" name="name" value={employee.name || ''} onChange={handleInputChange} />
      </div>
      <div className={styles['form-group']}>
        <label>Email:</label>
        <input type="email" name="email" value={employee.email || ''} onChange={handleInputChange} />
      </div>
      <div className={styles['form-group']}>
        <label>Mobile:</label>
        <input type="text" name="mobile" value={employee.mobile || ''} onChange={handleInputChange} />
      </div>
      <div className={styles['form-group']}>
        <label>Designation:</label>
        <select name="designation" value={employee.designation || ''} onChange={handleInputChange}>
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['form-group']}>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={employee.gender === 'Male'}
          onChange={handleInputChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={employee.gender === 'Female'}
          onChange={handleInputChange}
        />
        Female
      </div>
      <div className={styles['form-group']}>
        <label>Courses:</label>
        {coursesList.map((course) => (
          <label key={course}>
            <input
              type="checkbox"
              name="course"
              value={course}
              checked={(employee.course || []).includes(course)}
              onChange={handleInputChange}
            />
            {course}
          </label>
        ))}
      </div>
      <div className={styles['form-group']}>
        <label>Current Image:</label>
        {employee.image && (
          <img
            src={`http://localhost:5000${employee.image}`}
            alt="Employee"
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </div>
      <div className={styles['form-group']}>
        <label>New Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>
      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
};

export default EditEmployee;
