import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Employees from './components/Employee';
import CreateEmployee from './components/CreateEmpolyee';

const App = () => {
  const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
  };
    const [employees, setEmployees] = useState([]); // Ensure this is initialized as an empty array
  
    const handleCreateEmployee = (newEmployee) => {
      setEmployees([...employees, newEmployee]); // Add new employee to the list
    };

  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/employees" element={<PrivateRoute element={<Employees />} />} />
        <Route path="/createEmployee" element={<CreateEmployee onCreate={handleCreateEmployee} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
