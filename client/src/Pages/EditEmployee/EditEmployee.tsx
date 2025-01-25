import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditEmployee.module.css";
import { fetchEmployee } from "../../Service/FetchEmployee";
import type { Employee } from "../../Interface/Employee";
import handleEditEmployee from "../../Service/EditEmployee";
import { toast } from "react-toastify";
import Animation from "../../components/Animation/Animation";
export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const designations = ["HR", "Manager", "Sales"];
  const coursesList = ["MCA", "BCA", "BSC"];

  useEffect(() => {
    if (id) {
      fetchEmployee(id, setEmployee, setLoading, setError);
    }
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setEmployee((prev) => {
      if (!prev) return prev;
      if (type === "checkbox" && name === "course") {
        const updatedCourses = checked
          ? [...prev.course, value]
          : prev.course.filter((c) => c !== value);

        return { ...prev, course: updatedCourses };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!employee || !id) return;

    try {
      await handleEditEmployee(e, employee, id, newImage, setError);
      toast.success("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      toast.error("Failed to update employee.");
    }
  };

  if (loading) {
    return <Animation />;
  }
  if (error) return <p className={styles.error}>{error}</p>;
  if (!employee) return <p>No employee data found!</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleInputChange}
          className={styles.input}
          pattern="\d*"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Designation:</label>
        <select
          name="designation"
          value={employee.designation}
          onChange={handleInputChange}
          className={styles.select}
          required
        >
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={employee.gender === "Male"}
            onChange={handleInputChange}
            className={styles.radio}
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={employee.gender === "Female"}
            onChange={handleInputChange}
            className={styles.radio}
            required
          />
          Female
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Courses:</label>
        {coursesList.map((course) => (
          <label key={course} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="course"
              value={course}
              checked={(employee.course || []).includes(course)}
              onChange={handleInputChange}
              className={styles.checkbox}
            />
            {course}
          </label>
        ))}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Current Image:</label>
        {employee.image && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${employee.image}`}
            alt="Employee"
            className={styles.employeeImage}
          />
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>New Image Upload:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>New Image Preview:</label>
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt="New Preview"
            className={styles.employeeImage}
          />
        )}
      </div>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
