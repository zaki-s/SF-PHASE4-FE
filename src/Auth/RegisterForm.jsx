import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import './Register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setMessage('');
      return;
    }
    setError('');

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Network error. Please check your connection.');
    }
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="resw">Register</h2>
        <X className="close-icon" onClick={goHome} />
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
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
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="icon" onClick={togglePassword}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </label>
        <label className="poyt">
          Confirm Password
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="icon" onClick={togglePassword}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </label>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Register</button>
        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="switch-link">
          Forgot <Link to="/reset">RESET Password</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
