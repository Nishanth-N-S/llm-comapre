import { apiClient } from './client';
import { GetStatsResponse } from './types';

export const getStats = async (): Promise<GetStatsResponse> => {
  const response = await apiClient.get<GetStatsResponse>('/stats');
  
  return response.data;
};
