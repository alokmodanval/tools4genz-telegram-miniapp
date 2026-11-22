import React from 'react';
import { Share2, MessageSquare, ExternalLink } from 'lucide-react';

export function Header({ user, onShare, onContact }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/[0.08] px-4 py-2.5">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Brand with Original Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <img
              src="/tools4genz-logo.png"
              alt="Tools4Genz"
              className="w-9 h-9 rounded-xl object-cover border border-white/10 shadow-sm bg-[#121622]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/favicon.png';
              }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0d14]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-semibold tracking-tight text-white font-sans">
                Tools4Genz
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans">
              Web Studio & Developer Utilities
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors"
            title="Share App"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onContact}
            className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
