import React from 'react';
import { Activity, Zap, PlayCircle, Eye, HandMetal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface HomeProps {
    isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    return (
        <div className="home-page container">
            
            {/* DYNAMIC HERO SECTION */}
            <section className="hero-dynamic">
                <div className="title-glass-card">
                    <div className="hero-badge">
                        <span className="live-dot-pulse"></span> Intelligent Translation Engine
                    </div>
                    
                    <h1 className="hero-title text-gradient">
                        SIGNLINGO
                    </h1>
                    
                    <p className="hero-subtitle">
                        Experience the world's most advanced neural network for real-time sign language translation. Native, fast, and completely private inside your browser.
                    </p>
                    
                    <div className="hero-actions">
                        {isAuthenticated ? (
                            <button className="btn btn-primary btn-magnetic" onClick={() => navigate('/convert')}>
                                <span className="cta-icon"><Activity size={20} /></span>
                                Initialize Engine
                            </button>
                        ) : (
                            <button className="btn btn-primary btn-magnetic" onClick={() => navigate('/login')}>
                                <span className="cta-icon"><Zap size={20} /></span>
                                Secure Access
                            </button>
                        )}
                    </div>
                </div>

                {/* Overlapping Feature Nodes */}
                <div className="floating-feature fl-1">
                    <div className="feature-icon bg-orange-light"><Eye size={24} className="text-accent" /></div>
                    <div className="feature-text">
                        <strong>60 FPS Neural Tracking</strong>
                        <span>Flawless camera translation</span>
                    </div>
                </div>

                <div className="floating-feature fl-2">
                    <div className="feature-icon bg-green-light"><HandMetal size={24} className="text-secondary" /></div>
                    <div className="feature-text">
                        <strong>Global Dictionary</strong>
                        <span>Recognizes precise micro-gestures</span>
                    </div>
                </div>

                <div className="floating-feature fl-3">
                    <div className="feature-icon bg-orange-light"><PlayCircle size={24} className="text-accent" /></div>
                    <div className="feature-text">
                        <strong>Zero Latency</strong>
                        <span>WASM Hardware Acceleration</span>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
