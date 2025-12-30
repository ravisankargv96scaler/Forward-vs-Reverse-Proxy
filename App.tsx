
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CoreConcept } from './components/CoreConcept';
import { ForwardProxy } from './components/ForwardProxy';
import { ReverseProxy } from './components/ReverseProxy';
import { Comparison } from './components/Comparison';
import { NginxConfig } from './components/NginxConfig';
import { Quiz } from './components/Quiz';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CONCEPT);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.CONCEPT: return <CoreConcept />;
      case TabType.FORWARD: return <ForwardProxy />;
      case TabType.REVERSE: return <ReverseProxy />;
      case TabType.COMPARISON: return <Comparison />;
      case TabType.NGINX: return <NginxConfig />;
      case TabType.QUIZ: return <Quiz />;
      default: return <CoreConcept />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    >
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderTabContent()}
      </main>
    </Layout>
  );
};

export default App;
