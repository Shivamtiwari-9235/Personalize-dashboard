"use client";

import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

export function useInfiniteScroll({ onLoadMore, loading, hasMore }: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const node = observerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onLoadMore();
          }
        });
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);

  return observerRef;
}
