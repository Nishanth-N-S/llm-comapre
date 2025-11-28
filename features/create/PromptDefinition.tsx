import React from 'react';
import FormStep from './FormStep';

interface PromptDefinitionProps {
  systemPrompt: string;
  userPrompt: string;
  onSystemPromptChange: (value: string) => void;
  onUserPromptChange: (value: string) => void;
}

const PromptDefinition: React.FC<PromptDefinitionProps> = ({ systemPrompt, userPrompt, onSystemPromptChange, onUserPromptChange }) => {
  return (
    <FormStep stepNumber={3} title="Prompt Definition">
      <label className="flex flex-col">
        <p className="text-black dark:text-white text-base font-medium leading-normal pb-2">System Prompt <span className="text-slate-400 dark:text-slate-500">(Optional)</span></p>
        <textarea 
          className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-24 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal font-mono capitalize" 
          placeholder="e.g., You are a helpful AI assistant for customer support."
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
        ></textarea>
      </label>
      <label className="flex flex-col">
        <p className="text-black dark:text-white text-base font-medium leading-normal pb-2">User Prompt</p>
        <textarea 
          className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-48 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal font-mono capitalize" 
          placeholder="Enter the prompt to test. Use {{input}} for variables."
          value={userPrompt}
          onChange={(e) => onUserPromptChange(e.target.value)}
        ></textarea>
      </label>
    </FormStep>
  );
};

export default PromptDefinition;
