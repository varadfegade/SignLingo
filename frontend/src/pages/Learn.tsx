import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Learn.css';

// Using standard MediaPipe recognized gestures as a baseline
const gestures = [
    { name: 'None/Unknown', icon: '🖐️', desc: 'Default state when no specific gesture is recognized.' },
    { name: 'Closed Fist', icon: '✊', desc: 'All fingers curled tightly. Often used to represent "A" or "S".' },
    { name: 'Open Palm', icon: '✋', desc: 'All fingers extended and spread. Can mean "Stop" or "5".' },
    { name: 'Pointing Up', icon: '☝️', desc: 'Index finger extended upward. Matches letter "D" or "1".' },
    { name: 'Thumb Down', icon: '👎', desc: 'Thumb pointing down.' },
    { name: 'Thumb Up', icon: '👍', desc: 'Thumb pointing up. Matches letter "A" or confirmation.' },
    { name: 'Victory', icon: '✌️', desc: 'Index and middle fingers extended. Matches letter "V" or "2".' },
    { name: 'ILoveYou', icon: '🤟', desc: 'Thumb, index, and pinky extended.' }
];

const Learn: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGestures = gestures.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="learn-page container animate-fade-in">
            <div className="learn-header">
                <h1 className="page-title">Learning Hub</h1>
                <p className="page-subtitle">Master the basics of sign language. Study the gestures below which are fully supported by our realtime translation engine.</p>

                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search gestures..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="gesture-grid">
                {filteredGestures.length > 0 ? (
                    filteredGestures.map((gesture, idx) => (
                        <div key={idx} className="gesture-card glass-panel" style={{ animationDelay: `${idx * 0.05}s` }}>
                            <div className="gesture-icon">{gesture.icon}</div>
                            <h3 className="gesture-name">{gesture.name}</h3>
                            <p className="gesture-desc">{gesture.desc}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No gestures found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Learn;
