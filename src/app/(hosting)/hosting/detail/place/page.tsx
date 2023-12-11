import PlaceDetailHosting from "@/components/page/hosting/detail/place/PlaceDetailHosting";
import PlaceMain from "@/components/page/hosting/detail/place/main/PlaceMain";

export default function page() {
  return (
    <section className="flex items-center text-gray-900">
      <PlaceMain />
      <PlaceDetailHosting />
    </section>
  );
}
