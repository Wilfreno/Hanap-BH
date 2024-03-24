"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SignUpName from "./SignUpName";
import SignUpEmail from "./SignUpEmail";
import SignUpBirthday from "./birthday/SignUpBirthday";
import SignUpPassword from "./SignUpPassword";
import SignUpOtp from "./otp/SignUpOTP";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import SignUPGender from "./SignUPGender";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUp() {
  const [form_data, setFormData] = useState<SignUpFormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    birthday: {
      year: undefined,
      month: undefined,
      day: undefined,
    },
    password: "",
    confirm_password: "",
    otp: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const exit = searchParams.get("exit");
  const url_callback = searchParams.get("url_callback");

  const http_request = useHTTPRequest();

  return (
    <Card className="w-full h-full sm:h-auto sm:w-auto">
      <CardHeader className="relative border-b">
        <CardTitle className="text-xl flex justify-center">Sign up</CardTitle>
        <XMarkIcon
          className="absolute h-7 right-2 top-0 cursor-pointer"
          onClick={() => router.push(!exit ? "/" : `${exit}`)}
        />
      </CardHeader>
      <CardContent className="py-10">
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
      </CardContent>
      <CardFooter className="w-full flex justify-center">
        Alread have an account ?
        <Link
          href={exit ? `/login?exit=${exit}` : "/"}
          as={exit ? `/login?exit=${exit}` : "/"}
          prefetch
          className="font-bold mx-3"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
