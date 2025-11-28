import React from 'react';

interface LLMResultItemProps {
  modelName: string;
  modelLogo: string;
  modelLogoStyle?: React.CSSProperties;
  score: number;
  rating: string;
  ratingColor: 'green' | 'yellow' | 'red';
  rationale: string[];
  output: string;
}

const LLMResultItem: React.FC<LLMResultItemProps> = ({
  modelName,
  modelLogo,
  modelLogoStyle,
  score,
  rating,
  ratingColor,
  rationale,
  output,
}) => {
  const ratingStyles = {
    green: 'bg-green-500/10 text-green-600 dark:text-green-500',
    yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
    red: 'bg-red-500/10 text-red-600 dark:text-red-500',
  };

  const scoreColors = {
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-gray-700/50 bg-white dark:bg-slate-900/50 p-5 shadow-sm dark:shadow-none">
      {/* Column Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {modelLogo.startsWith('<svg') ? (
            <div className="h-8 w-8 rounded-full bg-blue-200 p-1 flex items-center justify-center" style={modelLogoStyle}>
              <div dangerouslySetInnerHTML={{ __html: modelLogo }} />
            </div>
          ) : (
            <img 
              className="h-8 w-8 rounded-full bg-white p-1 object-contain" 
              alt={`${modelName} Logo`} 
              src={modelLogo}
              style={modelLogoStyle}
            />
          )}
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{modelName}</h2>
        </div>
        <div className={`rounded-full px-3 py-1 text-sm font-semibold ${ratingStyles[ratingColor]}`}>
          {rating}
        </div>
      </div>

      {/* Score Component */}
      <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 p-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Score</p>
        <p className={`text-5xl font-black ${scoreColors[ratingColor]}`}>
          {score}
          <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">/100</span>
        </p>
      </div>

      {/* Reasoning Card */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-gray-700/50 p-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Score Rationale</h3>
        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          {rationale.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Output Text Area */}
      <div className="flex-1 flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-gray-700/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Generated Output</h3>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined !text-sm">content_copy</span> Copy
          </button>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none flex-1 overflow-y-auto text-slate-600 dark:text-slate-300 pr-2 max-h-96">
          <p>{output}</p>
        </div>
      </div>
    </div>
  );
};

export default LLMResultItem;
