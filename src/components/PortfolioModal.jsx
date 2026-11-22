import React, { useState } from 'react';
import { X, Check, Copy, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function PortfolioModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    role: 'Full-Stack Developer',
    bio: 'Passionate developer building fast web apps and developer tools.',
    skills: 'React, Node.js, Tailwind, Git',
    github: '',
    telegram: user?.username ? `@${user.username}` : '',
    theme: 'modern-blue',
    subdomainChoice: '',
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const upiId = 'tools4genz@upi';

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showAlert('Kripya apna naam enter karein.');
      return;
    }
    onHaptic('medium');
    setStep(2);
  };

  const copyUpi = () => {
    onHaptic('light');
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCompleteOrder = () => {
    onHaptic('success');

    const orderText = `🚀 *PORTFOLIO ORDER (₹19 DEAL)* 🚀
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
💼 *Role:* ${formData.role}
🎨 *Style:* ${formData.theme}
🌐 *Subdomain:* ${formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
🛠 *Skills:* ${formData.skills}
📝 *Bio:* ${formData.bio}
💻 *GitHub:* ${formData.github || 'N/A'}
📱 *Telegram:* ${formData.telegram || `@${user?.username || 'User'}`}
💰 *Amount:* ₹19 (UPI)
━━━━━━━━━━━━━━━━━━━━
Sent from Tools4Genz Mini App`;

    const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
    
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      window.open(telegramUrl, '_blank');
    }
  };

  const themes = [
    { id: 'modern-blue', name: 'Sapphire Pro' },
    { id: 'obsidian', name: 'Obsidian Dark' },
    { id: 'slate', name: 'Clean Minimal' },
  ];

  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Tools4Genz&am=19&cu=INR&tn=Portfolio19_${encodeURIComponent(formData.name || 'User')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white border border-blue-100 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Instant Portfolio Setup</h3>
            <p className="text-[11px] text-slate-500">
              {step === 1 ? 'Step 1: Apni details enter karein' : 'Step 2: Preview & UPI Payment'}
            </p>
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

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-slate-700">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Pura Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alok Modanwal"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer / Student"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Skills (Comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Python, Tailwind"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Short Bio
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="1-2 lines apne baare me..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Design Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onHaptic('selection');
                        setFormData({ ...formData, theme: t.id });
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        formData.theme === t.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-1 ring-blue-500'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="e.g. alokmodanwal"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Subdomain
                  </label>
                  <input
                    type="text"
                    name="subdomainChoice"
                    value={formData.subdomainChoice}
                    onChange={handleChange}
                    placeholder="naam.tools4genz.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-1.5 active:scale-98 transition-all"
              >
                <span>Continue to Preview & Payment (₹19)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Preview Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{formData.name}</div>
                      <div className="text-[11px] text-blue-700 font-medium">{formData.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-blue-700 border border-blue-200 shadow-xs">
                    Live Preview
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic">
                  "{formData.bio}"
                </p>

                <div className="text-[11px] font-mono text-blue-800 font-medium">
                  https://{formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
                </div>
              </div>

              {/* UPI Payment */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2.5">
                <div className="text-xs text-slate-700 font-semibold">
                  Scan to Pay ₹19 via any UPI App (GPay / PhonePe / Paytm)
                </div>

                <div className="inline-block p-3 rounded-2xl bg-white shadow-md mx-auto border border-slate-100">
                  <QRCodeSVG value={upiPayUrl} size={135} level="M" />
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-slate-600 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    UPI: {upiId}
                  </span>
                  <button
                    onClick={copyUpi}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
                  >
                    {copiedUpi ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/20 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order to Telegram</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
