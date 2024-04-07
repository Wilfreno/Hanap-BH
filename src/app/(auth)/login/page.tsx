import Login from "@/components/page/auth/login/Login";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
