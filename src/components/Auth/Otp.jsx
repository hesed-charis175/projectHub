import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'lucide-react';

export default function Otp() {
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  function handleKey(e, idx) {
    const target = e.target;
    const val = target.value.replace(/[^0-9]/g, '').slice(0,1);
    target.value = val;
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
    if (e.key === 'Backspace' && !val && idx > 0) inputsRef.current[idx - 1]?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').trim();
    const digits = paste.replace(/\D/g, '').slice(0,6).split('');
    digits.forEach((d, i) => { if (inputsRef.current[i]) inputsRef.current[i].value = d; });
    const last = Math.min(digits.length - 1, 5);
    if (last >= 0) inputsRef.current[last]?.focus();
  }

  function handleVerify(e) {
    e.preventDefault();
    const code = inputsRef.current.map(i => (i && i.value) || '').join('');
    if (code.length !== 6) return alert('Please enter the 6-digit code.');
    // TODO: verify code with API
    navigate('/', { replace: true });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
        }}>

        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute lg:bottom-[-75px] lg:right-[-75px] bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-48 sm:h-96 lg:h-150 lg:w-150 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-md bg-slate-900/95 rounded-xl p-8 shadow-lg" style={{
            background: `radial-gradient(800px circle at 10px 10px, rgba(59, 130, 246, 0.27), rgba(15, 23, 42, 0.85) 40%)`
      }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 flex items-center justify-space-b gap-2">
            <Key className="text-slate-400 mr-2 w-6 h-6" />
            Enter Verification Code
            </h2>
          <p className="text-sm text-slate-400 mb-6">We've sent a 6-digit code to your email</p>
        </div>

        <form onSubmit={handleVerify} onPaste={handlePaste} className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <input
                key={idx}
                ref={el => inputsRef.current[idx] = el}
                onChange={(e) => handleKey(e, idx)}
                onKeyUp={(e) => handleKey(e, idx)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center rounded-lg bg-slate-700/60 text-white text-xl outline-none"
              />
            ))}
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-semibold">Verify</button>

          <div className="text-sm text-slate-400">
            <button type="button" className="text-indigo-300 hover:underline" onClick={() => alert('Resend code (simulate)')}>Resend code</button>
          </div>
        </form>
      </div>
    </div>
  );
}
