import React from "react";

export const useDebounce = (value, delay = 1000) => {
  const [debounceValue, setDebounceValue] = React.useState(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};
