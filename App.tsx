
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Users from './pages/Users';
import Comments from './pages/Comments';
import ItemForm from './pages/ItemForm';
import UserForm from './pages/UserForm';
import CommentForm from './pages/CommentForm';
import ChapterForm from './pages/ChapterForm';
import Settings from './pages/Settings';
import Monetization from './pages/Monetization';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import { Menu, X, Bell, Search, Zap } from 'lucide-react';
import { Page, CatalogItem, UserItem, CommentItem, ChapterItem, Toast as ToastType } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [preselectedItemId, setPreselectedItemId] = useState<number | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // UI States
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const addToast = (message: string, type: ToastType['type']) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  // Catalog State
  const [items, setItems] = useState<CatalogItem[]>([
    { id: 1042, title: 'Solo Leveling: Ragnarok', cover: 'https://picsum.photos/seed/slr/200/300', rating: 9.8, category: 'Manga', views: 245600, status: 'Visible', createdAt: '24 Oct 2023', description: 'The sequel to Solo Leveling.', year: '2023', chapters: '150+', country: 'South Korea', genres: 'Action, Fantasy' },
    { id: 1041, title: 'Pick Me Up! Infinite Gacha', cover: 'https://picsum.photos/seed/pmu/200/300', rating: 9.5, category: 'Manga', views: 189200, status: 'Visible', createdAt: '22 Oct 2023' },
    { id: 1040, title: 'Ending Maker', cover: 'https://picsum.photos/seed/em/200/300', rating: 9.4, category: 'Novel', views: 82300, status: 'Visible', createdAt: '20 Oct 2023' },
    { id: 1039, title: 'Superhuman Era', cover: 'https://picsum.photos/seed/se/200/300', rating: 9.2, category: 'Manga', views: 145700, status: 'Visible', createdAt: '18 Oct 2023' },
    { id: 1038, title: 'Trash of the Count Family', cover: 'https://picsum.photos/seed/tcf/200/300', rating: 9.6, category: 'Novel', views: 95400, status: 'Hidden', createdAt: '15 Oct 2023' },
  ]);

  // Chapters State
  const [chapters, setChapters] = useState<ChapterItem[]>([]);

  // Users State
  const [users, setUsers] = useState<UserItem[]>([
    { id: 23, name: 'John Doe', username: 'johndoe_nexus', email: 'john@nexus.com', avatar: 'https://picsum.photos/seed/j1/100', plan: 'Premium', commentsCount: 13, reviewsCount: 1, status: 'Approved', createdAt: '24 Oct 2021' },
    { id: 24, name: 'Sarah Frost', username: 'frosty_queen', email: 'sarah@winter.com', avatar: 'https://picsum.photos/seed/j2/100', plan: 'Free', commentsCount: 1, reviewsCount: 15, status: 'Approved', createdAt: '22 Oct 2021' },
    { id: 25, name: 'Marcus Blade', username: 'slash_master', email: 'blade@warrior.net', avatar: 'https://picsum.photos/seed/j3/100', plan: 'Premium', commentsCount: 6, reviewsCount: 6, status: 'Approved', createdAt: '21 Oct 2021' },
    { id: 26, name: 'Kevin Void', username: 'abyssal_dev', email: 'kevin@void.io', avatar: 'https://picsum.photos/seed/j4/100', plan: 'Cinematic', commentsCount: 11, reviewsCount: 15, status: 'Banned', createdAt: '18 Oct 2021' },
  ]);

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>([
    { id: 23, itemTitle: 'Solo Leveling: Ragnarok', authorName: 'Jonathan Banks', authorAvatar: 'https://picsum.photos/seed/c1/80', text: 'This chapter was absolutely incredible! The art style has evolved so much since the first season. Can\'t wait for next week!', likes: 12, dislikes: 7, createdAt: '24 Oct 2021', status: 'Approved' },
    { id: 24, itemTitle: 'Ending Maker', authorName: 'John Doe', authorAvatar: 'https://picsum.photos/seed/c2/80', text: 'I feel like the pacing is slowing down a bit too much. Still enjoying the characters though.', likes: 67, dislikes: 22, createdAt: '24 Oct 2021', status: 'Pending' },
    { id: 25, itemTitle: 'Superhuman Era', authorName: 'Brian Cranston', authorAvatar: 'https://picsum.photos/seed/c3/80', text: 'A masterpiece of storytelling. Every panel is filled with emotion.', likes: 44, dislikes: 5, createdAt: '24 Oct 2021', status: 'Approved' },
    { id: 26, itemTitle: 'Trash of the Count Family', authorName: 'Matt Jones', authorAvatar: 'https://picsum.photos/seed/c8/80', text: 'The chemistry between the leads is just too good. Cutest couple in all of novels.', likes: 13, dislikes: 14, createdAt: '24 Oct 2021', status: 'Flagged' },
  ]);

  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editingComment, setEditingComment] = useState<CommentItem | null>(null);

  // Implement handleAiInsight using Google GenAI SDK
  const handleAiInsight = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    addToast('Analyzing site activity for insights...', 'info');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const statsContext = `
        Scanlation Site: Nexus Scan
        Catalog size: ${items.length} series
        User count: ${users.length}
        Recent comments: ${comments.length}
        Top performer: ${items[0]?.title} (${items[0]?.views} views)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the Nexus Scan Admin AI. Based on these stats, provide one high-level strategic insight or recommendation for the team: ${statsContext}. Keep it concise (max 2 sentences) and authoritative yet motivating.`,
      });

      const insight = response.text;
      if (insight) {
        openConfirm('Nexus AI Insight', insight, () => closeConfirm());
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      addToast('Could not reach Nexus AI services.', 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Catalog CRUD
  const handleDeleteItem = (id: number) => {
    openConfirm(
      'Delete Series?',
      'This will permanently remove this title and all associated chapters from the library.',
      () => {
        setItems(items.filter(it => it.id !== id));
        addToast('Series deleted successfully', 'success');
        closeConfirm();
      }
    );
  };

  const handleUpdateItem = (updatedItem: CatalogItem) => {
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    setEditingItem(null);
    setCurrentPage(Page.CATALOG);
    addToast('Series metadata updated', 'success');
  };

  const handleAddItem = (it: CatalogItem) => {
    setItems([it, ...items]);
    setCurrentPage(Page.CATALOG);
    addToast(`"${it.title}" published!`, 'success');
  };

  // Chapter logic
  const handleAddChapter = (chapter: ChapterItem) => {
    setChapters([chapter, ...chapters]);
    setCurrentPage(Page.CATALOG);
    addToast(`Chapter ${chapter.number} published successfully!`, 'success');
  };

  // User CRUD
  const handleDeleteUser = (id: number) => {
    openConfirm(
      'Terminate Account?',
      'The user will lose access to their profile and subscription immediately.',
      () => {
        setUsers(users.filter(u => u.id !== id));
        addToast('User account removed', 'info');
        closeConfirm();
      }
    );
  };

  const handleUpdateUser = (u: UserItem) => {
    setUsers(users.map(us => us.id === u.id ? u : us));
    setEditingUser(null);
    setCurrentPage(Page.USERS);
    addToast('Profile updated successfully', 'success');
  };

  // Comment CRUD
  const handleDeleteComment = (id: number) => {
    openConfirm(
      'Delete Comment?',
      'This action cannot be undone and the user will not be notified.',
      () => {
        setComments(comments.filter(c => c.id !== id));
        addToast('Comment removed from site', 'info');
        closeConfirm();
      }
    );
  };

  const handleUpdateComment = (updatedComment: CommentItem) => {
    setComments(comments.map(c => c.id === updatedComment.id ? updatedComment : c));
    setEditingComment(null);
    setCurrentPage(Page.COMMENTS);
    addToast('Comment content modified', 'success');
  };

  const handleToggleCommentStatus = (id: number) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Approved' ? 'Pending' : 'Approved';
        addToast(`Comment marked as ${nextStatus}`, 'info');
        return { ...c, status: nextStatus as 'Approved' | 'Pending' };
      }
      return c;
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.CATALOG:
        return <Catalog items={items} onDelete={handleDeleteItem} onEdit={(it) => { setEditingItem(it); setCurrentPage(Page.EDIT_ITEM); }} onAddChapter={(id) => { setPreselectedItemId(id); setCurrentPage(Page.ADD_CHAPTER); }} />;
      case Page.USERS:
        return <Users users={users} onDelete={handleDeleteUser} onEdit={(u) => { setEditingUser(u); setCurrentPage(Page.EDIT_USER); }} onToggleStatus={(id) => setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Approved' ? 'Banned' : 'Approved' } : u))} onAdd={() => setCurrentPage(Page.ADD_USER)} />;
      case Page.COMMENTS:
        return <Comments comments={comments} onDelete={handleDeleteComment} onEdit={(c) => { setEditingComment(c); setCurrentPage(Page.EDIT_COMMENT); }} onToggleStatus={handleToggleCommentStatus} />;
      case Page.ADD_ITEM:
        return <ItemForm type="add" onSubmit={handleAddItem} onCancel={() => setCurrentPage(Page.CATALOG)} />;
      case Page.EDIT_ITEM:
        return <ItemForm type="edit" initialData={editingItem || undefined} onSubmit={handleUpdateItem} onCancel={() => setCurrentPage(Page.CATALOG)} />;
      case Page.ADD_USER:
        return <UserForm type="add" onSubmit={(u) => { setUsers([u, ...users]); setCurrentPage(Page.USERS); addToast('New member added', 'success'); }} onCancel={() => setCurrentPage(Page.USERS)} />;
      case Page.EDIT_USER:
        return <UserForm type="edit" initialData={editingUser || undefined} onSubmit={handleUpdateUser} onCancel={() => setCurrentPage(Page.USERS)} />;
      case Page.EDIT_COMMENT:
        return <CommentForm initialData={editingComment || undefined} onSubmit={handleUpdateComment} onCancel={() => setCurrentPage(Page.COMMENTS)} />;
      case Page.ADD_CHAPTER:
        return <ChapterForm items={items} preselectedId={preselectedItemId} onSubmit={handleAddChapter} onCancel={() => { setPreselectedItemId(null); setCurrentPage(Page.CATALOG); }} />;
      case Page.SETTINGS:
        return <Settings />;
      case Page.MONETIZATION:
        return <Monetization />;
      case Page.DASHBOARD:
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 overflow-x-hidden relative text-slate-200">
      <Sidebar 
        isOpen={isSidebarOpen} 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
          if (page !== Page.ADD_CHAPTER) setPreselectedItemId(null);
        }} 
      />
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Global Confirmation Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={closeConfirm}
      />

      {/* Global Toasts Container */}
      <div className="fixed bottom-6 right-6 z-[110] flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>

      <main className="flex-1 w-full max-w-full lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 px-4 md:px-6 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button className="p-2 text-slate-400 hover:text-indigo-400 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <button 
              onClick={handleAiInsight}
              disabled={isAiLoading}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap disabled:opacity-50"
            >
              <Zap size={16} className={`fill-white hidden sm:block ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>{isAiLoading ? 'Analyzing...' : 'AI Insight'}</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6 w-full max-w-full overflow-x-hidden">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
