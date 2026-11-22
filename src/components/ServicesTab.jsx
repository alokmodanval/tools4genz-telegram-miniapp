import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Globe, Laptop, Terminal, Sparkles } from 'lucide-react';

export function ServicesTab({ onOpenPortfolioModal, onOpenCustomModal, onHaptic }) {
  return (
    <div className="space-y-4 pb-20">
      {/* Studio Hero Banner */}
      <div className="relative p-4 rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-blue-100/60 via-cyan-50/40 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Web Engineering & Studio</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
            Crafting fast, modern websites with precision.
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Har project ko genuine clean code se develop kiya jata hai, production-grade Cloudflare CDN par deploy hota hai with complete SEO optimization.
          </p>
        </div>
      </div>

      {/* Flagship Deal: ₹499 Custom Website Package */}
      <div className="relative p-5 rounded-3xl card-featured transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-xs mb-1.5">
              <span>All-Inclusive Package</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Full Custom Website
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Landing page, business showcase, ya personal brand
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-blue-600 tracking-tight">
              ₹499
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              One-time complete fee
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 py-3 border-y border-blue-100/80 text-xs text-slate-700">
          <div className="flex items-start space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Full Cloudflare Deployment:</strong> Global CDN edge hosting included (Zero recurring hosting bills)</span>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Complete Technical SEO:</strong> Google Meta tags, Open Graph card, Sitemap & Fast Indexing</span>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Mobile & Speed Optimized:</strong> 95+ Core Web Vitals score on mobile and desktop</span>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Domain Configuration:</strong> Free <code className="font-mono text-blue-800 bg-blue-50 px-1 py-0.5 rounded">.tools4genz.com</code> ya aapka apna custom domain attach</span>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Fast Turnaround:</strong> 48 se 72 ghante ke andar live delivery</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            onHaptic('medium');
            onOpenCustomModal();
          }}
          className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 active:scale-98 animate-shimmer"
        >
          <span>Order Custom Website (₹499)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deal 2: ₹19 Instant Portfolio */}
      <div className="p-4 rounded-3xl card-white transition-all space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono mb-1 font-semibold">
              <span>Student & Dev Special</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Instant Dark-Mode Portfolio
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personal portfolio with interactive CLI terminal mode
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono text-slate-900">
              ₹19
            </div>
            <div className="text-[10px] text-slate-400 font-mono line-through">
              ₹499
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive CLI Terminal</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>GitHub Showcases</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Subdomain Included</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero Hosting Fee</span>
          </div>
        </div>

        <button
          onClick={() => {
            onHaptic('medium');
            onOpenPortfolioModal();
          }}
          className="w-full py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-700 font-semibold text-xs transition-all flex items-center justify-center space-x-2 active:scale-98"
        >
          <span>Build Portfolio for ₹19</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Clean Work Process Steps */}
      <div className="p-4 rounded-3xl card-white space-y-2.5">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          How It Works
        </span>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">01. Brief</div>
            <p className="text-[10px] text-slate-500">Requirements & content share karein</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">02. Build</div>
            <p className="text-[10px] text-slate-500">Clean code, SEO & Cloudflare setup</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="text-xs font-mono text-blue-600 font-bold mb-1">03. Live</div>
            <p className="text-[10px] text-slate-500">Domain link aur handover</p>
          </div>
        </div>
      </div>
    </div>
  );
}
