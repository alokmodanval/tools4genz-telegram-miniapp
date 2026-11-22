import React, { useState } from 'react';
import { X, Globe, Send, Check, ShieldCheck, Clock, FileText } from 'lucide-react';

export function CustomOrderModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    contact: user?.username ? `@${user.username}` : '',
    websiteType: 'Landing Page & Business Website',
    preferredDomain: '',
    description: '',
    referenceUrl: '',
  });

  if (!isOpen) return null;

  const websiteTypes = [
    'Landing Page & Business Website (₹499)',
    'Developer / Creator Portfolio (₹499)',
    'Restaurant / Retail / Service Showcase (₹499)',
    'Full E-Commerce / Online Store (Custom)',
    'Telegram Mini App / Custom Web App (Custom)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      showAlert('Kripya apna naam aur project brief likhein.');
      return;
    }

    onHaptic('success');

    const orderText = `🌐 *CUSTOM WEBSITE ORDER (₹499 PACKAGE)* 🌐
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.name}
📱 *Telegram Contact:* ${formData.contact || `@${user?.username || 'Client'}`}
🎯 *Website Type:* ${formData.websiteType}
🌐 *Preferred Domain/Subdomain:* ${formData.preferredDomain || 'TBD (Discuss on chat)'}
📝 *Project Requirements:*
${formData.description}
🔗 *Reference Website:* ${formData.referenceUrl || 'None'}
━━━━━━━━━━━━━━━━━━━━
📦 *Package:* ₹499 (Includes Full Deployment, Complete SEO & Responsive Design)
Sent via Tools4Genz Mini App`;

    const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
    
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      window.open(telegramUrl, '_blank');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#0e111a] border border-white/[0.12] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
          <div>
            <h3 className="text-sm font-bold text-white">Custom Website Order</h3>
            <p className="text-[11px] text-zinc-400">Full website development with deployment & SEO @ ₹499</p>
          </div>
          <button
            onClick={() => {
              onHaptic('light');
              onClose();
            }}
            className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 flex-1">
          {/* Package highlight pill */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white">Fixed Deal: ₹499 All-Inclusive</span>
              <p className="text-[10px] text-zinc-400">Deployment + Technical SEO + Mobile UI included</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              48h - 72h Delivery
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Aapka Naam *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alok Modanwal"
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Telegram / WhatsApp *</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="@username or phone"
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">Website Category</label>
            <select
              value={formData.websiteType}
              onChange={(e) => {
                onHaptic('selection');
                setFormData({ ...formData, websiteType: e.target.value });
              }}
              className="w-full px-2.5 py-2 rounded-lg bg-[#141822] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
            >
              {websiteTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">
              Preferred Domain Name / Subdomain
            </label>
            <input
              type="text"
              value={formData.preferredDomain}
              onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
              placeholder="e.g. yourbrand.com ya yourbrand.tools4genz.com"
              className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">
              Project Description & Key Sections *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Website me kya kya sections chahiye? (e.g. Services, About, Pricing, Contact form, Testimonials)"
              className="w-full px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">
              Reference Website (Optional)
            </label>
            <input
              type="text"
              value={formData.referenceUrl}
              onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-1 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center justify-center space-x-2 active:scale-98 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Order via Telegram (₹499)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
