import HostingLodgingFormSubmitButon from "@/components/page/hosting/lodging/form/HostingLodgingFormSubmitButon";
import HostingHouseRules from "@/components/page/hosting/lodging/form/HostingLodgingHouseRules";
import HostingLodgingLocation from "@/components/page/hosting/lodging/form/HostingLodgingLocation";
import HostingLodgingName from "@/components/page/hosting/lodging/form/HostingLodgingName";
import HostingLodgingType from "@/components/page/hosting/lodging/form/HostingLodgingType";
import HostingPhotos from "@/components/page/hosting/lodging/form/photos/HostingLodgingPhotos";
import prisma from "@/lib/prisma/client";
import { redirect } from "next/navigation";

export async function getLodging(id: string): Promise<any | null> {
  try {
    const lodging = await prisma.lodging.findFirst({
      where: { id },
      include: { photos: true, location: true },
      relationLoadStrategy: "join",
    });

    return lodging;
  } catch (error) {
    throw error;
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const lodging = await getLodging(params.id);

  if (!lodging) redirect("/hosting");

  return (
    <section className="px-10">
      <form className="grow grid py-5 px-10 space-y-[5rem]">
        <HostingLodgingName lodging={lodging} />
        <HostingLodgingType lodging={lodging} />
        <HostingPhotos lodging={lodging} />
        <HostingHouseRules lodging={lodging} />
        <HostingLodgingLocation lodging={lodging} />
        <HostingLodgingFormSubmitButon lodging={lodging} />
      </form>
    </section>
  );
}
