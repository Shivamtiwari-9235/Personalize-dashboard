"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNews,
  fetchRecommendationsAsync,
  fetchSocialAsync,
  setCurrentPage,
} from "@/store/slices/contentSlice";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import type { NewsArticle, RecommendationItem, SocialPost } from "@/types/content";
import InfiniteScroll from "@/components/feed/InfiniteScroll";
import DragDropContainer from "@/components/feed/DragDropContainer";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import NewsCard from "@/components/cards/NewsCard";
import RecommendationCard from "@/components/cards/RecommendationCard";
import SocialCard from "@/components/cards/SocialCard";

export default function ContentFeed() {
  const dispatch = useAppDispatch();
  const { newsArticles, recommendations, socialPosts, loading, error, currentPage } =
    useAppSelector((state) => state.content);
  const { selectedCategories, searchQuery, itemsPerPage } = useAppSelector(
    (state) => state.userPreferences
  );
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const favoriteIds = useMemo(() => favoriteItems.map((item) => item.id), [favoriteItems]);

  const selectedCategory = selectedCategories[0] ?? "general";
  const content = useMemo<(NewsArticle | RecommendationItem | SocialPost)[]>(
    () => [...newsArticles, ...recommendations, ...socialPosts] as (NewsArticle | RecommendationItem | SocialPost)[],
    [newsArticles, recommendations, socialPosts]
  );

  const filteredContent = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return content;
    return content.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const description = item.description?.toLowerCase() ?? "";
      const category = item.category?.toLowerCase() ?? "";
      return title.includes(query) || description.includes(query) || category.includes(query);
    });
  }, [content, searchQuery]);

  useEffect(() => {
    if (content.length === 0 && !loading) {
      dispatch(setCurrentPage(1));
      dispatch(fetchNews({ category: selectedCategory, page: 1, pageSize: itemsPerPage }));
      dispatch(fetchRecommendationsAsync({ page: 1, pageSize: itemsPerPage }));
      dispatch(fetchSocialAsync({ page: 1, pageSize: itemsPerPage }));
    }
  }, [content.length, dispatch, itemsPerPage, loading, selectedCategory]);

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    if (!loading && nextPage <= 4) {
      dispatch(setCurrentPage(nextPage));
      dispatch(fetchNews({ category: selectedCategory, page: nextPage, pageSize: itemsPerPage }));
    }
  }, [currentPage, dispatch, itemsPerPage, loading, selectedCategory]);

  const handleFavoriteToggle = useCallback(
    (item: { id: string; title: string; type?: string; description?: string; image?: string; url?: string; category?: string }) => {
      if (favoriteIds.includes(item.id)) {
        dispatch(removeFavorite(item.id));
      } else {
        dispatch(addFavorite(item));
      }
    },
    [dispatch, favoriteIds]
  );

  const handleReorder = useCallback(
    () => {
      // Visual reordering is enabled through drag-and-drop, but persisted ordering is not stored.
    },
    [],
  );

  const hasMore = currentPage < 4;

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (loading && currentPage === 1 && content.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Your personalized feed</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Discover handpicked news, recommendations, and social posts based on your preferences.
            </p>
          </div>

          <DragDropContainer
            items={filteredContent}
            onReorder={handleReorder}
            renderItem={(item) => {
              if (item.type === "news") {
                return (
                  <NewsCard
                    article={item}
                    favorited={favoriteIds.includes(item.id)}
                    onToggleFavorite={() => handleFavoriteToggle(item)}
                  />
                );
              }

              if (item.type === "recommendation") {
                return (
                  <RecommendationCard
                    item={item}
                    favorited={favoriteIds.includes(item.id)}
                    onToggleFavorite={() => handleFavoriteToggle(item)}
                  />
                );
              }

              return (
                <SocialCard
                  post={item}
                  favorited={favoriteIds.includes(item.id)}
                  onToggleFavorite={() => handleFavoriteToggle(item)}
                />
              );
            }}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Feed highlights</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Personalization is powered by your selected categories and trending stories.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Category: {selectedCategory}
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Search filter: {searchQuery || "None"}
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Saved items: {favoriteIds.length}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Content overview</h3>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400">News articles</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{newsArticles.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Recommendations</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{recommendations.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Social posts</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{socialPosts.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfiniteScroll onLoadMore={handleLoadMore} loading={loading} hasMore={hasMore}>
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredContent.map((item) => {
            if (item.type === "news") {
              return (
                <NewsCard
                  key={item.id}
                  article={item}
                  favorited={favoriteIds.includes(item.id)}
                  onToggleFavorite={() => handleFavoriteToggle(item)}
                />
              );
            }

            if (item.type === "recommendation") {
              return (
                <RecommendationCard
                  key={item.id}
                  item={item}
                  favorited={favoriteIds.includes(item.id)}
                  onToggleFavorite={() => handleFavoriteToggle(item)}
                />
              );
            }

            return (
              <SocialCard
                key={item.id}
                post={item}
                favorited={favoriteIds.includes(item.id)}
                onToggleFavorite={() => handleFavoriteToggle(item)}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
}
