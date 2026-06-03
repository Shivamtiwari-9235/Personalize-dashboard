"use client";

import { useEffect } from "react";
import DashboardShell from "@/components/common/DashboardShell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTrendingAsync } from "@/store/slices/contentSlice";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import NewsCard from "@/components/cards/NewsCard";
import RecommendationCard from "@/components/cards/RecommendationCard";
import SocialCard from "@/components/cards/SocialCard";
import type { NewsArticle, RecommendationItem, SocialPost } from "@/types/content";

export default function TrendingPage() {
  const dispatch = useAppDispatch();
  const { trending, loading, error } = useAppSelector((state) => state.content);

  useEffect(() => {
    if (trending.length === 0 && !loading) {
      dispatch(fetchTrendingAsync());
    }
  }, [dispatch, loading, trending.length]);

  if (loading && trending.length === 0) {
    return (
      <DashboardShell title="Trending">
        <LoadingSpinner />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Trending" description="Trending picks from across your feed and recommendations.">
      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      ) : trending.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No trending content available right now.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {trending.map((item) => {
            if (item.type === "news") {
              return (
                <NewsCard
                  key={item.id}
                  article={item as NewsArticle}
                  favorited={false}
                  onToggleFavorite={() => undefined}
                />
              );
            }
            if (item.type === "recommendation") {
              return (
                <RecommendationCard
                  key={item.id}
                  item={item as RecommendationItem}
                  favorited={false}
                  onToggleFavorite={() => undefined}
                />
              );
            }
            return (
              <SocialCard
                key={item.id}
                post={item as SocialPost}
                favorited={false}
                onToggleFavorite={() => undefined}
              />
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
