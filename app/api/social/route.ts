import { NextResponse } from "next/server";

const socialPosts = [
  {
    id: "social-1",
    title: "A smarter commute with new city transit updates",
    description: "Readers are sharing tips for cutting travel time and staying productive.",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
    source: "Community Feed",
    category: "general",
    publishedAt: "2026-06-02T07:55:00Z",
    url: "https://example.com/social/transit-updates",
  },
  {
    id: "social-2",
    title: "Designers swap favorites for modern workspace layouts",
    description: "A trending thread highlights which layouts help teams feel more connected.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    source: "Design Circle",
    category: "technology",
    publishedAt: "2026-05-31T11:20:00Z",
    url: "https://example.com/social/workspace-layouts",
  },
  {
    id: "social-3",
    title: "Cooking quick seasonal meals in under 30 minutes",
    description: "Home cooks are sharing easy recipes for busy weeknights.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    source: "Foodies",
    category: "health",
    publishedAt: "2026-05-29T17:25:00Z",
    url: "https://example.com/social/seasonal-meals",
  },
];

export function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Number(url.searchParams.get("pageSize") || "6");

  const start = (page - 1) * pageSize;
  const posts = socialPosts.slice(start, start + pageSize);

  return NextResponse.json({ posts });
}
