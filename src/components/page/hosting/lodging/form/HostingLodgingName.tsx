import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingLodgingName() {
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const [name, setName] = useState("");
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
    <div className="space-y-5">
      <Label htmlFor="name" className="font-bold text-lg">
        Lodging Name
      </Label>
      <div className="flex relative">
        <Input
          ref={input_ref}
          disabled={!!new_lodging.name && !edit}
          id="name"
          className={cn(
            "w-2/3",
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
          variant="secondary"
          className="aspect-square p-2"
          disabled={!name}
          onClick={() => setEdit((prev) => !prev)}
          type="button"
        >
          <PencilIcon className="h-full" />
        </Button>
        {show_error && !name && (
          <p className="absolute top-full my-1 text-red-600 text-xs">
            Cannot be empty
          </p>
        )}
      </div>
    </div>
  );
}
