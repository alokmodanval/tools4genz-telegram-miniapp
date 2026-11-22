import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

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
    'Retail / Restaurant / Service Showcase (₹499)',
    'E-Commerce & Online Store (Custom)',
    'Telegram Mini App / SaaS Dashboard (Custom)',
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
📦 *Package:* ₹499 (Includes Full Cloudflare Deployment, Complete SEO & Fast UI)
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white border border-blue-100 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Custom Website Order</h3>
            <p className="text-[11px] text-slate-500">Full website development with deployment & SEO @ ₹499</p>
          </div>
          <button
            onClick={() => {
              onHaptic('light');
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 flex-1 text-slate-700">
          {/* Package highlight pill */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-blue-900">Deal: ₹499 All-Inclusive</span>
              <p className="text-[11px] text-blue-700">Deployment + Technical SEO + Mobile UI included</p>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-600 text-white">
              48h - 72h Delivery
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Aapka Naam *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alok Modanwal"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Telegram / WhatsApp *</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="@username or phone"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Website Category</label>
            <select
              value={formData.websiteType}
              onChange={(e) => {
                onHaptic('selection');
                setFormData({ ...formData, websiteType: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            >
              {websiteTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Preferred Domain Name / Subdomain
            </label>
            <input
              type="text"
              value={formData.preferredDomain}
              onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
              placeholder="e.g. yourbrand.com ya yourbrand.tools4genz.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Project Description & Requirements *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Aapko website me kya kya sections chahiye? (e.g. Services, About, Pricing, Contact form, Gallery)"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Reference Website (Optional)
            </label>
            <input
              type="text"
              value={formData.referenceUrl}
              onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 active:scale-98 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Order via Telegram (₹499)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
