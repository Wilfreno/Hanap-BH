import Image from "next/image";
import googleImg from "../../../../../public/icons/social-media/google-color-svgrepo-com.svg";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/svg/loading/Spinner";
import { useState } from "react";

export default function GoogleLogin() {
  const [clicked, setClicked] = useState(false);
  const search_params = useSearchParams();
  const url_callback = search_params.get("url_callback");
  const { status } = useSession();
  if (status === "authenticated") {
    toast("Log in successful", {
      description: "",
      action: {
        label: "ok",
        onClick: () => null,
      },
    });
  }
  return (
    <Button
      onClick={async () => {
        setClicked(true);
        const r = await signIn("google", {
          callbackUrl: `/${url_callback}`!,
          url_callback: !!url_callback,
        });
        if (r?.error) {
          toast("Sign in Error", {
            description: r.error,
            action: {
              label: "ok",
              onClick: () => null,
            },
          });
          return;
        }
      }}
      variant="outline"
      className="w-full h-10 space-x-5"
      disabled={clicked}
    >
      {clicked ? (
        <Spinner className="h-5 w-auto fill-primary" />
      ) : (
        <>
          <Image src={googleImg} alt="GOOGLE" className="h-8 w-auto" />
          <p className="text-base font-semibold">Login with GOOGLE</p>
        </>
      )}
    </Button>
  );
}
