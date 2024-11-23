import React, { useState } from 'react';
import styles from './CreateEmployee.module.css'; 

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedCourses = checked
        ? [...prevState.course, value]
        : prevState.course.filter((course) => course !== value);
      return { ...prevState, course: updatedCourses };
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('mobile', formData.mobile);
    formDataObj.append('designation', formData.designation);
    formDataObj.append('gender', formData.gender);
    formData.course.forEach((course) => formDataObj.append('course', course));
    formDataObj.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:5000/employees/create', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        alert('Employee created successfully!');
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
        const data = await response.json();
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}> {/* Use className for outer container */}
      <h2 className={styles.header}>Create Employee</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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

        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Upload Image:</label>
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

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
