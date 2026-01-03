import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call forgot API to send OTP
    navigate('/otp', { replace: true });
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event) => setMousePosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{
      background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
    }}>
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="w-full max-w-md bg-slate-900/95 rounded-xl p-8 shadow-lg" style={{
            background: `radial-gradient(800px circle at 10px 10px, rgba(59, 130, 246, 0.27), rgba(15, 23, 42, 0.85) 40%)`
      }}>
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-sm text-center text-slate-400 mb-6">Enter your email to receive a verification code</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email id"
              className="w-full pl-11 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
            />
          </div>

          <button className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-semibold">
            Send Code
          </button>

          <div className="text-center mt-3 text-sm">
            <span className="text-slate-400">Remembered your password? </span>
            <Link to="/login" className="text-indigo-300 hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
