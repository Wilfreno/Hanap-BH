import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchParamsGenerator() {
  const searchParams = useSearchParams();
  const path_name = usePathname();
  const router = useRouter();
  return {
    generate: (key: string, value: string) => {
      let params = "";
      for (const [k, v] of searchParams.entries()) {
        if (k !== key) params += `&${k}=${v}`;
      }
      if (value) params += `&${key}=${value}`;
      router.push(`${path_name}?${params.replace("&", "")}`);
    },
  };
}
