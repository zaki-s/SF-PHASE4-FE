
import React, { useState } from 'react';
import './Logout.css';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut , X } from 'lucide-react'; // Assuming you have lucide-react installed for icons

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        if (token) {
            try {
                // Tell the server to invalidate the token
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (err) {
                console.error("Server logout failed, but proceeding with client-side logout.", err);
            }
        }

        // Always clear the token from local storage
        localStorage.removeItem('accessToken');

        // Redirect to home page
        setLoading(false);
        navigate('/login');
    };

    const goHome = () => {
        navigate('/home');
    };
    return (
        <div className="logout-container">
            <X className="close-icon" onClick={goHome} />

            <h2 className='wers'>Are you sure you want to logout?</h2>
            <button className="logout-button" onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default Logout;
