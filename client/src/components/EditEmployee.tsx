import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditEmployee.module.css";
import { fetchEmployee } from "../Service/FetchEmployee";
import type { Employee } from "../Interface/Employee";
import handleEditEmployee from "../Service/EditEmployee";

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

    setEmployee((prev: Employee | null) => {
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

    const imageUrl = newImage ? URL.createObjectURL(newImage) : null;
    await handleEditEmployee(e, employee, id, imageUrl, setError);
    navigate("/employees");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!employee) return <p>No employee data found!</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles["form-group"]}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Designation:</label>
        <select
          name="designation"
          value={employee.designation}
          onChange={handleInputChange}
        >
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["form-group"]}>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={employee.gender === "Male"}
            onChange={handleInputChange}
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
          />
          Female
        </label>
      </div>

      <div className={styles["form-group"]}>
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

      <div className={styles["form-group"]}>
        <label>Current Image:</label>
        {employee.image && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${employee.image}`}
            alt="Employee"
            className={styles.employeeImage}
          />
        )}
      </div>

      <div className={styles["form-group"]}>
        <label>Image Upload:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>

      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
}
