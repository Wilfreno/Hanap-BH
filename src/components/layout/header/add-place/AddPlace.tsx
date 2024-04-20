import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AddPlace() {
  const path_name = usePathname();
  const { status } = useSession();
  let search_params = "";

  if (status === "unauthenticated") search_params += `?exit=${path_name}`;
  return (
    <Link
      href={`/hosting${search_params}`}
      as={`/hosting${search_params}`}
      prefetch={true}
      className="hidden lg:inline-flex mr-20"
    >
      <Button
        variant="ghost"
        className="p-0 rounded-full whitespace-nowrap font-bold text-muted-foreground text-sm px-1 hover:bg-transparent"
      >
        Add your place
      </Button>
    </Link>
  );
}
