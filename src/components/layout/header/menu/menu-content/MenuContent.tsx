import { ThemeToggler } from "@/components/ThemeToggler";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Fullscreen from "../../Fullscreen";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import UnAuthenticatedMenu from "./UnAuthenticatedMenu";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function MenuContent() {
  const { status } = useSession();
  return (
    <DropdownMenuContent className="mx-3 my-2 space-y-1 w-[95vw] md:w-[18rem] ">
      {status === "authenticated" ? (
        <AuthenticatedMenu />
      ) : (
        <UnAuthenticatedMenu />
      )}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>Add Your Bouarding House</p>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>Help</p>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 cursor-pointer">
        <p>Terms of Service</p>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <ThemeToggler />
      <DropdownMenuSeparator className="md:hidden" />
      <Fullscreen />
      {status === "authenticated" && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="py-2 cursor-pointer flex items-center justify-center font-bold"
            onClick={() => signOut({ redirect: false })}
          >
            Log Out <ArrowRightEndOnRectangleIcon className="h-5 w-auto mx-3" />
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );
}
