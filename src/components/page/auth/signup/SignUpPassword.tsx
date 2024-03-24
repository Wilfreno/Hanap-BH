import { Input } from "@/components/ui/input";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

export default function SignUpPassword({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [see_password, setSeePassword] = useState([false, false]);

  return (
    <>
      <div>
        <div className="flex relative w-full">
          <Input
            minLength={8}
            placeholder="Passsword"
            className="h-10 text-base md:w-full"
            type={see_password[0] ? "text" : "password"}
            value={form_data.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setSeePassword((prev) => [!prev[0], prev[1]])}
          >
            {see_password[0] ? (
              <EyeIcon className="h-5 w-auto" />
            ) : (
              <EyeSlashIcon className="h-5 w-auto " />
            )}
          </span>
        </div>
        {form_data.password !== "" && form_data.password.length < 8 && (
          <p className="text-red-600 text-xs my-2">
            Password must be atleast 8 characters long
          </p>
        )}
      </div>
      <div>
        <div className="flex relative w-full">
          <Input
            minLength={8}
            placeholder="Confirm Password"
            className={`h-10  text-base md:w-full ${
              form_data.confirm_password !== "" &&
              form_data.confirm_password !== form_data.password
                ? "border-destructive focus-visible:ring-destructive "
                : ""
            }`}
            type={see_password[1] ? "text" : "password"}
            value={form_data.confirm_password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirm_password: e.target.value,
              }))
            }
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setSeePassword((prev) => [prev[0], !prev[1]])}
          >
            {see_password[1] ? (
              <EyeIcon className="h-5 w-auto" />
            ) : (
              <EyeSlashIcon className="h-5 w-auto " />
            )}
          </span>
        </div>
        {form_data.confirm_password !== "" &&
          form_data.confirm_password !== form_data.password && (
            <p className="text-red-600 text-xs my-2">
              Password does not match.
            </p>
          )}
      </div>
    </>
  );
}
