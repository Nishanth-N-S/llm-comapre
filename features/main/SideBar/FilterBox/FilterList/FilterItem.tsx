import React from 'react';

interface FilterItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group/item">
      <input 
        checked={checked}
        onChange={onChange}
        className="form-checkbox rounded bg-gray-200 dark:bg-gray-700 border-none text-primary focus:ring-primary cursor-pointer" 
        type="checkbox"
      />
      <span className="text-gray-600 dark:text-gray-300 text-sm group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
        {label}
      </span>
    </label>
  );
};

export default FilterItem;