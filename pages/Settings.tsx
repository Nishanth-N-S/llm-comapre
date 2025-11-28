import React, { useState } from 'react';
import SettingsSidebar from '../features/settings/SettingsSidebar/SettingsSidebar';
import ApiKeysTab from '../features/settings/ApiKeysTab/ApiKeysTab';
import EvaluationTab from '../features/settings/EvaluationTab/EvaluationTab';

type Tab = 'api-keys' | 'evaluation';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('api-keys');

  const [provider, setProvider] = useState('Select an AI Provider');
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);

  const [rubric, setRubric] = useState({
    coherence: 40,
    relevance: 30,
    accuracy: 30
  });
  const [scoringConfig, setScoringConfig] = useState({
    model: 'GPT-4 Turbo',
    temperature: 0.5,
    enableReasoning: true
  });

  const handleRubricChange = (key: keyof typeof rubric, value: number) => {
    setRubric(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto h-full">
        <div className="flex flex-col md:flex-row w-full gap-8 h-fit">
          
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 flex flex-col gap-8">
            {activeTab === 'api-keys' && (
              <ApiKeysTab 
                provider={provider}
                setProvider={setProvider}
                apiKey={apiKey}
                setApiKey={setApiKey}
                showKey={showKey}
                setShowKey={setShowKey}
              />
            )}

            {activeTab === 'evaluation' && (
              <EvaluationTab 
                rubric={rubric}
                handleRubricChange={handleRubricChange}
                scoringConfig={scoringConfig}
                setScoringConfig={setScoringConfig}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
