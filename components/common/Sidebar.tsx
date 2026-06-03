"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CATEGORY_OPTIONS } from "@/utils/constants";
import {
  addCategory,
  removeCategory,
} from "@/store/slices/userPreferencesSlice";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.userPreferences.selectedCategories
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(removeCategory(category));
    } else {
      dispatch(addCategory(category));
    }
  };

  return (
    <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 lg:block">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Explore</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Navigation</h2>
        </div>
        <nav className="space-y-2">
          {[
            { label: "Feed", href: "/dashboard/feed" },
            { label: "Trending", href: "/dashboard/trending" },
            { label: "Favorites", href: "/dashboard/favorites" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Categories</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const isActive = selectedCategories.includes(category);
              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? "border-brand-500 bg-brand-500/10 text-brand-700 dark:border-brand-400 dark:bg-brand-400/10 dark:text-brand-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
