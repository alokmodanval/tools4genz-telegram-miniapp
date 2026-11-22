import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CLIENT_PORTFOLIOS } from '../data/projectsData';

export function ProjectsTab({ onHaptic, openExternalLink, onOpenCustomModal }) {
  return (
    <div className="space-y-4 pb-20">
      {/* Intro */}
      <div className="p-4 rounded-3xl card-white">
        <h3 className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
          Production Ecosystem
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Live SaaS platforms and client portfolios deployed on Cloudflare global edge.
        </p>
      </div>

      {/* Flagship SaaS */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
          Platforms & Tools
        </span>

        {PROJECTS.filter((p) => !p.isDeal && !p.isCustomDeal).map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-3xl card-white space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {proj.badge}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{proj.category}</span>
              </div>

              {proj.link && (
                <button
                  onClick={() => openExternalLink(proj.link)}
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600">{proj.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Client Portfolios */}
      <div className="space-y-2.5 pt-1">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
          Live Client Portfolios
        </span>

        <div className="grid grid-cols-1 gap-2">
          {CLIENT_PORTFOLIOS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl card-white flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h5 className="text-xs font-bold text-slate-900">{item.name}</h5>
                  <span className="text-[9px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{item.role}</p>
                <div className="text-[10px] text-blue-600 font-mono">
                  {item.domain}
                </div>
              </div>

              <button
                onClick={() => openExternalLink(`https://${item.domain}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-700 flex items-center space-x-1 transition-colors"
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
