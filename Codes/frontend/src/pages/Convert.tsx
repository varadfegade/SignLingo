import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, CameraOff, RefreshCw, Trash2 } from 'lucide-react';
import { useMediaPipeGesture } from '../hooks/useMediaPipe';
import { DrawingUtils, GestureRecognizer } from '@mediapipe/tasks-vision';
import './Convert.css';

interface HistoryItem {
    id: string;
    word: string;
    time: string;
}

const Convert: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [currentSign, setCurrentSign] = useState<string>('Waiting...');
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const { recognizer, isModelLoading, error } = useMediaPipeGesture();
    const requestRef = useRef<number>(0);
    const lastVideoTimeRef = useRef<number>(-1);

    // Helper to maintain stream reference
    const streamRef = useRef<MediaStream | null>(null);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
            setIsWebcamActive(true);
        } catch (err) {
            console.error("Error accessing webcam", err);
            alert("Please allow webcam access to use the converter.");
        }
    };

    const stopWebcam = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsWebcamActive(false);
        setCurrentSign('Waiting...');
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const predictWebcam = useCallback(() => {
        if (!videoRef.current || !canvasRef.current || !recognizer || !isWebcamActive) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        if (!canvasCtx) return;

        // Wait until video has data
        if (video.currentTime !== lastVideoTimeRef.current && video.readyState >= 2) {
            lastVideoTimeRef.current = video.currentTime;

            const results = recognizer.recognizeForVideo(video, performance.now());

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            const drawingUtils = new DrawingUtils(canvasCtx);

            if (results.landmarks && results.landmarks.length > 0) {
                for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                        color: "#8b5cf6",
                        lineWidth: 4,
                    });
                    drawingUtils.drawLandmarks(landmarks, { color: "#ec4899", lineWidth: 2 });
                }
            }

            if (results.gestures.length > 0 && results.gestures[0].length > 0) {
                const gestureName = results.gestures[0][0].categoryName;
                // Ignore None to prevent spam
                if (gestureName !== "None" && gestureName !== "") {
                    setCurrentSign(gestureName);

                    setHistory(prev => {
                        const lastItem = prev[0];
                        // Only add to history if it's a new sign or it's been a while (debouncing logic placeholder)
                        if (!lastItem || lastItem.word !== gestureName) {
                            return [{
                                id: Math.random().toString(36).substr(2, 9),
                                word: gestureName,
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            }, ...prev].slice(0, 50); // Keep last 50
                        }
                        return prev;
                    });
                }
            } else {
                setCurrentSign("No Hand Detected");
            }
            canvasCtx.restore();
        }

        if (isWebcamActive) {
            requestRef.current = requestAnimationFrame(predictWebcam);
        }
    }, [recognizer, isWebcamActive]);

    useEffect(() => {
        if (isWebcamActive && recognizer) {
            requestRef.current = requestAnimationFrame(predictWebcam);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isWebcamActive, recognizer, predictWebcam]);

    // Clean up stream on unmount
    useEffect(() => {
        return () => {
            stopWebcam();
        };
    }, []);

    return (
        <div className="convert-page container animate-fade-in">
            <div className="convert-header">
                <h1 className="page-title">Live Translate</h1>
                <p className="page-subtitle">Turn on your camera and show hand gestures to translate them into text instantly.</p>
            </div>

            <div className="convert-layout">
                {/* Main Video View */}
                <div className="video-section glass-panel">
                    <div className="video-container">
                        {isModelLoading && !error ? (
                            <div className="loading-overlay">
                                <RefreshCw className="spinner" size={40} />
                                <p>Loading AI Model...</p>
                            </div>
                        ) : error ? (
                            <div className="error-overlay">
                                <p>Error: {error}</p>
                            </div>
                        ) : !isWebcamActive && (
                            <div className="start-overlay">
                                <CameraOff size={48} className="inactive-icon" />
                                <p>Camera is off</p>
                                <button className="btn btn-primary" onClick={startWebcam}>
                                    <Camera size={20} /> Enable Camera
                                </button>
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={`webcam-feed ${isWebcamActive ? 'active' : ''}`}
                        ></video>
                        <canvas
                            ref={canvasRef}
                            className="mediapipe-canvas"
                            width={640}
                            height={480}
                        ></canvas>
                    </div>

                    <div className="controls-bar">
                        {isWebcamActive ? (
                            <button className="btn btn-danger" onClick={stopWebcam}>
                                <CameraOff size={20} /> Stop Camera
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={startWebcam} disabled={isModelLoading}>
                                <Camera size={20} /> Enable Camera
                            </button>
                        )}
                        <div className={`status-indicator ${isWebcamActive ? 'online' : 'offline'}`}>
                            <span className="dot"></span>
                            {isWebcamActive ? 'Tracking Active' : 'Offline'}
                        </div>
                    </div>
                </div>

                {/* Output & History Sidebar */}
                <div className="sidebar-section">
                    <div className="current-sign-card glass-panel">
                        <h3>Current Sign</h3>
                        <div className="sign-display">
                            {currentSign.replace('_', ' ')}
                        </div>
                    </div>

                    <div className="history-card glass-panel">
                        <div className="history-header">
                            <h3>Translation History</h3>
                            <button className="btn-icon" onClick={clearHistory} title="Clear History">
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="history-list">
                            {history.length > 0 ? (
                                history.map((item) => (
                                    <div key={item.id} className="history-item animate-fade-in">
                                        <span className="history-word">{item.word.replace('_', ' ')}</span>
                                        <span className="history-time">{item.time}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="history-empty">
                                    <p>No gestures recorded yet. Start signing to build a sentence.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Convert;
