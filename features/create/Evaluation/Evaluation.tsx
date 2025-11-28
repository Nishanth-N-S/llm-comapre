import React, { useState, KeyboardEvent } from 'react';
import FormStep from '../FormStep';
import EvaluationFormGroup from './EvaluationFormGroup';
import EvaluationFormLabel from './EvaluationFormLabel';
import AdvancedInstructions from './AdvancedInstructions';

interface EvaluationProps {
  criteria: string[];
  onCriteriaChange: (criteria: string[]) => void;
}

const Evaluation: React.FC<EvaluationProps> = ({ criteria, onCriteriaChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddCriteria = () => {
    if (inputValue.trim() && !criteria.includes(inputValue.trim())) {
      onCriteriaChange([...criteria, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveCriteria = (criteriaToRemove: string) => {
    onCriteriaChange(criteria.filter(c => c !== criteriaToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCriteria();
    }
  };

  return (
    <FormStep stepNumber={4} title="Evaluation">
      <EvaluationFormGroup>
        <p className="text-black dark:text-white text-base font-medium leading-normal pb-2">Evaluation Criteria</p>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 rounded-lg min-h-12">
          {criteria.map((criterion) => (
            <EvaluationFormLabel 
              key={criterion} 
              label={criterion} 
              onRemove={() => handleRemoveCriteria(criterion)}
            />
          ))}
          <div className="flex items-center gap-2 flex-grow">
            <input 
              className="form-input flex-grow bg-transparent border-0 focus:ring-0 p-1 text-black dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" 
              placeholder="Add a criteria..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {inputValue.trim() && (
              <button
                type="button"
                onClick={handleAddCriteria}
                className="material-symbols-outlined !text-lg text-primary hover:text-primary-hover transition-colors"
                aria-label="Add criteria"
              >
                add_circle
              </button>
            )}
          </div>
        </div>
      </EvaluationFormGroup>
      <AdvancedInstructions />
    </FormStep>
  );
};

export default Evaluation;
