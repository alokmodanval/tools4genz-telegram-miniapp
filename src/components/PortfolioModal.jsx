import React, { useState } from 'react';
import { X, Check, Copy, Send, ArrowRight, Flame, Sparkles, Upload, Image as ImageIcon, Phone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

function InstagramIcon({ className = "w-3 h-3 text-pink-600" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export function PortfolioModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    role: 'Full-Stack Developer',
    phone: '',
    instagram: '',
    telegram: user?.username ? `@${user.username}` : '',
    skills: 'React, Node.js, Tailwind, Git, Python',
    bio: 'Passionate developer building clean web apps and developer tools.',
    github: '',
    theme: 'modern-blue',
    subdomainChoice: '',
  });

  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [screenshotName, setScreenshotName] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const upiId = '9016138307@ptyes';

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotPreview(reader.result);
        onHaptic('medium');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshotPreview(null);
    setScreenshotName('');
    onHaptic('light');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showAlert('Kripya apna naam enter karein.');
      return;
    }
    if (!formData.phone.trim()) {
      showAlert('Kripya delivery ke liye apna Contact / WhatsApp number enter karein.');
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

  const openTelegramDirect = (url) => {
    // If inside Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData && window.Telegram?.WebApp?.openTelegramLink) {
      try {
        window.Telegram.WebApp.openTelegramLink(url);
        return;
      } catch (e) {
        console.warn('Native openTelegramLink failed:', e);
      }
    }

    // Direct browser fallback
    try {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
  };

  const handleCompleteOrder = () => {
    onHaptic('success');
    setOrderSent(true);

    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }

    const orderText = `🚀 *PORTFOLIO ORDER (₹19 FLASH DEAL - 92% OFF)* 🚀
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
💼 *Role:* ${formData.role}
📞 *Contact / WhatsApp:* ${formData.phone}
📸 *Instagram:* ${formData.instagram ? formData.instagram : 'N/A'}
📱 *Telegram:* ${formData.telegram || `@${user?.username || 'User'}`}
🎨 *Portfolio Style:* ${formData.theme}
🌐 *Subdomain:* ${formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
🛠 *Skills:* ${formData.skills}
📝 *Bio:* ${formData.bio}
💻 *GitHub:* ${formData.github || 'N/A'}
💰 *Amount Paid:* ₹19 (Original ₹249 - Save ₹230)
🧾 *Payment SS:* ${screenshotPreview ? 'Attached (Sending in chat)' : 'Done via UPI (9016138307@ptyes)'}
━━━━━━━━━━━━━━━━━━━━
Sent from Tools4Genz Mini App`;

    // Also copy to clipboard for convenience
    try {
      navigator.clipboard.writeText(orderText);
    } catch (err) {
      console.warn(err);
    }

    const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
    openTelegramDirect(telegramUrl);
  };

  const themes = [
    { id: 'modern-blue', name: 'Sapphire Pro' },
    { id: 'obsidian', name: 'Obsidian Dark' },
    { id: 'terminal', name: 'Terminal CLI' },
  ];

  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Tools4Genz&am=19&cu=INR&tn=Portfolio19_${encodeURIComponent(formData.name || 'User')}`;

  const generatedOrderLink = `https://t.me/alokmodanval?text=${encodeURIComponent(
    `🚀 *PORTFOLIO ORDER (₹19 DEAL)*\n👤 Name: ${formData.name}\n📞 WhatsApp: ${formData.phone}\n📸 Instagram: ${formData.instagram || 'N/A'}\n📱 Telegram: ${formData.telegram || 'User'}\n🌐 Subdomain: ${formData.subdomainChoice || formData.name}.tools4genz.com\n💰 Amount Paid: ₹19`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white border border-blue-100 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with 249 cut to 19 Banner */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Flame className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-bold text-slate-900">Instant Portfolio Deal</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  <span className="line-through">₹249</span> ₹19
                </span>
              </div>
              <p className="text-[11px] text-blue-700 font-medium">
                {step === 1 ? 'Step 1: Enter details & contact' : 'Step 2: Preview, Pay ₹19 & Upload SS'}
              </p>
            </div>
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
              {/* Highlight pill inside form */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-900">Flash Deal: ₹19 Only</span>
                  <p className="text-[10px] text-blue-700">CLI Mode + GitHub Showcase + Free Subdomain</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-500 line-through font-bold">₹249</span>
                  <div className="text-[10px] font-bold text-emerald-600">Save ₹230</div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-2 gap-2.5">
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
                    placeholder="e.g. Frontend Dev / Student"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Contact & Socials (As requested by user) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp / Phone *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <InstagramIcon className="w-3 h-3 text-pink-600" />
                    <span>Instagram (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@yourhandle"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
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
                  placeholder="React, TypeScript, Python, Tailwind, Git"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Short Bio / Tagline
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
                  Portfolio Style
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
                    Free Subdomain
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
                <span>Preview, Pay & Upload SS (₹19)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Live Preview Box */}
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

                <div className="text-[11px] text-slate-600 flex items-center gap-2">
                  <span>📞 {formData.phone}</span>
                  {formData.instagram && <span>• 📸 {formData.instagram}</span>}
                </div>

                <div className="text-[11px] font-mono text-blue-800 font-medium">
                  https://{formData.subdomainChoice || formData.name.toLowerCase().replace(/\s+/g, '-')}.tools4genz.com
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Regular Price:</span>
                  <span className="line-through">₹249</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Flash Discount (92% OFF):</span>
                  <span>- ₹230</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1 text-sm">
                  <span>Total Payable:</span>
                  <span className="text-blue-600 font-mono">₹19</span>
                </div>
              </div>

              {/* UPI Payment Box */}
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

              {/* Payment Screenshot (SS) Upload Section */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Payment Screenshot (Receipt SS) Upload</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Recommended</span>
                </div>

                {!screenshotPreview ? (
                  <label className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white cursor-pointer transition-all">
                    <ImageIcon className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-blue-600">Click to upload payment screenshot</span>
                    <span className="text-[10px] text-slate-400">PNG, JPG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <img
                        src={screenshotPreview}
                        alt="Payment Proof"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Screenshot Attached</span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[170px]">
                          {screenshotName || 'receipt.jpg'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="px-2 py-1 text-[11px] text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="space-y-2">
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
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/20 active:scale-98 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Order to Telegram (₹19)</span>
                  </button>
                </div>

                {/* Direct fallback link if Telegram doesn't auto-open */}
                {orderSent && (
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-1">
                    <p className="text-[11px] text-blue-900 font-medium">
                      Order details clipboard par copy ho chuke hain!
                    </p>
                    <a
                      href={generatedOrderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                    >
                      <span>👉 Click here if Telegram didn't open automatically</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
