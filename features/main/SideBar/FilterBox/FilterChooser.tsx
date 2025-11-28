import React from 'react';
import { Status } from '../../../../types';
import FilterHeader from './FilterHeader';
import FilterList from './FilterList/FilterList';

interface FilterChooserProps {
  statusFilter: Status[];
  setStatusFilter: React.Dispatch<React.SetStateAction<Status[]>>;
}

const FilterChooser: React.FC<FilterChooserProps> = ({ statusFilter, setStatusFilter }) => {
  const handleStatusChange = (status: Status) => {
    setStatusFilter(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const toggleAll = () => {
    if (statusFilter.length === 3) {
      setStatusFilter([]);
    } else {
      setStatusFilter(['Running', 'Completed', 'Error']);
    }
  };

  const isAllSelected = statusFilter.length === 3;

  return (
    <div className="flex flex-col gap-3">
      <details className="flex flex-col rounded-lg border border-gray-200/10 dark:border-gray-700/50 bg-transparent px-[15px] py-[7px] group" open>
        <FilterHeader />
        <FilterList 
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          onToggleAll={toggleAll}
          isAllSelected={isAllSelected}
        />
      </details>
    </div>
  );
};

export default FilterChooser;