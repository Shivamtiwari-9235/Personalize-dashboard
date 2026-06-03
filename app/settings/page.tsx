"use client";

import { useMemo } from "react";
import DashboardShell from "@/components/common/DashboardShell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CATEGORY_OPTIONS } from "@/utils/constants";
import {
  toggleDarkMode,
  setItemsPerPage,
  setLanguage,
  addCategory,
  removeCategory,
} from "@/store/slices/userPreferencesSlice";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { darkMode, selectedCategories, itemsPerPage, language } = useAppSelector(
    (state) => state.userPreferences
  );

  const categoryStatus = useMemo(
    () => CATEGORY_OPTIONS.map((category) => ({ category, active: selectedCategories.includes(category) })),
    [selectedCategories]
  );

  return (
    <DashboardShell title="Settings" description="Manage your preferences, themes, and content filters.">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Display settings</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Dark mode</p>
              <button
                type="button"
                onClick={() => dispatch(toggleDarkMode())}
                className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                {darkMode ? "Disable dark mode" : "Enable dark mode"}
              </button>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Items per page</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[6, 8, 10, 12].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => dispatch(setItemsPerPage(count))}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      itemsPerPage === count
                        ? "bg-brand-600 text-white"
                        : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Content filters</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Choose the categories that matter most to you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {categoryStatus.map(({ category, active }) => (
              <button
                key={category}
                type="button"
                onClick={() => dispatch(active ? removeCategory(category) : addCategory(category))}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-brand-500 bg-brand-500/10 text-brand-700"
                    : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">General preferences</h3>
          <div className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Current language: <span className="font-semibold text-slate-900 dark:text-white">{language}</span>
            </p>
            <p>
              Current categories: <span className="font-semibold text-slate-900 dark:text-white">{selectedCategories.join(", ")}</span>
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
