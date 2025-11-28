import React from 'react';
import { Comparison } from '../../../../../types';
import StatusTab from './StatusTab';

interface RowProps {
  item: Comparison;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const Row: React.FC<RowProps> = ({ item, isSelected, onToggle, onViewDetails }) => {
  return (
    <tr 
      className={`
        border-b border-gray-200/10 dark:border-gray-700/50 hover:bg-gray-100/30 dark:hover:bg-gray-800/20 transition-colors
        ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
      `}
    >
      <td className="p-4 w-8">
        <input 
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(item.id)}
          className="form-checkbox rounded bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary cursor-pointer"
        />
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
        {item.name}
      </td>
      <td className="px-4 py-3">
        <StatusTab status={item.status} />
      </td>
      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
        {item.models.join(', ')}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
        {item.score || '-'}
      </td>
      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
        {item.dateCreated}
      </td>
      <td className="px-4 py-3 text-right">
        <button 
          onClick={() => onViewDetails(item.id)}
          className="text-primary font-medium hover:text-primary-hover hover:underline text-sm transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default Row;