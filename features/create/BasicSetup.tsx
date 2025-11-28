import React from 'react';
import FormStep from './FormStep';

interface BasicSetupProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const BasicSetup: React.FC<BasicSetupProps> = ({ name, description, onNameChange, onDescriptionChange }) => {
  return (
    <FormStep stepNumber={1} title="Basic Setup">
      <label className="flex flex-col">
        <p className="text-black dark:text-white text-base font-medium leading-normal pb-2">Comparison Name</p>
        <input 
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal capitalize" 
          placeholder="e.g., Test for Customer Support Chatbot" 
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </label>
      <label className="flex flex-col">
        <p className="text-black dark:text-white text-base font-medium leading-normal pb-2">Description <span className="text-slate-400 dark:text-slate-500">(Optional)</span></p>
        <textarea 
          className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-24 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal capitalize" 
          placeholder="Add a brief description of what this comparison is for."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        ></textarea>
      </label>
    </FormStep>
  );
};

export default BasicSetup;
