import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {

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

      <div className="w-full max-w-lg p-8 rounded-xl bg-slate-800/80 shadow-lg text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-300 mb-6">Sorry — the page you were looking for doesn't exist.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold">Go Home</Link>
          <Link to="/login" className="px-6 py-3 rounded-full border border-slate-700 text-slate-200">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
