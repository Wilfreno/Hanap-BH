import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function SignUpBirthdayDay({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [days, setDays] = useState<number>();
  useEffect(() => {
    if (!form_data.birthday.month) return;
    if (form_data.birthday.month === "February") {
      setDays(28);
      console.log("yeah");
    } else if (
      form_data.birthday.month === "April" ||
      form_data.birthday.month === "June" ||
      form_data.birthday.month === "September" ||
      form_data.birthday.month === "November"
    )
      setDays(30);
    else setDays(31);
  }, [form_data.birthday.month]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`text-base  h-10 grow ${
            form_data.birthday.day ? "" : "text-muted-foreground"
          }`}
          variant={form_data.birthday.day ? "default" : "secondary"}
        >
          {form_data.birthday.day ? form_data.birthday.day : "Day"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <ScrollArea className={`${days ? "h-[40vh]" : ""}`}>
          {days ? (
            Array.from({ length: days }).map((_, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className=" cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      birthday: { ...prev.birthday, day: index + 1 },
                    }))
                  }
                >
                  {index + 1}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Select a Month first
            </span>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
