
import React from 'react';
import { 
  Users as UsersIcon, 
  ShieldCheck, 
  UserX, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Ban, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Star,
  CreditCard
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { UserItem } from '../types';

interface UsersProps {
  users: UserItem[];
  onDelete: (id: number) => void;
  onEdit: (user: UserItem) => void;
  onToggleStatus: (id: number) => void;
  onAdd: () => void;
}

const Users: React.FC<UsersProps> = ({ users, onDelete, onEdit, onToggleStatus, onAdd }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      {/* Title section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm">Monitor community activity and account statuses.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/10 transition-all active:scale-95"
          >
            <UsersIcon size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Total Users" value={users.length.toString()} icon={<UsersIcon size={20} />} trend="+14.2%" />
        <StatsCard label="Active Now" value={users.filter(u => u.status === 'Approved').length.toString()} icon={<CheckCircle size={20} />} isPositive={true} />
        <StatsCard label="Banned Users" value={users.filter(u => u.status === 'Banned').length.toString()} icon={<UserX size={20} />} isPositive={false} />
        <StatsCard label="Staff Members" value={users.filter(u => u.plan === 'Admin').length.toString()} icon={<ShieldCheck size={20} />} />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or username..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-400 appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all">
            <option>All Plans</option>
            <option>Premium</option>
            <option>Free</option>
            <option>Admin</option>
          </select>
          <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all border border-slate-700">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Users Table / List */}
      <div className="w-full">
        {/* Card View for Small/Medium screens */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-slate-900/60 border border-slate-800/60 rounded-3xl p-5 space-y-4 hover:border-indigo-500/20 transition-all backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-slate-800 object-cover" alt={user.name} />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${user.status === 'Approved' ? 'bg-emerald-500' : user.status === 'Banned' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-100 truncate">{user.name}</span>
                    <span className="text-[11px] text-slate-500 truncate">@{user.username}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                  user.plan === 'Admin' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                  user.plan === 'Premium' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                  'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {user.plan}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-800/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-slate-600 font-black tracking-wider">Join Date</span>
                  <span className="text-xs text-slate-300 font-medium">{user.createdAt}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] uppercase text-slate-600 font-black tracking-wider">Activity</span>
                  <div className="flex items-center justify-end gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1"><MessageSquare size={10} /> {user.commentsCount}</div>
                    <div className="flex items-center gap-1"><Star size={10} /> {user.reviewsCount}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEdit(user)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button 
                  onClick={() => onToggleStatus(user.id)}
                  className={`p-2 rounded-xl transition-all border ${user.status === 'Approved' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}
                >
                  {user.status === 'Approved' ? <Ban size={16} /> : <CheckCircle size={16} />}
                </button>
                <button 
                  onClick={() => onDelete(user.id)}
                  className="p-2 bg-slate-800 hover:bg-rose-600/20 text-slate-500 hover:text-rose-400 rounded-xl transition-all border border-slate-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-slate-900/40 border border-slate-800/60 rounded-[2rem] overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800/60 bg-slate-900/30">
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Basic Info</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Pricing Plan</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-center">Engagement</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Status</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Created At</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-600/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover group-hover:scale-105 transition-transform" alt={user.name} />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${user.status === 'Approved' ? 'bg-emerald-500' : user.status === 'Banned' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-200 truncate">{user.name}</span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-mono">@{user.username}</span>
                          <span className="text-slate-700">|</span>
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-slate-600" />
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        user.plan === 'Admin' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                        user.plan === 'Premium' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {user.plan}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-4 text-slate-400 font-medium text-xs">
                      <div className="flex items-center gap-1.5" title="Comments">
                        <MessageSquare size={14} className="text-slate-600" /> {user.commentsCount}
                      </div>
                      <div className="flex items-center gap-1.5" title="Reviews">
                        <Star size={14} className="text-slate-600" /> {user.reviewsCount}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      user.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 text-xs font-medium">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(user)}
                        className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all" title="Edit User"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => onToggleStatus(user.id)}
                        className={`p-2 rounded-xl transition-all border ${user.status === 'Approved' ? 'bg-slate-800/50 text-slate-400 hover:bg-rose-600/20 hover:text-rose-400 border-slate-700 hover:border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}
                        title={user.status === 'Approved' ? 'Ban User' : 'Approve User'}
                      >
                        {user.status === 'Approved' ? <Ban size={16} /> : <CheckCircle size={16} />}
                      </button>
                      <button 
                        onClick={() => onDelete(user.id)}
                        className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-slate-700" title="Delete Account"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-8 bg-slate-900/40 border border-slate-800/60 rounded-[2rem] backdrop-blur-sm">
        <span className="text-xs text-slate-500 font-medium">
          Showing <span className="text-white font-bold font-mono">{users.length}</span> of <span className="text-white font-bold font-mono">{users.length}</span> users
        </span>
        
        <div className="flex items-center gap-1.5">
          <button className="p-2.5 bg-slate-800 text-slate-500 rounded-xl hover:bg-slate-700 transition-all disabled:opacity-30" disabled>
            <ChevronLeft size={18} />
          </button>
          <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
