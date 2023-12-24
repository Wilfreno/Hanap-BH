import { useEffect, useState } from "react";

export default function useNextPageSession() {
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    sessionStorage.setItem("NextPageToken", JSON.stringify(""));

    const session_data = sessionStorage.getItem("NextPageToken");

    if (session_data && session_data !== "") {
      setToken(JSON.parse(session_data));
    }
  }, []);
  return {
    saveToken: (t: string) => {
      setToken(t);
      sessionStorage.setItem("NextPageToken", JSON.stringify(t));
    },
    token_session: token,
  };
}
