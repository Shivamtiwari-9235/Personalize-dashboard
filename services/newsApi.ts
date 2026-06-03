import apiClient from "./apiClient";
import type { NewsArticle } from "@/types/content";

interface NewsResponse {
  articles: NewsArticle[];
}

export async function fetchNewsByCategory(category: string, page = 1, pageSize = 8): Promise<NewsArticle[]> {
  const response = (await apiClient.get<NewsResponse>(`/api/news?category=${category}&page=${page}&pageSize=${pageSize}`)) as unknown as NewsResponse;
  return response.articles;
}
