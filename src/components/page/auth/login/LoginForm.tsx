import Spinner from "@/components/svg/loading/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url_callback = searchParams.get("url_callback");
  const redirect = searchParams.get("redirect");
  const [open, setOpen] = useState(false);
  const [form_data, setFormData] = useState({ email: "", password: "" });
  const [submit, setSubmit] = useState(false);
  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmit(true);

        const r = await signIn("credentials", {
          ...form_data,
          callbackUrl: `/${redirect}`!,
          redirect: !!redirect,
        });

        if (r?.error) {
          toast("Sign in Error", {
            description: r.error,
            action: {
              label: "ok",
              onClick: () => null,
            },
          });
          setSubmit(false);
          return;
        }
        toast("Log in successful", {
          description: "",
          action: {
            label: "ok",
            onClick: () => null,
          },
        });
        setSubmit(false);

        if (redirect) {
          router.push(`/${redirect}`);
          return;
        }

        router.push(!url_callback ? "/" : `${url_callback}`);
      }}
    >
      <Input
        placeholder="Email"
        className="h-10 sm:w-[20rem] text-base"
        value={form_data.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <span className="relative  flex">
        <Input
          placeholder="Password"
          type={open ? "text" : "password"}
          className="h-10 sm:w-[20rem] text-base"
          value={form_data.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <EyeIcon className="h-5 w-auto" />
          ) : (
            <EyeSlashIcon className="h-5 w-auto " />
          )}
        </span>
      </span>
      <Button type="submit" className="w-full">
        {submit ? <Spinner className="fill-background h-8 w-auto" /> : "Login"}
      </Button>
    </form>
  );
}
