"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  query: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ query, onSearch, placeholder = "Search content..." }: SearchBarProps) {
  const [value, setValue] = useState(query);
  const debouncedValue = useDebounce(value, 350);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search content"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-brand-400 dark:focus:ring-brand-500/20"
      />
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 dark:text-slate-500">🔎</span>
    </div>
  );
}
