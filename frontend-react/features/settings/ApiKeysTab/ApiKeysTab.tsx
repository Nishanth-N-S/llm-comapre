import React from 'react';
import ProviderSelect from './ProviderSelect';
import ApiKeyInput from './ApiKeyInput';
import { ProviderApiKey } from '../../../api';

interface ApiKeysTabProps {
  providers: ProviderApiKey[];
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  showKey: boolean;
  setShowKey: (show: boolean) => void;
  hasChanges: boolean;
  onSave: () => void;
  onDelete: () => void;
  loading: boolean;
  saving: boolean;
  useOpenRouter: boolean;
  onOpenRouterToggle: (checked: boolean) => void;
}

const ApiKeysTab: React.FC<ApiKeysTabProps> = ({ 
  providers,
  selectedProvider,
  onProviderChange,
  apiKey, 
  setApiKey, 
  showKey, 
  setShowKey,
  hasChanges,
  onSave,
  onDelete,
  loading,
  saving,
  useOpenRouter,
  onOpenRouterToggle
}) => {
  const openRouterProvider: ProviderApiKey = {
    provider: 'openrouter',
    displayName: 'Open Router',
    apiKey: apiKey || null
  };

  const displayProviders = useOpenRouter ? [openRouterProvider] : providers;
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 px-1">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-[-0.033em]">API Keys</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Select a provider to add or update your API key.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700/50">
              <input
                type="checkbox"
                id="use-openrouter"
                checked={useOpenRouter}
                onChange={(e) => onOpenRouterToggle(e.target.checked)}
                className="w-5 h-5 text-primary bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary/50 cursor-pointer"
              />
              <label htmlFor="use-openrouter" className="text-gray-900 dark:text-white text-sm font-medium cursor-pointer">
                Use Open Router
              </label>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProviderSelect 
                providers={displayProviders}
                selectedProvider={selectedProvider}
                onProviderChange={onProviderChange}
              />
              <ApiKeyInput 
                apiKey={apiKey} 
                setApiKey={setApiKey} 
                showKey={showKey} 
                setShowKey={setShowKey}
                onDelete={onDelete}
                saving={saving}
                hasKey={!!apiKey}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50 flex justify-end">
              <button 
                onClick={onSave}
                disabled={!hasChanges || saving}
                className={`flex items-center justify-center overflow-hidden rounded-lg h-10 gap-2 text-sm font-medium leading-normal tracking-[0.015em] px-5 transition-colors ${
                  hasChanges && !saving
                    ? 'bg-primary text-white hover:bg-primary-hover'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApiKeysTab;
