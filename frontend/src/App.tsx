import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Learn from './pages/Learn';
import Convert from './pages/Convert';
import Login from './pages/Login';
import InteractiveBackground from './components/InteractiveBackground';

/**
 * Inner wrapper has access to the router context,
 * so it can read the current location to decide which background to render.
 */
function AppInner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <>
      {/* Page-specific background */}
      <InteractiveBackground variant={isDashboard ? 'dashboard' : 'default'} />

      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route 
              path="/features" 
              element={isAuthenticated ? <Features /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/learn" 
              element={isAuthenticated ? <Learn /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path="/convert" 
              element={isAuthenticated ? <Convert /> : <Navigate to="/login" replace />} 
            />
          </Routes>
          <Footer />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
