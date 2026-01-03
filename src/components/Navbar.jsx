import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h20">
          {isHome && (
            <button
              className="md:hidden p-2 text-gray-600 hover:text-white focus:outline-none transition-all"
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            >
              {!mobileMenuIsOpen ? (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          )}

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div>
                <Link to="/">
                  <img src="/logo.png" alt="CollabHub Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                </Link>
              </div>
              {isHome && (
                <span className="text-lg sm:text-xl md:text-2xl font-medium">
                  <span className="text-white font-bold">Project</span>
                  <span className="text-blue-400">Hub</span>
                </span>
              )}
            </div>

            {isHome && (
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white text-sm lg:text-base">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white text-sm lg:text-base">Pricing</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white text-sm lg:text-base">Testimonials</a>
              </div>
            )}
          </div>

          {isHome && (
            <div className="d-flex flex-column flex-lg-row width-full flex-justify-end flex-lg-items-center text-center mt-lg-0 text-lg-left ml-lg-3">
              <div className="position-relative d-lg-inline-block">
                <Link to="/login" className="flex-shrink-0 no-underline text-white hover:text-cyan-400 d-none d-lg:inline-flex border lg:border-none md:border-none border-lg-0 rounded-xl px-5 py-2 font-bold md:font-normal lg:font-normal" style={{ marginLeft: "12px" }}>Sign In</Link>
                <Link to="/signup" className="hidden md:inline flex-shrink-0 no-underline text-cyan-400 d-none d-lg:inline-flex border border-lg-0 rounded-xl px-5 py-2 hover:bg-cyan-300/20 hover:text-white font-bold" style={{ marginLeft: "12px" }}>Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {mobileMenuIsOpen && isHome && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 slide-in-from-top duration-300">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4 flex flex-col">
            <a href="#features" className="block text-gray-300 hover:text-white text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Features</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Pricing</a>
            <a href="#testimonials" className="block text-gray-300 hover:text-white text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Testimonials</a>
            <Link to="/login" className="block text-gray-300 hover:text-white text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Sign In</Link>
            <Link to="/signup" className="block text-cyan-300 hover:text-white text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
