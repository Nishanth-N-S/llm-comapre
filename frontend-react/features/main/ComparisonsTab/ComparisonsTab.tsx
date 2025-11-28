import React, { useState, useEffect } from 'react';
import { Comparison, Status } from '../../../types';
import { getComparisons, deleteComparison, deleteComparisons } from '../../../api';
import ComparisonDesc from './ComparisonDesc';
import ComparisonTable from './ComparisonTable/ComparisonTable';

interface ComparisonsTabProps {
  onViewDetails: (id: string) => void;
  statusFilter: Status[];
  searchQuery: string;
  onStatsUpdate: () => void;
}

const ComparisonsTab: React.FC<ComparisonsTabProps> = ({ 
  onViewDetails, 
  statusFilter, 
  searchQuery,
  onStatsUpdate
}) => {
  const [data, setData] = useState<Comparison[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchComparisons = async () => {
    setLoading(true);
    try {
      const response = await getComparisons({
        page: currentPage,
        limit: itemsPerPage,
        statuses: statusFilter.length > 0 ? statusFilter : undefined,
        search: searchQuery || undefined,
      });
      setData(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
    } catch (error) {
      console.error('Failed to fetch comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparisons();
  }, [currentPage, statusFilter, searchQuery]);

  const handleDelete = async (ids: string[]) => {
    try {
      if (ids.length === 1) {
        await deleteComparison(ids[0]);
      } else {
        await deleteComparisons(ids);
      }
      await fetchComparisons();
      onStatsUpdate();
    } catch (error) {
      console.error('Failed to delete comparisons:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto w-full">
      <ComparisonDesc />
      
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      ) : (
        <ComparisonTable 
          data={data} 
          onViewDetails={onViewDetails}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default ComparisonsTab;