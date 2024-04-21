"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { DBLodging } from "@/lib/server/getLodging";
import { cn } from "@/lib/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingHouseRules({ lodging }: { lodging: DBLodging }) {
  const [house_rules, setHouseRules] = useState(
    lodging?.house_rules ? [...JSON.parse(lodging!.house_rules)] : [""]
  );

  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);

  function dispatchHouseRules(new_array: string[]) {
    dispatch(
      setNewLodging({
        ...new_lodging,
        house_rules: JSON.stringify(new_array),
      })
    );
  }

  const [show_error, setShowError] = useState(false);

  useEffect(() => {
    function handleSubmit() {
      setShowError(!house_rules[0]);
    }
    document.addEventListener("submit", handleSubmit);

    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div className="space-y-5 relative">
      <Label
        htmlFor={`house_rules_${house_rules.length - 1}`}
        className="font-bold text-lg"
      >
        House Rules
      </Label>
      {house_rules.map((_, index) => (
        <div key={index} className="space-y-1">
          <Label
            htmlFor={`house_rules_${index}`}
            className="text-xs text-muted-foreground"
          >
            House Rule #{index + 1}
          </Label>
          <div className="flex space-x-3">
            <Input
              autoFocus={
                index === house_rules.length - 1 && house_rules.length > 1
              }
              value={house_rules[index]}
              className={cn(
                "text-base",
                show_error &&
                  !house_rules[0] &&
                  "focus-visible:ring-red-500 border-red-500"
              )}
              onChange={(e) => {
                const new_array = [...house_rules];
                new_array[index] = e.currentTarget.value;
                setHouseRules(new_array);
              }}
              onKeyDown={(e) => {
                if (
                  e.code === "Enter" &&
                  e.currentTarget.value &&
                  index === house_rules.length - 1
                ) {
                  dispatchHouseRules(house_rules);
                  setHouseRules((prev) => [...prev, ""]);
                }
              }}
              onSubmit={() => setHouseRules((prev) => [...prev, ""])}
            />
            <Button
              variant="destructive"
              className={cn(
                "aspect-square p-2",
                house_rules.length === 1 && "hidden",
                index === house_rules.length - 1 && "hidden"
              )}
              onClick={() => {
                if (house_rules.length > 1) {
                  const new_array = [...house_rules];
                  new_array.splice(index, 1);
                  if (!new_array[new_array.length - 1])
                    new_array.splice(new_array.length - 1, 1);
                  setHouseRules(new_array);
                  dispatchHouseRules(new_array);
                }
              }}
            >
              <TrashIcon className="h-full" />
            </Button>
            <Button
              disabled={!house_rules[index]}
              variant="secondary"
              className={cn(
                "aspect-square p-2",
                index !== house_rules.length - 1 && "hidden"
              )}
              onClick={() => {
                dispatchHouseRules(house_rules);
                setHouseRules((prev) => [...prev, ""]);
              }}
            >
              <PlusIcon className="h-full" />
            </Button>
          </div>
        </div>
      ))}

      {show_error && !house_rules[0] && (
        <p className="absolute -bottom-5 -left-1  text-red-600 text-xs">
          Atleast provide 1 image
        </p>
      )}
    </div>
  );
}
