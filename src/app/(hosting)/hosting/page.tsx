import HostingLodgingList from "@/components/page/hosting/lodging/list/HostingLodgingList";
import AddLodging from "@/components/page/hosting/lodging/AddLodging";
import Spinner from "@/components/svg/loading/Spinner";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import auth_options from "@/lib/next-auth/next-auth-options";

export default async function page() {
  const data = await getServerSession(auth_options);

  return data?.user.lodgings?.length! > 0 ? (
    <HostingLodgingList />
  ) : (
    <section className="place-self-center grid place-items-center space-y-5">
      <p className="text-sm text-muted-foreground">
        Add your lodging now for every on to see
      </p>
      <AddLodging>
        <Button type="button" className="focus-visible:ring-0 font-bold">
          <p className="mx-auto">Add</p>
        </Button>
      </AddLodging>
    </section>
  );
}
