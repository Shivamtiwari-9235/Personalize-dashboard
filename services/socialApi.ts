import apiClient from "./apiClient";
import type { SocialPost } from "@/types/content";

interface SocialResponse {
  posts: SocialPost[];
}

export async function fetchSocialPosts(page = 1, pageSize = 6): Promise<SocialPost[]> {
  const response = (await apiClient.get<SocialResponse>(`/api/social?page=${page}&pageSize=${pageSize}`)) as unknown as SocialResponse;
  return response.posts;
}
