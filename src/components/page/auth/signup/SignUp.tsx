"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SignUpName from "./SignUpName";
import SignUpEmail from "./SignUpEmail";
import SignUpBirthday from "./birthday/SignUpBirthday";
import SignUpPassword from "./SignUpPassword";
import SignUpOtp from "./otp/SignUpOTP";

export default function SignUp() {
  const [form_data, setFormData] = useState<SignUpFormDataType>({
    first_name: "",
    last_name: "",
    email: "",
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
  const search_params = useSearchParams();
  const url_callback = search_params.get("url_callback");
  return (
    <div>
      <Card>
        <CardHeader className="relative border-b">
          <CardTitle className="text-xl flex justify-center">Sign up</CardTitle>
          <XMarkIcon
            className="absolute h-7 right-2 top-0 cursor-pointer"
            onClick={() => router.push(!url_callback ? "/" : `${url_callback}`)}
          />
        </CardHeader>
        <CardContent className="py-10">
          <form
            action=""
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submit");
            }}
          >
            <SignUpName form_data={form_data} setFormData={setFormData} />
            <SignUpEmail form_data={form_data} setFormData={setFormData} />
            <SignUpBirthday form_data={form_data} setFormData={setFormData} />
            <SignUpPassword form_data={form_data} setFormData={setFormData} />
            <SignUpOtp form_data={form_data} setFormData={setFormData} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
