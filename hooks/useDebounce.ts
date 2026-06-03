"use client";

import { useEffect, useState } from "react";

export function useDebounce<ValueType>(value: ValueType, delay = 300): ValueType {
  const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
