import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    // remove the token from local storage
    localStorage.removeItem('adminToken');
    // Add any logout logic here (e.g., clearing tokens, state, etc.)
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <h1>Admin Dashboard</h1>
      <div className="nav-links">
        <Link 
          to="/dashboard/users" 
          className={location.pathname === '/dashboard/users' ? 'active' : ''}
        >
          Users
        </Link>
        {/* <Link 
          to="/dashboard/payment" 
          className={location.pathname === '/dashboard/payment' ? 'active' : ''}
        >
          Payment
        </Link> */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
