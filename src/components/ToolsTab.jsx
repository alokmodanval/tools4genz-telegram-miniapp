import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, KeyRound, Type, ExternalLink, Copy, Check, RefreshCw, Sparkles } from 'lucide-react';

export function ToolsTab({ onHaptic, showAlert, openExternalLink }) {
  const [activeSubTool, setActiveSubTool] = useState('qr'); // 'qr' | 'password' | 'text'

  // QR State
  const [qrText, setQrText] = useState('https://tools4genz.com');
  const [qrColor, setQrColor] = useState('#a855f7');
  const [qrBg, setQrBg] = useState('#0d1017');

  // Password State
  const [passLength, setPassLength] = useState(14);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  // Text / Case State
  const [inputText, setInputText] = useState('Tools4Genz Super App');
  const [copiedCase, setCopiedCase] = useState('');

  // Password Generator logic
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

  React.useEffect(() => {
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

  // Convert cases
  const toCamelCase = (str) =>
    str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      +match === 0 ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
    ).replace(/\s+/g, '');

  const toKebabCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const toSnakeCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)+/g, '');

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Sub-tool switcher */}
      <div className="flex p-1 rounded-2xl glass-panel border border-white/10">
        <button
          onClick={() => {
            onHaptic('selection');
            setActiveSubTool('qr');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTool === 'qr'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR Maker</span>
        </button>

        <button
          onClick={() => {
            onHaptic('selection');
            setActiveSubTool('password');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTool === 'password'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Pass Gen</span>
        </button>

        <button
          onClick={() => {
            onHaptic('selection');
            setActiveSubTool('text');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTool === 'text'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Slug & Case</span>
        </button>
      </div>

      {/* Tool 1: QR Generator */}
      {activeSubTool === 'qr' && (
        <div className="p-4 rounded-3xl glass-card border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-purple-400" />
              <span>Instant QR Code Generator</span>
            </h3>
            <span className="text-[10px] text-gray-400">In-App Tool</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Text ya Website URL daalein:
            </label>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex justify-center p-4 bg-[#0d1017] rounded-2xl border border-white/5">
            <div className="p-3 bg-white rounded-xl shadow-lg">
              <QRCodeSVG
                value={qrText || 'https://tools4genz.com'}
                size={160}
                fgColor={qrColor === '#ffffff' ? '#000000' : qrColor}
                bgColor="#ffffff"
                level="M"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-400">QR Accent Color:</span>
            <div className="flex space-x-2">
              {['#a855f7', '#06b6d4', '#10b981', '#f43f5e', '#000000'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onHaptic('selection');
                    setQrColor(c);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    qrColor === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Password Generator */}
      {activeSubTool === 'password' && (
        <div className="p-4 rounded-3xl glass-card border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-purple-400" />
              <span>Super Strong Password Generator</span>
            </h3>
            <button
              onClick={generatePassword}
              className="p-1 rounded-lg bg-white/10 text-gray-300 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
            <span className="font-mono text-sm text-purple-300 break-all select-all font-semibold">
              {generatedPass}
            </span>
            <button
              onClick={() => copyToClipboard(generatedPass, 'pass')}
              className="ml-2 p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-all active:scale-95"
            >
              {copiedPass ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>Length: {passLength}</span>
              <span className="text-purple-400 font-bold">{passLength > 16 ? 'Ultra Strong 🛡️' : 'Strong'}</span>
            </div>
            <input
              type="range"
              min="8"
              max="28"
              value={passLength}
              onChange={(e) => setPassLength(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-purple-500"
              />
              <span className="text-gray-300">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-purple-500"
              />
              <span className="text-gray-300">Symbols (@#$)</span>
            </label>
          </div>
        </div>
      )}

      {/* Tool 3: Case Converter & Slugifier */}
      {activeSubTool === 'text' && (
        <div className="p-4 rounded-3xl glass-card border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Type className="w-4 h-4 text-purple-400" />
              <span>Dev Case & URL Slug Converter</span>
            </h3>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text here..."
            className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          />

          <div className="space-y-2 text-xs font-mono">
            {[
              { label: 'kebab-case (Slug)', val: toKebabCase(inputText), id: 'kebab' },
              { label: 'camelCase', val: toCamelCase(inputText), id: 'camel' },
              { label: 'snake_case', val: toSnakeCase(inputText), id: 'snake' },
            ].map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-gray-500">{item.label}</div>
                  <div className="text-cyan-300 font-semibold">{item.val}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.val, item.id)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300"
                >
                  {copiedCase === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools4Genz Full Web Utilities Link */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>50+ Free Web Tools on Tools4Genz.com</span>
          </h4>
        </div>
        <p className="text-[11px] text-gray-300">
          PDF tools, Image optimizers, Code formatters aur Dev utilities web browser me bina kisi login ke use karein.
        </p>
        <button
          onClick={() => openExternalLink('https://tools4genz.com')}
          className="w-full py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 text-xs font-bold border border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all"
        >
          <span>Open Full Tools Suite</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
