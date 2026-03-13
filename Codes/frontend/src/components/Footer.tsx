import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer border-top">
            <div className="container footer-container">
                <div className="footer-brand">
                    <h3 className="text-gradient">SignLingo</h3>
                    <p className="footer-desc">Bridging the communication gap with cutting-edge AI and computer vision directly in your browser.</p>
                </div>

                <div className="footer-links">
                    <h4>Platform</h4>
                    <a href="/features">Features</a>
                    <a href="/learn">Learn Signs</a>
                    <a href="/convert">Live Converter</a>
                </div>

                <div className="footer-social">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <a href="#" aria-label="Github"><Github size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} SignLingo. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
