"use client";

export default function useSessionStorage() {
  return {
    get: (k: string): string | Record<string, unknown> | unknown[] | null => {
      const session = sessionStorage.getItem(k);
      try {
        const object = JSON.parse(session!);
        return object === "null" ? null : object;
      } catch (e) {
        return session === "null" ? null : session;
      }
    },
    set: (key: string, value: string | Record<string, unknown> | unknown[]) => {
      try {
        const v = JSON.stringify(value);
        sessionStorage.setItem(key, v);
        return value;
      } catch (error) {
        sessionStorage.setItem(key, value as string);
        return value;
      }
    },
  };
}
