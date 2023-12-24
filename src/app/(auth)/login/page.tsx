"use client";
import Login from "@/components/page/auth/login/Login";
import { useSearchParams } from "next/navigation";

export default function page() {
  const search_params = useSearchParams();
  const url_callback = search_params.get("url_callback");
  return (
    <section className="h-screen w-screen flex itmes-center justify-center">
      <Login callback="/" />
    </section>
  );
}
