import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import userIcon from '../assets/user.svg';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/twitter.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for an access token in localStorage to determine auth state
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigate]); // Rerun when navigation might change auth state

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    const closeDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className="Homepage">
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
                {isAuthenticated ? (
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
                ) : (
                    <div className="auth-buttons">
                        <button className="auth-btn login-btn" onClick={() => navigate('/login')}>Login</button>
                        <button className="auth-btn register-btn" onClick={() => navigate('/')}>Register</button>
                    </div>
                )}
            </div>

            <div className="hero">
                <h1 className="txt1">Master Skills</h1>
                <h1 className="hero-title gradient-text">Track Your Journey</h1>
                <p>Make your skill learning manageable with our user-friendly skill/journey tracking platform.</p>
                <p>Set goals, track progress, celebrate milestones and unlock your potential across all skills and BEYOND!</p>
                <button className="startbtn">
                    <Link to="/journey" className="startbtn">
                        Start a Journey
                    </Link>
                </button>
            </div>

            <div className="features">
                <div className="feature-card">
                    <h2 className="feature-title">Structured Learning</h2>
                    <p className="feature-description">
                        Organize your learning path with clear objectives and structured progression.
                    </p>
                </div>
                <div className="feature-card">
                    <h2 className="feature-title">Achievement System</h2>
                    <p className="feature-description">
                        Celebrate your wins with milestones, badges, and progress tracking.
                    </p>
                </div>
                <div className="feature-card">
                    <h2 className="feature-title">Smart Analytics</h2>
                    <p className="feature-description">
                        Get insights into your learning patterns and optimize your growth.
                    </p>
                </div>
            </div>

            <div className="datavisual">
                <div className="dv1">
                    <h1 className="as">05</h1>
                    <p>Active Skill</p>
                </div>
                <div className="dv1">
                    <h1 className="hrs">12</h1>
                    <p>Hours Logged</p>
                </div>
                <div className="dv1">
                    <h1 className="ms">02</h1>
                    <p>Milestones</p>
                </div>
                <div className="dv1">
                    <h1 className="wg">10%</h1>
                    <p>Weekly Goal</p>
                </div>
            </div>

            <div className="footer">
                <div className="footerleft">
                    <p>© 2023 SkillForge. All rights reserved.</p>
                </div>
                <div className="footermiddle">
                    <p>made by 5</p>
                </div>
                <div className="footerright">
                    <ul>
                        <li>
                            <img src={instagramIcon} alt="Instagram Icon" width={32} className="igicon" />
                        </li>
                        <li>
                            <img src={twitterIcon} alt="Twitter Icon" width={32} className="igicon" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
