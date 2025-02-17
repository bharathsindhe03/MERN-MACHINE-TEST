import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllEmployees } from "../../Service/FetchAllEmployee";
import { handleDeleteEmployee } from "../../Service/DeleteEmployee";
import Navbar from "../../components/Navbar/Navbar";

import type { Employee } from "../../Interface/Employee";

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEmployees(setEmployees, setFilteredEmployees);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value?.toString().toLowerCase().includes(term)
      )
    );
    setFilteredEmployees(filtered);
  };

  const editEmployee = async (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const deleteEmployee = async (id: string) => {
    await handleDeleteEmployee(id, setEmployees, setFilteredEmployees);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => navigate("/createEmployee")}
            className="ml-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Create Employee
          </button>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.eid} className="border-b">
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.mobile}</td>
                  <td className="px-4 py-2">{employee.designation}</td>
                  <td className="px-4 py-2">
                    {employee.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${
                          employee.image
                        }`}
                        alt="Employee"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => editEmployee(employee.eid)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>{" "}
                    -{" "}
                    <button
                      onClick={() => deleteEmployee(employee.eid)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
