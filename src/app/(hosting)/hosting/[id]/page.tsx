import HostingManageLodgingSidebar from "@/components/page/hosting/manage/lodging/HostingManageLodgingSidebar";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <HostingManageLodgingSidebar id={params.id} />
    </>
  );
}
