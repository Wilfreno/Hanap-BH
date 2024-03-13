"use client";
import HostingPlaceName from "./HostingPlaceName";
import HostingAddress from "./HostingAddress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function HostingForm() {
  const searchParams = useSearchParams();
  const form_input = searchParams.get("form");
  const router = useRouter();
  const path_name = usePathname();

  if (!form_input) router.replace(`${path_name}?form=name`);
  return (
    <form className="bg-background p-5 h-full w-[100rem]">
      <AnimatePresence>
        {form_input === "name" && <HostingPlaceName />}
        {form_input === "address" && <HostingAddress />}{" "}
      </AnimatePresence>
    </form>
  );
}
