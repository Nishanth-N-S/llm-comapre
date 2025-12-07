import React from 'react';

interface PromptUsedProps {
  userPrompt: string;
  systemPrompt?: string;
  systemPrompts?: { model: string; prompt: string }[];
}

const PromptUsed: React.FC<PromptUsedProps> = ({ userPrompt, systemPrompt, systemPrompts }) => {
  return (
    <details className="flex flex-col rounded-lg border border-slate-200 dark:border-gray-700/50 bg-white dark:bg-slate-800/50 px-4 py-2 group shadow-sm dark:shadow-none">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-2">
        <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal select-none">View Prompts Used</p>
        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
      </summary>
      <div className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal pb-2 mt-2 border-t border-slate-200 dark:border-gray-700 pt-3">
        <p><strong>User Prompt:</strong> '{userPrompt}'</p>
        {systemPrompt && (
          <p className="mt-1">
            <strong>System Prompt:</strong> '{systemPrompt}'
          </p>
        )}
        {systemPrompts && systemPrompts.map((item, index) => (
          <p key={index} className="mt-1">
            <strong>System Prompt ({item.model}):</strong> '{item.prompt}'
          </p>
        ))}
      </div>
    </details>
  );
};

export default PromptUsed;
