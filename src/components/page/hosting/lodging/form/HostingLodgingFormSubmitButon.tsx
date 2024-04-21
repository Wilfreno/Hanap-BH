"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/store";
import { DBLodging } from "@/lib/server/getLodging";

export default function HostingLodgingFormSubmitButon({
  lodging,
}: {
  lodging: DBLodging;
}) {
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);

  return (
    <Button
      className="justify-self-end font-bold text-base"
      type="submit"
      onSubmit={async (e) => {
        e.preventDefault();
        if (
          !new_lodging.name ||
          lodging!.lodging_type ||
          lodging!.photos?.length! < 1 ||
          lodging!.house_rules?.length! < 1 ||
          !lodging!.location?.address
        ) {
          return;
        }
      }}
    >
      Save
    </Button>
  );
}
