import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function SignUpBirthdayYear({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [years, setYears] = useState<number[]>([]);
  useEffect(() => {
    const y: number[] = [];
    const current_year = new Date().getUTCFullYear();

    for (let i = 0; i < 100; i++) {
      y.push(current_year - i);
    }
    setYears(y);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`text-base  h-10 grow ${
            form_data.birthday.year ? "" : "text-muted-foreground"
          }`}
          variant={form_data.birthday.year ? "default" : "secondary"}
        >
          {form_data.birthday.year ? form_data.birthday.year : "Year"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" scroll" asChild>
        <ScrollArea className="h-[40vh] ">
          {years.length > 0 &&
            years.map((year, index) => (
              <div key={year}>
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      birthday: { ...prev.birthday, year },
                    }))
                  }
                >
                  {year}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
