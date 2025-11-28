import React, { useState, useEffect } from 'react';
import { Stats, Status } from '../types';
import { getStats } from '../api';
import SideBar from '../features/main/SideBar/SideBar';
import ComparisonsTab from '../features/main/ComparisonsTab/ComparisonsTab';

interface MainPageProps {
  onNavigateHome: () => void;
  onNewComparison: () => void;
  onSettings: () => void;
  onViewDetails: (id: string) => void;
}

interface HeaderProps {
  onNavigateHome: () => void;
  onNewComparison: () => void;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNewComparison, onSettings }) => {
  return (
    <header className="flex shrink-0 items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/10 dark:border-gray-700/50 bg-background-light dark:bg-background-dark px-6 sm:px-10 lg:px-20 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-black dark:text-white cursor-pointer" onClick={onNavigateHome}>
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">LLM Comparator</h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          <button onClick={onNavigateHome} className="text-black dark:text-white text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors">Dashboard</button>
          <button onClick={onSettings} className="text-primary text-sm font-bold leading-normal">Settings</button>
        </nav>
        
        <button 
          onClick={onNewComparison}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-hover transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">New Comparison</span>
        </button>
      </div>
    </header>
  );
};

const MainPage: React.FC<MainPageProps> = ({ 
  onNavigateHome, 
  onNewComparison, 
  onSettings, 
  onViewDetails 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status[]>(['Running', 'Completed', 'Error']);
  const [stats, setStats] = useState<Stats>({ total: 0, running: 0, errors: 0 });

  const fetchStats = async () => {
    try {
      const statsData = await getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Header 
        onNavigateHome={onNavigateHome} 
        onNewComparison={onNewComparison}
        onSettings={onSettings}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <SideBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stats={stats}
        />
        
        <ComparisonsTab
          onViewDetails={onViewDetails}
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          onStatsUpdate={fetchStats}
        />
      </div>
    </>
  );
};

export default MainPage;
