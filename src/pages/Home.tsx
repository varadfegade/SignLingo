import React from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page animate-fade-in">
            <section className="hero container">
                <div className="hero-content">
                    <div className="badge">
                        <Activity size={14} className="badge-icon" />
                        <span>High-Precision Tracking</span>
                    </div>
                    <h1 className="hero-title">Communication Without <span className="text-primary">Barriers</span></h1>
                    <p className="hero-subtitle">
                        SignLingo translates sign language to text in real-time. Built on enterprise-grade computer vision models running entirely within your browser for ultimate privacy and speed.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/convert')}>
                            Launch Converter <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/features')}>
                            Explore Platform
                        </button>
                    </div>
                </div>
            </section>

            <section className="mission container stagger-1">
                <div className="mission-card glass-panel">
                    <h2>Our Philosophy</h2>
                    <p>We designed SignLingo to be completely serverless. By executing complex neural networks directly on your device's GPU, we ensure maximum privacy, zero latency transmission, and an architecture that scales infinitely.</p>
                </div>
            </section>

            <section className="tech-stack container stagger-2">
                <div className="tech-title">Powered by Modern Technology</div>
                <div className="tech-icons">
                    <div className="tech-icon"><Zap size={20} /> WebAssembly</div>
                    <div className="tech-icon"><Activity size={20} /> MediaPipe Vision</div>
                    <div className="tech-icon"><ShieldCheck size={20} /> Edge Computing</div>
                </div>
            </section>
        </div>
    );
};

export default Home;
