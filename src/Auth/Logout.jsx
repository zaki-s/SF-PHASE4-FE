import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import './Logout.css';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/login');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="logout-container">
      <X className="close-icon" onClick={goHome} />
      <h2 className="wers">Are you sure you want to logout?</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
