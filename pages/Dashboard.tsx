
import React from 'react';
import StatsCard from '../components/StatsCard';
import Dashbox from '../components/Dashbox';
import { 
  Eye, 
  FilePlus, 
  MessageCircle, 
  Star, 
  Trophy, 
  Clock, 
  UserPlus,
  Flame
} from 'lucide-react';
import { Category } from '../types';

const Dashboard: React.FC = () => {
  const topItems = [
    { id: 321, title: 'Solo Leveling: Ragnarok', category: Category.MANGA, rating: 9.8 },
    { id: 54, title: 'Omniscient Reader', category: Category.MANGA, rating: 9.6 },
    { id: 670, title: 'The Second Coming of Gluttony', category: Category.NOVEL, rating: 9.4 },
    { id: 241, title: 'SSS-Class Suicide Hunter', category: Category.MANGA, rating: 9.3 },
    { id: 22, title: 'Dungeon Reset', category: Category.MANGA, rating: 9.1 },
  ];

  const latestItems = [
    { id: 1042, title: 'Pick Me Up! Infinite Gacha', category: Category.MANGA, status: 'Visible' },
    { id: 1041, title: 'Superhuman Era', category: Category.MANGA, status: 'Visible' },
    { id: 1040, title: 'Ending Maker', category: Category.NOVEL, status: 'Visible' },
    { id: 1039, title: 'Swordmaster’s Youngest Son', category: Category.MANGA, status: 'Visible' },
    { id: 1038, title: 'The Heavenly Demon Destroys the Lich', category: Category.MANGA, status: 'Hidden' },
  ];

  const latestUsers = [
    { id: 23, name: 'Alex Shadows', email: 'alex@void.com', username: 'AlexV' },
    { id: 22, name: 'Luna Moon', email: 'luna@celestial.com', username: 'Lunatic' },
    { id: 21, name: 'Marcus Blade', email: 'blade@nexus.com', username: 'Slash' },
    { id: 20, name: 'Sarah Frost', email: 'sarah@winter.com', username: 'IceQueen' },
    { id: 19, name: 'Kevin Void', email: 'kevin@darkness.com', username: 'Abyssal' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm">Nexus Scanlation Performance & Admin Hub.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-slate-800/50 w-fit">
          <div className="flex -space-x-2.5">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i} 
                src={`https://picsum.photos/seed/${i + 50}/64`} 
                className="w-9 h-9 rounded-full border-2 border-slate-900 shadow-sm object-cover" 
                alt="Avatar" 
              />
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">+12</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none">Staff Online</span>
            <span className="text-xs text-indigo-400 font-medium mt-1">16 Active Members</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Monthly Views" value="1.2M" icon={<Eye size={22} />} trend="+12.5%" />
        <StatsCard label="Chapters" value="452" icon={<FilePlus size={22} />} trend="+4.2%" />
        <StatsCard label="Comments" value="8.4K" icon={<MessageCircle size={22} />} trend="+22.1%" />
        <StatsCard label="Reviews" value="3,204" icon={<Star size={22} />} trend="+8.9%" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        
        {/* Top Items - Responsive Layout optimized for Tablet */}
        <Dashbox title="Top Series" icon={<Trophy size={20} />}>
          <div className="w-full">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="hidden lg:table-header-group">
                <tr className="text-slate-500 border-b border-slate-800/60">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Series</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Type</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {topItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors flex flex-col lg:table-row p-4 lg:p-0">
                    <td className="lg:px-6 lg:py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-14 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700/50 shadow-inner">
                           <img src={`https://picsum.photos/seed/${item.id}/64/96`} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-200 truncate group-hover:text-white">{item.title}</span>
                          <span className="text-[10px] text-slate-600 font-mono lg:hidden uppercase">#{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 lg:text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                        item.category === Category.MANGA ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="lg:px-6 lg:py-4 lg:text-right">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold justify-start lg:justify-end">
                        <Star size={14} className="fill-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Dashbox>

        {/* Latest Items */}
        <Dashbox title="Recent Uploads" icon={<Clock size={20} />}>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-800/40">
              {latestItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200 truncate max-w-[150px] md:max-w-none">{item.title}</span>
                      <span className="text-[10px] text-slate-600 font-mono mt-0.5">#{item.id} • {item.category}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest ${item.status === 'Visible' ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Visible' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-600'}`}></span>
                      <span className="hidden sm:inline">{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Dashbox>

        {/* Latest Users - Cards for mobile/tablet */}
        <Dashbox title="New Users" icon={<UserPlus size={20} />}>
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
            {latestUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/40 transition-all border border-transparent hover:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={`https://picsum.photos/seed/${user.id}/80`} className="w-10 h-10 rounded-full border border-slate-700 object-cover" alt={user.name} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-200 text-sm truncate">{user.name}</span>
                    <span className="text-xs text-slate-500 truncate">@{user.username}</span>
                  </div>
                </div>
                <div className="hidden sm:block text-right flex-shrink-0">
                  <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                  </div>
                  <span className="text-[9px] text-slate-600 font-bold uppercase mt-1 block">Activity</span>
                </div>
              </div>
            ))}
          </div>
        </Dashbox>

        {/* Trending Section - Optimized Background */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/20 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group min-h-[300px] flex flex-col justify-center">
          <div className="absolute -bottom-10 -right-10 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors pointer-events-none transform -rotate-12">
            <Flame size={240} strokeWidth={1} />
          </div>
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2.5 text-indigo-400 font-bold uppercase tracking-[0.25em] text-[10px]">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
               Trending Insight
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white max-w-sm leading-tight">
              Action genres are <span className="bg-indigo-500/20 text-indigo-400 px-2 rounded-lg italic">exploding</span> this week.
            </h2>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Prioritize "Regression" and "System" tags. Data shows a 45% retention increase on these series.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-white text-slate-950 text-sm font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5">
                Report
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 bg-slate-800/80 text-white text-sm font-bold rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                Optimize
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
