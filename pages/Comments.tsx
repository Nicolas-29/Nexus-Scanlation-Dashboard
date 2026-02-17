
import React from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  Clock,
  ExternalLink,
  Edit3,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { CommentItem } from '../types';

interface CommentsProps {
  comments: CommentItem[];
  onDelete: (id: number) => void;
  onEdit: (comment: CommentItem) => void;
  onToggleStatus: (id: number) => void;
}

const Comments: React.FC<CommentsProps> = ({ comments, onDelete, onEdit, onToggleStatus }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      {/* Title section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">User Comments</h1>
          <p className="text-slate-500 text-sm">Review and moderate community discussions across the catalog.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            {comments.length} Moderated Comments
          </span>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Total Comments" value={comments.length.toString()} icon={<MessageSquare size={20} />} trend="+12.5%" />
        <StatsCard label="Pending Moderation" value={comments.filter(c => c.status !== 'Approved').length.toString()} icon={<AlertCircle size={20} />} isPositive={false} />
        <StatsCard label="Total Likes" value="85.2K" icon={<ThumbsUp size={20} />} />
        <StatsCard label="Total Dislikes" value="12.1K" icon={<ThumbsDown size={20} />} isPositive={false} />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by keyword, author or series..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-400 appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all">
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Flagged</option>
          </select>
          <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all border border-slate-700">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Comments Table / List */}
      <div className="w-full">
        {/* Mobile & Tablet: Card View (lg:hidden) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-slate-900/60 border border-slate-800/60 rounded-3xl p-5 space-y-4 hover:border-indigo-500/20 transition-all backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={comment.authorAvatar} className="w-10 h-10 rounded-full border border-slate-800 object-cover" alt={comment.authorName} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-100 truncate text-sm">{comment.authorName}</span>
                    <span className="text-[10px] text-slate-600 font-mono">#{comment.id}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold">
                    <Clock size={12} />
                    {comment.createdAt}
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                    comment.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                    comment.status === 'Flagged' ? 'bg-rose-500/10 text-rose-400' : 
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {comment.status}
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-1.5 mb-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                  <ExternalLink size={10} />
                  {comment.itemTitle}
                </div>
                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  "{comment.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-[11px] font-black">
                  <div className="flex items-center gap-1.5 text-emerald-500/80">
                    <ThumbsUp size={14} /> {comment.likes}
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-500/80">
                    <ThumbsDown size={14} /> {comment.dislikes}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onToggleStatus(comment.id)} className={`p-2 rounded-lg ${comment.status === 'Approved' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {comment.status === 'Approved' ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                  </button>
                  <button onClick={() => onEdit(comment)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit3 size={16} /></button>
                  <button onClick={() => onDelete(comment.id)} className="p-2 bg-slate-800 text-rose-400 rounded-lg hover:bg-rose-600/20"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table View (lg:block) */}
        <div className="hidden lg:block bg-slate-900/40 border border-slate-800/60 rounded-[2rem] overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800/60 bg-slate-900/30">
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Author & Item</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Comment Content</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-center">Status</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-center">Engagement</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px]">Date</th>
                <th className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-indigo-600/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <img src={comment.authorAvatar} className="w-8 h-8 rounded-full border border-slate-800 object-cover" alt={comment.authorName} />
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-200 text-xs">{comment.authorName}</span>
                           <span className="text-[10px] text-slate-600 font-mono">#{comment.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider group-hover:text-indigo-300 transition-colors">
                        <ExternalLink size={10} />
                        {comment.itemTitle}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="max-w-xs xl:max-w-md">
                      <p className="text-slate-400 line-clamp-2 text-xs italic leading-relaxed">
                        "{comment.text}"
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      comment.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      comment.status === 'Flagged' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {comment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-5 text-[11px] font-black">
                      <div className="flex items-center gap-1.5 text-emerald-500/60 group-hover:text-emerald-500 transition-colors" title="Likes">
                        <ThumbsUp size={14} /> {comment.likes}
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-500/60 group-hover:text-rose-500 transition-colors" title="Dislikes">
                        <ThumbsDown size={14} /> {comment.dislikes}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-slate-500 text-[11px] font-bold whitespace-nowrap">
                      {comment.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onToggleStatus(comment.id)} className={`p-2 rounded-xl border transition-all ${comment.status === 'Approved' ? 'bg-slate-800 text-amber-400 border-amber-500/20' : 'bg-slate-800 text-emerald-400 border-emerald-500/20'}`} title={comment.status === 'Approved' ? 'Mark Pending' : 'Approve'}>
                        {comment.status === 'Approved' ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                      </button>
                      <button onClick={() => onEdit(comment)} className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-slate-700" title="Edit Content">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(comment.id)} className="p-2 bg-slate-800/50 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-slate-700" title="Delete Permanent">
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
          Moderating <span className="text-white font-bold font-mono">{comments.length}</span> active discussions
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

export default Comments;
