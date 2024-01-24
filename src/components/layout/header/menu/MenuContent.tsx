import { ThemeToggler } from "@/components/ThemeToggler";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Fullscreen from "../Fullscreen";
import { usePathname, useRouter } from "next/navigation";

export default function MenuContent() {
  const path_name = usePathname();
  const router = useRouter();
  const path = path_name.replace("/", "");
  return (
    <DropdownMenuContent className="mx-3 my-2 space-y-1 text-lg w-[95vw] md:w-[18rem] ">
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
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>Add Your Bouarding House</p>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>FAQ</p>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>Terms of Service</p>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <ThemeToggler />
      <DropdownMenuSeparator className="md:hidden" />
      <Fullscreen />
    </DropdownMenuContent>
  );
}
