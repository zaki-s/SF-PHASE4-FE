


import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
    console.log("im running");

    return (
        <div className="Homepage">
            <div className="navbar">
                <h1 classname="logo">SKILLFORGE</h1>
                <div className="navlinks">
                    <ul>
                        <li>Journey</li>
                        <li>My Progress</li>
                        <li>Milestones</li>
                        <li>Contacts</li>
                        <li>FAQ's</li>
                    </ul>
                </div>
                <div className="profile">
                    <img src="{userIcon}" alt="User Icon" className="profileicon" />
                </div>
            </div>

            <div className="hero">
                <h1>Master Skills</h1>
                <h1>Track Your Journey</h1>
                <p>Make your skill learning manageable with our user frinedly skill/journey tracking platform.</p>
                <p>Set goals, track progress, celebrate milestones and unlock your potential across all skills and BEYOND!</p>
                <button className="startbtn">Start a Journey</button>
            </div>

            <div className="features">
                <div className="feature1">
                    <h2>Structured Learning</h2>
                    <p>Organize your learning path with clear objectives and structured progression</p>
                </div>

                <div className="feature2">
                    <h2>Achievement system</h2>
                    <p>Celebrate your wins with our milestones, badges and progress tracking system</p>
                </div>

                <div className="feature3">
                    <h2>Community Support</h2>
                    <p>Connect with like-minded learners, share experiences and get support from our community</p>
                </div>
            </div>

            <div className="datavisual">
                <div className="dv1">
                    <h1>05</h1>
                    <p>Active Skill</p>
                </div>

                <div className="dv2">
                    <h1>12</h1>
                    <p>Hours Logged</p>
                </div>

                <div className="dv3">
                    <h1>02</h1>
                    <p>Milestones</p>
                </div>

                <div className="dv4">
                    <h1>10%</h1>
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
                    <div className="socials">
                        <ul>
                            <li>Instagram</li>
                            <li>X</li>
                            <li>YOUTUBE</li>
                            <li>Whatsapp</li>
                        </ul>
                    </div>
                </div>
            </div>



        </div>

    )
}

export default HomePage;