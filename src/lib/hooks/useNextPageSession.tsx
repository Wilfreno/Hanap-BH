import { useEffect, useState } from "react";

export default function useNextPageSession() {
  const [token, setToken] = useState<string | null>();
  function getToken() {
    const session_data = sessionStorage.getItem("NextPageToken");
    if (session_data) setToken(JSON.parse(session_data));
    else setToken(session_data);
    return token;
  }
  useEffect(() => {}, []);
  return {
    save: (t: string) => {
      setToken(t);
      sessionStorage.setItem("NextPageToken", JSON.stringify(t));
    },
    token,
  };
}
