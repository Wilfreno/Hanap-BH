import { PlaceDetailsType } from "@/lib/types/place-detail";

export default function ResultDropDown({
  results,
}: {
  results: PlaceDetailsType[];
}) {
  return (
    <section className="absolute top-[60%] left-0 my-px pt-8 w-full bg-white max-h-[50vh] rounded-md shadow-lg overflow-y-auto text-gray-900 -z-20 ">
      {results?.length > 0 ? (
        results?.map((result) => (
          <div
            key={result.place_id}
            className=" rounded-lg hover:bg-gray-300 px-3 py-4"
          >
            <p className="font-bold  whitespace-nowrap text-base">
              {result.name.length > 35
                ? `${result.name.slice(0, 35)}...`
                : result.name}
            </p>
            <p className="text-xs  whitespace-nowrap text-gray-700">
              {result.location.vicinity.length > 50
                ? `${result.location.vicinity.slice(0, 50)}...`
                : result.location.vicinity}
            </p>
          </div>
        ))
      ) : (
        <div className=" px-3 py-5 -mt-3 flex items-center justify-center ">
          <p className="text-sm font-bold text-gray-400 m-1 whitespace-nowrap">
            Type an address or name of a boarding house
          </p>
        </div>
      )}
    </section>
  );
}
