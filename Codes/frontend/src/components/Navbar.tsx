import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Compass, BookOpen, Mic, LogOut, Menu, X, Activity } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <NavLink to="/" className="sidebar-logo">
                    <div className="logo-icon-wrapper">
                        <Activity size={24} className="logo-icon" />
                    </div>
                    <span className="logo-text">SIGN<span className="text-accent">LINGO</span></span>
                </NavLink>
            </div>

            <button className="mobile-menu-btn" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div className={`sidebar-menu ${isMenuOpen ? 'mobile-open' : ''}`}>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} className="nav-item-icon" /> Dashboard
                </NavLink>
                <NavLink to="/features" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Compass size={20} className="nav-item-icon" /> Capabilities
                </NavLink>
                <NavLink to="/learn" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BookOpen size={20} className="nav-item-icon" /> Learn Gestures
                </NavLink>
                
                {isAuthenticated && (
                    <NavLink to="/convert" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Mic size={20} className="nav-item-icon" /> Translator
                    </NavLink>
                )}
            </div>

            <div className={`sidebar-footer ${isMenuOpen ? 'mobile-open' : ''}`}>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={18} /> Logout
                    </button>
                ) : (
                    <NavLink to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
