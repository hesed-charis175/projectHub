import React, { useState } from 'react';
import { Search, List, LayoutGrid } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import ProjectTable from '../components/ProjectTable.jsx';

export default function Home(){
  const [view, setView] = useState('table');
  const [sort, setSort] = useState('newest');
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Projects</h1>
            </div>
            <div>
              <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold text-sm sm:text-base transition-all duration-100 cursor-pointer flex items-center justify-center space-x-2">Add project</button>
            </div>
          </header>

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-300">Sort by</div>
              <select value={sort} onChange={e=>setSort(e.target.value)} className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1 rounded">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="progress">Progress</option>
              </select>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded px-3 py-1 w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects" className="bg-transparent outline-none text-slate-200 w-full" />
              </div>

              <div className="flex items-center gap-2">
                <button onClick={()=>setView('grid')} className={`p-2 rounded-md ${view==='grid' ? 'bg-slate-800' : 'bg-slate-900'}`} aria-label="Grid view"><LayoutGrid className="w-5 h-5 text-slate-300" /></button>
                <button onClick={()=>setView('table')} className={`p-2 rounded-md ${view==='table' ? 'bg-slate-800' : 'bg-slate-900'}`} aria-label="Table view"><List className="w-5 h-5 text-slate-300" /></button>
              </div>
            </div>
          </div>

          <section className="mt-6">
            <ProjectTable view={view} projects={null} />
          </section>
        </main>
      </div>
    </div>
  );
}
