import PlaceCardSkeleton from "@/components/loading-skeleton/PlaceCardSkeleton";
import Search from "@/components/page/search/Search";

export default function loading() {
  return (
    <>
      <Search disable />
      <PlaceCardSkeleton />
    </>
  );
}
