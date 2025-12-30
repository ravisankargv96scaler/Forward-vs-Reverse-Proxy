
import React from 'react';
import { TabType } from '../types';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  User, 
  Server, 
  TableProperties, 
  Code2, 
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const tabIcons = {
  [TabType.CONCEPT]: LayoutDashboard,
  [TabType.FORWARD]: User,
  [TabType.REVERSE]: Server,
  [TabType.COMPARISON]: TableProperties,
  [TabType.NGINX]: Code2,
  [TabType.QUIZ]: HelpCircle,
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                ProxyMaster
              </span>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {Object.values(TabType).map((tab) => {
              const Icon = tabIcons[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {children}
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2024 ProxyMaster • System Design 101</p>
      </footer>
    </div>
  );
};
