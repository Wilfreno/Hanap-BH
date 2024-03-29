import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnAuthenticatedMenu() {
  const path_name = usePathname();

  const path = path_name.replace("/", "");
  return (
    <>
      <Link href={`/login?exit=${path}`} as={`/login?exit=${path}`} prefetch>
        <DropdownMenuItem className="py-3 cursor-pointer font-bold">
          <p>Login</p>
        </DropdownMenuItem>
      </Link>
      <Link href={`/signup?exit=${path}`} as={`/signup?exit=${path}`} prefetch>
        <DropdownMenuItem className="py-3 cursor-pointer">
          <p>Sign up</p>
        </DropdownMenuItem>
      </Link>
    </>
  );
}
