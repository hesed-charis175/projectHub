import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirm) return alert('Please fill both fields');
    if (password !== confirm) return alert('Passwords do not match');
    // TODO: call reset API
    navigate('/login', { replace: true });
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
      <div className="absolute lg:bottom-[-75px] lg:right-[-75px] bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-48 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-md bg-slate-900/95 rounded-xl p-8 shadow-lg" style={{
        background: `radial-gradient(800px circle at 10px 10px, rgba(59, 130, 246, 0.27), rgba(15, 23, 42, 0.85) 40%)`
      }}>
        <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
          <Lock className="text-slate-400 mr-2 w-6 h-6" />
          Reset Password
        </h2>
        <p className="text-sm text-center text-slate-400 mb-6">Set a new password for your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              required
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full pl-11 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
            />
            <button type="button" onClick={() => setVisible(v => !v)} className="absolute right-3 top-3 text-slate-400">
              {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              required
              type={visible2 ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full pl-11 px-4 py-3 rounded-full bg-slate-700/60 placeholder-slate-300 outline-none text-white"
            />
            <button type="button" onClick={() => setVisible2(v => !v)} className="absolute right-3 top-3 text-slate-400">
              {visible2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-semibold">Reset Password</button>

          <div className="text-center mt-3 text-sm">
            <Link to="/login" className="text-indigo-300 hover:underline">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
