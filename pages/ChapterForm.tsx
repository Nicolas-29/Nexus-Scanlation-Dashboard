
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Save, 
  Hash, 
  Type, 
  BookOpen, 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Plus,
  ArrowRight,
  X
} from 'lucide-react';
import { CatalogItem, Page } from '../types';

interface ChapterFormProps {
  items: CatalogItem[];
  preselectedId?: number | null;
  onSubmit: (chapter: any) => void;
  onCancel: () => void;
}

const ChapterForm: React.FC<ChapterFormProps> = ({ items, preselectedId, onSubmit, onCancel }) => {
  const [selectedItemId, setSelectedItemId] = useState<number>(preselectedId || (items.length > 0 ? items[0].id : 0));
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [chapterTitle, setChapterTitle] = useState<string>('');
  const [novelContent, setNovelContent] = useState<string>('');
  const [mangaPages, setMangaPages] = useState<string[]>([]);

  const selectedItem = items.find(it => it.id === selectedItemId);

  const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
  };

  const handleNumericWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  // Fixed error: cast e.target.files to File[] array to ensure correct typing for URL.createObjectURL
  const handleMangaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      const newPages = files.map(file => URL.createObjectURL(file));
      setMangaPages(prev => [...prev, ...newPages]);
    }
  };

  const removePage = (index: number) => {
    setMangaPages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId) return;
    
    onSubmit({
      id: Math.floor(Math.random() * 100000),
      itemId: selectedItemId,
      number: chapterNumber,
      title: chapterTitle,
      content: selectedItem?.category === 'Manga' ? mangaPages : novelContent,
      createdAt: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Release New Chapter
            </h1>
          </div>
          <p className="text-slate-500 text-sm italic">
            Expanding the Nexus universe, one chapter at a time.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <BookOpen size={14} className="text-indigo-400" /> Target Series
            </h3>
            
            <div className="space-y-4">
              <div className="relative">
                <select 
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_12px_center] bg-no-repeat transition-all"
                >
                  <option value={0} disabled>Select a series...</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>{item.title} ({item.category})</option>
                  ))}
                </select>
              </div>

              {selectedItem && (
                <div className="flex gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800 animate-in fade-in duration-300">
                  <img src={selectedItem.cover} className="w-16 h-24 rounded-xl object-cover border border-slate-800 shadow-lg" alt={selectedItem.title} />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">{selectedItem.category}</span>
                    <span className="text-sm font-bold text-white line-clamp-2 leading-tight">{selectedItem.title}</span>
                    <span className="text-[10px] text-slate-600 font-mono mt-1">ID: #{selectedItem.id}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Chapter Index</label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    value={chapterNumber}
                    onChange={(e) => setChapterNumber(Number(e.target.value))}
                    onKeyDown={handleNumericKeyDown}
                    onWheel={handleNumericWheel}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                    placeholder="e.g. 15.5"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Chapter Title (Optional)</label>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                    placeholder="e.g. The Beginning of the End"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                {selectedItem?.category === 'Manga' ? 'Manga Pages (Images)' : 'Novel Content (Text)'}
              </label>
              
              {selectedItem?.category === 'Manga' ? (
                <div className="space-y-6">
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleMangaUpload}
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
                    />
                    <div className="w-full py-12 border-2 border-dashed border-slate-800 bg-slate-950/50 rounded-3xl flex flex-col items-center justify-center gap-4 group-hover:border-indigo-500/40 transition-all">
                      <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-400 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-300">Drop Manga Pages Here</p>
                        <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest">Supports JPG, PNG, WEBP</p>
                      </div>
                    </div>
                  </div>

                  {mangaPages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                      {mangaPages.map((url, idx) => (
                        <div key={idx} className="relative group aspect-[2/3] rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                          <img src={url} className="w-full h-full object-cover" alt={`Page ${idx + 1}`} />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button"
                              onClick={() => removePage(idx)}
                              className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition-all active:scale-90"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-slate-900/80 text-[8px] font-bold text-white px-1.5 py-0.5 rounded border border-slate-700">
                            {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <FileText className="absolute left-4 top-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <textarea 
                    value={novelContent}
                    onChange={(e) => setNovelContent(e.target.value)}
                    rows={15}
                    placeholder="Write or paste the novel chapter text here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all resize-none leading-relaxed font-serif"
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800/60 flex items-center justify-end gap-4">
              <button 
                type="button"
                onClick={onCancel}
                className="px-8 py-3.5 bg-slate-800 text-slate-400 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-700 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!selectedItemId || (selectedItem?.category === 'Manga' ? mangaPages.length === 0 : !novelContent)}
                className="px-10 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish Chapter 
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChapterForm;
