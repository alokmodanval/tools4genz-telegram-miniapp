import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CLIENT_PORTFOLIOS } from '../data/projectsData';

export function ProjectsTab({ onHaptic, openExternalLink, onOpenCustomModal }) {
  return (
    <div className="space-y-4 pb-20">
      {/* Intro */}
      <div className="p-3.5 rounded-2xl surface-card">
        <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
          Production Ecosystem
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Live SaaS products and client portfolios deployed on global infrastructure.
        </p>
      </div>

      {/* Flagship SaaS */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-1">
          Platforms & Tools
        </span>

        {PROJECTS.filter((p) => !p.isDeal && !p.isCustomDeal).map((proj) => (
          <div
            key={proj.id}
            className="p-3.5 rounded-2xl surface-card hover:border-white/[0.14] transition-all space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                    {proj.badge}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">{proj.category}</span>
              </div>

              {proj.link && (
                <button
                  onClick={() => openExternalLink(proj.link)}
                  className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-zinc-300">{proj.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Client Portfolios */}
      <div className="space-y-2.5 pt-2">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-1">
          Live Client Portfolios
        </span>

        <div className="grid grid-cols-1 gap-2">
          {CLIENT_PORTFOLIOS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl surface-card flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h5 className="text-xs font-semibold text-white">{item.name}</h5>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">{item.role}</p>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {item.domain}
                </div>
              </div>

              <button
                onClick={() => openExternalLink(`https://${item.domain}`)}
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-zinc-200 hover:text-white flex items-center space-x-1"
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
