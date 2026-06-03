"use client";

import DashboardShell from "@/components/common/DashboardShell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFavorite } from "@/store/slices/favoritesSlice";
import NewsCard from "@/components/cards/NewsCard";
import RecommendationCard from "@/components/cards/RecommendationCard";
import SocialCard from "@/components/cards/SocialCard";
import type { NewsArticle, RecommendationItem, SocialPost } from "@/types/content";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <DashboardShell title="Favorites" description="Review the content you’ve saved for later.">
      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-700 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Save articles, recommendations, and social posts to build your favorites list.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {favorites.map((item) => {
            if (item.type === "news") {
              return (
                <NewsCard
                  key={item.id}
                  article={item as NewsArticle}
                  favorited={true}
                  onToggleFavorite={() => dispatch(removeFavorite(item.id))}
                />
              );
            }
            if (item.type === "recommendation") {
              return (
                <RecommendationCard
                  key={item.id}
                  item={item as RecommendationItem}
                  favorited={true}
                  onToggleFavorite={() => dispatch(removeFavorite(item.id))}
                />
              );
            }
            return (
              <SocialCard
                key={item.id}
                post={item as SocialPost}
                favorited={true}
                onToggleFavorite={() => dispatch(removeFavorite(item.id))}
              />
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
