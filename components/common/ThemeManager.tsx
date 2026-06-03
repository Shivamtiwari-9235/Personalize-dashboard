"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export default function ThemeManager() {
  const darkMode = useAppSelector((state) => state.userPreferences.darkMode);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
}
