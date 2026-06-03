import { NextResponse } from "next/server";

const recommendationItems = [
  {
    id: "rec-1",
    title: "Top 10 documentary picks for curious minds",
    description: "Handpicked streaming content to help you stay informed and inspired.",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=900&q=80",
    source: "Cinema & Culture",
    category: "entertainment",
    publishedAt: "2026-06-01T10:15:00Z",
    url: "https://example.com/recommendations/documentaries",
  },
  {
    id: "rec-2",
    title: "Music playlists that help you focus and create",
    description: "A set of energetic and ambient tracks curated for work and creativity.",
    image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=80",
    source: "Sound Lab",
    category: "technology",
    publishedAt: "2026-05-30T08:10:00Z",
    url: "https://example.com/recommendations/focus-playlist",
  },
  {
    id: "rec-3",
    title: "Weekend workshop: building better personal productivity systems",
    description: "Learn the habits that high-performing teams use to stay aligned and productive.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    source: "Learning Hub",
    category: "business",
    publishedAt: "2026-05-29T16:35:00Z",
    url: "https://example.com/recommendations/productivity",
  },
  {
    id: "rec-4",
    title: "Creative hobbies to refresh your evenings",
    description: "Simple ideas for painting, journaling, and digital creation that fit any schedule.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    source: "Lifestyle Guide",
    category: "health",
    publishedAt: "2026-05-28T14:00:00Z",
    url: "https://example.com/recommendations/evening-hobbies",
  },
];

export function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Number(url.searchParams.get("pageSize") || "6");

  const start = (page - 1) * pageSize;
  const items = recommendationItems.slice(start, start + pageSize);

  return NextResponse.json({ items });
}
