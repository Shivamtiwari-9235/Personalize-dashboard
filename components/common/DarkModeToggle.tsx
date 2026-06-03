"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/userPreferencesSlice";

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.userPreferences.darkMode);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label="Toggle dark mode"
      className="flex h-11 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <span className="text-brand-700 dark:text-brand-300">{darkMode ? "🌙" : "☀️"}</span>
      <span>{darkMode ? "Dark" : "Light"}</span>
    </button>
  );
}
