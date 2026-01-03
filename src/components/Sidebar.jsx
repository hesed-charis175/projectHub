import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Folder, BarChart2, Users, Calendar, Puzzle, Bell, Settings, User2 } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md ${active ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}>
    <Icon className="w-5 h-5 text-blue-300" />
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 flex flex-col justify-between p-4 h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-3 px-2 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ProjectHub logo" className="w-10 h-10 rounded-md object-cover" />
            <div>
              <div className="font-semibold text-lg">
                <span className="text-white">Project</span>
                <span className="text-blue-400">Hub</span>
              </div>
            </div>
          </Link>
        </div>

      </div>

      <div className="mt-6 h-full">
        <nav className="space-y-2 h-full flex flex-col justify-between">
          <div >
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-slate-300 hover:bg-slate-900 hover:text-white">
              <Home className="w-5 h-5 text-blue-300" />
              <span className="hidden md:inline">Home</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-slate-300 hover:bg-slate-900 hover:text-white">
              <Folder className="w-5 h-5 text-blue-300" />
              <span className="hidden md:inline">Projects</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-slate-300 hover:bg-slate-900 hover:text-white">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="hidden md:inline">Invitations</span>
            </button>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-3">
            <div className="flex flex-col gap-2 px-2">
              <button className="h-10 flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-500/20 rounded-md px-3">
                <Bell className="w-5 h-5 text-blue-300" />
                <span className="text-sm hidden md:inline">Notifications</span>
              </button>
              <button className="h-10 flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-500/20 rounded-md px-3">
                <Settings className="w-5 h-5 text-blue-300" />
                <span className="text-sm hidden md:inline">Settings</span>
              </button>
            </div>

            <button className="w-full rounded-lg cursor-pointer flex items-center gap-3 px-2 mt-4 hover:bg-slate-500/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-semibold">
                <img src="/logo.png" alt="profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <div className="text-sm font-medium">James Board</div>
                <div className="text-xs text-slate-400">Administrator</div>
              </div>
              <div className="ml-auto hidden md:block">
                <User2 className="w-5 h-5 text-slate-300" />
              </div>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
