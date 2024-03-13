import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NoSearchResults() {
  return (
    <section className="grid self-center justify-self-center space-y-2 grow">
      <XMarkIcon className="h-[5rem] stroke-[4] justify-self-center self-center" />
      <div>
        <p className="text-lg text-center">
          Seems like there's no lodgings nearby your location
        </p>
        <p className="text-sm text-center">
          If you want too see lodging on specific places you can{" "}
          <span className="underline font-bold">search</span> or{" "}
          <span className="underline font-bold">browse</span> for places
        </p>
      </div>
    </section>
  );
}
