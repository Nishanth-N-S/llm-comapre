import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AIScoringConfigProps {
  scoringConfig: {
    model: string;
    temperature: number;
    enableReasoning: boolean;
  };
  setScoringConfig: React.Dispatch<React.SetStateAction<{
    model: string;
    temperature: number;
    enableReasoning: boolean;
  }>>;
}

const AIScoringConfig: React.FC<AIScoringConfigProps> = ({ scoringConfig, setScoringConfig }) => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Scoring Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="scoring-model" className="text-sm font-medium text-gray-900 dark:text-white">Scoring Model</label>
          <div className="relative">
            <select 
              id="scoring-model"
              value={scoringConfig.model}
              onChange={(e) => setScoringConfig(prev => ({ ...prev, model: e.target.value }))}
              className="form-select appearance-none w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 focus:border-primary dark:focus:border-primary h-12 px-4"
            >
              <option value="GPT-4 Turbo">GPT-4 Turbo</option>
              <option value="Claude 3 Opus">Claude 3 Opus</option>
              <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="scoring-temperature" className="text-sm font-medium text-gray-900 dark:text-white">Temperature</label>
          <input 
            type="number" 
            id="scoring-temperature"
            step="0.1"
            min="0"
            max="2"
            value={scoringConfig.temperature}
            onChange={(e) => setScoringConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            className="form-input w-full rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 focus:border-primary dark:focus:border-primary h-12 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AIScoringConfig;
