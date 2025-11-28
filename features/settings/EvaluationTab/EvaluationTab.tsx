import React from 'react';
import AIScoringConfig from './AIScoringConfig';

interface EvaluationTabProps {
  rubric: {
    coherence: number;
    relevance: number;
    accuracy: number;
  };
  handleRubricChange: (key: 'coherence' | 'relevance' | 'accuracy', value: number) => void;
  scoringConfig: {
    model: string;
    temperature: number;
    enableReasoning: boolean;
  };
  setScoringConfig: React.Dispatch<React.SetStateAction<{
    model: string;
    temperature: number;
    enableReasoning: boolean;
  }>>;
}

const EvaluationTab: React.FC<EvaluationTabProps> = ({ 
  rubric, 
  handleRubricChange, 
  scoringConfig, 
  setScoringConfig 
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 px-1">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-[-0.033em]">Evaluation Settings</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Customize how LLM outputs are scored and evaluated.</p>
        </div>
      </div>

      <AIScoringConfig scoringConfig={scoringConfig} setScoringConfig={setScoringConfig} />

      <div className="flex justify-end mt-2">
        <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-medium leading-normal tracking-[0.015em] px-5 hover:bg-primary-hover transition-colors">
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EvaluationTab;
