import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Learn from './pages/Learn';
import Convert from './pages/Convert';

function App() {
  return (
    <BrowserRouter>
      {/* Professional Ambient Background */}
      <div className="bg-ambient"></div>

      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/convert" element={<Convert />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
