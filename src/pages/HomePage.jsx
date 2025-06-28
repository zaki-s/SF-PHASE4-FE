

import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import userIcon from '../assets/user.svg';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/twitter.svg';
import profileIcon from '../assets/profile.svg'
import settingsIcon from '../assets/settings.svg';
import logoutIcon from '../assets/logout.svg'

const HomePage = () => {
    const [scrolled, setScrolled] = useState(false); //this is for the sticky navbar but ill do it later (the styling that is)

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
        <div className="Homepage">
            <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <h1 classname="logo">SF</h1>
                <div className="navlinks">
                    <ul className="navlist">
                        <li>Journey</li>
                        <li>My Progress</li>
                        <li>Milestones</li>
                        <li>Contacts</li>
                        <li>FAQ's</li>
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

            <div className="hero">
                <h1 className="txt1">Master Skills</h1>
                <h1 className="hero-title gradient-text">Track Your Journey</h1>
                <p>Make your skill learning manageable with our user frinedly skill/journey tracking platform.</p>
                <p>Set goals, track progress, celebrate milestones and unlock your potential across all skills and BEYOND!</p>
                <button className="startbtn">Start a Journey</button>
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
                            <img src={instagramIcon} alt="User Icon" width={32} className="igicon" />
                        </li>

                        <li>
                            <img src={twitterIcon} alt="User Icon" width={32} className="igicon" />
                        </li>
                    </ul>
                </div>
            </div>



        </div>

    )
}

export default HomePage;