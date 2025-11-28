import React from 'react';

interface EvaluationFormGroupProps {
  children: React.ReactNode;
}

const EvaluationFormGroup: React.FC<EvaluationFormGroupProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
};

export default EvaluationFormGroup;
