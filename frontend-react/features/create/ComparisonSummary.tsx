import React from 'react';
import { ModelSelection } from '../../api';

interface ComparisonSummaryProps {
  name: string;
  models: ModelSelection[];
  criteria: string[];
}

const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({ name, models, criteria }) => {
  return (
    <aside className="lg:w-1/3 lg:sticky top-6 self-start space-y-6">
      <div className="border border-white/10 rounded-xl bg-white/5 dark:bg-white/5 bg-white shadow-sm dark:shadow-none p-6">
        <h3 className="text-black dark:text-white text-lg font-bold mb-4">Comparison Summary</h3>
        {name && (
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-1">Name</p>
            <p className="text-black dark:text-white text-sm">{name}</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-1">Models</p>
            {models.length > 0 ? (
              <ul className="list-disc list-inside text-black dark:text-white text-sm space-y-1">
                {models.map((modelSelection) => (
                  <li key={`${modelSelection.provider}-${modelSelection.model}`}>
                    {modelSelection.model}
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">({modelSelection.provider})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-sm italic">No models selected</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-1">Evaluation Criteria</p>
            {criteria.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {criteria.map((criterion) => (
                  <span key={criterion} className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded">
                    {criterion}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-sm italic">No criteria added</p>
            )}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
          <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
            <span className="material-symbols-outlined !text-lg">bookmark</span>
            Save Configuration as Template
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ComparisonSummary;
