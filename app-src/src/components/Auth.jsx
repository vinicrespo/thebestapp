import React, { useState } from 'react';
import { CheckCircle, ShieldCheck, Leaf } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Verifying your access...",
    "Loading your biological profile...",
    "Preparing your personalized protocol...",
    "Everything's ready!"
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          localStorage.setItem('alkalean_email', email);
          onLogin();
        }, 800);
      }
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#E8F0E9] to-white p-6">
        <div className="w-16 h-16 bg-[#5B8C5A] rounded-full flex items-center justify-center mb-8 animate-pulse-soft">
          <Leaf className="text-white" size={28} />
        </div>
        <div className="space-y-4 w-full max-w-xs">
          {loadingSteps.map((text, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transition-all duration-500 ${
                index <= loadingStep ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              {index < loadingStep ? (
                <CheckCircle className="w-5 h-5 text-[#5B8C5A] flex-shrink-0" />
              ) : index === loadingStep ? (
                <div className="w-5 h-5 border-2 border-[#5B8C5A] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 flex-shrink-0" />
              )}
              <span className={`text-sm font-medium ${index <= loadingStep ? 'text-gray-800' : 'text-gray-400'}`}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#F5E6D3] via-white to-[#E8F0E9] p-6">
      <div className="w-full max-w-sm text-center">
        <img
          src="/app/logo.png"
          alt="AlkaLean"
          className="w-28 h-28 mx-auto mb-6 rounded-3xl object-cover shadow-lg"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AlkaLean</h1>
        <p className="text-gray-500 text-sm mb-8">Enter the email you used to purchase</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B8C5A] focus:border-transparent bg-white text-center text-base"
          />
          <button
            type="submit"
            className="w-full bg-[#5B8C5A] text-white font-semibold py-3.5 rounded-xl hover:bg-[#4A7A49] transition-colors shadow-lg shadow-[#5B8C5A]/20"
          >
            Access My Protocol
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6">
          Your data stays private on your device
        </p>
      </div>
    </div>
  );
};

export default Auth;
