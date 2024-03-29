import { Input } from "@/components/ui/input";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { Dispatch, SetStateAction } from "react";

export default function SignUpEmail({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  return (
    <Input
      autoComplete="on"
      placeholder="Email"
      className="h-10 w-full text-base"
      type="email"
      value={form_data.email}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, email: e.target.value }))
      }
    />
  );
}
