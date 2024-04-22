"use client";

import { SignUpFormDataType } from "@/lib/types/auth-types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SignUpName from "./SignUpName";
import SignUpEmail from "./SignUpEmail";
import SignUpBirthday from "./birthday/SignUpBirthday";
import SignUpPassword from "./SignUpPassword";
import SignUpOtp from "./otp/SignUpOTP";
import UseHTTPRequest from "@/components/hooks/useHTTPRequest";
import SignUPGender from "./SignUPGender";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SignUp() {
  const [form_data, setFormData] = useState<SignUpFormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    birthday: {
      year: undefined,
      day: undefined,
      month: undefined,
    },
    password: "",
    confirm_password: "",
    otp: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const exit = searchParams.get("exit");
  const url_callback = searchParams.get("url_callback");

  const http_request = UseHTTPRequest();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(e) =>
        e === false && router.replace(exit && exit !== "null" ? exit : "/")
      }
    >
      <DialogContent className="w-[95vw] sm:w-fit space-y-5 rounded-lg justify-center">
        <DialogHeader className="border-b py-5">
          <DialogTitle className="text-xl text-center">Sign up</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();

            const r = await http_request.post("/api/user", form_data);

            if (r.status === "CONFLICT")
              router.push(`/login?exit=${exit ? exit : ""}`);
            if (r.status !== "OK") return;

            const sign_in_promise = await signIn("credentials", {
              email: form_data.email,
              password: form_data.password,
              callbackUrl: `/${url_callback}`,
              url_callback: !!url_callback,
            });

            if (sign_in_promise?.error) {
              toast("Sign in Error", {
                description: sign_in_promise.error,
                action: {
                  label: "ok",
                  onClick: () => null,
                },
              });
              router.push(`/login?exit=${exit ? exit : ""}`);
              return;
            }

            toast("Sign up successful", {
              description: r.message,
              action: {
                label: "ok",
                onClick: () => null,
              },
            });
            if (url_callback) {
              router.push(url_callback);
              return;
            }
            router.push(exit ? exit : "");
          }}
        >
          <SignUpName form_data={form_data} setFormData={setFormData} />
          <SignUpEmail form_data={form_data} setFormData={setFormData} />
          <SignUpBirthday form_data={form_data} setFormData={setFormData} />
          <SignUPGender form_data={form_data} setFormData={setFormData} />
          <SignUpPassword form_data={form_data} setFormData={setFormData} />
          <SignUpOtp form_data={form_data} setFormData={setFormData} />
        </form>
        <DialogFooter className="text-center justify-self-center ">
          <p>Alread have an account ?</p>
          <Link
            href={exit ? `/login?exit=${exit}` : "/"}
            as={exit ? `/login?exit=${exit}` : "/"}
            prefetch
            className="font-bold mx-3"
          >
            Login
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
