import React from 'react';

interface EvaluationFormLabelProps {
  label: string;
  onRemove?: () => void;
}

const EvaluationFormLabel: React.FC<EvaluationFormLabelProps> = ({ label, onRemove }) => {
  return (
    <span className="flex items-center gap-1.5 bg-primary/20 text-primary text-sm font-medium px-2 py-1 rounded">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onRemove?.()}
        className="material-symbols-outlined !text-sm hover:text-red-500"
        aria-label={`Remove ${label}`}
      >
        close
      </button>
    </span>
  );
};

export default EvaluationFormLabel;
