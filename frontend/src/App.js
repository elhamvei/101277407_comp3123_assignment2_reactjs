import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import Login from './Login';
import EmployeesList from './components/EmployeesList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';
import EmployeeView from './components/EmployeeView';
import Signup from './components/Signup';
import Toolbar from './components/Toolbar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Authenticated = () => {
    setIsAuthenticated(true);
  }

  return (
    <div>
    <Toolbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
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
        <Routes>
          <Route index element={<Login authticateAction={Authenticated} />} />
          <Route path="login" element={<Login authticateAction={Authenticated} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<p>You can not access to this page</p>} />
        </Routes>

      }
    </div>
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
