import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginData } from 'features/auth/loginSlice';
import { AppDispatch } from 'app/store';
import { useAppDispatch } from 'app/hook';
import { OK } from 'config/httpStatusCodes';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Test@123');

  const dispatch = useAppDispatch();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
      
      const loginAction = loginData({ email: username, password });
      const { payload } = await (dispatch as AppDispatch)(loginAction);
      if(payload && payload.status === OK && payload.data.responseData){
        console.log("payload:::", payload.data.responseData);
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('adminToken', token);
        login();
        navigate('/dashboard/users', { replace: true });
      }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
