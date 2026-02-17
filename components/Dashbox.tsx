
import React from 'react';
import { RefreshCw, ArrowUpRight } from 'lucide-react';

interface DashboxProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onRefresh?: () => void;
  viewAllLink?: string;
}

const Dashbox: React.FC<DashboxProps> = ({ title, icon, children, onRefresh, viewAllLink }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl overflow-hidden backdrop-blur-sm w-full">
      <div className="p-5 md:p-6 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-xl">{icon}</div>
          <h3 className="font-bold text-base md:text-lg text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onRefresh}
            className="text-slate-500 hover:text-indigo-400 transition-colors p-1.5 bg-slate-800/50 rounded-lg"
          >
            <RefreshCw size={16} />
          </button>
          <a 
            href={viewAllLink || "#"} 
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center gap-1.5 group bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10 transition-all"
          >
            View All
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default Dashbox;
