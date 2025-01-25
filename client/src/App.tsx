import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Animation from "./components/Animation/Animation";
// Lazy load the components
const Login = React.lazy(() => import("./components/Login"));
const Signup = React.lazy(() => import("./components/Signup"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Employees = React.lazy(() => import("./components/Employee"));
const CreateEmployee = React.lazy(() => import("./components/CreateEmployee"));
const EditEmployee = React.lazy(() => import("./components/EditEmployee"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Animation />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
