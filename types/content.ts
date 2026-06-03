export type ContentType = "news" | "recommendation" | "social";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  type: ContentType;
}

export interface NewsArticle extends Omit<ContentItem, "type"> {
  type: "news";
}

export interface RecommendationItem extends Omit<ContentItem, "type"> {
  type: "recommendation";
}

export interface SocialPost extends Omit<ContentItem, "type"> {
  type: "social";
}
