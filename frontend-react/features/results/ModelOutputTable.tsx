import React, { useState } from 'react';
import { ModelResult } from '../../pages/ComparisonResults';

interface ModelOutputTableProps {
  results: ModelResult[];
}

const ModelOutputTable: React.FC<ModelOutputTableProps> = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleRow = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Model Outputs</h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-gray-700/50 bg-white dark:bg-slate-900/50 shadow-sm dark:shadow-none">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-gray-700/50 bg-slate-50 dark:bg-slate-800/70">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white w-1/5">
                Model
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Generated Output
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const isExpanded = expandedRows.has(index);
              const hasContent = result.response && result.response.length > 150;
              
              return (
                <tr 
                  key={index} 
                  className="border-b border-slate-200 dark:border-gray-700/50 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 align-top">
                    <div className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      {result.model}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {result.error ? (
                      <div className="text-red-600 dark:text-red-500 text-sm">
                        <strong>Error:</strong> {result.error}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {isExpanded ? result.response : truncateText(result.response || '', 150)}
                        </div>
                        {hasContent && (
                          <button
                            onClick={() => toggleRow(index)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show less</span>
                                <span className="material-symbols-outlined !text-sm">expand_less</span>
                              </>
                            ) : (
                              <>
                                <span>Show more</span>
                                <span className="material-symbols-outlined !text-sm">expand_more</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top text-center">
                    {result.response && (
                      <button 
                        onClick={() => handleCopy(result.response!)}
                        className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Copy output"
                      >
                        <span className="material-symbols-outlined !text-sm">content_copy</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelOutputTable;
