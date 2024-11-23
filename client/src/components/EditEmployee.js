import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const designations = ['HR', 'Manager', 'Sales'];
  const coursesList = ['MCA', 'BCA', 'BSC'];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee data');
        const data = await response.json();
        setEmployee(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'course') {
      setEmployee((prev) => ({
        ...prev,
        course: checked
          ? [...(prev.course || []), value]
          : (prev.course || []).filter((c) => c !== value),
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', JSON.stringify(employee.course));
    if (newImage) formData.append('image', newImage);

    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update employee');
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={employee.name || ''} onChange={handleInputChange} />
      <br />
      <label>Email:</label>
      <input type="email" name="email" value={employee.email || ''} onChange={handleInputChange} />
      <br />
      <label>Mobile:</label>
      <input type="text" name="mobile" value={employee.mobile || ''} onChange={handleInputChange} />
      <br />
      <label>Designation:</label>
      <select name="designation" value={employee.designation || ''} onChange={handleInputChange}>
        {designations.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <br />
      <label>Gender:</label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={employee.gender === 'Male'}
        onChange={handleInputChange}
      />
      Male
      <br />
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={employee.gender === 'Female'}
        onChange={handleInputChange}
      />
      Female
      <br />
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
      <br />
      <label>Current Image:</label>
      {employee.image && (
        <img
          src={`http://localhost:5000${employee.image}`}
          alt="Employee"
          style={{ width: '100px', height: '100px' }}
        />
      )}
      <br />
      <label>New Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditEmployee;
