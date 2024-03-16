import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnAuthenticatedMenu() {
  const path_name = usePathname();

  const path = path_name.replace("/", "");
  return (
    <>
      <Link
        href={`/login?url_callback=${path}`}
        as={`/login?url_callback=${path}`}
        prefetch
      >
        <DropdownMenuItem className="py-3 cursor-pointer font-bold">
          <p>Login</p>
        </DropdownMenuItem>
      </Link>
      <Link
        href={`/signup?url_callback=${path}`}
        as={`/signup?url_callback=${path}`}
        prefetch
      >
        <DropdownMenuItem className="py-3 cursor-pointer">
          <p>Sign up</p>
        </DropdownMenuItem>
      </Link>
    </>
  );
}
