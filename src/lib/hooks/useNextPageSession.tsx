import { useEffect, useState } from "react";

export default function useNextPageSession() {
  const [token, setToken] = useState<string | null>();
  return {
    saveToken: (t: string) => {
      setToken(t);
      sessionStorage.setItem("NextPageToken", JSON.stringify(t));
    },
    getToken: () => {
      const session_data = sessionStorage.getItem("NextPageToken");
      if (session_data) return JSON.parse(session_data);
      return session_data;
    },
  };
}
