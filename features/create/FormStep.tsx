import React from 'react';

interface FormStepProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({ stepNumber, title, children }) => {
  return (
    <div className="border border-white/10 rounded-xl bg-white/5 dark:bg-white/5 bg-white shadow-sm dark:shadow-none">
      <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pt-5 pb-3 border-b border-gray-200 dark:border-white/10">
        {stepNumber}. {title}
      </h2>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormStep;
