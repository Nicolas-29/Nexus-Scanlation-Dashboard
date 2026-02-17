
import React, { useState } from 'react';
import { 
  Star, 
  Eye, 
  Lock, 
  Unlock, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search,
  LayoutGrid,
  List,
  Plus
} from 'lucide-react';
import { CatalogItem } from '../types';

interface CatalogProps {
  items: CatalogItem[];
  onDelete: (id: number) => void;
  onEdit: (item: CatalogItem) => void;
  onAddChapter: (id: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ items, onDelete, onEdit, onAddChapter }) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Catalog</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Managing <span className="text-indigo-400 font-bold">{items.length}</span> entries.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              <List size={18} />
            </button>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              <LayoutGrid size={18} />
            </button>
          </div>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search series title..." 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
          />
        </div>
      </div>

      <div className="w-full max-w-full">
        {/* Mobile & Tablet View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-4 flex gap-4 items-start hover:border-indigo-500/30 transition-all backdrop-blur-sm">
              <img src={item.cover} className="w-20 h-28 rounded-2xl object-cover border border-slate-800 shadow-md" alt={item.title} />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-600 font-mono">#{item.id}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${item.status === 'Visible' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{item.status}</span>
                </div>
                <h3 className="font-bold text-slate-200 text-sm leading-tight truncate">{item.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star size={12} className="fill-amber-400" />
                    {item.rating.toFixed(1)}
                  </div>
                  <span className="text-slate-600 text-[10px]">• {item.category}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-2">
                    <button onClick={() => onAddChapter(item.id)} className="p-1.5 bg-indigo-600/20 text-indigo-400 rounded-lg" title="Add Chapter"><Plus size={14} /></button>
                    <button onClick={() => onEdit(item)} className="p-1.5 bg-slate-800 rounded-lg text-slate-400"><Edit3 size={14} /></button>
                    <button onClick={() => onDelete(item.id)} className="p-1.5 bg-slate-800 rounded-lg text-rose-400"><Trash2 size={14} /></button>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{item.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block bg-slate-900/40 border border-slate-800/60 rounded-[2rem] overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800/60 bg-slate-900/30">
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Title & ID</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Category</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Rating</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Views</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-600/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-14 bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-200 truncate max-w-[200px] lg:max-w-[300px]">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono mt-0.5">#{item.id} • Created {item.createdAt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      item.category === 'Manga' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Star size={14} className="fill-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Eye size={14} className="text-slate-600" />
                      <span className="font-medium">{item.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      item.status === 'Visible' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Visible' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => onAddChapter(item.id)} className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-600/20" title="Add Chapter"><Plus size={16} /></button>
                      <button onClick={() => onEdit(item)} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => onDelete(item.id)} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
