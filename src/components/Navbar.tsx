import React from 'react';
import { NavLink } from 'react-router-dom';
import { HandMetal } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container container">
                <NavLink to="/" className="navbar-logo">
                    <HandMetal className="logo-icon" size={24} />
                    <span className="logo-text">SignLingo</span>
                </NavLink>

                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/features" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Solutions
                    </NavLink>
                    <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Documentation
                    </NavLink>
                    <NavLink to="/convert" className={({ isActive }) => `nav-link nav-btn ${isActive ? 'active' : ''}`}>
                        Launch Translator
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
