import React, { useEffect, useState } from 'react';
import '../styles/JourneyPage.css';  
import userIcon from '../assets/user.svg';
import profileIcon from '../assets/profile.svg';
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg';

const JourneyPage = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    console.log("im running");

    return (
        <div className="Journeypage">
            <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <h1 className="logo">SF</h1>
                <div className="navlinks">
                    <ul className="navlist">
                        <li>Journey</li>
                        <li>My Progress</li>
                        <li>Milestones</li>
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
                                <li>
                                    <img src={profileIcon} alt="Profile Icon" width={10} className="profile-icon" />
                                    My Profile
                                </li>
                                <li>
                                    <img src={settingsIcon} alt="Settings Icon" width={10} className="settings-icon" />
                                    Settings
                                </li>
                                <li className="logout">
                                    <img src={logoutIcon} alt="Logout Icon" width={10} className="logout-icon" />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="janipage">
                <div className="journey-content">
                    <div className="header1">
                        <div className="headertexts">
                            <h1>Your Learning Journey</h1>
                            <p>Track your progress and unlock your potential!</p>
                        </div>
                        <button className="addjanibtn">Add Journey</button>
                    </div>

                    <div className="journeycard">
                        <div className="card">
                            <h2 className="card-title">React Basics</h2>
                            <ul className="step-list">
                                <li><input type="checkbox" /> JSX & Components</li>
                                <li><input type="checkbox" /> Props & State</li>
                                <li><input type="checkbox" /> Event Handling</li>
                            </ul>
                            <button className="card-button">Start Journey</button>
                        </div>

                        <div className="card">
                            <h2 className="card-title">CSS Mastery</h2>
                            <ul className="step-list">
                                <li><input type="checkbox" /> Flexbox</li>
                                <li><input type="checkbox" /> Grid</li>
                                <li><input type="checkbox" /> Animations</li>
                            </ul>
                            <button className="card-button">Start Journey</button>
                        </div>

                        <div className="card">
                            <h2 className="card-title">JavaScript Essentials</h2>
                            <ul className="step-list">
                                <li><input type="checkbox" /> Variables & Types</li>
                                <li><input type="checkbox" /> Functions</li>
                                <li><input type="checkbox" /> DOM Manipulation</li>
                            </ul>
                            <button className="card-button">Start Journey</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JourneyPage;
