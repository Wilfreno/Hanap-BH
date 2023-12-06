"use client";

import Login from "@/components/page/auth/login/Login";
import Error429 from "@/components/page/error/Error429";
import Offline from "@/components/page/error/Offline";
import { useSearchParams } from "next/navigation";
export default function Template({ children }: { children: React.ReactNode }) {
  const search_params = useSearchParams();
  const error_params = search_params.get("error");
  const login = search_params.get("login");
  const signup = search_params.get("signup");
  const url_callback = search_params.get("url_callback");
  if (error_params === "429") return <Error429 />;
  if (error_params === "offline") return <Offline />;
  return (
    <>
      {login === "true" || signup === "true" ? (
        <Login callback={url_callback!} />
      ) : null}
      {children}
    </>
  );
}
