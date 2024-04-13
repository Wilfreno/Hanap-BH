import LodgingTypes from "@/components/LodgingTypes";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingLodgingType() {
  const [other_type, setOtherType] = useState({ open: false, value: "" });
  const lodging_types = LodgingTypes();
  const [show_error, setShowError] = useState(false);

  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    function handleSubmit() {
      setShowError(!new_lodging.lodging_type);
    }
    document.addEventListener("submit", handleSubmit);

    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div className="space-y-5 relative">
      <Label className="text-lg font-bold">Lodging Type</Label>
      <Select
        onValueChange={(e) => {
          if (e === "other") {
            setOtherType((prev) => ({ ...prev, open: true }));
            return;
          }
          dispatch(setNewLodging({ ...new_lodging, lodging_type: e }));
          setOtherType({ value: "", open: false });
        }}
      >
        <SelectTrigger
          className={cn(
            "w-1/3",
            show_error &&
              !new_lodging.lodging_type &&
              "focus-visible:ring-red-600 border-ring-red-600"
          )}
        >
          <>
            <SelectValue placeholder="Select" />
            {show_error && !new_lodging.lodging_type && (
              <p className="absolute top-full left-0 text-red-600 text-xs my-1">
                Select a type
              </p>
            )}
          </>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {lodging_types.map((lodging) => (
              <SelectItem key={lodging.name} value={lodging.type}>
                {lodging.name}
              </SelectItem>
            ))}
            <SelectItem value="other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {other_type.open && (
        <Input
          placeholder="Other type.."
          className="w-1/3"
          value={other_type.value}
          onChange={(e) =>
            setOtherType((prev) => ({ ...prev, value: e.target.value }))
          }
          onBlur={(e) =>
            dispatch(
              setNewLodging({
                ...new_lodging,
                lodging_type: e.target.value.toUpperCase(),
              })
            )
          }
        />
      )}
    </div>
  );
}
