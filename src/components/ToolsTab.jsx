import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, KeyRound, Type, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';
import { triggerMonetagAd } from '../utils/adManager';

export function ToolsTab({ onHaptic, showAlert, openExternalLink }) {
  const [activeSubTool, setActiveSubTool] = useState('qr');

  // QR State
  const [qrText, setQrText] = useState('https://tools4genz.com');
  const [qrFg, setQrFg] = useState('#1e40af');

  // Password State
  const [passLength, setPassLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  // Text State
  const [inputText, setInputText] = useState('tools4genz web engineering');
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
      <div className="flex p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        {[
          { id: 'qr', label: 'QR Maker', icon: QrCode },
          { id: 'password', label: 'Key & Pass', icon: KeyRound },
          { id: 'text', label: 'Case & Slug', icon: Type },
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
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
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
        <div className="p-4 rounded-3xl card-white space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              QR Code Generator
            </h3>
            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">Client-Side</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Enter Text / Website URL
            </label>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="flex justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="p-3 bg-white rounded-xl shadow-md border border-slate-100">
              <QRCodeSVG
                value={qrText || 'https://tools4genz.com'}
                size={155}
                fgColor={qrFg}
                bgColor="#ffffff"
                level="M"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">Color Tone:</span>
            <div className="flex space-x-2">
              {['#1e40af', '#0284c7', '#0f172a', '#059669', '#dc2626'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onHaptic('selection');
                    setQrFg(c);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    qrFg === c ? 'border-slate-800 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Password Generator */}
      {activeSubTool === 'password' && (
        <div className="p-4 rounded-3xl card-white space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              Secure Key Generator
            </h3>
            <button
              onClick={() => {
                generatePassword();
                triggerMonetagAd('password_regenerate');
              }}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
              title="Regenerate"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="font-mono text-xs text-blue-900 select-all font-semibold break-all">
              {generatedPass}
            </span>
            <button
              onClick={() => copyToClipboard(generatedPass, 'pass')}
              className="ml-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              {copiedPass ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1">
              <span>Length: {passLength} characters</span>
              <span className="font-bold text-blue-700">{passLength >= 16 ? 'Ultra Secure' : 'Standard'}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={passLength}
              onChange={(e) => setPassLength(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-blue-600"
              />
              <span className="text-slate-700 text-[11px] font-medium">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-blue-600"
              />
              <span className="text-slate-700 text-[11px] font-medium">Special (!@#$)</span>
            </label>
          </div>
        </div>
      )}

      {/* Case Converter */}
      {activeSubTool === 'text' && (
        <div className="p-4 rounded-3xl card-white space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              Slug & Identifier Converter
            </h3>
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type identifier name..."
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />

          <div className="space-y-2 text-xs font-mono">
            {[
              { label: 'kebab-case (Slug)', val: toKebabCase(inputText), id: 'kebab' },
              { label: 'camelCase', val: toCamelCase(inputText), id: 'camel' },
              { label: 'snake_case', val: toSnakeCase(inputText), id: 'snake' },
            ].map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 font-sans">{item.label}</div>
                  <div className="text-slate-800 font-semibold">{item.val}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.val, item.id)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 shadow-xs"
                >
                  {copiedCase === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Web Utilities Suite Launcher */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-blue-900">50+ Web Tools on Tools4Genz</h4>
          <p className="text-[11px] text-blue-700">PDF tools, code formatters, image utilities</p>
        </div>
        <button
          onClick={() => openExternalLink('https://tools4genz.com')}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-xs flex items-center space-x-1"
        >
          <span>Visit</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
