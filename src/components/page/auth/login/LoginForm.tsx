import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  return (
    <form className="space-y-5">
      <Input placeholder="Email" className="h-10 md:w-[25vw] text-base" />
      <span className="relative  flex">
        <Input
          placeholder="Password"
          type="password"
          className="h-10 md:w-[25vw] text-base"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          {open ? (
            <EyeIcon className="h-5 w-auto" />
          ) : (
            <EyeSlashIcon className="h-5 w-auto " />
          )}
        </span>
      </span>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
