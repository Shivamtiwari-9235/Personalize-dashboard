"use client";

import { ReactNode } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

export default function InfiniteScroll({ children, onLoadMore, loading, hasMore }: InfiniteScrollProps) {
  const loaderRef = useInfiniteScroll({ onLoadMore, loading, hasMore });

  return (
    <div className="space-y-8">
      {children}
      {hasMore ? (
        <div ref={loaderRef} className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {loading ? "Loading more content..." : "Scroll down to load more content"}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          You’re all caught up.
        </div>
      )}
    </div>
  );
}
