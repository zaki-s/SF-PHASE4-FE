import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Register.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Login successful');
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert('❌ Network error. Please check your connection.');
    }
  };

  const gohome = () => {
    window.location.href = '/';
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div>
          <X className="close-icon" onClick={gohome} />
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="swilkj">Login </h2>
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
          <button type="submit">Login</button>
          <p className="switch-link">
            Do not have an account? <Link to="/register">Register</Link>
          </p>
          <p className="switch-link">
            <Link to="/logout">Logout ?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
