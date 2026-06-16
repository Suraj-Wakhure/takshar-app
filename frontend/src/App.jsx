import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Server, 
  ArrowRight, 
  Zap, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

function App() {
  const [health, setHealth] = useState({
    status: 'loading',
    message: 'Attempting connection to backend...',
    timestamp: null,
    database: 'unknown'
  });
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    setHealth(prev => ({ ...prev, status: 'loading', message: 'Checking backend status...' }));
    try {
      const response = await axios.get('/api/health');
      if (response.data && response.data.status === 'ok') {
        setHealth({
          status: 'online',
          message: response.data.message || 'Server is active',
          timestamp: response.data.timestamp,
          database: response.data.services?.database || 'disconnected'
        });
      } else {
        setHealth({
          status: 'error',
          message: 'Received unexpected response format.',
          timestamp: null,
          database: 'disconnected'
        });
      }
    } catch (error) {
      console.error('Error fetching backend health:', error);
      setHealth({
        status: 'offline',
        message: 'Could not connect to backend server. Make sure the Node.js API is running on port 5000.',
        timestamp: null,
        database: 'disconnected'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 md:px-16 bg-glass-bg backdrop-blur-md border-b border-glass-border shadow-lg">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center relative before:content-[''] before:absolute before:inset-[2px] before:bg-bg-primary before:rounded-[6px]">
            <span className="relative font-heading font-black text-sm bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">T</span>
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            Takshar
          </span>
        </div>
        
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-cyan after:to-accent-purple hover:after:w-full after:transition-all after:duration-300">
              Features
            </a>
          </li>
          <li>
            <a href="#services" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-cyan after:to-accent-purple hover:after:w-full after:transition-all after:duration-300">
              Services
            </a>
          </li>
          <li>
            <a href="#architecture" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-cyan after:to-accent-purple hover:after:w-full after:transition-all after:duration-300">
              Architecture
            </a>
          </li>
          <li>
            <a href="#about" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-cyan after:to-accent-purple hover:after:w-full after:transition-all after:duration-300">
              About
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm py-2 px-5 rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer">
            Docs
          </button>
          <button 
            className="bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm py-2 px-5 rounded-lg shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={checkHealth} 
            disabled={loading}
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
            Sync System
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-6 relative flex-grow overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple filter blur-[120px] opacity-15 top-[15%] -z-10 pointer-events-none"></div>
        
        <div className="bg-accent-purple/10 border border-accent-purple/25 text-[#c084fc] px-4 py-1.5 rounded-full text-xs font-semibold mb-8 flex items-center gap-1.5 animate-pulse select-none">
          <ShieldCheck size={14} /> System Secure & Live
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mb-6 bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent">
          Forge Your Development Journey with <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent">Takshar</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 font-light">
          An ultra-modern full-stack starter workspace using React, Vite, Node.js, Express, and MongoDB. Scalable, secure, and built for performance.
        </p>

        <div className="flex gap-4 mb-16">
          <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm py-2.5 px-6 rounded-lg shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center gap-2 cursor-pointer" onClick={checkHealth}>
            Get Started <ArrowRight size={16} />
          </button>
          <a href="#status" className="bg-white/5 border border-white/10 hover:bg-white/10 hover:translate-y-[-2px] text-white font-semibold text-sm py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer">
            Check Node.js Connection
          </a>
        </div>

        {/* Status Panel */}
        <section id="status" className="w-full max-w-2xl rounded-2xl p-6 md:p-8 bg-glass-bg backdrop-blur-lg border border-glass-border shadow-2xl relative overflow-hidden flex flex-col gap-4 border-t-2 border-t-accent-cyan">
          <div className="flex justify-between items-center font-semibold pb-2 border-b border-white/5">
            <div className="flex items-center text-text-primary text-base md:text-lg">
              <Server size={18} className="text-accent-cyan mr-2" />
              API Gateway Connection Status
            </div>
            <div className="flex items-center gap-2.5 bg-black/20 px-3 py-1 rounded-full border border-white/5">
              <span className={`inline-block w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${
                health.status === 'online' ? 'text-emerald-500 bg-emerald-500' : 
                health.status === 'offline' || health.status === 'error' ? 'text-rose-500 bg-rose-500' : 
                'text-amber-500 bg-amber-500 animate-pulse'
              }`} />
              <span className={`text-[0.75rem] uppercase font-black tracking-wider ${
                health.status === 'online' ? 'text-emerald-500' : 
                health.status === 'loading' ? 'text-amber-500' : 
                'text-rose-500'
              }`}>
                {health.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-left pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Health Endpoint:</span>
              <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-[0.85rem]">
                GET /api/health
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Proxy Status:</span>
              <span className={`font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-[0.85rem] font-semibold ${
                health.status === 'online' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {health.status === 'online' ? 'Forwarding (Vite Proxy)' : 'Not connected'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Database (MongoDB):</span>
              <span className={`font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-[0.85rem] font-semibold ${
                health.database === 'connected' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {health.database === 'connected' ? 'CONNECTED' : health.database === 'disconnected' ? 'DISCONNECTED' : 'UNKNOWN'}
              </span>
            </div>

            <div className="flex justify-between items-start text-sm pt-1.5 border-t border-white/5">
              <span className="text-text-secondary shrink-0 mr-4">API Message:</span>
              <span className="text-right text-[0.85rem] text-text-secondary font-medium italic">
                {health.message}
              </span>
            </div>

            {health.timestamp && (
              <div className="flex justify-between items-center text-sm pt-1.5 border-t border-white/5">
                <span className="text-text-secondary">Last Checked:</span>
                <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-[0.85rem] text-text-muted">
                  {new Date(health.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-16 text-xs text-text-muted border-t border-border-color bg-bg-secondary">
        <div>
          &copy; {new Date().getFullYear()} Takshar Core. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-text-primary transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-text-primary transition-colors duration-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
