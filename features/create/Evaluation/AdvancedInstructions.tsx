import React from 'react';

const AdvancedInstructions: React.FC = () => {
  return (
    <div className="border border-dashed border-gray-300 dark:border-white/20 rounded-lg">
      <details className="group">
        <summary className="flex items-center justify-between p-4 cursor-pointer text-black dark:text-white font-medium list-none">
          Advanced Scoring Instructions
          <span className="material-symbols-outlined transition-transform duration-200 group-open:rotate-180">expand_more</span>
        </summary>
        <div className="p-4 pt-0">
          <label className="flex flex-col">
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal pb-2">Provide specific instructions to the AI that will be scoring the results. This can help guide the evaluation process for nuanced tasks.</p>
            <textarea className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-black dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-32 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal" placeholder="e.g., 'When evaluating Code Quality, prioritize readability and adherence to PEP 8 standards.'"></textarea>
          </label>
        </div>
      </details>
    </div>
  );
};

export default AdvancedInstructions;
