import React from 'react';
import { Status } from '../../../../../types';
import FilterItem from './FilterItem';

interface FilterListProps {
  statusFilter: Status[];
  onStatusChange: (status: Status) => void;
  onToggleAll: () => void;
  isAllSelected: boolean;
}

const FilterList: React.FC<FilterListProps> = ({ 
  statusFilter, 
  onStatusChange, 
  onToggleAll, 
  isAllSelected 
}) => {
  return (
    <div className="flex flex-col gap-2 pb-2 pt-2">
      <FilterItem 
        label="All" 
        checked={isAllSelected} 
        onChange={onToggleAll} 
      />
      {(['Running', 'Completed', 'Error'] as Status[]).map((status) => (
        <FilterItem 
          key={status}
          label={status}
          checked={statusFilter.includes(status)}
          onChange={() => onStatusChange(status)}
        />
      ))}
    </div>
  );
};

export default FilterList;