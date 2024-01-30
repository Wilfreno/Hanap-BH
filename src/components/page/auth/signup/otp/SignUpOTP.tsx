import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import SignUpOTPContent from "./SignUpOTPContent";
import Spinner from "@/components/svg/loading/Spinner";
import useHTTPRequest from "@/lib/hooks/useHTTPRequest";
import { toast } from "sonner";

export default function SignUpOTP({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [submit, setSubmit] = useState<boolean>(false);
  const submit_btn_ref = useRef<HTMLButtonElement>(null);
  const {
    first_name,
    last_name,
    email,
    gender,
    birthday,
    password,
    confirm_password,
  } = form_data;
  const http_request = useHTTPRequest();
  const [code, setCode] = useState<string>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={submit_btn_ref}
          className="w-full"
          type={submit ? "submit" : "button"}
          disabled={
            first_name === "" ||
            last_name === "" ||
            email === "" ||
            gender === "" ||
            !birthday.year ||
            !birthday.month ||
            !birthday.day ||
            password.length < 8 ||
            password !== confirm_password
          }
          onClick={async () => {
            if (!submit) {
              const r = await http_request.post("/api/email/otp", {
                email: form_data.email,
              });
              setCode(r.otp);
              toast("Verification code sent", {
                description: r.message,
                action: {
                  label: "ok",
                  onClick: () => null,
                },
              });
            }
          }}
        >
          {submit ? (
            <Spinner className="h-10 w-auto text-background" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </DialogTrigger>
      <SignUpOTPContent
        form_data={form_data}
        setFormData={setFormData}
        submit_btn_ref={submit_btn_ref}
        setSubmit={setSubmit}
        code={code!}
      />
    </Dialog>
  );
}
