import React, { useState } from 'react';
import { X, Globe, Send, CheckCircle2, DollarSign, Clock, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CustomOrderModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    contact: user?.username ? `@${user.username}` : '',
    projectType: 'Business / Startup Landing Page',
    budget: '₹3,000 - ₹9,999',
    timeline: '3 - 5 Days',
    description: '',
    referenceUrl: '',
  });

  if (!isOpen) return null;

  const projectTypes = [
    'Business / Startup Landing Page',
    'Custom Portfolio / Personal Brand',
    'Full-Stack Web App / SaaS',
    'E-Commerce & Online Store',
    'Telegram Bot / Mini App',
    'Cloud POS / Billing Software',
  ];

  const budgetOptions = [
    '₹999 - ₹2,999 (Starter MVP)',
    '₹3,000 - ₹9,999 (Pro Custom)',
    '₹10,000+ (Full-Scale SaaS)',
  ];

  const timelineOptions = ['24 - 48 Hours (Express)', '3 - 5 Days (Standard)', '1 - 2 Weeks (Detailed)'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      showAlert('Kripya apna naam aur project requirement likhein!');
      return;
    }

    onHaptic('success');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }

    const orderText = `💼 *NEW CUSTOM WEBSITE / APP INQUIRY* 💼
━━━━━━━━━━━━━━━━━━━━
👤 *Client:* ${formData.name}
📱 *Telegram:* ${formData.contact || `@${user?.username || 'Client'}`}
🎯 *Type:* ${formData.projectType}
💰 *Estimated Budget:* ${formData.budget}
⏳ *Timeline:* ${formData.timeline}
📝 *Project Requirements:*
${formData.description}
🔗 *Reference Link:* ${formData.referenceUrl || 'None provided'}
━━━━━━━━━━━━━━━━━━━━
Sent from Tools4Genz Telegram Mini App`;

    const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
    
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      window.open(telegramUrl, '_blank');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#0f131f] border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Custom Website / App Order</h3>
              <p className="text-xs text-gray-400">Order your custom tech project from Tools4Genz</p>
            </div>
          </div>
          <button
            onClick={() => {
              onHaptic('light');
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 flex-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Aapka Naam *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Telegram / WhatsApp *</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="@username or Phone"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Project Category</label>
            <select
              value={formData.projectType}
              onChange={(e) => {
                onHaptic('selection');
                setFormData({ ...formData, projectType: e.target.value });
              }}
              className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              {projectTypes.map((pt) => (
                <option key={pt} value={pt}>{pt}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" /> Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => {
                  onHaptic('selection');
                  setFormData({ ...formData, budget: e.target.value });
                }}
                className="w-full px-2.5 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" /> Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => {
                  onHaptic('selection');
                  setFormData({ ...formData, timeline: e.target.value });
                }}
                className="w-full px-2.5 py-2 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Project Details & Requirements *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Aapko kaisi website chahiye? Kaunse features chahiye (e.g. login, payment gateway, animations)?"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Reference Website / Competitor Link (Optional)
            </label>
            <input
              type="text"
              value={formData.referenceUrl}
              onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 active:scale-98 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send Order via Telegram DM</span>
          </button>
        </form>
      </div>
    </div>
  );
}
