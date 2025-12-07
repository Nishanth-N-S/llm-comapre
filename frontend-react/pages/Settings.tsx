import React, { useState, useEffect, useCallback } from 'react';
import SettingsSidebar from '../features/settings/SettingsSidebar/SettingsSidebar';
import ApiKeysTab from '../features/settings/ApiKeysTab/ApiKeysTab';
import { getProviders, saveApiKey, deleteApiKey, ProviderApiKey, getOpenRouterSettings, updateOpenRouterSettings } from '../api';

type Tab = 'api-keys' | 'evaluation';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('api-keys');
  const [providers, setProviders] = useState<ProviderApiKey[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [originalApiKey, setOriginalApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [useOpenRouter, setUseOpenRouter] = useState(false);
  const [originalUseOpenRouter, setOriginalUseOpenRouter] = useState(false);

  const fetchProviders = useCallback(async () => {
    setLoading(true);
    try {
      const [providersResponse, openRouterResponse] = await Promise.all([
        getProviders(),
        getOpenRouterSettings()
      ]);
      setProviders(providersResponse.providers);
      setUseOpenRouter(openRouterResponse.useOpenRouter);
      setOriginalUseOpenRouter(openRouterResponse.useOpenRouter);
      
      if (openRouterResponse.useOpenRouter) {
        setSelectedProvider('openrouter');
        setApiKey(openRouterResponse.apiKey || '');
        setOriginalApiKey(openRouterResponse.apiKey || '');
      } else if (providersResponse.providers.length > 0 && !selectedProvider) {
        const first = providersResponse.providers[0];
        setSelectedProvider(first.provider);
        setApiKey(first.apiKey || '');
        setOriginalApiKey(first.apiKey || '');
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedProvider]);

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    if (provider === 'openrouter') {
      return;
    }
    const found = providers.find(p => p.provider === provider);
    const key = found?.apiKey || '';
    setApiKey(key);
    setOriginalApiKey(key);
    setShowKey(false);
  };

  const handleOpenRouterToggle = async (checked: boolean) => {
    setUseOpenRouter(checked);
    if (checked) {
      setSelectedProvider('openrouter');
      setApiKey('');
      setOriginalApiKey('');
    } else if (providers.length > 0) {
      const first = providers[0];
      setSelectedProvider(first.provider);
      setApiKey(first.apiKey || '');
      setOriginalApiKey(first.apiKey || '');
    }
    setShowKey(false);
  };

  const handleSave = async () => {
    const hasApiKeyChange = apiKey !== originalApiKey;
    const hasOpenRouterChange = useOpenRouter !== originalUseOpenRouter;
    
    if (!selectedProvider || (!hasApiKeyChange && !hasOpenRouterChange)) return;
    
    setSaving(true);
    try {
      if (useOpenRouter) {
        await updateOpenRouterSettings({ useOpenRouter: true, apiKey: apiKey || null });
        setOriginalApiKey(apiKey);
        setOriginalUseOpenRouter(true);
      } else {
        if (hasOpenRouterChange) {
          await updateOpenRouterSettings({ useOpenRouter: false, apiKey: null });
          setOriginalUseOpenRouter(false);
        }
        if (hasApiKeyChange) {
          await saveApiKey({ provider: selectedProvider, apiKey });
          setOriginalApiKey(apiKey);
          setProviders(prev => prev.map(p => 
            p.provider === selectedProvider ? { ...p, apiKey } : p
          ));
        }
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProvider) return;
    setSaving(true);
    try {
      if (useOpenRouter) {
        await updateOpenRouterSettings({ useOpenRouter: true, apiKey: null });
        setApiKey('');
        setOriginalApiKey('');
      } else {
        await deleteApiKey(selectedProvider);
        setApiKey('');
        setOriginalApiKey('');
        setProviders(prev => prev.map(p => 
          p.provider === selectedProvider ? { ...p, apiKey: null } : p
        ));
      }
    } catch (error) {
      console.error('Failed to delete API key:', error);
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = apiKey !== originalApiKey || useOpenRouter !== originalUseOpenRouter;

  return (
    <div className="flex flex-1 overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto h-full">
        <div className="flex flex-col md:flex-row w-full gap-8 h-fit">
          
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 flex flex-col gap-8">
            {activeTab === 'api-keys' && (
              <ApiKeysTab 
                providers={providers}
                selectedProvider={selectedProvider}
                onProviderChange={handleProviderChange}
                apiKey={apiKey}
                setApiKey={setApiKey}
                showKey={showKey}
                setShowKey={setShowKey}
                hasChanges={hasChanges}
                onSave={handleSave}
                onDelete={handleDelete}
                loading={loading}
                saving={saving}
                useOpenRouter={useOpenRouter}
                onOpenRouterToggle={handleOpenRouterToggle}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
