import React from 'react';

interface ResultsHeaderProps {
  comparisonTitle: string;
  runDate: string;
  onBack: () => void;
  onExport?: () => void;
  onRerun?: () => void;
  onShare?: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  comparisonTitle,
  runDate,
  onBack,
  onExport,
  onRerun,
  onShare,
}) => {
  return (
    <header className="mb-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2">
        <button onClick={onBack} className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors">
          All Comparisons
        </button>
        <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">/</span>
        <span className="text-slate-900 dark:text-white text-base font-medium leading-normal">{comparisonTitle}</span>
      </div>

      {/* Page Heading and Main Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
            Comparison: {comparisonTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
            {runDate}
          </p>
        </div>
        <div className="flex flex-1 sm:flex-none justify-end gap-3 flex-wrap">
          <button 
            onClick={onExport}
            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-slate-700/50 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-base">ios_share</span>
            <span className="truncate">Export Results</span>
          </button>
          <button 
            onClick={onRerun}
            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-slate-700/50 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            <span className="truncate">Rerun Comparison</span>
          </button>
          <button 
            onClick={onShare}
            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span className="truncate">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ResultsHeader;
