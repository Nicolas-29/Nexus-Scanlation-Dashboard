
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Search, 
  Shield, 
  Zap, 
  Save, 
  Trash2, 
  Database, 
  Code,
  Layout,
  Share2,
  Lock,
  RefreshCw,
  Info
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'advanced' | 'security'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={16} /> },
    { id: 'seo', label: 'SEO', icon: <Search size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
    { id: 'advanced', label: 'Advanced', icon: <Zap size={16} /> },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Site Settings</h1>
          <p className="text-slate-500 text-sm">Configure your Nexus Scanlation engine and SEO optimization.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all active:scale-95">
          <Save size={16} />
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-3 backdrop-blur-sm space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                }`}
              >
                {tab.icon}
                <span className="text-sm font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl p-6 text-center">
            <div className="p-3 bg-indigo-500/10 rounded-full w-fit mx-auto text-indigo-400 mb-4">
              <RefreshCw size={24} />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">System Status</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">All systems operational. Nexus Engine v4.2.0 is up to date.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
              Check for updates
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><Layout size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Identity & Maintenance</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Site Brand Name</label>
                    <input 
                      type="text" 
                      defaultValue="Nexus Scanlation"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Support Email</label>
                    <input 
                      type="email" 
                      defaultValue="contact@nexus-scan.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Maintenance Mode</h4>
                    <p className="text-xs text-slate-500">Only administrators will be able to access the site.</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-slate-800">
                    <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><Share2 size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Social Integrations</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Discord Invite Link</label>
                      <input type="text" placeholder="https://discord.gg/..." className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-slate-200 focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Twitter/X Profile</label>
                      <input type="text" placeholder="@NexusScan" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-sm text-slate-200 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400"><Search size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Metadata & Indexing</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Meta Title Template</label>
                    <input 
                      type="text" 
                      defaultValue="%title% - Nexus Scanlation"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all"
                    />
                    <p className="text-[10px] text-slate-600 italic">Variables: %title%, %category%, %site_name%</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Meta Description</label>
                    <textarea 
                      rows={4}
                      defaultValue="Read the latest mangas and novels on Nexus Scanlation. High-quality translations and fast updates."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Focus Keywords</label>
                    <input 
                      type="text" 
                      defaultValue="manga, scanlation, novel, reading, anime, solo leveling"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-start gap-4">
                <Info size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">SEO Health Score: 92/100</h4>
                  <p className="text-xs text-slate-500">Your site is well-optimized for search engines. Ensure all cover images have alt tags for 100% score.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400"><Lock size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Access Control</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Force Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Require all staff members to use 2FA to log in.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-rose-600">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Login Attempt Limitation</h4>
                      <p className="text-xs text-slate-500">Block IPs after 5 failed login attempts within 10 minutes.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-rose-600">
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400"><Trash2 size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Danger Zone</h3>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-3 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-600/20 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-all">
                    Wipe Comment History
                  </button>
                  <button className="flex-1 px-4 py-3 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-600/20 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-all">
                    Force Global Logout
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><Database size={18} /></div>
                  <h3 className="text-lg font-bold text-white">API Keys & External Services</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cloudflare Turnstile Key</label>
                    <input type="password" value="************************" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-400 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Google Analytics ID</label>
                    <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all" />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><Code size={18} /></div>
                  <h3 className="text-lg font-bold text-white">Custom Scripts</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Header Scripts (&lt;head&gt;)</label>
                    <textarea 
                      rows={4}
                      placeholder="<!-- Paste your custom JS/CSS here -->"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 text-sm font-mono text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all resize-none"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
