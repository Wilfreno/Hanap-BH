import { TabsContent } from "@/components/ui/tabs";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import FavoriteMark from "@/components/reusables/FavoriteMark";
import LodgingGoogleMessage from "./LodgingGoogleMessage";

export default function LodgingDetails({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  return (
    <TabsContent value="details" className="p-10">
      <div className="grow flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{lodging?.name}</h1>
          <h2 className="text-lg text-muted-foreground">{lodging?.address}</h2>
        </div>
        <div className="h-8">
          <FavoriteMark lodging={lodging!} />
        </div>
      </div>
      {lodging?.database === "GOOGLE" && (
        <div className="mt-[30dvh]">
          <LodgingGoogleMessage lodging={lodging} />
        </div>
      )}
    </TabsContent>
  );
}
