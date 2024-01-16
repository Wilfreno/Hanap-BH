import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "@/components/ThemeToggler";
import Fullscreen from "../Fullscreen";

export default function Menu() {
  const path_name = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="ml-3 hover:bg-secondary md:ml-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-transparent">
            <UserCircleIcon className="w-auto h-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3 my-2 space-y-1 text-lg w-[95vw] md:w-[18rem] ">
        <DropdownMenuItem className="py-3 text-base cursor-pointer">
          <Link
            href={`/login?url_callback=${path_name}`}
            as={`/login?url_callback=${path_name}`}
            prefetch
          >
            <p className="font-bold">Log in</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 text-base cursor-pointer">
          <p>Sign up</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-3 text-base cursor-pointer">
          <p>Add Your Bouarding House</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 text-base cursor-pointer">
          <p>FAQ</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 text-base cursor-pointer">
          <p>Terms of Service</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggler />
        <DropdownMenuSeparator className="md:hidden" />
        <Fullscreen />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
