import React from 'react';

function Avatar({ name, src, size = 8 }) {
  const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden flex items-center justify-center text-xs font-semibold`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-200">{initials}</div>}
    </div>
  );
}

function Progress({ percent }){
  let color = 'bg-red-500';
  if(percent >= 66) color = 'bg-emerald-400';
  else if(percent >= 33) color = 'bg-amber-400';

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-slate-800 rounded-md overflow-hidden">
        <div className={`${color} h-full`} style={{ width: `${percent}%` }} />
      </div>
      <div className="text-xs text-slate-400 mt-1">{percent}%</div>
    </div>
  );
}

export default function ProjectTable({ projects, view = 'table', filters = { sort: 'newest', admin: false, creator: false } }){
  // add createdBy and isAdmin to mock items for filtering
  const currentUser = 'James Board';
  const itemsRaw = projects || [
    { id: 1, name: 'Southwest Airlines', creator: 'Southwest Airlines Co.', createdBy: 'James Board', isAdmin: true, logo: '', descriptionTitle: 'A Need For Upgrades', description: 'Local School Receives New Grant', members: ['Alice Kim','Brad Li','Cory','Dana','Eve','Frank','Gina'], progress: 100, createdAt: '2025-12-01' },
    { id: 2, name: 'Amazon Inc', creator: 'Amazon.Com Inc', createdBy: 'Olivia Park', isAdmin: false, logo: '', descriptionTitle: 'Variety of Genres', description: 'Annual Music Festival', members: ['Amy','Ben','C','D','E'], progress: 75, createdAt: '2025-11-12' },
    { id: 3, name: 'Halliburton', creator: 'Halliburton Company', createdBy: 'James Board', isAdmin: false, logo: '', descriptionTitle: 'New Park Opens in Town', description: 'Shopping, Dining, and Recreation', members: ['A','B','C','D','E','F','G','H'], progress: 45, createdAt: '2025-10-01' },
    { id: 4, name: 'Waste Management', creator: 'Waste Management, Inc.', createdBy: 'Carlos Ruiz', isAdmin: true, logo: '', descriptionTitle: 'Music in the Park', description: 'A music festival in Sydney, Australia, is scheduled', members: ['A','B','C'], progress: 80, createdAt: '2025-09-15' }
  ];

  // apply filters
  let items = itemsRaw.slice();
  if(filters.admin){
    items = items.filter(i => i.isAdmin);
  }
  if(filters.creator){
    items = items.filter(i => i.createdBy === currentUser);
  }

  // apply sort
  if(filters.sort === 'newest'){
    items.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  } else if(filters.sort === 'oldest'){
    items.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt));
  } else if(filters.sort === 'progress'){
    items.sort((a,b)=> b.progress - a.progress);
  }

  if(view === 'grid'){
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => (
          <div key={p.id} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-md bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold text-lg">{p.name[0]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.creator}</div>
                  </div>
                  <div className="text-sm text-slate-400">{p.createdAt}</div>
                </div>

                <div className="mt-3">
                  <div className="font-medium">{p.descriptionTitle}</div>
                  <div className="text-sm text-slate-400 truncate">{p.description}</div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    {p.members.slice(0,6).map((m,i)=> (
                      <div key={i} className="w-8 h-8 rounded-full ring-2 ring-slate-900 bg-slate-700 text-xs text-slate-100 flex items-center justify-center" title={m}>{m.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                    ))}
                    {p.members.length > 6 && <div className="w-8 h-8 rounded-full ring-2 ring-slate-900 bg-slate-800 text-xs text-slate-300 flex items-center justify-center">+{p.members.length - 6}</div>}
                  </div>

                  <div className="w-1/2">
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full`} style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.progress>66 ? '#34d399' : p.progress>33 ? '#f59e0b' : '#f87171'}, #06b6d4)` }} />
                    </div>
                    <div className="text-xs text-slate-400 mt-1 text-right">{p.progress}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 bg-slate-900 rounded-lg shadow-sm border border-slate-800 overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-slate-950 text-slate-300 text-xs">
          <tr>
            <th className="text-left px-6 py-3">Name</th>
            <th className="text-left px-6 py-3">Description</th>
            <th className="text-left px-6 py-3">Members</th>
            <th className="text-left px-6 py-3">Progress</th>
            <th className="text-left px-6 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="border-t border-slate-800 hover:bg-slate-950">
              <td className="px-6 py-4 align-top">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-semibold">{p.name[0]}</div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.creator}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 align-top text-slate-300">
                <div className="font-medium">{p.descriptionTitle || p.description}</div>
                <div className="text-sm text-slate-400 truncate max-w-xl">{p.description}</div>
              </td>
              <td className="px-6 py-4 align-top">
                <div className="flex items-center -space-x-2">
                  {p.members.slice(0,6).map((m, i) => (
                    <div key={i} className="w-8 h-8 rounded-full ring-2 ring-slate-900 bg-slate-700 text-xs text-slate-100 flex items-center justify-center" title={m}>{m.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                  ))}
                  {p.members.length > 6 && (
                    <div className="w-8 h-8 rounded-full ring-2 ring-slate-900 bg-slate-800 text-xs text-slate-300 flex items-center justify-center">+{p.members.length - 6}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 align-top w-56">
                <div className="w-full">
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full`} style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.progress>66 ? '#34d399' : p.progress>33 ? '#f59e0b' : '#f87171'}, #06b6d4)` }} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{p.progress}%</div>
                </div>
              </td>
              <td className="px-6 py-4 align-top text-slate-400 text-sm">{p.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
