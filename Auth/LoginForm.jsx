import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Register.css'; // Assuming you have a CSS file for styling

const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // still useful for debugging

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert('✅ Login successful');
                // optionally redirect or store token
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch  {
            alert('❌ Network error. Please check your connection.');
        }
    };
    
    return (
        <div className="register-container">

            <form className="register-form" onSubmit={handleSubmit}>
                <div><X className="close-icon" onClick={() => window.history.back()} /></div>
                <h2>Login </h2>

                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <div className="password-input-wrapper">
                        <input type={showPassword ? 'text' : 'password'}
                            name="password" value={formData.password} onChange={handleChange} required />
                        <span className="icon" onClick={togglePassword}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </label>

                <button type="submit">Login</button>
                <p className="switch-link">
                    Do not  have an account?{' '}
                    <Link to="/register">Register</Link>

                </p>
                <p className="switch-link">
                    {' '}
                    <Link to="/Logout">Logout ? </Link>                </p>

            </form>
        </div>
    );
};

export default LoginForm;
