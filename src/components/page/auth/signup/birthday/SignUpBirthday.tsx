import { SignUpFormDataType } from "@/lib/types/auth-types";
import { Dispatch, SetStateAction } from "react";
import SignUpBirthdayYear from "./SignUpBirthdayYear";
import SignUpBirthdayMonth from "./SignUpBirthdayMonth";
import SignUpBirthdayDay from "./SignUpBirthdayDay";

export default function SignUpBirthday({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const bd = new Date(
    `${form_data.birthday.month} ${form_data.birthday.day}, ${form_data.birthday.year}`
  );
  const date_now = new Date();
  const age = (date_now.getTime() - bd.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return (
    <>
      <div className="flex w-full items-center space-x-5">
        <span className="text-muted-foreground">Birthday</span>
        <SignUpBirthdayYear form_data={form_data} setFormData={setFormData} />
        <SignUpBirthdayMonth form_data={form_data} setFormData={setFormData} />
        <SignUpBirthdayDay form_data={form_data} setFormData={setFormData} />
      </div>
      {age < 18 && (
        <p className="text-red-600 text-xs mx-auto w-full flex justify-center">
          user must not be under 18
        </p>
      )}
    </>
  );
}
