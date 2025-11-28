import React from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';

interface ProviderSelectProps {
  provider: string;
  setProvider: (provider: string) => void;
}

const ProviderSelect: React.FC<ProviderSelectProps> = ({ provider, setProvider }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">Provider</p>
        <div className="relative">
          <select 
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
          >
            <option disabled>Select an AI Provider</option>
            <option value="openai" className="text-green-600 dark:text-green-400 font-medium">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="gemini" className="text-green-600 dark:text-green-400 font-medium">Google Gemini</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
        </div>
      </label>
      <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
        <CheckCircle size={16} className="text-green-500" />
        <span>Providers with a saved key are marked in green.</span>
      </div>
    </div>
  );
};

export default ProviderSelect;
