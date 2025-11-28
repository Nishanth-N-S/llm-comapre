import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  showKey: boolean;
  setShowKey: (show: boolean) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, showKey, setShowKey }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">API Key</p>
        <div className="relative flex w-full flex-1 items-stretch rounded-lg">
          <input 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-3 text-base font-normal leading-normal" 
            placeholder="Enter your API key" 
            type={showKey ? "text" : "password"} 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button 
            onClick={() => setShowKey(!showKey)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </label>
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center rounded-lg h-10 bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-white gap-2 text-sm font-medium leading-normal tracking-[0.015em] px-4 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Test Connection
        </button>
        <button className="flex items-center justify-center rounded-lg h-10 bg-red-500/10 text-red-500 gap-2 text-sm font-medium leading-normal tracking-[0.015em] px-4 hover:bg-red-500/20 transition-colors">
          Delete Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
