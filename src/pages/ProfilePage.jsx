import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';
import userIcon from '../assets/user.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Anonymous',
    email: 'anonymous@example.com',
    bio: 'This is your bio. Tell us something cool about you!',
  });

  const [formData, setFormData] = useState(profileData);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
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
    setFormData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-wrapper">
      <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <h1 className="logo">
          <Link to="/" className="logo">SF</Link>
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
                <li onClick={() => window.location.href = '/profile'}>
                  <img src={profileIcon} alt="Profile Icon" width={10} className="profile-icon" />
                  My Profile
                </li>
                <li onClick={() => window.location.href = '/settings'}>
                  <img src={settingsIcon} alt="Settings Icon" width={10} className="settings-icon" />
                  Settings
                </li>
                <li className="logout" onClick={() => window.location.href = '/logout'}>
                  <img src={logoutIcon} alt="Logout Icon" width={10} className="logout-icon" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

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

        <div className="profile-info">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
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
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
