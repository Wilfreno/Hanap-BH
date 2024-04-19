"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/lib/redux/store";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { useDispatch } from "react-redux";

export default function HostingLodgingFormSubmitButon({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      className="justify-self-end font-bold text-base"
      type="button"
      onClick={async (e) => {
        

      }}
    >
      Save
    </Button>
  );
}
