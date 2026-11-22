import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Globe, Laptop, Terminal } from 'lucide-react';

export function ServicesTab({ onOpenPortfolioModal, onOpenCustomModal, onHaptic }) {
  return (
    <div className="space-y-4 pb-20">
      {/* Studio Header */}
      <div className="p-4 rounded-2xl surface-card space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
            Web Engineering & Studio
          </span>
          <span className="text-zinc-500 text-xs">•</span>
          <span className="text-[11px] text-zinc-400">Zero Recurring Hosting Costs</span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Modern web development, built cleanly.
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Har website ko genuine handcrafted code se develop kiya jata hai, production-grade Cloudflare par deploy hota hai with complete SEO optimization.
        </p>
      </div>

      {/* Featured Service: ₹499 Custom Website Package */}
      <div className="p-4 rounded-2xl surface-raised border border-white/[0.14] space-y-3.5 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold mb-1">
              <span>All-Inclusive Package</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Full Custom Website
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Landing page, business showcase ya portfolio website
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono text-white">
              ₹499
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              One-time fee
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="grid grid-cols-1 gap-2 pt-1 border-t border-white/[0.06] text-xs text-zinc-300">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span><strong>Full Deployment:</strong> Cloudflare Pages global CDN par live hosting</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span><strong>Complete SEO:</strong> Meta tags, Open Graph, Sitemap & Fast Indexing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span><strong>Mobile & Speed Optimized:</strong> 95+ Core Web Vitals score</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span><strong>Domain Setup:</strong> Free <code className="code-tag text-zinc-200">.tools4genz.com</code> ya aapka apna custom domain</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span><strong>Timeline:</strong> 48 se 72 ghante me live delivery</span>
          </div>
        </div>

        <button
          onClick={() => {
            onHaptic('medium');
            onOpenCustomModal();
          }}
          className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-all flex items-center justify-center space-x-2 active:scale-98 shadow-sm"
        >
          <span>Order Custom Website (₹499)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Second Deal: ₹19 Instant Portfolio */}
      <div className="p-4 rounded-2xl surface-card space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08] text-[10px] font-mono mb-1">
              <span>Developer Special</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              Instant Student & Dev Portfolio
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Personal dark-mode portfolio with interactive CLI mode
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold font-mono text-zinc-100">
              ₹19
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              24h delivery
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
          <div className="flex items-center space-x-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Terminal CLI Mode</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>GitHub Showcases</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Subdomain Included</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Zero Server Bill</span>
          </div>
        </div>

        <button
          onClick={() => {
            onHaptic('medium');
            onOpenPortfolioModal();
          }}
          className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium text-xs transition-all flex items-center justify-center space-x-2 active:scale-98"
        >
          <span>Build Portfolio for ₹19</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Simple Work Process */}
      <div className="p-3.5 rounded-2xl surface-card space-y-2">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          How It Works
        </span>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-xs font-mono text-zinc-300 font-bold mb-1">01. Brief</div>
            <p className="text-[10px] text-zinc-400">Requirements & content share karein</p>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-xs font-mono text-zinc-300 font-bold mb-1">02. Build</div>
            <p className="text-[10px] text-zinc-400">Design, code & SEO configuration</p>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-xs font-mono text-zinc-300 font-bold mb-1">03. Live</div>
            <p className="text-[10px] text-zinc-400">Domain link aur handover</p>
          </div>
        </div>
      </div>
    </div>
  );
}
