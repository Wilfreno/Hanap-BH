"use client";

import Error408 from "@/components/page/error/Error408";
import Offline from "@/components/page/error/Offline";
import { useSearchParams } from "next/navigation";
export default function Template({ children }: { children: React.ReactNode }) {
 const search_params = useSearchParams();
 const error_params = search_params.get("error");
  if (error_params === "429") return <Error408 />;
  if (error_params === "offline") return <Offline />;
  return <div>{children}</div>;
}
