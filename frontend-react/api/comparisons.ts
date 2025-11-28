import { apiClient } from './client';
import {
  GetComparisonsParams,
  GetComparisonsResponse,
  DeleteComparisonResponse,
} from './types';

export const getComparisons = async (
  params: GetComparisonsParams
): Promise<GetComparisonsResponse> => {
  const queryParams = new URLSearchParams();
  
  queryParams.append('page', params.page.toString());
  queryParams.append('limit', params.limit.toString());
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  
  if (params.statuses && params.statuses.length > 0) {
    queryParams.append('statuses', params.statuses.join(','));
  }

  const response = await apiClient.get<GetComparisonsResponse>(
    `/comparisons?${queryParams.toString()}`
  );
  
  return response.data;
};

export const deleteComparison = async (
  id: string
): Promise<DeleteComparisonResponse> => {
  const response = await apiClient.delete<DeleteComparisonResponse>(
    `/comparisons/${id}`
  );
  
  return response.data;
};

export const deleteComparisons = async (
  ids: string[]
): Promise<DeleteComparisonResponse> => {
  const response = await apiClient.post<DeleteComparisonResponse>(
    '/comparisons/batch-delete',
    { ids }
  );
  
  return response.data;
};
