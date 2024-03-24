import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import React, { Dispatch, SetStateAction, useState } from "react";

export default function SignUPGender({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [selected, setSelected] = useState("");
  return (
    <>
      <div className="flex items-center w-full justify-between">
        <p className=" text-muted-foreground sm:mr-5">Gender</p>
        <RadioGroup
          className="flex grow justify-between text-muted-foreground ml-2"
          onValueChange={(e) => {
            setFormData((prev) => ({ ...prev, gender: e }));
            setSelected(e);
          }}
        >
          <div
            className={`flex items-center border rounded-md p-2 sm:p-2 text-base space-x-1 sm:space-x-2 bg-secondary`}
          >
            <RadioGroupItem value="Male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>{" "}
          <div
            className={`flex items-center border rounded-md p-2 sm:p-3 text-base space-x-1 sm:space-x-2 bg-secondary`}
          >
            <RadioGroupItem value="Female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>{" "}
          <div
            className={`flex items-center border rounded-md p-2 sm:p-3 text-base space-x-1 sm:space-x-2 bg-secondary`}
          >
            <RadioGroupItem value="Custom" id="custom" />
            <Label htmlFor="custom">Custom</Label>
          </div>
        </RadioGroup>
      </div>
      {selected === "Custom" && (
        <Input
          placeholder="Gender"
          className="text-base h-10"
          value={form_data.gender !== "Custom" ? form_data.gender : ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, gender: e.target.value }))
          }
        />
      )}
    </>
  );
}
