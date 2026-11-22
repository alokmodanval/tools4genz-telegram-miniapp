import React from 'react';
import { Layers, Terminal, Globe, User } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab, onTabClick }) {
  const tabs = [
    { id: 'services', label: 'Services', icon: Layers, badge: '🔥 ₹19 Deal' },
    { id: 'tools', label: 'Utilities', icon: Terminal, badge: null },
    { id: 'projects', label: 'Showcase', icon: Globe, badge: null },
    { id: 'profile', label: 'Contact', icon: User, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 pointer-events-auto">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-2xl rounded-2xl p-1.5 border border-blue-100/90 shadow-xl shadow-blue-950/10 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (onTabClick) onTabClick(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-blue-700 bg-blue-50 border border-blue-200/80 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent font-medium'
              }`}
            >
              {tab.badge && !isActive && (
                <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 text-[8px] font-black uppercase bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full leading-none shadow-xs animate-pulse">
                  {tab.badge}
                </span>
              )}
              <Icon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-blue-600' : 'text-slate-400'
                }`}
              />
              <span className="text-[11px] tracking-tight mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
