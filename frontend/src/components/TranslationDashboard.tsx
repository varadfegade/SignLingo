import { useEffect, useRef, useState } from 'react';
import { Sparkles, Camera, Activity, Video, HardDrive, Terminal, StopCircle, RefreshCw, Layers } from 'lucide-react';

export default function TranslationDashboard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState("System Ready");
  const [translationBuffer, setTranslationBuffer] = useState<string[]>([]);
  const [logs, setLogs] = useState<{time: string, msg: string, type: 'info' | 'highlight' | 'error'}[]>([
    { time: new Date().toLocaleTimeString(), msg: "SignLingo Core Initialized.", type: 'info' },
    { time: new Date().toLocaleTimeString(), msg: "Awaiting tracking input...", type: 'info' }
  ]);

  // MediaPipe hooks placeholder
  useEffect(() => {
    // Just a fun mount effect to simulate boot up
    const timer = setTimeout(() => {
      setStatusText("Awaiting Camera Feed");
      setTranslationBuffer([]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const addLog = (msg: string, type: 'info' | 'highlight' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, msg, type }].slice(-15));
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setStatusText("Feed Terminated");
      addLog("Tracking interface disabled successfully.", 'info');
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsRecording(true);
        setStatusText("Tracking Active");
        addLog("Optical sensors enabled. MediaPipe initialized.", 'highlight');
      } catch (err) {
        setStatusText("Error accessing camera");
        addLog("Critical failure: Unable to access peripheral // camera", 'error');
      }
    }
  };

  return (
    <div className="app-container">
      {/* Sleek Glass Header */}
      <header className="glass-header">
        <div className="sys-title">
          <Sparkles className="title-icon" size={28} />
          <h1 className="text-gradient">SignLingo</h1>
        </div>
        <div className={`status-badge ${!isRecording ? 'inactive' : ''}`}>
          <Activity size={18} className={isRecording ? 'animate-pulse' : ''} />
          <span>{statusText}</span>
        </div>
      </header>

      <main className="dashboard-layout">
        {/* Main Feed Section */}
        <section className="glass-panel reveal-1">
          <div className="panel-header">
            <h2><Video size={18} /> Optical Input Stream</h2>
            <div className="badge-group">
              <span className="badge">HD 720p</span>
              <span className="badge">60 FPS</span>
            </div>
          </div>
          
          <div className="feed-area">
            {/* The actual webcam video */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="webcam-video"
            />
            {/* The transparent canvas for MediaPipe skeleton overlays */}
            <canvas 
              ref={canvasRef} 
              className="tracking-canvas" 
              width={1280} 
              height={720}
            />
            
            {!isRecording && (
              <div className="no-signal">
                <Layers size={64} className="floating-icon" />
                <p>Awaiting Optical Input</p>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <button 
              className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`} 
              onClick={toggleRecording}
            >
              {isRecording ? <><StopCircle size={18} /> Terminate Tracking</> : <><Camera size={18} /> Initialize Feed</>}
            </button>
            <button className="btn btn-ghost" onClick={() => {
              setTranslationBuffer([]);
              addLog("Buffer cleared manually.", 'info');
            }}>
              <RefreshCw size={18} /> Flush Buffer
            </button>
          </div>
        </section>

        {/* Translation Output and Logs Panel */}
        <div className="side-content">
          <section className="glass-panel reveal-2" style={{ flex: '1' }}>
            <div className="panel-header">
              <h2><HardDrive size={18} /> Deep Learning Output</h2>
            </div>
            <div className="render-box">
              {translationBuffer.length > 0 
                ? <span className="text-gradient">{translationBuffer.join(' ')}</span>
                : <span className="placeholder-text">Detecting gestures<span className="animated-dots"></span></span>}
            </div>
          </section>

          {/* System Logs Section */}
          <section className="glass-panel reveal-3" style={{ flex: '1' }}>
            <div className="panel-header">
              <h2><Terminal size={18} /> Event Stream</h2>
            </div>
            <div className="terminal-area">
              {logs.map((log, i) => (
                <div key={i} className="log-entry">
                  <span className="log-time">[{log.time}]</span>
                  <span className={`log-msg ${log.type}`}>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
