import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import './Register.css'; // Assuming you have a CSS file for styling

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // still useful for debugging
        setSuccess('');
        setError(''); // Clear previous errors

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            // Destructure to remove confirmPassword before sending to backend
            const { confirmPassword, ...payload } = formData;

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('✅ Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after a short delay
                }, 2000);
            } else {
                setError(data.msg || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };
    const goHome = () => {
        navigate('/home');
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                
                <h2 className='resw'>Register</h2>
                <X className="close-icon" onClick={goHome} />

                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <label>
                    Username
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required disabled={loading} />
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} />
                </label>
                <label>
                    Password
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <span className="icon" onClick={() => setShowPassword(p => !p)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </label>
                <label className='poyt'>
                    Confirm Password
                    <div className="password-input-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <span className="icon" onClick={() => setShowConfirmPassword(p => !p)}>
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                <p className="switch-link">
                    Already have an account?{' '}
                    <Link to="/login" className='switch-link'>Login</Link>

                </p>
                <p className="switch-link">
                   Forgot {' '}
                    <Link to="/reset" className='switch-link'>RESET Password</Link>

                </p>

            </form>
        </div>
    );
};

export default RegisterForm;
