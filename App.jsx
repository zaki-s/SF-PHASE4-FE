import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import ResetPassword from './forms/ResetPassword';
import Logout from './forms/Logout';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
