import apiClient from "./apiClient";
import type { RecommendationItem } from "@/types/content";

interface RecommendationResponse {
  items: RecommendationItem[];
}

export async function fetchRecommendations(page = 1, pageSize = 6): Promise<RecommendationItem[]> {
  const response = (await apiClient.get<RecommendationResponse>(`/api/recommendations?page=${page}&pageSize=${pageSize}`)) as unknown as RecommendationResponse;
  return response.items;
}
