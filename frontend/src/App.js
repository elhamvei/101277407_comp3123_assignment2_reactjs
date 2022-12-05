import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import Login from './Login';
import EmployeesList from './components/EmployeesList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';
import EmployeeView from './components/EmployeeView';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Authenticated = () => {
    setIsAuthenticated(true);
  }

  return (
    <>
      {isAuthenticated ?
      <>
        <Routes>
            <Route index element={<EmployeesList />} />
            <Route path="employees" element={<EmployeesList />} />
            <Route path="form" element={<EmployeeForm />} />
            <Route path="view" element={<EmployeeView />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
        </>
        :
        <Login authticateAction={Authenticated} />
      }
    </>
  );
}

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <>
      <h1>Employee Managment App</h1>

      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}
      >
        <NavLink to="/home" style={style}>
          Home
        </NavLink>
        <NavLink to="/employees" style={style}>
          Employees
        </NavLink>
        <NavLink to="/employeeForm" style={style}>
          Employee Form
        </NavLink>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </>
  );
};


export default App;
