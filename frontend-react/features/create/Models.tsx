import React, { useMemo, useState, useEffect } from 'react';
import FormStep from './FormStep';
import { getModels, Provider, ModelSelection } from '../../api';

interface ModelsProps {
  selectedModels: ModelSelection[];
  onModelsChange: (models: ModelSelection[]) => void;
}

const Models: React.FC<ModelsProps> = ({ selectedModels, onModelsChange }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProviderId, setActiveProviderId] = useState<string>('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await getModels();
        setProviders(response.providers);
        if (response.providers.length > 0) {
          setActiveProviderId(response.providers[0].id);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load models');
        console.error('Error fetching models:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const defaultProvider: Provider = { id: '', name: '', models: [] };
  const activeProvider = useMemo(
    () => providers.find(p => p.id === activeProviderId) || defaultProvider,
    [activeProviderId, providers]
  );

  const visibleModels = useMemo(() => {
    if (!query.trim()) return activeProvider.models;
    const q = query.toLowerCase();
    return activeProvider.models.filter(m => m.toLowerCase().includes(q));
  }, [activeProvider, query]);

  const toggleModel = (model: string, provider: string) => {
    const isSelected = selectedModels.some(m => m.model === model && m.provider === provider);
    if (isSelected) {
      onModelsChange(selectedModels.filter(m => !(m.model === model && m.provider === provider)));
    } else {
      onModelsChange([...selectedModels, { model, provider }]);
    }
  };

  const selectAllVisible = () => {
    const toAdd = visibleModels
      .filter(m => !selectedModels.some(sm => sm.model === m && sm.provider === activeProviderId))
      .map(m => ({ model: m, provider: activeProviderId }));
    if (toAdd.length) onModelsChange([...selectedModels, ...toAdd]);
  };

  const clearAllVisible = () => {
    const remaining = selectedModels.filter(m => !visibleModels.includes(m.model) || m.provider !== activeProviderId);
    onModelsChange(remaining);
  };

  if (loading) {
    return (
      <FormStep stepNumber={2} title="Models">
        <div className="flex items-center justify-center py-8">
          <p className="text-slate-500 dark:text-slate-400">Loading models...</p>
        </div>
      </FormStep>
    );
  }

  if (error) {
    return (
      <FormStep stepNumber={2} title="Models">
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </FormStep>
    );
  }

  if (providers.length === 0) {
    return (
      <FormStep stepNumber={2} title="Models">
        <div className="flex items-center justify-center py-8">
          <p className="text-slate-500 dark:text-slate-400">No models available</p>
        </div>
      </FormStep>
    );
  }

  return (
    <FormStep stepNumber={2} title="Models">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <p className="text-black dark:text-white text-base font-medium leading-normal">LLM Models</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Choose a provider to view its models</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedModels.length > 0 && (
              <span className="text-primary text-sm font-medium">
                {selectedModels.length} selected
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto">
          {providers.map((p) => {
            const isActive = p.id === activeProviderId;
            const selectedCount = selectedModels.filter(sm => sm.provider === p.id).length;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => { setActiveProviderId(p.id); setQuery(''); }}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'}`}
              >
                {p.name}
                <span className="ml-2 text-xs font-normal text-slate-400">({p.models.length}{selectedCount ? ` • ${selectedCount}` : ''})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input
            type="search"
            placeholder={`Search ${activeProvider.name} models...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-sm"
          />
          <button
            type="button"
            onClick={selectAllVisible}
            className="text-sm text-primary hover:underline"
            aria-label="Select all visible models"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={clearAllVisible}
            className="text-sm text-slate-500 hover:underline"
            aria-label="Clear visible selections"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
          {visibleModels.map((model) => {
            const isSelected = selectedModels.some(m => m.model === model && m.provider === activeProviderId);
            return (
              <label
                key={model}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/10 dark:bg-primary/20' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary/50'}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleModel(model, activeProviderId)}
                  className="w-4 h-4 text-primary border-slate-300 dark:border-slate-600 rounded focus:ring-primary focus:ring-2 flex-shrink-0"
                />
                <span className={`text-sm font-medium flex-grow ${isSelected ? 'text-primary' : 'text-black dark:text-white'}`}>
                  {model}
                </span>
                {isSelected && (
                  <span className="material-symbols-outlined !text-base text-primary flex-shrink-0">
                    check_circle
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </FormStep>
  );
};

export default Models;
