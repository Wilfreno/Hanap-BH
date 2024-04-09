import { TabsContent } from "@/components/ui/tabs";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import LodgingGoogleMessage from "./LodgingGoogleMessage";

export default function LodgingRooms({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  return (
    <TabsContent value="rooms" className="p-10">
      {lodging?.database! === "GOOGLE" && (
        <div className="mt-[30dvh]">
          <LodgingGoogleMessage lodging={lodging} />
        </div>
      )}
    </TabsContent>
  );
}
