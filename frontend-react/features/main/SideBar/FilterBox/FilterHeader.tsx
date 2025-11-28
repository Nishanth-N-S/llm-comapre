import React from 'react';
import { ChevronDown } from 'lucide-react';

const FilterHeader: React.FC = () => {
  return (
    <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none select-none">
      <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal">Filter by Status</p>
      <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" size={20} />
    </summary>
  );
};

export default FilterHeader;