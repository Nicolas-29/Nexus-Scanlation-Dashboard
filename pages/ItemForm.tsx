
import React, { useState } from 'react';
import { 
  Upload, 
  Plus, 
  Image as ImageIcon, 
  FileText, 
  Hash, 
  Calendar, 
  Layers,
  BookOpen,
  ArrowRight,
  Save,
  ChevronLeft,
  Star,
  Eye
} from 'lucide-react';
import { CatalogItem } from '../types';

interface ItemFormProps {
  type: 'add' | 'edit';
  initialData?: CatalogItem;
  onSubmit: (item: CatalogItem) => void;
  onCancel?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ type, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CatalogItem>(initialData || {
    id: Math.floor(Math.random() * 10000),
    title: '',
    cover: 'https://picsum.photos/seed/default/200/300',
    rating: 0,
    category: 'Manga',
    views: 0,
    status: 'Visible',
    createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    description: '',
    year: '',
    chapters: '',
    country: 'Japan',
    genres: ''
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.cover || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Converte para número se for o caso
    const finalValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Bloqueia teclas de sinais e exponencial
    if (['-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleNumericWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Remove o foco para evitar alteração de valor via scroll
    (e.target as HTMLInputElement).blur();
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCoverPreview(url);
      setFormData(prev => ({ ...prev, cover: url }));
    }
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
            {type === 'edit' && onCancel && (
              <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {type === 'add' ? 'Add New Item' : `Edit Series: ${formData.title}`}
            </h1>
          </div>
          <p className="text-slate-500 text-sm italic">
            {type === 'add' ? 'Expand the Nexus Library with a new masterpiece.' : 'Update the metadata for this entry.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
              <ImageIcon size={14} className="text-indigo-400" /> Cover Upload
            </h3>
            
            <div className="relative group cursor-pointer">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
                accept="image/*"
                onChange={handleCoverChange}
              />
              <div className={`aspect-[190/270] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 overflow-hidden shadow-2xl ${
                coverPreview ? 'border-indigo-500/50' : 'border-slate-800 bg-slate-950/50 hover:border-indigo-500/30'
              }`}>
                {coverPreview ? (
                  <img src={coverPreview} className="w-full h-full object-cover" alt="Cover Preview" />
                ) : (
                  <>
                    <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-400 group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm font-bold text-slate-300">Choose Cover Image</p>
                      <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest">Recommended: 190 x 270 px</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Work Type:</span>
              <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
                <button 
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, category: 'Manga' }))}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    formData.category === 'Manga' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Manga / Comic
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, category: 'Novel' }))}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    formData.category === 'Novel' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Web Novel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Series Title</label>
                <div className="relative group">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400" size={18} />
                  <input 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    placeholder="Enter the official title..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Synopsis / Description</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-5 text-slate-600 group-focus-within:text-indigo-400" size={18} />
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe the epic journey..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Initial Rating (0.0 - 10.0)</label>
                <div className="relative group">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    onKeyDown={handleNumericKeyDown}
                    onWheel={handleNumericWheel}
                    type="number" 
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="9.8"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Initial Views</label>
                <div className="relative group">
                  <Eye className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    onKeyDown={handleNumericKeyDown}
                    onWheel={handleNumericWheel}
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Release Year</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="e.g. 2024"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Chapters / Length</label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="chapters"
                    value={formData.chapters}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="e.g. 150+ / Ongoing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Visibility Status</label>
                <div className="relative">
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all"
                  >
                    <option value="Visible">Visible (Public)</option>
                    <option value="Hidden">Hidden (Private)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Genres</label>
                <div className="relative group">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="genres"
                    value={formData.genres}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Action, Fantasy, System..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/60 flex items-center justify-end gap-4">
              {onCancel && (
                <button 
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-3.5 bg-slate-800 text-slate-400 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-700 hover:text-white transition-all"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                className="px-10 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95 flex items-center gap-3"
              >
                {type === 'add' ? 'Publish Series' : 'Save Changes'} 
                {type === 'add' ? <ArrowRight size={18} /> : <Save size={18} />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
