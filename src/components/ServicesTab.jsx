import React from 'react';
import { Sparkles, Flame, ArrowRight, Check, Zap, Globe, Shield, Terminal, Star } from 'lucide-react';
import { WEB_SERVICES } from '../data/projectsData';

export function ServicesTab({ onOpenPortfolioModal, onOpenCustomModal, onHaptic }) {
  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-br from-purple-900/50 via-[#131626] to-[#0f111c] border border-purple-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-semibold">
            <Flame className="w-3.5 h-3.5 text-pink-400" />
            <span>Tools4Genz Exclusive Deals</span>
          </div>
          
          <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
            Build your Web & Digital Brand in Minutes 🚀
          </h2>
          
          <p className="text-xs text-gray-300 leading-relaxed">
            Personal dark-mode portfolios, custom startup websites aur business web apps at student-friendly pricing.
          </p>
        </div>
      </div>

      {/* Flagship Deal: ₹19 Instant Portfolio */}
      <div className="relative p-4 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#161b2e] to-indigo-950/60 border-2 border-purple-500/50 shadow-xl overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-500/30 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                LIMITED OFFER 🔥
              </span>
              <span className="text-xs text-purple-400 font-bold">96% Discount</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              ₹19 Instant Portfolio Builder
            </h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">
              ₹19
            </div>
            <div className="text-[11px] text-gray-400 line-through">₹499</div>
          </div>
        </div>

        <p className="text-xs text-gray-300 mb-3.5">
          Apna professional dark-mode portfolio banwayein with interactive CLI mode, GitHub integration, and free <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">.tools4genz.com</code> subdomain!
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-gray-300">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live in 24 Hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mobile & Dark Mode</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Subdomain Included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Easy UPI Payment</span>
          </div>
        </div>

        <button
          onClick={() => {
            onHaptic('medium');
            onOpenPortfolioModal();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Claim Portfolio for ₹19</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Custom Website Development Order Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Custom Web Development & Orders</span>
          </h3>
          <span className="text-[11px] text-gray-400">Fixed & Fair Pricing</span>
        </div>

        {WEB_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  {srv.popular && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{srv.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
              <div>
                <span className="text-xs font-bold text-cyan-400">{srv.price}</span>
                <span className="text-[10px] text-gray-500 ml-2">🕒 {srv.timeline}</span>
              </div>
              <button
                onClick={() => {
                  onHaptic('medium');
                  onOpenCustomModal();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-xs font-semibold text-white border border-white/10 hover:border-cyan-500/40 active:scale-95 transition-all"
              >
                Order / Inquire
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center space-x-3 text-xs text-gray-400">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <span className="text-gray-200 font-semibold">100% Satisfaction & Speed</span>
          <p className="text-[11px]">Direct developer support on Telegram with free SSL & cloud hosting.</p>
        </div>
      </div>
    </div>
  );
}
