import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { Dispatch, SetStateAction } from "react";
import SignUpOTPContent from "./SignUpOTPContent";

export default function SignUpOTP({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const { first_name, last_name, email, birthday, password, confirm_password } =
    form_data;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          // disabled={
          //   first_name === "" ||
          //   last_name === "" ||
          //   email === "" ||
          //   !birthday.year ||
          //   !birthday.month ||
          //   !birthday.day ||
          //   password.length < 8 ||
          //   password !== confirm_password
          // }
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <SignUpOTPContent form_data={form_data} setFormData={setFormData} />
    </Dialog>
  );
}
