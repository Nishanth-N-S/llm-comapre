import React from 'react';
import ProviderSelect from './ProviderSelect';
import ApiKeyInput from './ApiKeyInput';

interface ApiKeysTabProps {
  provider: string;
  setProvider: (provider: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  showKey: boolean;
  setShowKey: (show: boolean) => void;
}

const ApiKeysTab: React.FC<ApiKeysTabProps> = ({ 
  provider, 
  setProvider, 
  apiKey, 
  setApiKey, 
  showKey, 
  setShowKey 
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 px-1">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-[-0.033em]">API Keys</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Select a provider to add or update your API key.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProviderSelect provider={provider} setProvider={setProvider} />
          <ApiKeyInput 
            apiKey={apiKey} 
            setApiKey={setApiKey} 
            showKey={showKey} 
            setShowKey={setShowKey} 
          />
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50 flex justify-end">
          <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-medium leading-normal tracking-[0.015em] px-5 hover:bg-primary-hover transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ApiKeysTab;
