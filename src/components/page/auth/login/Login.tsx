"use client";
import GoogleLogin from "./GoogleLogin";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const router = useRouter();
  const search_params = useSearchParams();
  const exit = search_params.get("exit");

  return (
    <Dialog
      defaultOpen
      onOpenChange={(e) =>
        e === false && router.replace(exit ? `${exit}` : "/")
      }
    >
      <DialogContent>
        <DialogHeader className="py-5 border-b">
          <DialogTitle className="text-center">Log in</DialogTitle>
        </DialogHeader>

        <div>
          <LoginForm />
          <span className="flex items-center w-full space-x-5">
            <hr className="h-[1px] w-1/2 bg-secondary" />
            <p>or</p>
            <hr className="h-[1px] w-1/2 bg-secondary" />
          </span>
          <GoogleLogin />
        </div>
        <DialogFooter className="w-full flex justify-center">
          <Button className="w-full" variant="secondary" asChild>
            <Link
              href={exit ? `/signup?exit=${exit}` : "/"}
              as={exit ? `/signup?exit=${exit}` : "/"}
              prefetch
              className="font-bold"
            >
              Create new account
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
