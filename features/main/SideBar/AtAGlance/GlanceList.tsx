import React from 'react';
import { Stats } from '../../../../types';
import GlanceItem from './GlanceItem';

interface GlanceListProps {
  stats: Stats;
}

const GlanceList: React.FC<GlanceListProps> = ({ stats }) => {
  return (
    <>
      <GlanceItem label="Total Comparisons" value={stats.total} />
      <GlanceItem label="Currently Running" value={stats.running} />
      <GlanceItem label="Errors" value={stats.errors} />
    </>
  );
};

export default GlanceList;