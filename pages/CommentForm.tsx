
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Save, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CommentItem } from '../types';

interface CommentFormProps {
  initialData?: CommentItem;
  onSubmit: (comment: CommentItem) => void;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CommentItem>(initialData || {
    id: Math.floor(Math.random() * 10000),
    itemTitle: '',
    authorName: '',
    authorAvatar: 'https://picsum.photos/seed/default/100',
    text: '',
    likes: 0,
    dislikes: 0,
    createdAt: new Date().toLocaleDateString(),
    status: 'Pending'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
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
              Moderate Comment #{formData.id}
            </h1>
          </div>
          <p className="text-slate-500 text-sm italic">
            Edit the content or status of the user discussion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Context</h3>
            
            <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
               <img src={formData.authorAvatar} className="w-12 h-12 rounded-full border border-indigo-500/20" alt={formData.authorName} />
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-black tracking-widest">Author</span>
                  <span className="text-sm font-bold text-white">{formData.authorName}</span>
               </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
               <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <ExternalLink size={24} />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-black tracking-widest">Series Target</span>
                  <span className="text-sm font-bold text-white">{formData.itemTitle}</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-600 uppercase font-black block mb-1">Likes</span>
                  <span className="text-emerald-400 font-bold">{formData.likes}</span>
               </div>
               <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-600 uppercase font-black block mb-1">Dislikes</span>
                  <span className="text-rose-400 font-bold">{formData.dislikes}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Comment Body</label>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800">
                   <div className={`w-2 h-2 rounded-full ${formData.text.length > 500 ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                   <span className="text-[10px] font-mono text-slate-500">{formData.text.length} chars</span>
                </div>
              </div>
              <div className="relative group">
                <MessageCircle className="absolute left-4 top-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <textarea 
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={8}
                  required
                  placeholder="Enter the comment content..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Moderation Status</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none z-10" size={18} />
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all"
                  >
                    <option value="Approved">Approved / Safe</option>
                    <option value="Pending">Pending Moderation</option>
                    <option value="Flagged">Flagged / Harmful</option>
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
                Apply Changes
                <Save size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
