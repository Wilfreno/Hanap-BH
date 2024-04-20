"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Lodging } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingLodgingName({ lodging }: { lodging: Lodging }) {
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const [name, setName] = useState(lodging.name);
  const [edit, setEdit] = useState(false);
  const [show_error, setShowError] = useState(false);
  const input_ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleSubmit() {
      setShowError(!name);
      if (!name) input_ref.current?.focus();
    }
    document.addEventListener("submit", handleSubmit);

    return () => document.removeEventListener("submit", handleSubmit);
  }, []);
  return (
    <div className="space-y-5 relative">
      <Label htmlFor="name" className="my-3 text-lg font-bold">
        Name
      </Label>
      <div className="flex w-fit border-b relative py-2">
        <Input
          ref={input_ref}
          disabled={!edit}
          id="name"
          className={cn(
            "w-[70vw] text-2xl font-bold border-none focus-visible:ring-0",
            show_error && !name && "focus-visible:ring-red-600 border-red-600"
          )}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            dispatch(setNewLodging({ ...new_lodging, name }));
            setEdit(false);
          }}
        />
        <Button
          variant="ghost"
          className="aspect-square p-0 m-0 absolute right-2 top-0"
          disabled={!name}
          onClick={() => {
            setEdit((prev) => !prev);
            input_ref.current?.focus();
          }}
          type="button"
          size="sm"
        >
          <PencilIcon className="h-4" />
        </Button>
      </div>
      {show_error && !name && (
        <p className="absolute top-full my-1 text-red-600 text-xs">
          Cannot be empty
        </p>
      )}
    </div>
  );
}
