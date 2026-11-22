import React, { useState } from 'react';
import { User, Share2, MessageSquare, ExternalLink, ChevronDown, Check } from 'lucide-react';

export function ProfileTab({ user, onHaptic, showAlert, openExternalLink, openTelegramLink }) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const botUsername = 'Tools4GenzBot';
  const shareText = `Tools4Genz Telegram Mini App - Handcrafted Websites (₹499 with Deployment & SEO), ₹19 Instant Portfolios, aur Developer Utilities:`;
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
      q: '₹499 custom website package me kya include hai?',
      a: 'Is package me complete responsive design, Cloudflare Pages global CDN deployment, technical SEO (meta tags, Open Graph, sitemap), contact form/WhatsApp integration, aur custom domain ya free .tools4genz.com subdomain connection included hai.',
    },
    {
      q: 'Kya hosting ka alag se koi recurring charge hoga?',
      a: 'Nahi. Cloudflare Pages par deploy hone ki wajah se normal websites par zero hosting bill aata hai, koi monthly server fee nahi hoti.',
    },
    {
      q: 'Website live hone me kitna time lagta hai?',
      a: '₹19 portfolio 24 ghante ke andar live ho jata hai. Full custom websites (₹499 package) 48 se 72 ghante ke andar deliver aur deploy hoti hain.',
    },
    {
      q: 'Kya mai apna khud ka .com ya .in domain attach kar sakta hu?',
      a: 'Bilkul. Agar aapke paas apna domain hai toh hum use bina kisi extra charge ke Cloudflare DNS se configure karke SSL ke sath attach kar denge.',
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* User Card */}
      <div className="p-4 rounded-2xl surface-card flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center font-bold text-white text-base border border-white/[0.08]">
          {user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <div className="text-sm font-bold text-white">
            {user?.first_name} {user?.last_name || ''}
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            {user?.username ? `@${user.username}` : 'Telegram User'}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
            ID: {user?.id || 'N/A'}
          </div>
        </div>
      </div>

      {/* Share Box */}
      <div className="p-3.5 rounded-2xl surface-card space-y-2.5">
        <div>
          <h4 className="text-xs font-semibold text-white">Share Tools4Genz</h4>
          <p className="text-[11px] text-zinc-400">Share this Mini App with colleagues and friends.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleShare}
            className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via Telegram</span>
          </button>
          <button
            onClick={copyShareLink}
            className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-mono"
          >
            {copiedShare ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Contact Links */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-1">
          Direct Contact
        </span>
        <div className="rounded-xl surface-card divide-y divide-white/[0.04] overflow-hidden">
          <button
            onClick={() => openTelegramLink('https://t.me/alokmodanval')}
            className="w-full p-3 flex items-center justify-between hover:bg-white/[0.02] text-left"
          >
            <div className="flex items-center space-x-2.5">
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              <div>
                <div className="text-xs font-medium text-white">Developer Direct Chat</div>
                <div className="text-[10px] text-zinc-400 font-mono">@alokmodanval</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          <button
            onClick={() => openExternalLink('https://tools4genz.com')}
            className="w-full p-3 flex items-center justify-between hover:bg-white/[0.02] text-left"
          >
            <div className="flex items-center space-x-2.5">
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <div>
                <div className="text-xs font-medium text-white">Main Website</div>
                <div className="text-[10px] text-zinc-400 font-mono">tools4genz.com</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-1">
          Frequently Asked Questions
        </span>
        <div className="space-y-1.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl surface-card overflow-hidden"
            >
              <button
                onClick={() => {
                  onHaptic('selection');
                  setOpenFaq(openFaq === idx ? null : idx);
                }}
                className="w-full p-3 flex items-center justify-between text-left"
              >
                <span className="text-xs font-medium text-zinc-200">{faq.q}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-3 pb-3 text-[11px] text-zinc-400 border-t border-white/[0.04] pt-2 leading-relaxed">
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
