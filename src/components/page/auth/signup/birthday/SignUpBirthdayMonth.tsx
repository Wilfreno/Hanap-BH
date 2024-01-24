import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function SignUpBirthdayMonth({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`text-base  h-10 grow ${
            form_data.birthday.month ? "" : "text-muted-foreground"
          }`}
          variant={form_data.birthday.month ? "default" : "secondary"}
        >
          {form_data.birthday.month ? form_data.birthday.month : "Month"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <ScrollArea className="h-[40vh]">
          {months.map((month, index) => (
            <div key={month}>
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    birthday: { ...prev.birthday, month },
                  }))
                }
              >
                {month}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
