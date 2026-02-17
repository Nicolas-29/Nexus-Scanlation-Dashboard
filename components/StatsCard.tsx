
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  isPositive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, trend, isPositive = true }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 group hover:shadow-xl hover:shadow-indigo-500/5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1 group-hover:text-slate-300">{label}</p>
          <h3 className="text-2xl font-bold tracking-tight text-white">{value}</h3>
        </div>
        <div className="p-3 bg-slate-900/50 rounded-xl text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition-all">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {trend}
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
