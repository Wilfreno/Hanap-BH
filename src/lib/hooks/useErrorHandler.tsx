import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useErrorHandler() {
  const [error, useError] = useState<number>();
  const router = useRouter();
  const path_name = usePathname();

  useEffect(() => {
    if (error !== undefined) router.push(`${path_name}?error=${error}`);
  }, [error]);
  return {
    errorHandler: (e: number) => {
      useError(e);
    },
  };
}
