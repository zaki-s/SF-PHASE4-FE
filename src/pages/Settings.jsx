import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css'; // Ensure you have a CSS file for styling

const Settings = () => {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        notifications: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        alert('✅ Settings updated!');
        console.log(formData);
    };

    return (
        <div className="settings-container">
            <h2>User Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">

                <label>
                    Full Name
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Email Address
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />
                </label>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleChange}
                    />
                    Enable Email Notifications
                </label>

                <button type="submit">Save Settings</button>
                <button type="button" onClick={() => alert('Settings reset!')}>
                    Reset Settings  
               
                    
                </button>
                 <p className="switch-link">
                                    {' '}
                                    <Link to="/" className='switch-link'>Go Back TO Homepage</Link>
                
                                </p>
            </form>
        </div>
    );
};

export default Settings;
