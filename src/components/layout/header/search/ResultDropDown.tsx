import { PlaceDetailsType } from "@/lib/types/place-detail";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function ResultDropDown({
  setSearch,
  setActive,
  results,
}: {
  results: PlaceDetailsType[];
  setSearch: Dispatch<SetStateAction<string>>;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className="absolute top-[60%] left-0 flex flex-col my-px pt-8 w-full bg-white max-h-[50vh] rounded-md shadow-lg overflow-y-auto text-gray-900 -z-20 ">
      {results?.length > 0 ? (
        results?.map((result) => (
          <Link
            key={result.place_id}
            href={`place-detail/${result.place_id}`}
            target="_blank"
            as={`place-detail/${result.place_id}`}
            prefetch
            className="w-full px-3 py-4 rounded-lg hover:bg-gray-300"
            onClick={() => {
              setSearch("");
              setActive(false);
            }}
          >
            <p className="text-base font-bold whitespace-nowrap">
              {result.name.length > 35
                ? `${result.name.slice(0, 35)}...`
                : result.name}
            </p>
            <p className="text-xs text-gray-700 whitespace-nowrap">
              {result.location.vicinity.length > 50
                ? `${result.location.vicinity.slice(0, 50)}...`
                : result.location.vicinity}
            </p>
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center px-3 py-5 -mt-3 ">
          <p className="m-1 text-sm font-bold text-gray-400 whitespace-nowrap">
            Type an address or name of a boarding house
          </p>
        </div>
      )}
    </section>
  );
}
