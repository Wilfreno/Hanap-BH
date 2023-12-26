import { useEffect, useState } from "react";

export default function useLocalStorage(name: string) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const local_data = localStorage.getItem(name);
    if (local_data && local_data !== "" && local_data !== "undefined")
      setData(JSON.parse(local_data!) || local_data);
  }, []);
  return {
    data,
    save: (value: any) => {
      setData(value);
      localStorage.setItem(name, JSON.stringify(value));
    },
  };
}
