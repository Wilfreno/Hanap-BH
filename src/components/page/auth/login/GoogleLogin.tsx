import Image from "next/image";
import googleImg from "../../../../../public/icons/social-media/google-color-svgrepo-com.svg";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function GoogleLogin({ callback }: { callback: string }) {
  return (
    <Button
      // onClick={() => signIn("google", { callbackUrl: callback })}
      variant="outline"
      className="w-full h-10 space-x-5"
    >
      <Image src={googleImg} alt="GOOGLE" className="h-8 w-auto" />
      <p className="text-base font-semibold">Login with GOOGLE</p>
    </Button>
  );
}
