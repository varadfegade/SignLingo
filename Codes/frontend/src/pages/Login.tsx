import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, Mail, ShieldCheck } from 'lucide-react';
import './Login.css';

interface LoginProps {
    setIsAuthenticated: (val: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Set mock authentication state to true securely
        setIsAuthenticated(true);
        // Redirect directly to the converter
        navigate('/convert');
    };

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-visual text-center">
                    <div className="login-brand">
                        <ShieldCheck size={48} className="brand-icon" />
                        <h2 className="text-gradient">SignLingo</h2>
                    </div>
                    <p className="text-secondary login-subtitle">
                        Sign in to access secure neural translation tools.
                    </p>
                </div>
                
                <div className="panel login-card">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@signlingo.com"
                                    required 
                                    className="login-input"
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required 
                                    className="login-input"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-5">
                            Access Translation Engine <LogIn size={18} />
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <span>Protected by End-to-End Encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
