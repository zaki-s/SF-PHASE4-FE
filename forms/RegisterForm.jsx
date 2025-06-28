import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ResetPassword from './ResetPassword';
import { Eye, EyeOff } from 'lucide-react';
import './Register.css'; // Assuming you have a CSS file for styling

const RegisterForm = ({ onSwitchToLogin }) => {
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
                <h2>Register</h2>
                <label>
                    Name
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input 
                        type={showPassword ? 'text' : 'password'}
                    onClick={() => setShowPassword(!showPassword)}
                    name="password" 
                    value={formData.password} onChange={handleChange} required />
                    <span className="icon" onClick={togglePassword}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span> 
                    
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span className="icon" onClick={togglePassword}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>

                </label>
                <button type="submit">Register</button>
                <p className="switch-link">
                    Already have an account?{' '}
                    <a href='./LoginForm' onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
                        Login
                    </a>
                </p>
                <p className="switch-link">
                    {' '}
                    <a href='resetPassword' onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
                        Reset Password
                    </a>
                </p>

            </form>
        </div>
    );
};

export default RegisterForm;
