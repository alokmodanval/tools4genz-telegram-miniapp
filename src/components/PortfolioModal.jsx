import React, { useState } from 'react';
import { X, Check, Copy, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function PortfolioModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    role: 'Full-Stack Developer',
    bio: 'Building web applications and developer tools.',
    skills: 'React, Node.js, Tailwind, Git',
    github: '',
    telegram: user?.username ? `@${user.username}` : '',
    theme: 'obsidian',
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
    { id: 'obsidian', name: 'Obsidian Dark' },
    { id: 'terminal', name: 'Terminal CLI' },
    { id: 'slate', name: 'Slate Minimal' },
  ];

  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Tools4Genz&am=19&cu=INR&tn=Portfolio19_${encodeURIComponent(formData.name || 'User')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#0e111a] border border-white/[0.12] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
          <div>
            <h3 className="text-sm font-bold text-white">Instant Portfolio Setup</h3>
            <p className="text-[11px] text-zinc-400">
              {step === 1 ? 'Step 1: Apni details enter karein' : 'Step 2: Preview & UPI Payment'}
            </p>
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

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Pura Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alok Modanwal"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer / Student"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Skills (Comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Python, Tailwind"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Short Bio
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="1-2 lines apne baare me..."
                  className="w-full px-2.5 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1.5">
                  Design Aesthetic
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
                      className={`p-2 rounded-lg border text-center transition-all ${
                        formData.theme === t.id
                          ? 'bg-white/[0.1] border-white text-white font-medium'
                          : 'bg-black/30 border-white/[0.06] text-zinc-400 hover:border-white/[0.12]'
                      }`}
                    >
                      <span className="text-xs">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="e.g. alokmodanwal"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Subdomain
                  </label>
                  <input
                    type="text"
                    name="subdomainChoice"
                    value={formData.subdomainChoice}
                    onChange={handleChange}
                    placeholder="naam.tools4genz.com"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-1 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center justify-center space-x-1.5 active:scale-98 transition-all"
              >
                <span>Continue to Preview & Payment (₹19)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="space-y-3.5">
              {/* Preview Box */}
              <div className="p-3.5 rounded-xl surface-raised border border-white/[0.1] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center font-bold text-white text-xs">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{formData.name}</div>
                      <div className="text-[11px] text-zinc-400">{formData.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                    Live Preview
                  </span>
                </div>

                <p className="text-[11px] text-zinc-300 italic">
                  "{formData.bio}"
                </p>

                <div className="text-[10px] font-mono text-emerald-400">
                  https://{formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
                </div>
              </div>

              {/* UPI Payment */}
              <div className="p-3.5 rounded-xl surface-card text-center space-y-2.5">
                <div className="text-xs text-zinc-300 font-medium">
                  Scan to Pay ₹19 (Any UPI App: GPay / PhonePe / Paytm)
                </div>

                <div className="inline-block p-2.5 rounded-xl bg-white shadow mx-auto">
                  <QRCodeSVG value={upiPayUrl} size={130} level="M" />
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-zinc-400 font-mono bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]">
                    UPI ID: {upiId}
                  </span>
                  <button
                    onClick={copyUpi}
                    className="px-2 py-1 rounded bg-white/[0.08] hover:bg-white/[0.12] text-zinc-200 text-xs transition-colors"
                  >
                    {copiedUpi ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-medium"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
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
