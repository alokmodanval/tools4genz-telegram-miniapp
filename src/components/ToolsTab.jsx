import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, KeyRound, Type, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';

export function ToolsTab({ onHaptic, showAlert, openExternalLink }) {
  const [activeSubTool, setActiveSubTool] = useState('qr');

  // QR State
  const [qrText, setQrText] = useState('https://tools4genz.com');
  const [qrFg, setQrFg] = useState('#000000');

  // Password State
  const [passLength, setPassLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  // Text State
  const [inputText, setInputText] = useState('tools4genz developer studio');
  const [copiedCase, setCopiedCase] = useState('');

  const generatePassword = () => {
    onHaptic('light');
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let pass = '';
    for (let i = 0; i < passLength; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(pass);
  };

  useEffect(() => {
    generatePassword();
  }, [passLength, includeSymbols, includeNumbers]);

  const copyToClipboard = (text, type) => {
    onHaptic('light');
    navigator.clipboard.writeText(text);
    if (type === 'pass') {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } else {
      setCopiedCase(type);
      setTimeout(() => setCopiedCase(''), 2000);
    }
  };

  const toCamelCase = (str) =>
    str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      +match === 0 ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
    ).replace(/\s+/g, '');

  const toKebabCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const toSnakeCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)+/g, '');

  return (
    <div className="space-y-4 pb-20">
      {/* Tool switcher tab */}
      <div className="flex p-1 rounded-xl surface-card">
        {[
          { id: 'qr', label: 'QR Generator', icon: QrCode },
          { id: 'password', label: 'Key & Password', icon: KeyRound },
          { id: 'text', label: 'Slug & Case', icon: Type },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeSubTool === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onHaptic('selection');
                setActiveSubTool(item.id);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5 ${
                isActive
                  ? 'bg-white/[0.1] text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* QR Maker */}
      {activeSubTool === 'qr' && (
        <div className="p-4 rounded-2xl surface-card space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              QR Code Generator
            </h3>
            <span className="text-[10px] text-zinc-400">Offline & Client-side</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">
              Enter Text / URL
            </label>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="https://..."
              className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="flex justify-center p-4 bg-[#0a0d14] rounded-xl border border-white/[0.06]">
            <div className="p-2.5 bg-white rounded-lg shadow">
              <QRCodeSVG
                value={qrText || 'https://tools4genz.com'}
                size={150}
                fgColor={qrFg}
                bgColor="#ffffff"
                level="M"
              />
            </div>
          </div>
        </div>
      )}

      {/* Password Generator */}
      {activeSubTool === 'password' && (
        <div className="p-4 rounded-2xl surface-card space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Secure Key Generator
            </h3>
            <button
              onClick={generatePassword}
              className="p-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300"
              title="Regenerate"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-200 select-all font-semibold break-all">
              {generatedPass}
            </span>
            <button
              onClick={() => copyToClipboard(generatedPass, 'pass')}
              className="ml-2 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white"
            >
              {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>Length: {passLength} characters</span>
              <span className="font-mono text-zinc-300">{passLength >= 16 ? 'Strong' : 'Medium'}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={passLength}
              onChange={(e) => setPassLength(Number(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-white"
              />
              <span className="text-zinc-300 text-[11px]">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-white"
              />
              <span className="text-zinc-300 text-[11px]">Special (!@#$)</span>
            </label>
          </div>
        </div>
      )}

      {/* Case Converter */}
      {activeSubTool === 'text' && (
        <div className="p-4 rounded-2xl surface-card space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Slug & Identifier Converter
            </h3>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type identifier name..."
            className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-zinc-400"
          />

          <div className="space-y-1.5 text-xs font-mono">
            {[
              { label: 'kebab-case', val: toKebabCase(inputText), id: 'kebab' },
              { label: 'camelCase', val: toCamelCase(inputText), id: 'camel' },
              { label: 'snake_case', val: toSnakeCase(inputText), id: 'snake' },
            ].map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-zinc-500">{item.label}</div>
                  <div className="text-zinc-200">{item.val}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.val, item.id)}
                  className="p-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300"
                >
                  {copiedCase === item.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools4Genz Portal Card */}
      <div className="p-3.5 rounded-2xl surface-raised flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold text-white">Tools4Genz Web Portal</h4>
          <p className="text-[11px] text-zinc-400">PDF tools, code formatters, image utilities</p>
        </div>
        <button
          onClick={() => openExternalLink('https://tools4genz.com')}
          className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white flex items-center space-x-1"
        >
          <span>Visit</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
