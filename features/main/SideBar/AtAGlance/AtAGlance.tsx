import React from 'react';
import { Stats } from '../../../../types';
import GlanceList from './GlanceList';

interface AtAGlanceProps {
  stats: Stats;
}

const AtAGlance: React.FC<AtAGlanceProps> = ({ stats }) => {
  return (
    <div className="rounded-xl bg-primary/10 dark:bg-primary/20 p-4 flex flex-col gap-4">
      <h3 className="text-gray-800 dark:text-white font-bold">Overview</h3>
      <GlanceList stats={stats} />
    </div>
  );
};

export default AtAGlance;