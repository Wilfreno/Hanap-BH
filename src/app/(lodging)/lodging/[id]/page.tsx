import LodgingModal from "@/components/page/lodging/LodgingModal";

export default function page({ params }: { params: { id: string } }) {
  return <LodgingModal id={params.id} />;
}
