
import React from 'react';
import './Logout.css';
import { LogOut , X } from 'lucide-react'; // Assuming you have lucide-react installed for icons

const Logout = ({ onLogout }) => {
    const handleLogout = () => {
        // Clear user session, tokens, etc.
        if (onLogout) onLogout();
    };

    return (
        <div className="logout-container">
            <X className="close-icon"  />

            <h2>Are you sure you want to logout?</h2>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
