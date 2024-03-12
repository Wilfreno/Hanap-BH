import { ThemeToggler } from "@/components/ThemeToggler";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Fullscreen from "../../Fullscreen";
import { signOut, useSession } from "next-auth/react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import UnAuthenticatedMenu from "./UnAuthenticatedMenu";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function MenuContent() {
  const [width, setWidth] = useState<number>();

  const { status } = useSession();

  useEffect(() => {
    setWidth(window.innerWidth);

    function resizeHandler() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <DropdownMenuContent
      className="mx-3 space-y-1 w-[95svw] md:w-[18rem]"
      align={width! < 640 ? "end" : "center"}
      sideOffset={width! < 640 ? 65 : 10}
    >
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
