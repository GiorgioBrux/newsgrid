import { CONFIG } from '$lib/constants/config';
import type { CategoriesResponse, NewsResponse } from '$lib/types';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchCategories(): Promise<CategoriesResponse> {
  return fetchApi<CategoriesResponse>('/kite.json');
}

export async function fetchNewsByCategory(file: string): Promise<NewsResponse> {
  return fetchApi<NewsResponse>(`/${file}`);
} 