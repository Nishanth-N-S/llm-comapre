import { apiClient } from './client';
import { GetStatusesResponse } from './types';

export const getStatuses = async (): Promise<GetStatusesResponse> => {
  const response = await apiClient.get<GetStatusesResponse>('/statuses');
  
  return response.data;
};
