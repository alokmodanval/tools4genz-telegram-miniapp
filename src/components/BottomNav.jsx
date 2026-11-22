import React from 'react';
import { Briefcase, Terminal, Globe, User } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab, onTabClick }) {
  const tabs = [
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'tools', label: 'Utilities', icon: Terminal },
    { id: 'projects', label: 'Showcase', icon: Globe },
    { id: 'profile', label: 'Contact', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5 pointer-events-auto">
      <div className="max-w-md mx-auto bg-[#0d1017]/95 backdrop-blur-md rounded-2xl p-1.5 border border-white/[0.08] shadow-2xl flex items-center justify-around">
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
              className={`relative flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-150 select-none ${
                isActive
                  ? 'text-white bg-white/[0.08] border border-white/[0.12]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'scale-105 text-zinc-100' : 'text-zinc-400'
                }`}
              />
              <span
                className={`text-[11px] font-medium tracking-tight mt-1 ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400'
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
