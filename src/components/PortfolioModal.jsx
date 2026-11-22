import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Copy, Send, Eye, ShieldAlert, Palette, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

export function PortfolioModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [step, setStep] = useState(1); // 1: Info, 2: Preview & Payment
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    role: 'Frontend Developer & Creator',
    bio: 'Passionate about building cool web apps and solving problems with code.',
    skills: 'React, Tailwind, JavaScript, Git, UI/UX',
    github: '',
    telegram: user?.username ? `@${user.username}` : '',
    theme: 'cyberpunk', // cyberpunk | terminal | minimal
    subdomainChoice: '',
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const upiId = 'tools4genz@upi'; // Default UPI ID

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showAlert('Kripya apna naam enter karein!');
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
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }

    const orderText = `🚀 *NEW ₹19 PORTFOLIO ORDER* 🚀
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
💼 *Role:* ${formData.role}
🎨 *Theme:* ${formData.theme}
🌐 *Preferred Subdomain:* ${formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
🛠 *Skills:* ${formData.skills}
📝 *Bio:* ${formData.bio}
💻 *GitHub:* ${formData.github || 'N/A'}
📱 *Telegram Contact:* ${formData.telegram || `@${user?.username || 'User'}`}
💰 *Amount:* ₹19 (Paid via UPI)
━━━━━━━━━━━━━━━━━━━━
Please generate and deploy my portfolio!`;

    const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
    
    // Open Telegram chat with prefilled text
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      window.open(telegramUrl, '_blank');
    }
  };

  const themes = [
    { id: 'cyberpunk', name: 'Cyber Neon', color: 'from-purple-500 to-cyan-400' },
    { id: 'terminal', name: 'Hacker CLI', color: 'from-emerald-400 to-green-600' },
    { id: 'minimal', name: 'Dark Studio', color: 'from-slate-200 to-slate-400' },
  ];

  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Tools4Genz&am=19&cu=INR&tn=Portfolio19_${encodeURIComponent(formData.name || 'User')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#0f131f] border border-purple-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                ₹19 Instant Portfolio Deal
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  96% OFF
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                {step === 1 ? 'Step 1: Apni details enter karein' : 'Step 2: Preview & UPI Payment'}
              </p>
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

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Aapka Pura Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alok Modanwal"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Role / Designation *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer / Student"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Skills (Comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Python, UI/UX, Node.js"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Bio / Tagline
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Apne baare mein 1-2 lines..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              {/* Theme Picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-purple-400" /> Choose Portfolio Theme
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
                      className={`p-2 rounded-xl border text-left transition-all ${
                        formData.theme === t.id
                          ? 'bg-purple-500/20 border-purple-500 ring-1 ring-purple-500'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${t.color} mb-1.5`} />
                      <div className="text-xs font-medium text-white">{t.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="e.g. alokmodanwal"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Free Subdomain
                  </label>
                  <input
                    type="text"
                    name="subdomainChoice"
                    value={formData.subdomainChoice}
                    onChange={handleChange}
                    placeholder="naam.tools4genz.com"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 active:scale-98 transition-all"
              >
                <span>Live Preview & Order (₹19)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Mini Preview Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#121624] to-[#1a1f33] border border-purple-500/40 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Live Preview
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0d1017] flex items-center justify-center font-bold text-white text-sm">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{formData.name}</h4>
                    <p className="text-xs text-purple-400">{formData.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2 mb-2 italic">
                  "{formData.bio}"
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {formData.skills.split(',').slice(0, 4).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1">
                  <span>🔗 {formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center space-y-3">
                <div className="flex items-center justify-center space-x-1.5 text-xs text-amber-400 font-semibold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Scan or Pay via any UPI App (GPay / PhonePe / Paytm)</span>
                </div>

                <div className="inline-block p-3 rounded-2xl bg-white shadow-xl mx-auto">
                  <QRCodeSVG value={upiPayUrl} size={135} level="M" />
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-gray-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    UPI ID: {upiId}
                  </span>
                  <button
                    onClick={copyUpi}
                    className="p-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs flex items-center gap-1 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-400">
                  Pay ₹19 on UPI and tap the button below. Aapka order Telegram DM me send ho jayega!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4 text-black" />
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
