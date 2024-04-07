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
      className="items-center hidden lg:inline-flex whitespace-nowrap font-bold text-muted-foreground text-sm hover:drop-shadow-lg mr-20"
    >
      Add your place
    </Link>
  );
}
