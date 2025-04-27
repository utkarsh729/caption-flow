import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';

function App() {
  // Simple state management for navigation instead of a router 
  // for this demo - in a real app, you'd use react-router
  const [activePage, setActivePage] = useState('landing');

  const navigateToApp = () => {
    setActivePage('app');
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setActivePage('landing');
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
      {activePage === 'landing' ? (
        <LandingPage navigateToApp={navigateToApp} />
      ) : (
        <AppPage navigateToLanding={navigateToLanding} />
      )}
    </ThemeProvider>
  );
}

export default App;
