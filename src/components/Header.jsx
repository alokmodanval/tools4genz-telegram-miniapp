import React from 'react';
import { Share2, MessageSquare } from 'lucide-react';

export function Header({ user, onShare, onContact }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-blue-100/80 px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Brand with Original Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl p-[1.5px] bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-sm">
              <img
                src="/tools4genz-logo.png"
                alt="Tools4Genz"
                className="w-full h-full rounded-[14px] object-cover bg-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/favicon.png';
                }}
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-bold tracking-tight text-slate-900 font-sans">
                Tools4Genz
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Web Engineering & Utilities
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-slate-600 hover:text-blue-600 transition-all active:scale-95 shadow-xs"
            title="Share Mini App"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onContact}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
