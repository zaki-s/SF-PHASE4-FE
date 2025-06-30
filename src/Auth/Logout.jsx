
import React from 'react';
import './Logout.css';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut , X } from 'lucide-react'; // Assuming you have lucide-react installed for icons

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // ✅ Clear token from localStorage
        localStorage.removeItem('token');

        // ✅ Optional callback
        if (onLogout) onLogout();

        // ✅ Redirect to login
        navigate('/login');
    };
    const goHome = () => {
        navigate('/');
    };
    return (
        <div className="logout-container">
            <X className="close-icon" onClick={goHome} />

            <h2 className='wers'>Are you sure you want to logout?</h2>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            
        </div>
    );
};

export default Logout;
