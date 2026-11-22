import React from 'react';
import { Flame, Wrench, Layers, User } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab, onTabClick }) {
  const tabs = [
    { id: 'services', label: 'Services', icon: Flame, badge: '₹19 Deal' },
    { id: 'tools', label: 'Tools', icon: Wrench, badge: null },
    { id: 'projects', label: 'Showcase', icon: Layers, badge: null },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-3 py-2 pointer-events-auto">
      <div className="max-w-md mx-auto glass-panel rounded-2xl p-1.5 shadow-2xl shadow-black/80 border border-white/10 flex items-center justify-around">
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
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-white bg-gradient-to-b from-purple-500/20 to-purple-600/10 border border-purple-500/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.badge && !isActive && (
                <span className="absolute -top-1.5 right-1.5 px-1 py-0.2 text-[8px] font-extrabold uppercase bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full leading-none shadow-sm animate-pulse">
                  {tab.badge}
                </span>
              )}
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-purple-400' : ''
                }`}
              />
              <span
                className={`text-[11px] font-semibold tracking-tight mt-1 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
