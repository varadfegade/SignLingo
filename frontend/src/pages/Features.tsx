import React from 'react';
import { Bot, Shield, GraduationCap, Zap, Globe, Smartphone } from 'lucide-react';
import './Features.css';

const featuresList = [
    {
        icon: <Bot size={32} />,
        title: 'Real-Time Translation',
        description: 'Advanced AI models translate your hand gestures into text instantly with high accuracy, bridging communication gaps seamlessly.'
    },
    {
        icon: <Shield size={32} />,
        title: 'Secure & Local',
        description: 'All processing happens entirely in your browser. Your webcam feed never leaves your device, ensuring complete privacy.'
    },
    {
        icon: <GraduationCap size={32} />,
        title: 'Interactive Learning',
        description: 'Not just a translator. SignLingo includes a comprehensive library to help you learn and practice sign language at your own pace.'
    },
    {
        icon: <Zap size={32} />,
        title: 'Lightning Fast',
        description: 'Optimized WebAssembly execution ensures smoother framerates even on low-end devices without noticeable latency.'
    },
    {
        icon: <Globe size={32} />,
        title: 'Universal Access',
        description: 'Works on any modern web browser without any installation, plugins, or dedicated native applications required.'
    },
    {
        icon: <Smartphone size={32} />,
        title: 'Mobile Friendly',
        description: 'Responsive design makes the gesture converter and learning modules usable on smartphones and tablets alike.'
    }
];

const Features: React.FC = () => {
    return (
        <div className="features-page animate-fade-in">
            <div className="container features-header">
                <h1 className="page-title">Enterprise Capabilities</h1>
                <p className="page-subtitle">Built with modern web technologies and resilient machine learning models to provide unmatched reliability and performance.</p>
            </div>

            <div className="container features-grid">
                {featuresList.map((feature, idx) => (
                    <div key={idx} className="feature-card glass-panel">
                        <div className="feature-icon-wrapper">
                            {feature.icon}
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
