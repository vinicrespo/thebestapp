import React, { useState } from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Verifying License Key...",
    "Downloading Biological Profile...",
    "Syncing with Hormonal Database...",
    "Access Granted."
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <ShieldCheck className="w-16 h-16 text-purple-900 animate-pulse mb-6" />
        <div className="space-y-4 w-full max-w-xs">
          {loadingSteps.map((text, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-3 transition-opacity duration-500 ${
                index <= loadingStep ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {index < loadingStep ? (
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              ) : index === loadingStep ? (
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 flex-shrink-0" />
              )}
              <span className={`text-sm font-medium ${index === loadingStep ? 'text-gray-900' : 'text-gray-500'}`}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <img 
          src="/app/logo.png" 
          alt="AlkaLean Logo" 
          className="w-32 h-32 mx-auto mb-6 rounded-2xl object-cover shadow-md"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-8">Enter your purchase email</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-gray-50"
          />
          <button 
            type="submit"
            className="w-full bg-purple-900 text-white font-semibold py-3 rounded-lg hover:bg-purple-950 transition-colors shadow-lg shadow-purple-900/30"
          >
            Access Vault
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
