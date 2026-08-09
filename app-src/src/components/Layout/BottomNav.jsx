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
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 transition-colors ${
                isActive ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <Icon size={24} strokeWidth={2} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
