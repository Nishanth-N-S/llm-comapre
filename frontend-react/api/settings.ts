import { apiClient } from './client';

export interface ProviderApiKey {
  provider: string;
  displayName: string;
  apiKey: string | null;
}

export interface GetProvidersResponse {
  providers: ProviderApiKey[];
}

export interface SaveApiKeyRequest {
  provider: string;
  apiKey: string;
}

export interface SaveApiKeyResponse {
  success: boolean;
  message: string;
}

export interface DeleteApiKeyResponse {
  success: boolean;
  message: string;
}

export const getProviders = async (): Promise<GetProvidersResponse> => {
  const response = await apiClient.get<GetProvidersResponse>('/settings/providers');
  return response.data;
};

export const saveApiKey = async (data: SaveApiKeyRequest): Promise<SaveApiKeyResponse> => {
  const response = await apiClient.put<SaveApiKeyResponse>(`/settings/providers/${data.provider}/key`, {
    apiKey: data.apiKey,
  });
  return response.data;
};

export const deleteApiKey = async (provider: string): Promise<DeleteApiKeyResponse> => {
  const response = await apiClient.delete<DeleteApiKeyResponse>(`/settings/providers/${provider}/key`);
  return response.data;
};
