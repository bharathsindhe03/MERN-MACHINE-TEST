import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployee } from "../../Service/FetchEmployee";
import type { Employee } from "../../Interface/Employee";
import handleEditEmployee from "../../Service/EditEmployee";
import toast from "react-hot-toast";
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
      navigate("/employees");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) return <Animation />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!employee) return <p className="text-center">No employee data found!</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Mobile:</label>
          <input
            type="number"
            name="mobile"
            value={employee.mobile}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Designation:</label>
          <select
            name="designation"
            value={employee.designation}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          >
            {designations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Gender:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employee.gender === "Male"}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employee.gender === "Female"}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label className="block font-semibold">Courses:</label>
          <div className="flex flex-wrap gap-4">
            {coursesList.map((course) => (
              <label key={course} className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value={course}
                  checked={(employee.course || []).includes(course)}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {course}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold">Current Image:</label>
          {employee.image && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${employee.image}`}
              alt="Employee"
              className="w-24 h-24 rounded-full mt-2"
            />
          )}
        </div>
        <div>
          <label className="block font-semibold">New Image Upload:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">New Image Preview:</label>
          {newImage && (
            <img
              src={URL.createObjectURL(newImage)}
              alt="New Preview"
              className="w-24 h-24 rounded-full mt-2"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
