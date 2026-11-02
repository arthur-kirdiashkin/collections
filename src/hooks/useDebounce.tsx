import { useEffect, useState } from "react";

export const useDebounce = (state: string, delay: number) => {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [state, delay]);

  return debouncedState;
};
