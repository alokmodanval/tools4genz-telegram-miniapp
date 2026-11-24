import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock, Phone, Upload, Image as ImageIcon, Check, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

function InstagramIcon({ className = "w-3 h-3 text-pink-600" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function CustomOrderModal({ isOpen, onClose, user, onHaptic, showAlert }) {
  const [formData, setFormData] = useState({
    name: user?.first_name || '',
    phone: '',
    instagram: '',
    contact: user?.username ? `@${user.username}` : '',
    websiteType: 'Landing Page & Business Website',
    preferredDomain: '',
    description: '',
    referenceUrl: '',
  });

  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [screenshotName, setScreenshotName] = useState('');
  const [orderSent, setOrderSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  if (!isOpen) return null;

  const websiteTypes = [
    'Landing Page & Business Website (₹499)',
    'Developer / Creator Portfolio (₹499)',
    'Retail / Restaurant / Service Showcase (₹499)',
    'E-Commerce & Online Store (Custom)',
    'Telegram Mini App / SaaS Dashboard (Custom)',
  ];

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

  const openTelegramDirect = (url) => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData && window.Telegram?.WebApp?.openTelegramLink) {
      try {
        window.Telegram.WebApp.openTelegramLink(url);
        return;
      } catch (e) {
        console.warn('Native openTelegramLink failed:', e);
      }
    }

    try {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showAlert('Kripya apna naam enter karein.');
      return;
    }
    if (!formData.phone.trim()) {
      showAlert('Kripya delivery aur contact ke liye WhatsApp / Phone number enter karein.');
      return;
    }
    if (!formData.description.trim()) {
      showAlert('Kripya website requirements likhein.');
      return;
    }

    setIsSubmitting(true);
    onHaptic('medium');

    const orderPayload = {
      orderType: 'Custom Website Development (₹499 Package)',
      amount: '₹499',
      name: formData.name,
      phone: formData.phone,
      instagram: formData.instagram,
      telegram: formData.contact,
      websiteType: formData.websiteType,
      domain: formData.preferredDomain,
      description: formData.description,
      referenceUrl: formData.referenceUrl,
      screenshot: screenshotPreview,
      telegramUser: window.Telegram?.WebApp?.initDataUnsafe?.user || user || null,
    };

    let serverSuccess = false;
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const resJson = await res.json();
      if (resJson.success) {
        serverSuccess = true;
      }
    } catch (err) {
      console.warn('API /api/order error:', err);
    }

    setIsSubmitting(false);
    setOrderSent(true);
    setSubmissionSuccess(serverSuccess);
    onHaptic('success');

    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn(e);
    }

    const orderText = `🌐 *CUSTOM WEBSITE ORDER (₹499 PACKAGE)* 🌐
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.name}
📞 *WhatsApp / Phone:* ${formData.phone}
📸 *Instagram:* ${formData.instagram || 'N/A'}
📱 *Telegram:* ${formData.contact || `@${user?.username || 'Client'}`}
🎯 *Website Type:* ${formData.websiteType}
🌐 *Preferred Domain:* ${formData.preferredDomain || 'TBD (Discuss on chat)'}
📝 *Requirements:*
${formData.description}
🔗 *Reference:* ${formData.referenceUrl || 'None'}
🧾 *Screenshot:* ${screenshotPreview ? 'Attached (Sending in chat)' : 'N/A'}
━━━━━━━━━━━━━━━━━━━━
📦 *Package:* ₹499 (Includes Cloudflare Deployment, Complete SEO & Fast UI)
Sent via Tools4Genz Mini App`;

    try {
      navigator.clipboard.writeText(orderText);
    } catch (err) {
      console.warn(err);
    }

    // Only fallback open if server delivery failed or not yet configured
    if (!serverSuccess) {
      const telegramUrl = `https://t.me/alokmodanval?text=${encodeURIComponent(orderText)}`;
      openTelegramDirect(telegramUrl);
    }
  };

  const directTelegramLink = `https://t.me/alokmodanval?text=${encodeURIComponent(
    `🌐 *CUSTOM WEBSITE INQUIRY*\n👤 Client: ${formData.name}\n📞 WhatsApp: ${formData.phone}\n📸 Instagram: ${formData.instagram || 'N/A'}\n🎯 Type: ${formData.websiteType}`
  )}`;

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
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp / Phone *</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <InstagramIcon className="w-3 h-3 text-pink-600" />
                <span>Instagram (Optional)</span>
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@yourhandle"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Telegram Handle</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="@username"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
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

          {/* Screenshot Upload (Optional for custom order reference) */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Reference Screenshot / Mockup / Advance SS (Optional)</span>
            </span>

            {!screenshotPreview ? (
              <label className="flex items-center justify-center p-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 bg-white cursor-pointer transition-all">
                <ImageIcon className="w-4 h-4 text-slate-400 mr-2" />
                <span className="text-xs text-blue-600">Upload screenshot / receipt image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="p-2 rounded-xl bg-white border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={screenshotPreview} alt="Screenshot" className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Attached
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => { setScreenshotPreview(null); setScreenshotName(''); }}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit / Success Section */}
          {submissionSuccess ? (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-indigo-50/50 border border-blue-200 text-center space-y-2.5 animate-fadeIn">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Custom Website Order Received!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aapka project brief aur requirements direct hamare Telegram par deliver ho gaye hain. Hamari team jald hi aapse WhatsApp ya Telegram par discuss karegi!
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <a
                  href={directTelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with @alokmodanval (Optional)</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 active:scale-98 transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Delivering to Telegram...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Order via Telegram (₹499)</span>
                  </>
                )}
              </button>

              {orderSent && !submissionSuccess && (
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-center">
                  <a
                    href={directTelegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    👉 Click here if Telegram didn't open automatically
                  </a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
