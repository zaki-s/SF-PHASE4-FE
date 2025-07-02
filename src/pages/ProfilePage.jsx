import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';
import userIcon from '../assets/user.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // Use 'username' to match the backend model
  const [formData, setFormData] = useState({ username: '', email: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('accessToken');

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile data.');
        }

        const data = await res.json();
        // Ensure all fields have a value to avoid uncontrolled component warnings
        setFormData({
          username: data.username || '',
          email: data.email || '',
          bio: data.bio || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // You might want to refetch data here to discard changes
  };

  const handleSave = async () => {
    setError('');
    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || 'Failed to update profile.');
      }

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-wrapper">
      <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <h1 className="logo" onClick={() => navigate('/home')}>
          <span className="logo">SF</span>
        </h1>
        <div className="navlinks">
          <ul className="navlist">
            <li><Link to="/journey">Journey</Link></li>
            <li><Link to="/progress">My Progress</Link></li>
          </ul>
        </div>
        <div className="profile" onClick={toggleDropdown} onBlur={closeDropdown} tabIndex="0">
          <img src={userIcon} alt="User Icon" width={32} className="profileicon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="username">Anonymous</p>
              </div>
              <ul>
                <li onClick={() => navigate('/profile')}>
                  <img src={profileIcon} alt="Profile Icon" width={10} className="profile-icon" />
                  My Profile
                </li>
                <li onClick={() => navigate('/settings')}>
                  <img src={settingsIcon} alt="Settings Icon" width={10} className="settings-icon" />
                  Settings
                </li>
                <li className="logout" onClick={() => navigate('/logout')}>
                  <img src={logoutIcon} alt="Logout Icon" width={10} className="logout-icon" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {error && <p className="profile-error">{error}</p>}

      <div className="profile-heading">
        <h1>My Profile</h1>
        <p className="subtext">View and edit your profile information</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <h2>Profile Information</h2>
          {!isEditing && (
            <button className="edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>

        <div className="profile-picture">
          <div className="avatar-placeholder">👤</div>
        </div>

        {loading ? <p>Loading profile...</p> : <div className="profile-info">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Bio
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          {isEditing && (
            <div className="action-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default ProfilePage;
