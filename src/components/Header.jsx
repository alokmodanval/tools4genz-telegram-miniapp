import React from 'react';
import { Sparkles, Share2, ShieldCheck } from 'lucide-react';

export function Header({ user, onShare, onContact }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-500/20 px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-lg tracking-tighter">
                T4G
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0b0d13]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-sm font-bold tracking-tight text-white">
                Tools4Genz
              </h1>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                TMA
              </span>
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              Hey <span className="text-gray-200 font-medium">{user?.first_name || 'Creator'}</span>
              <Sparkles className="w-3 h-3 text-amber-400 inline" />
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all active:scale-95"
            title="Share Mini App"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onContact}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-purple-600/30 active:scale-95 transition-all flex items-center gap-1"
          >
            <span>DM Us</span>
          </button>
        </div>
      </div>
    </header>
  );
}
