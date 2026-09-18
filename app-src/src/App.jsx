import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import GutHealth from './components/Modules/GutHealth';
import HormonalShot from './components/Modules/HormonalShot';
import SkinCare from './components/Modules/SkinCare';
import ProgressTracker from './components/Modules/ProgressTracker';
import ShoppingList from './components/Extras/ShoppingList';
import BonusRecipes from './components/Extras/BonusRecipes';
import SleepGuide from './components/Extras/SleepGuide';
import Journal from './components/Extras/Journal';
import BottomNav from './components/Layout/BottomNav';
import Welcome from './components/Welcome';
import ChatBot from './components/ChatBot';
import { getProfile, hasSeenWelcome, markWelcomeSeen } from './utils/storage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('alkalean_email');
    if (email) {
      setIsAuthenticated(true);
      const profile = getProfile();
      if (profile && profile.age) {
        setHasProfile(true);
      }
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    setHasProfile(true);
    if (!hasSeenWelcome()) {
      setShowWelcome(true);
    }
  };

  const handleDismissWelcome = () => {
    markWelcomeSeen();
    setShowWelcome(false);
  };

  if (loading) return null;

  return (
    <Router basename="/app">
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col max-w-md mx-auto shadow-xl relative">
        <div className="flex-1 overflow-y-auto pb-20">
          <Routes>
            {!isAuthenticated ? (
              <Route path="*" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
            ) : !hasProfile ? (
              <Route path="*" element={<Onboarding onComplete={handleOnboardingComplete} />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/gut" element={<GutHealth />} />
                <Route path="/hormones" element={<HormonalShot />} />
                <Route path="/skin" element={<SkinCare />} />
                <Route path="/progress" element={<ProgressTracker />} />
                <Route path="/shopping" element={<ShoppingList />} />
                <Route path="/recipes" element={<BonusRecipes />} />
                <Route path="/sleep" element={<SleepGuide />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
        {isAuthenticated && hasProfile && <BottomNav />}
        {isAuthenticated && hasProfile && <ChatBot />}
        {showWelcome && <Welcome onDismiss={handleDismissWelcome} />}
      </div>
    </Router>
  );
};

export default App;
