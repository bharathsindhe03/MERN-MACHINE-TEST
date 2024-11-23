import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Employees from './components/Employee';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee'
const App = () => {

    const [employees, setEmployees] = useState([]); // Ensure this is initialized as an empty array
  
    const handleCreateEmployee = (newEmployee) => {
      setEmployees([...employees, newEmployee]); // Add new employee to the list
    };

  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/createEmployee" element={<CreateEmployee onCreate={handleCreateEmployee} />}/>
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
