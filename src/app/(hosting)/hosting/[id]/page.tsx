import { auth_options } from "@/app/api/auth/[...nextauth]/route";
import HostingLodgingFormSubmitButon from "@/components/page/hosting/lodging/form/HostingLodgingFormSubmitButon";
import HostingHouseRules from "@/components/page/hosting/lodging/form/HostingLodgingHouseRules";
import HostingLodgingLocation from "@/components/page/hosting/lodging/form/HostingLodgingLocation";
import HostingLodgingName from "@/components/page/hosting/lodging/form/HostingLodgingName";
import HostingLodgingType from "@/components/page/hosting/lodging/form/HostingLodgingType";
import HostingPhotos from "@/components/page/hosting/lodging/form/photos/HostingLodgingPhotos";
import { getServerSession } from "next-auth";

export default async function page({ params }: { params: { id: string } }) {
  const data = await getServerSession(auth_options);

  const lodging = data?.user.lodgings!.find(
    (lodging) => lodging.id === params.id
  );
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
