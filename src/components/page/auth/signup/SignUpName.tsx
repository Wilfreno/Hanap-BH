import { Input } from "@/components/ui/input";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { Dispatch, SetStateAction } from "react";

export default function SignUpName({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  return (
    <div className="flex items-center justify-evenly space-x-2">
      <Input
        placeholder="First name"
        className="h-10  text-base"
        value={form_data.first_name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, first_name: e.target.value }))
        }
      />
      <Input
        placeholder="Last Name"
        className="h-10 text-base"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, last_name: e.target.value }))
        }
      />
    </div>
  );
}
