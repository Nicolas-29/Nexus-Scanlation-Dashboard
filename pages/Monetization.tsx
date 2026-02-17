
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Monitor, 
  Smartphone, 
  Target, 
  AlertCircle, 
  ShieldAlert, 
  Layout, 
  Zap, 
  Layers,
  BarChart3,
  MousePointer2,
  Globe,
  Settings2
} from 'lucide-react';
import StatsCard from '../components/StatsCard';

const Monetization: React.FC = () => {
  const [antiAdblock, setAntiAdblock] = useState(true);
  const [lazyLoading, setLazyLoading] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Monetization <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-amber-500/20">Pro</span>
          </h1>
          <p className="text-slate-500 text-sm italic">Optimize your Nexus Scanlation revenue streams.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/20 hover:from-amber-500 hover:to-orange-500 transition-all active:scale-95">
            <Zap size={16} />
            Turbo Boost Ads
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Est. Earnings (Mo)" value="$4,250.80" icon={<DollarSign size={20} />} trend="+15.4%" isPositive={true} />
        <StatsCard label="Avg. RPM" value="$2.45" icon={<TrendingUp size={20} />} trend="+0.12" isPositive={true} />
        <StatsCard label="Ad Impressions" value="1.8M" icon={<MousePointer2 size={20} />} trend="+240K" isPositive={true} />
        <StatsCard label="Fill Rate" value="98.2%" icon={<BarChart3 size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Ad Units */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500"><Layout size={18} /></div>
                <h3 className="text-lg font-bold text-white">Ad Placements</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Slots: 04</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Header Leaderboard', size: '728x90', type: 'Display', status: 'Active', devices: 'All' },
                { name: 'Reader Interstitial', size: 'Full Screen', type: 'Pop-under', status: 'Active', devices: 'Mobile' },
                { name: 'Mid-Chapter Ribbon', size: '300x250', type: 'In-Content', status: 'Paused', devices: 'Desktop' },
                { name: 'Footer Sticky', size: '320x50', type: 'Anchor', status: 'Active', devices: 'Mobile' },
              ].map((ad, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-amber-500 transition-colors">
                      {ad.devices === 'Mobile' ? <Smartphone size={24} /> : <Monitor size={24} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{ad.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">
                        {ad.size} • {ad.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ad.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {ad.status}
                    </div>
                    <button className="p-2 text-slate-600 hover:text-white transition-colors">
                      <Settings2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 hover:text-amber-500 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest">
              <Layers size={16} />
              Create New Ad Unit
            </button>
          </div>
        </div>

        {/* Right Column: Networks & Settings */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Globe size={14} className="text-amber-500" /> Ad Networks
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Google AdSense', color: 'bg-emerald-500' },
                { name: 'MGID Native', color: 'bg-indigo-500' },
                { name: 'PropellerAds', color: 'bg-orange-500' },
                { name: 'Direct Sponsorship', color: 'bg-rose-500' },
              ].map((net, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${net.color}`}></div>
                    <span className="text-sm font-bold text-slate-200">{net.name}</span>
                  </div>
                  <div className="h-5 w-9 bg-amber-600 rounded-full flex items-center px-1">
                    <div className="h-3 w-3 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <ShieldAlert size={14} className="text-amber-500" /> Revenue Protection
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white">Anti-Adblock Pro</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Show recovery message to adblock users.</p>
                </div>
                <button 
                  onClick={() => setAntiAdblock(!antiAdblock)}
                  className={`h-5 w-9 rounded-full transition-colors flex items-center px-1 ${antiAdblock ? 'bg-amber-600' : 'bg-slate-800'}`}
                >
                  <div className={`h-3 w-3 bg-white rounded-full transition-all ${antiAdblock ? 'ml-auto' : 'ml-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white">Lazy Load Ads</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Load ads only when scrolled into view.</p>
                </div>
                <button 
                  onClick={() => setLazyLoading(!lazyLoading)}
                  className={`h-5 w-9 rounded-full transition-colors flex items-center px-1 ${lazyLoading ? 'bg-amber-600' : 'bg-slate-800'}`}
                >
                  <div className={`h-3 w-3 bg-white rounded-full transition-all ${lazyLoading ? 'ml-auto' : 'ml-0'}`}></div>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800/60">
                <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 flex items-start gap-3">
                  <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    <strong className="text-amber-500">Tip:</strong> Native ads between manga pages have 3x higher CTR than sidebar banners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monetization;
