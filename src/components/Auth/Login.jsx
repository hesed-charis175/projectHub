import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call login API
    navigate('/otp', { replace: true });
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
      useEffect(() => {
          const handleMouseMove = (event) => {
              setMousePosition({ x: event.clientX, y: event.clientY });
          };
  
          window.addEventListener('mousemove', handleMouseMove);
  
          return () => {
              window.removeEventListener('mousemove', handleMouseMove);
          }
      }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
        }}>

        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute lg:bottom-[-75px] lg:right-[-75px] bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-48 sm:h-96 lg:h-150 lg:w-150 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-md bg-slate-900/95 rounded-xl p-8 shadow-lg" style={{
            background: `radial-gradient(800px circle at 10px 10px, rgba(59, 130, 246, 0.27), rgba(15, 23, 42, 0.85) 40%)`
      }}>
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-slate-400 mb-6">Login to your account</p>

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

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-11 pr-12 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
            />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-2.5 text-slate-300">
              {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot" className="text-sm text-indigo-300 hover:underline">Forgot password?</Link>
          </div>

          <button type="button" onClick={() => { window.location.href = '/auth/google'; }} className="w-full mt-2 py-3 bg-white/6 hover:bg-white/10 rounded-full font-semibold flex items-center justify-center gap-3 border border-white/10">
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-36.3-4.3-53.6H272v101.5h147.4c-6.4 34.8-26 64.3-55.6 84v69.9h89.8c52.7-48.6 83.9-120.2 83.9-201.8z"/>
              <path fill="#34A853" d="M272 544.3c73.6 0 135.5-24.3 180.7-66.1l-89.8-69.9c-25 16.8-57 26.8-90.9 26.8-69.8 0-128.9-47.1-150-110.3H29.4v69.2C74.6 485.3 167.4 544.3 272 544.3z"/>
              <path fill="#FBBC05" d="M122 327.8c-10.6-31.6-10.6-65.7 0-97.3V161.3H29.4C10.5 204.6 0 241.9 0 272s10.5 67.4 29.4 110.7l92.6-55.9z"/>
              <path fill="#EA4335" d="M272 108.1c39.8 0 75.5 13.7 103.7 40.6l77.9-77.9C404.7 24.2 344.4 0 272 0 167.4 0 74.6 59 29.4 149.3l92.6 55.9C143.1 155.2 202.2 108.1 272 108.1z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <button className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-semibold">
            Sign In
          </button>

          <div className="text-center mt-3 text-sm">
            <span className="text-slate-400">Don't have an account? </span>
            <Link to="/signup" className="text-indigo-300 hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
