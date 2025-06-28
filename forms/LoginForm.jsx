import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './Register.css'; // Assuming you have a CSS file for styling

const LoginForm = ({ onSwitchToLogin }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add form submission logic here
    };

    return (
        <div className="register-container">

            <form className="register-form" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <span className="icon" onClick={togglePassword}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </label>

                <button type="submit">Login</button>
                <p className="switch-link">
                    Do not  have an account?{' '}
                    <a href="./RegisterForm" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
                        Register
                    </a>
                </p>

            </form>
        </div>
    );
};

export default LoginForm;
