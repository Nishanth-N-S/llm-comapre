import { apiClient } from './client';

export interface Provider {
  id: string;
  name: string;
  models: string[];
}

export interface GetModelsResponse {
  providers: Provider[];
}

export const getModels = async (): Promise<GetModelsResponse> => {
  const response = await apiClient.get<GetModelsResponse>('/models');
  return response.data;
};
