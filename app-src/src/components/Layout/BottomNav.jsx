import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Flame, Sparkles, Droplet, LineChart } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/progress', label: 'Progress', icon: LineChart },
    { path: '/gut', label: 'Gut', icon: Flame },
    { path: '/hormones', label: 'Hormones', icon: Droplet },
    { path: '/skin', label: 'Skin', icon: Sparkles },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-2.5 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-0.5 px-2 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#5B8C5A]'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#E8F0E9]' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-bold ${isActive ? 'text-[#5B8C5A]' : ''}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
