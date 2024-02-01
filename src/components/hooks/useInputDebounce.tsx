import { useEffect, useState } from "react";

export default function useInputDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}
