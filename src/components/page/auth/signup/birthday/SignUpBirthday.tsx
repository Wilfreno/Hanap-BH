import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
 
  return (
    <div className="flex w-full items-center space-x-5">
      <span className="text-muted-foreground">Birthday</span>
      <SignUpBirthdayYear form_data={form_data} setFormData={setFormData} />
      <SignUpBirthdayMonth form_data={form_data} setFormData={setFormData} />
      <SignUpBirthdayDay form_data={form_data} setFormData={setFormData} />
    </div>
  );
}
