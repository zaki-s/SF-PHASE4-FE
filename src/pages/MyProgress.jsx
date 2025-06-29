import React, { useEffect, useState } from 'react';
import '../styles/MyProgress.css';
import userIcon from '../assets/user.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';
import { Link } from 'react-router-dom'

const MyProgress = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="progresspage">
      <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <h1 className="logo"><Link to="/" className="logo">SF</Link></h1>
        <ul className="navlist">
          <li><Link to="/journey">Journey</Link></li>
          <li className="active">My Progress</li>
          <li>Milestones</li>
        </ul>
        <div className="profile" onClick={toggleDropdown} onBlur={closeDropdown} tabIndex="0">
          <img src={userIcon} alt="User Icon" width={32} className="profileicon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="username">Anonymous</p>
              </div>
              <ul>
                <li><img src={profileIcon} alt="Profile" /> My Profile</li>
                <li><img src={settingsIcon} alt="Settings" /> Settings</li>
                <li className="logout"><img src={logoutIcon} alt="Logout" /> Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="progress-content">
        <h2>Current Goals</h2>
        <div className="goal-card">
          <p className="goal-title">Complete React Course</p>
          <div className="progress-bar-container">
            <div className="progress-bar medium" style={{ width: '70%' }}></div>
          </div>
          <span className="progress-label">70% – 3 modules remaining</span>
        </div>

        <div className="goal-card">
          <p className="goal-title">Weekly Practice</p>
          <div className="progress-bar-container">
            <div className="progress-bar medium" style={{ width: '40%' }}></div>
          </div>
          <span className="progress-label">40% – 2 sessions done</span>
        </div>

        <h2>Journey Progress</h2>
        <div className="journey-grid">
          <div className="journey-card">
            <h3>React Basics</h3>
            <div className="progress-bar-container">
              <div className="progress-bar medium" style={{ width: '60%' }}></div>
            </div>
            <span className="progress-label">3 of 5 skills completed</span>
          </div>

          <div className="journey-card">
            <h3>CSS Mastery</h3>
            <div className="progress-bar-container">
              <div className="progress-bar high" style={{ width: '80%' }}></div>
            </div>
            <span className="progress-label">4 of 5 skills completed</span>
          </div>

          <div className="journey-card">
            <h3>JavaScript Ess.</h3>
            <div className="progress-bar-container">
              <div className="progress-bar low" style={{ width: '45%' }}></div>
            </div>
            <span className="progress-label">2 of 5 skills completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
