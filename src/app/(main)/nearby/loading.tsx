import PlaceCardSkeleton from "@/components/loading-skeleton/PlaceCardSkeleton";

export default function loading() {
  return (
    <section className="grow grid grid-cols-1 sm:grid-cols-4 sm:items-center sm:justify-between gap-10 mx-5 sm:mx-[10vw] my-[10dvh] h-fit">
      {Array.from({ length: 4 }).map((_, index) => (
        <PlaceCardSkeleton key={index} />
      ))}
    </section>
  );
}
