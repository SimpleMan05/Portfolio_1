import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import Portfolio from './components/Portfolio';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleThemeSelect = () => {
    setShowPortfolio(true);
  };

  return (
    <ThemeProvider>
      <div className="App">
        {!showPortfolio ? (
          <LandingPage onThemeSelect={handleThemeSelect} />
        ) : (
          <Portfolio />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;