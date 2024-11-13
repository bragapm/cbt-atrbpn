import { useState, useEffect } from "react";

interface UseDebounceSearchProps {
  value: string;
  delay?: number;
}

export const useDebounceSearch = ({
  value,
  delay = 500,
}: UseDebounceSearchProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
