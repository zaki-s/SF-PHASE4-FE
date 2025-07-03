import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Assuming you have a CSS file for styling

const LoginForm = () => {
    const [formData, setFormData] = useState({
        login: '', // Can be username or email
        password: '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Assuming the token is in data.access_token
                localStorage.setItem('accessToken', data.access_token);
                setSuccess('✅ Login successful! Redirecting...');
                setTimeout(() => {
                    navigate('/home'); // Redirect to the home page
                }, 1500);
            } else {
                setError(data.msg || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
            console.error("Login error:", err);
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
                <h2 className='resw'>Login</h2>
                <X className="close-icon" onClick={goHome} />

                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <label>
                    Username or Email
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
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

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="switch-link">
                    Don't have an account?{' '}
                    <Link to="/" className='switch-link'>Register</Link>
                </p>
                <p className="switch-link">
                    Forgot Password?{' '}
                    <Link to="/reset" className='switch-link'>Reset</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
