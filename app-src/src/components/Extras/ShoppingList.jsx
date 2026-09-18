import React, { useState } from 'react';
import { SHOPPING_LIST } from '../../utils/protocol';
import { ShoppingCart, Check, ChevronLeft, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('alkalean_shopping') || '{}'); } catch { return {}; }
  });

  const toggle = (item) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem('alkalean_shopping', JSON.stringify(next));
  };

  const sections = [
    { key: 'essentials', title: 'Essential Ingredients', emoji: '🛒', items: SHOPPING_LIST.essentials },
    { key: 'teas', title: 'Teas & Infusions', emoji: '🍵', items: SHOPPING_LIST.teas },
    { key: 'superfoods', title: 'Superfoods & Supplements', emoji: '🌿', items: SHOPPING_LIST.superfoods },
    { key: 'optional', title: 'Optional (Nice to Have)', emoji: '✨', items: SHOPPING_LIST.optional },
  ];

  const totalItems = Object.values(SHOPPING_LIST).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShoppingCart size={24} className="text-emerald-600 mr-2" /> Shopping List
        </h1>
        <p className="text-gray-500 text-sm mt-1">Everything you need for the 30-day protocol</p>
      </div>

      <div className="bg-emerald-50 rounded-xl p-4 mb-5 border border-emerald-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-emerald-700">{checkedCount} of {totalItems} items</p>
          <p className="text-xs text-emerald-600">Tap to check off as you shop</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="text-lg font-bold text-emerald-700">{Math.round((checkedCount / totalItems) * 100)}%</span>
        </div>
      </div>

      {sections.map(section => (
        <div key={section.key} className="mb-5">
          <h3 className="font-bold text-gray-900 text-sm mb-2.5 flex items-center">
            <span className="mr-1.5">{section.emoji}</span> {section.title}
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={i}
                onClick={() => toggle(item.item)}
                className={`w-full flex items-center p-4 text-left transition-colors ${
                  i > 0 ? 'border-t border-gray-50' : ''
                } ${checked[item.item] ? 'bg-emerald-50/50' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-all ${
                  checked[item.item] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                }`}>
                  {checked[item.item] && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${checked[item.item] ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {item.item}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-[#F5E6D3] rounded-2xl p-5 border border-[#D4A574]/20 text-center">
        <p className="text-sm text-gray-700 font-medium mb-1">💡 Budget-Friendly Tip</p>
        <p className="text-xs text-gray-600 leading-relaxed">
          Most items cost $3-8 and last the full 30 days. Total investment is typically $30-50 — about $1-2/day. Many women spend LESS on groceries overall as cravings decrease!
        </p>
      </div>
    </div>
  );
};

export default ShoppingList;
