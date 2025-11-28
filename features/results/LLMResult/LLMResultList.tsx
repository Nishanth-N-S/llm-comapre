import React from 'react';
import LLMResultItem from './LLMResultItem';

export interface LLMResult {
  modelName: string;
  modelLogo: string;
  modelLogoStyle?: React.CSSProperties;
  score: number;
  rating: string;
  ratingColor: 'green' | 'yellow' | 'red';
  rationale: string[];
  output: string;
}

interface LLMResultListProps {
  results: LLMResult[];
}

const LLMResultList: React.FC<LLMResultListProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4">
      {results.map((result, index) => (
        <LLMResultItem
          key={index}
          modelName={result.modelName}
          modelLogo={result.modelLogo}
          modelLogoStyle={result.modelLogoStyle}
          score={result.score}
          rating={result.rating}
          ratingColor={result.ratingColor}
          rationale={result.rationale}
          output={result.output}
        />
      ))}
    </div>
  );
};

export default LLMResultList;
