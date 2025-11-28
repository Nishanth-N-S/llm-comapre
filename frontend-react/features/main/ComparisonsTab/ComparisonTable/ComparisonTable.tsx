import React, { useState } from 'react';
import { Comparison } from '../../../../types';
import Header from './Header';
import Row from './Row/Row';

interface ComparisonTableProps {
  data: Comparison[];
  onViewDetails: (id: string) => void;
  onDelete: (ids: string[]) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ 
  data, 
  onViewDetails, 
  onDelete,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(d => d.id)));
    }
  };

  const handleDelete = async () => {
    if (selectedRows.size > 0) {
      await onDelete(Array.from(selectedRows));
      setSelectedRows(new Set());
    }
  };

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      {selectedRows.size > 0 && (
        <div className="mb-4 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {selectedRows.size} item{selectedRows.size > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200/10 dark:border-gray-700/50 bg-white dark:bg-transparent">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <Header isAllSelected={isAllSelected} onToggleAll={toggleAll} />
          <tbody className="divide-y divide-gray-200/10 dark:divide-gray-700/50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No comparisons found matching your criteria.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <Row 
                  key={item.id}
                  item={item}
                  isSelected={selectedRows.has(item.id)}
                  onToggle={toggleRow}
                  onViewDetails={onViewDetails}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav aria-label="Table navigation" className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{totalItems > 0 ? startItem : 0}-{endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-s-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <li key={pageNum}>
                <button 
                  onClick={() => onPageChange(pageNum)}
                  className={`flex items-center justify-center px-3 h-8 border border-gray-300 dark:border-gray-700 transition-colors ${
                    currentPage === pageNum
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 hover:text-blue-700'
                      : 'leading-tight text-gray-500 bg-white dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li>
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-e-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ComparisonTable;