import React, { useState } from 'react';
import { User, Shield, Share2, MessageCircle, HelpCircle, ChevronDown, Check, ExternalLink, Sparkles } from 'lucide-react';

export function ProfileTab({ user, onHaptic, showAlert, openExternalLink, openTelegramLink }) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const botUsername = 'Tools4GenzBot'; // Change or connect to actual bot
  const shareText = `Check out Tools4Genz Telegram Mini App! Get an instant dark-mode portfolio for just ₹19, order custom websites, or use free dev tools right inside Telegram:`;
  const shareUrl = `https://t.me/${botUsername}/app`;

  const handleShare = () => {
    onHaptic('light');
    const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    openTelegramLink(tgShareUrl);
  };

  const copyShareLink = () => {
    onHaptic('light');
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const faqs = [
    {
      q: '₹19 portfolio me kya kya milega?',
      a: 'Aapko ek modern dark-mode responsive portfolio website milegi jisme CLI/Terminal mode, Projects showcase, GitHub stats, skills, aur free .tools4genz.com subdomain include hota hai.',
    },
    {
      q: 'Portfolio live hone me kitna time lagta hai?',
      a: 'Details aur UPI payment receive hone ke 24 hours ke andar aapka portfolio live ho jata hai!',
    },
    {
      q: 'Kya mai apna custom domain attach kar sakta hu?',
      a: 'Haan! Agar aapke paas apna .com ya .in domain hai, toh hum Cloudflare DNS se use aapke portfolio se connect kar denge.',
    },
    {
      q: 'Custom website ya SaaS banwane ke liye kya karna hoga?',
      a: 'Services tab me "Order / Inquire" button par click karein ya DM Us karein. Hum aapke requirement ke according 2-5 din me project ready karke dete hain.',
    },
  ];

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* User Telegram Card */}
      <div className="p-4 rounded-3xl glass-card border border-purple-500/30 relative overflow-hidden">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[2px] shadow-lg">
            <div className="w-full h-full rounded-[14px] bg-[#0d1017] flex items-center justify-center font-bold text-white text-xl">
              {user?.photo_url ? (
                <img
                  src={user.photo_url}
                  alt={user.first_name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              ) : (
                (user?.first_name || 'G').charAt(0).toUpperCase()
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">
                {user?.first_name} {user?.last_name || ''}
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified
              </span>
            </div>
            <p className="text-xs text-purple-400">
              {user?.username ? `@${user.username}` : 'Telegram Creator'}
            </p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">
              ID: {user?.id || 'Unknown'}
            </p>
          </div>
        </div>
      </div>

      {/* Share & Earn Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#151929] to-indigo-950/40 border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Share Tools4Genz with Friends</span>
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Dosto ko ₹19 portfolio aur free dev tools ke baare me batayein!
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on Telegram</span>
          </button>
          <button
            onClick={copyShareLink}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            {copiedShare ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="text-xs">Copy Link</span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
          Support & Links
        </span>

        <div className="rounded-2xl glass-card border border-white/10 divide-y divide-white/5 overflow-hidden">
          <button
            onClick={() => openTelegramLink('https://t.me/alokmodanval')}
            className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Direct Chat with Developer</div>
                <div className="text-[10px] text-gray-400">@alokmodanval on Telegram</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={() => openExternalLink('https://tools4genz.com')}
            className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Visit tools4genz.com</div>
                <div className="text-[10px] text-gray-400">Main Web Portal</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>Frequently Asked Questions</span>
        </span>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => {
                  onHaptic('selection');
                  setOpenFaq(openFaq === idx ? null : idx);
                }}
                className="w-full p-3 flex items-center justify-between text-left"
              >
                <span className="text-xs font-semibold text-gray-200">{faq.q}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-3 pb-3 text-xs text-gray-400 border-t border-white/5 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
