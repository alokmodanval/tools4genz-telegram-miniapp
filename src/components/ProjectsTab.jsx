import React from 'react';
import { ExternalLink, Layers, Sparkles, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS, CLIENT_PORTFOLIOS } from '../data/projectsData';

export function ProjectsTab({ onHaptic, openExternalLink, onOpenCustomModal }) {
  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header Info */}
      <div className="p-3.5 rounded-2xl glass-panel border border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Tools4Genz Ecosystem & Live Work</span>
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Explore our real production SaaS platforms, client portfolios and live web tools.
        </p>
      </div>

      {/* Flagship Projects */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Flagship SaaS & Platforms
          </span>
          <span className="text-[10px] text-gray-500">Live on Cloudflare</span>
        </div>

        {PROJECTS.filter((p) => !p.isDeal).map((proj) => (
          <div
            key={proj.id}
            className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 transition-all space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {proj.badge}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">{proj.category}</span>
              </div>

              {proj.link && (
                <button
                  onClick={() => openExternalLink(proj.link)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-xs text-gray-300">{proj.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <span className="text-[11px] text-purple-400 font-mono">
                {proj.link?.replace('https://', '')}
              </span>
              <button
                onClick={() => {
                  onHaptic('light');
                  onOpenCustomModal();
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Build Similar</span>
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Client Portfolios Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            Live Client Portfolios
          </span>
          <span className="text-[10px] text-gray-500">Fast Dark Mode</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {CLIENT_PORTFOLIOS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h5 className="text-xs font-bold text-white">{item.name}</h5>
                  <span className="text-[9px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-800/40">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{item.role}</p>
                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <span>🌐 {item.domain}</span>
                </div>
              </div>

              <button
                onClick={() => openExternalLink(`https://${item.domain}`)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 hover:text-white flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
