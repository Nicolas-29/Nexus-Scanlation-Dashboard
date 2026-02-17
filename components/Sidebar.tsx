
import React from 'react';
import { 
  LayoutDashboard, 
  Library, 
  Users, 
  MessageSquare, 
  PlusCircle, 
  Settings, 
  LogOut,
  FilePlus2,
  DollarSign
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, onPageChange }) => {
  const navItems = [
    { name: Page.DASHBOARD, icon: <LayoutDashboard size={20} /> },
    { name: Page.CATALOG, icon: <Library size={20} /> },
    { name: Page.USERS, icon: <Users size={20} /> },
    { name: Page.COMMENTS, icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl italic text-white shadow-lg shadow-indigo-500/20">
          N
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent cursor-pointer" onClick={() => onPageChange(Page.DASHBOARD)}>
          Nexus Scan
        </span>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3 border border-slate-700/50">
          <img 
            src="https://picsum.photos/seed/admin/100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full border border-indigo-500/30"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">John Doe</p>
            <p className="text-xs text-slate-400">Head Scanlator</p>
          </div>
          <button className="ml-auto text-slate-400 hover:text-white transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onPageChange(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              currentPage === item.name 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={currentPage === item.name ? 'text-indigo-400' : 'group-hover:text-white'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-800/60">
          <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Revenue</p>
          <button 
            onClick={() => onPageChange(Page.MONETIZATION)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              currentPage === Page.MONETIZATION 
                ? 'bg-amber-600/10 text-amber-500 border border-amber-600/20 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <DollarSign size={20} className={currentPage === Page.MONETIZATION ? 'text-amber-500' : 'group-hover:text-amber-500'} />
            <span className="font-medium">Monetization</span>
          </button>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800/60">
          <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Actions</p>
          <button 
            onClick={() => onPageChange(Page.ADD_ITEM)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              currentPage === Page.ADD_ITEM 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PlusCircle size={20} className={currentPage === Page.ADD_ITEM ? 'text-indigo-400' : 'group-hover:text-indigo-400'} />
            <span className="font-medium">Add New Series</span>
          </button>
          <button 
            onClick={() => onPageChange(Page.ADD_CHAPTER)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              currentPage === Page.ADD_CHAPTER 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FilePlus2 size={20} className={currentPage === Page.ADD_CHAPTER ? 'text-indigo-400' : 'group-hover:text-indigo-400'} />
            <span className="font-medium">Add Chapter</span>
          </button>
          <button 
            onClick={() => onPageChange(Page.SETTINGS)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              currentPage === Page.SETTINGS 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings size={20} className={currentPage === Page.SETTINGS ? 'text-indigo-400' : 'group-hover:text-indigo-400'} />
            <span className="font-medium">Site Settings</span>
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-[10px] text-slate-500 text-center">
          © Nexus Scanlation, 2024. <br/>
          Built with <span className="text-indigo-500 font-bold">NexusEngine</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
