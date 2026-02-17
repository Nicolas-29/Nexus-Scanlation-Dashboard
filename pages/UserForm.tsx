
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  AtSign, 
  Shield, 
  Camera,
  CreditCard,
  ChevronLeft,
  ArrowRight,
  Save
} from 'lucide-react';
import { UserItem } from '../types';

interface UserFormProps {
  type: 'add' | 'edit';
  initialData?: UserItem;
  onSubmit: (user: UserItem) => void;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ type, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserItem>(initialData || {
    id: Math.floor(Math.random() * 10000),
    name: '',
    username: '',
    email: '',
    avatar: `https://picsum.photos/seed/${Math.random()}/200`,
    plan: 'Free',
    commentsCount: 0,
    reviewsCount: 0,
    status: 'Approved',
    createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            {onCancel && (
              <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {type === 'add' ? 'Add New User' : `Edit User: ${formData.username}`}
            </h1>
          </div>
          <p className="text-slate-500 text-sm italic">
            {type === 'add' ? 'Welcome a new member to the Nexus community.' : 'Update account details and permissions.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-600/20 overflow-hidden group-hover:border-indigo-500 transition-all duration-300">
                <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar Preview" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-all group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">{formData.name || 'New Nexus Citizen'}</h2>
            <p className="text-slate-500 text-sm mb-6">@{formData.username || 'username'}</p>
            
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Status</p>
                <span className={`text-xs font-bold ${formData.status === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {formData.status}
                </span>
              </div>
              <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Role</p>
                <span className="text-xs font-bold text-indigo-400">{formData.plan}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <User size={14} className="text-indigo-400" /> Identity Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    placeholder="e.g. John Silver"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Username</label>
                <div className="relative group">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    placeholder="nexus_warrior"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    required
                    placeholder="warrior@nexus.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Plan / Permission</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none z-10" size={18} />
                  <select 
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all"
                  >
                    <option value="Free">Free Member</option>
                    <option value="Basic">Basic Nexus</option>
                    <option value="Premium">Premium Citizen</option>
                    <option value="Cinematic">Cinematic Collector</option>
                    <option value="Admin">System Admin</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Account Status</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none z-10" size={18} />
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all"
                  >
                    <option value="Approved">Approved / Active</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Banned">Banned / Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/60 flex items-center justify-end gap-4">
              {onCancel && (
                <button 
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-3.5 bg-slate-800 text-slate-400 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-700 hover:text-white transition-all active:scale-95"
                >
                  Discard
                </button>
              )}
              <button 
                type="submit"
                className="px-10 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95 flex items-center gap-3"
              >
                {type === 'add' ? 'Create Account' : 'Update Profile'} 
                {type === 'add' ? <ArrowRight size={18} /> : <Save size={18} />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
