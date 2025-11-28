import React from 'react';

const ComparisonDesc: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between gap-3 mb-6">
      <div className="flex min-w-72 flex-col gap-2">
        <h1 className="text-gray-800 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
          All Comparisons
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
          Manage, view, and analyze your ongoing and completed comparisons.
        </p>
      </div>
    </div>
  );
};

export default ComparisonDesc;