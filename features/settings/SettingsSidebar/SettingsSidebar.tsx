import React from 'react';
import { Key, Sliders, Bell, User } from 'lucide-react';

type Tab = 'api-keys' | 'evaluation' | 'notifications' | 'profile';

interface SettingsSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="flex flex-col justify-between bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 h-full min-h-[400px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 mt-4">
            <button 
              onClick={() => setActiveTab('api-keys')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeTab === 'api-keys' ? 'bg-primary/10 dark:bg-gray-700/50 text-primary dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30'}`}
            >
              <Key size={20} />
              <p className="text-sm font-medium leading-normal">API Keys</p>
            </button>
            <button 
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeTab === 'evaluation' ? 'bg-primary/10 dark:bg-gray-700/50 text-primary dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30'}`}
            >
              <Sliders size={20} />
              <p className="text-sm font-medium leading-normal">Evaluation</p>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
