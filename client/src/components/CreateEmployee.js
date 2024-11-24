import React, { useState } from 'react';
import styles from './CreateEmployee.module.css'; // Importing CSS module for styling

// Main component for creating an employee
const CreateEmployee = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [], // Array to hold multiple selected courses
    image: null, // To store the uploaded image file
  });

  // Handle input field changes (text, email, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep existing form data
      [name]: value, // Update the field being modified
    });
  };

  // Handle changes in checkbox selection for courses
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedCourses = checked
        ? [...prevState.course, value] // Add course if checked
        : prevState.course.filter((course) => course !== value); // Remove course if unchecked
      return { ...prevState, course: updatedCourses };
    });
  };

  // Handle file input for image upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Save the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object to send form data including files
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('mobile', formData.mobile);
    formDataObj.append('designation', formData.designation);
    formDataObj.append('gender', formData.gender);
    formData.course.forEach((course) => formDataObj.append('course', course));
    formDataObj.append('image', formData.image);

    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/employees/create', {
        method: 'POST',
        body: formDataObj, // Send form data
      });

      if (response.ok) {
        alert('Employee created successfully!');
        // Reset form fields after successful submission
        setFormData({
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          course: [],
          image: null,
        });
      } else {
        const data = await response.json(); // Parse error response
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Render form UI
  return (
    <div className={styles.container}> {/* Outer container */}
      <h2 className={styles.header}>Create Employee</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name input */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Email input */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Mobile input */}
        <div className={styles.formGroup}>
          <label htmlFor="mobile" className={styles.label}>Mobile No:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Mobile No"
            value={formData.mobile}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/* Designation dropdown */}
        <div className={styles.formGroup}>
          <label htmlFor="designation" className={styles.label}>Designation:</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender radio buttons */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Gender:</label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              className={styles.radio}
              required
            />
            Male
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              className={styles.radio}
            />
            Female
          </label>
        </div>

        {/* Courses checkbox group */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Course:</label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes('MCA')}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            MCA
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes('BCA')}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            BCA
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes('BSC')}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            BSC
          </label>
        </div>

        {/* Image file upload */}
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Img Upload:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
