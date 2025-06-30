import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // Assuming you have lucide-react installed for icons
import './ResetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        try {
            // Simulate API request
            setTimeout(() => {
                setMessage('Password reset link has been sent to your email.');
            }, 1000);
        } catch {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <X className="close-icon" onClick={() => window.history.back()} />

            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}

                <button type="submit">Send Reset Link</button>
            </form>

            <p className="switch-link">
                Remember your password?{' '}
                <Link to="/login">Login</Link>

            </p>
        </div>
    );
};

export default ResetPassword;
