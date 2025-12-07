import React from 'react';
import { ModelResult, CriteriaScore } from '../../pages/ComparisonResults';

interface CriteriaScoresProps {
  results: ModelResult[];
}

const CriteriaScores: React.FC<CriteriaScoresProps> = ({ results }) => {
  // Calculate average score for each model
  const getAverageScore = (scores?: CriteriaScore[]): number => {
    if (!scores || scores.length === 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score.score, 0);
    return Number((sum / scores.length).toFixed(2));
  };

  // Get all unique criteria from all models
  const allCriteria = Array.from(
    new Set(
      results.flatMap(result => 
        result.scores?.map(s => s.criteria) || []
      )
    )
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Evaluation Criteria Scores</h2>
      
      <div className="space-y-6">
        {results.map((result, modelIndex) => {
          if (!result.scores || result.scores.length === 0) return null;
          
          const averageScore = getAverageScore(result.scores);
          
          return (
            <div 
              key={modelIndex} 
              className="rounded-lg border border-slate-200 dark:border-gray-700/50 bg-white dark:bg-slate-900/50 p-6 shadow-sm dark:shadow-none"
            >
              {/* Model Header with Average Score */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200 dark:border-gray-700/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {result.model}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Average Score:
                  </span>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 px-4 py-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {averageScore}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      / 1
                    </span>
                  </div>
                </div>
              </div>

              {/* Criteria Scores Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {result.scores.map((criteriaScore, scoreIndex) => (
                  <div 
                    key={scoreIndex}
                    className="rounded-lg border border-slate-200 dark:border-gray-700/50 bg-slate-50 dark:bg-slate-800/50 p-4"
                  >
                    {/* Criteria Header with Score */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                        {criteriaScore.criteria}
                      </h4>
                      <div className="flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900/50 px-3 py-1">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {criteriaScore.score.toFixed(2)}
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          / 1.00
                        </span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="material-symbols-outlined !text-base text-green-600 dark:text-green-500">
                            check_circle
                          </span>
                          <span className="text-xs font-semibold text-green-700 dark:text-green-500 uppercase">
                            Pros
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 pl-6">
                          {criteriaScore.pros}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="material-symbols-outlined !text-base text-red-600 dark:text-red-500">
                            cancel
                          </span>
                          <span className="text-xs font-semibold text-red-700 dark:text-red-500 uppercase">
                            Cons
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 pl-6">
                          {criteriaScore.cons}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CriteriaScores;
