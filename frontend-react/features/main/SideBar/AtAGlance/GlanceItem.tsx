import React from 'react';

interface GlanceItemProps {
  label: string;
  value: number;
}

const GlanceItem: React.FC<GlanceItemProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600 dark:text-gray-300 text-sm">{label}</span>
      <span className="text-gray-800 dark:text-white font-semibold text-lg">{value}</span>
    </div>
  );
};

export default GlanceItem;