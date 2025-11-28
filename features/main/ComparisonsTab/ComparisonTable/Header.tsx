import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface HeaderProps {
  isAllSelected: boolean;
  onToggleAll: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAllSelected, onToggleAll }) => {
  return (
    <thead className="bg-gray-100/50 dark:bg-gray-800/50 text-xs uppercase text-gray-700 dark:text-gray-400">
      <tr>
        <th className="p-4 w-8" scope="col">
          <input 
            type="checkbox"
            checked={isAllSelected}
            onChange={onToggleAll}
            className="form-checkbox rounded bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary cursor-pointer"
          />
        </th>
        <th className="px-4 py-3" scope="col">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
            Comparison Name 
            <ArrowUpDown size={14} className="opacity-50 group-hover:opacity-100" />
          </div>
        </th>
        <th className="px-4 py-3" scope="col">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
            Status 
            <ArrowUpDown size={14} className="opacity-50 group-hover:opacity-100" />
          </div>
        </th>
        <th className="px-4 py-3" scope="col">Models</th>
        <th className="px-4 py-3" scope="col">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
            Best Avg. Score 
            <ArrowUpDown size={14} className="opacity-50 group-hover:opacity-100" />
          </div>
        </th>
        <th className="px-4 py-3" scope="col">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group">
            Date Created 
            <ArrowUpDown size={14} className="opacity-50 group-hover:opacity-100" />
          </div>
        </th>
        <th className="px-4 py-3" scope="col"><span className="sr-only">Actions</span></th>
      </tr>
    </thead>
  );
};

export default Header;