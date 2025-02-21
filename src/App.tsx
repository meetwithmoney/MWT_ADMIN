import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Users from './components/Users';
  import Payment from './components/Payment';
  import ProtectedRoute from './context/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={   
              <PrivateRoute>
                <>
                  <Navbar />
                  <Outlet />
                </>
              </PrivateRoute>
            }
          >
            <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            {/* <Route path="payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
