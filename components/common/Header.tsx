"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import SearchBar from "@/components/common/SearchBar";
import DarkModeToggle from "@/components/common/DarkModeToggle";
import { setSearchQuery } from "@/store/slices/userPreferencesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function Header() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.userPreferences.searchQuery);
  const darkMode = useAppSelector((state) => state.userPreferences.darkMode);

  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Personalized dashboard</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Your content home</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <DarkModeToggle />
            <Link
              href="/settings"
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Settings
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar query={searchQuery} onSearch={(value) => dispatch(setSearchQuery(value))} />
          <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            Welcome back, <span className="font-semibold">Ayesha</span> — your dashboard is ready.
          </div>
        </div>
      </div>
    </div>
  );
}
