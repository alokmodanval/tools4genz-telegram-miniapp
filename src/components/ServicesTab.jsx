import React from 'react';
import { ArrowRight, Check, Flame, Sparkles, Terminal, Globe, ShieldCheck, Zap } from 'lucide-react';

export function ServicesTab({ onOpenPortfolioModal, onOpenCustomModal, onHaptic }) {
  return (
    <div className="space-y-4 pb-20">
      {/* Studio Header Banner */}
      <div className="relative p-4 rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Tools4Genz Official Deals</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
            Professional Web & Portfolio Studio
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ultra-fast websites, student portfolios, aur developer tools — Cloudflare global CDN par live with zero monthly hosting fees.
          </p>
        </div>
      </div>

      {/* SHOWSTOPPER: ₹19 Instant Portfolio Deal (249 kaat ke 19) */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 border-2 border-blue-400/80 shadow-lg shadow-blue-500/10 overflow-hidden">
        {/* Urgent Flash Deal Ribbon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs animate-pulse">
              <Flame className="w-3 h-3 fill-white" />
              <span>FLASH DEAL</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              Save ₹230 (92% OFF)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-semibold">
            ⚡ 24h Delivery
          </span>
        </div>

        {/* Title & Strikethrough Price Box */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <span>Instant Developer Portfolio</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dark-mode responsive portfolio with CLI Terminal mode
            </p>
          </div>

          <div className="text-right flex-shrink-0 ml-3">
            <div className="flex items-baseline justify-end space-x-1.5">
              <span className="text-xs font-bold text-rose-500 line-through decoration-rose-500 decoration-2 font-mono">
                ₹249
              </span>
              <span className="text-3xl font-black font-mono text-blue-600 tracking-tight">
                ₹19
              </span>
            </div>
            <div className="text-[10px] font-bold text-emerald-600">
              Only ₹19 Today
            </div>
          </div>
        </div>

        {/* Feature Highlights with Rounded Blue Icons */}
        <div className="space-y-2 py-3.5 my-3 border-y border-blue-100 text-xs text-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>Interactive CLI Terminal Mode:</strong> Impress recruiters with terminal commands</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>GitHub Showcase:</strong> Repositories, skills chips aur case studies</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>Free Subdomain:</strong> <code className="font-mono text-blue-800 bg-white px-1 py-0.5 rounded border border-blue-200">yourname.tools4genz.com</code></span>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>Zero Hosting Bills:</strong> Hosted forever on Cloudflare with free SSL</span>
          </div>
        </div>

        {/* Big Shimmering CTA Button */}
        <button
          onClick={() => {
            onHaptic('medium');
            onOpenPortfolioModal();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 active:scale-98 animate-shimmer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-200" />
          <span>Claim Portfolio for ₹19 (Save ₹230)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Package 2: ₹499 Custom Website Package */}
      <div className="relative p-4 rounded-3xl card-white transition-all space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold mb-1">
              <span>Full Website Service</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Full Custom Website
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Landing page, business showcase, ya e-commerce frontend
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="text-xl font-bold font-mono text-slate-900">
              ₹499
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              All-inclusive
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Full Cloudflare Pages deployment included (Zero hosting fees)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Complete Technical SEO (Meta tags, Sitemap, Open Graph)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>95+ PageSpeed score, mobile responsive & 48-72h delivery</span>
          </div>
        </div>

        <button
          onClick={() => {
            onHaptic('medium');
            onOpenCustomModal();
          }}
          className="w-full py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs transition-all flex items-center justify-center space-x-2 active:scale-98"
        >
          <span>Order Custom Website (₹499)</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* 3 Step Process */}
      <div className="p-4 rounded-3xl card-white space-y-2.5">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          How It Works
        </span>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">01. Details</div>
            <p className="text-[10px] text-slate-500">Name, skills & role enter karein</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">02. Pay ₹19</div>
            <p className="text-[10px] text-slate-500">UPI scan karke order DM karein</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">03. Go Live</div>
            <p className="text-[10px] text-slate-500">24h me live subdomain ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
