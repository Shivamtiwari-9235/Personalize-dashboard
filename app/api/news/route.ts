import { NextResponse } from "next/server";

const newsItems = [
  {
    id: "news-1",
    title: "Global innovation summit sets new sustainability goals",
    description: "Leaders from technology and policy gather to accelerate climate-friendly breakthroughs.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    source: "Global News",
    category: "technology",
    publishedAt: "2026-06-03T08:30:00Z",
    url: "https://example.com/news/innovation-summit",
  },
  {
    id: "news-2",
    title: "Business recovery hits a new milestone after stimulus package",
    description: "Small enterprises report improved cash flow as consumer confidence returns.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    source: "Market Pulse",
    category: "business",
    publishedAt: "2026-06-02T14:20:00Z",
    url: "https://example.com/news/business-recovery",
  },
  {
    id: "news-3",
    title: "Breakthrough renewable battery technology reaches pilot stage",
    description: "Engineers say the new cells will power devices more efficiently and last longer.",
    image: "https://images.unsplash.com/photo-1491933387008-3d1f3e8db9f0?auto=format&fit=crop&w=900&q=80",
    source: "Tech Daily",
    category: "science",
    publishedAt: "2026-06-01T09:45:00Z",
    url: "https://example.com/news/battery-tech",
  },
  {
    id: "news-4",
    title: "Sports analytics driving smarter training strategies",
    description: "Teams embrace data-driven approaches to improve player performance and reduce injuries.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    source: "Sports Today",
    category: "sports",
    publishedAt: "2026-05-31T12:10:00Z",
    url: "https://example.com/news/sports-analytics",
  },
  {
    id: "news-5",
    title: "Healthy meal plans gain popularity among city professionals",
    description: "Nutrition experts highlight convenience and long-term wellness benefits.",
    image: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80",
    source: "Wellness Weekly",
    category: "health",
    publishedAt: "2026-05-30T18:05:00Z",
    url: "https://example.com/news/healthy-meals",
  },
];

export function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") || "general";
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Number(url.searchParams.get("pageSize") || "8");

  const filtered = newsItems.filter(
    (item) => category === "general" || item.category === category
  );

  const start = (page - 1) * pageSize;
  const articles = filtered.slice(start, start + pageSize);

  return NextResponse.json({ articles });
}
