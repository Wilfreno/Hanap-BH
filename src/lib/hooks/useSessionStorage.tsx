"use client";

import { useEffect, useState } from "react";

export default function useSessionStorage() {
  const [session_value, setValue] = useState<string | Record<string, any>>();
  return {
    get: (k: string) => {
      const session = sessionStorage.getItem(k);
      if (!session) return session_value;
      try {
        const object = JSON.parse(session!);
        setValue(object);
        return session_value;
      } catch (e) {
        setValue(session);
        return session_value;
      }
    },
    set: (key: string, value: string | Record<string, any>) => {
      try {
        const v = JSON.stringify(value);
        sessionStorage.setItem(key, v);
        setValue(value);
        return session_value;
      } catch (error) {
        sessionStorage.setItem(key, value as string);
        setValue(value);
        return session_value;
      }
    },
  };
}
