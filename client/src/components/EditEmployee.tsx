import { useState, useEffect, ChangeEvent, FormEvent } from "react"; // Importing React hooks and event types
import { useParams, useNavigate } from "react-router-dom"; // Importing React Router hooks
import styles from "./EditEmployee.module.css"; // Importing CSS module for styling

// Define the Employee interface
interface Employee {
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  image: string | null;
}

// Main EditEmployee component
const EditEmployee = () => {
  const { id } = useParams(); // Extract employee ID from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [employee, setEmployee] = useState<Employee | null>(null); // State to store employee details
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store error message
  const [newImage, setNewImage] = useState<File | null>(null); // State for new image upload

  // Predefined options
  const designations = ["HR", "Manager", "Sales"];
  const coursesList = ["MCA", "BCA", "BSC"];

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        setEmployee(data); // Store fetched data in state
      } catch (err: any) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle text, select, and checkbox input changes
  const handleInputChange = (e: any) => {
    const { name, value, checked, type } = e.target;

    setEmployee((prev) => {
      if (!prev) return prev;

      if (name === "course" && type === "checkbox") {
        const updatedCourses = checked
          ? [...(prev.course || []), value]
          : (prev.course || []).filter((c) => c !== value);

        return { ...prev, course: updatedCourses };
      }

      return { ...prev, [name]: value };
    });
  };

  // Handle file input changes
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!employee) return;

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobile", employee.mobile);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("course", JSON.stringify(employee.course));
    if (newImage) formData.append("image", newImage);

    try {
      const response = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update employee");
      navigate("/employees"); // Redirect on success
    } catch (err: any) {
      console.error("Error updating employee:", err.message);
      setError(err.message);
    }
  };

  // Show loading state
  if (loading) return <p>Loading...</p>;

  // Show error state
  if (error) return <p>Error: {error}</p>;

  // Show null check for employee state
  if (!employee) return <p>No employee data found!</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Name */}
      <div className={styles["form-group"]}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Email */}
      <div className={styles["form-group"]}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
        />
      </div>

      {/* Mobile */}
      <div className={styles["form-group"]}>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleInputChange}
        />
      </div>

      {/* Designation */}
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

      {/* Gender */}
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

      {/* Courses */}
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

      {/* Image Preview */}
      <div className={styles["form-group"]}>
        <label>Current Image:</label>
        {employee.image && (
          <img
            src={`http://localhost:5000${employee.image}`}
            alt="Employee"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>

      {/* Image Upload */}
      <div className={styles["form-group"]}>
        <label>Image Upload:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
};

export default EditEmployee;
