import Spinner from "@/components/svg/loading/Spinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { Dispatch, SetStateAction } from "react";

export default function SearchResult({
  setActive,
  results,
  loading,
}: {
  results: PlaceDetailsType[];
  setActive: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}) {
  return (
    <Card
      className="fixed top-[10vh] left-1 w-[98vw]  md:absolute md:w-full md:top-[100%] bg-background z-50"
      onClick={() => (results ? setActive(true) : setActive(false))}
    >
      {!results && (
        <CardHeader className="flex flex-row items-start justify-center">
          <p className="md:m-1 text-xs  md:text-sm font-bold whitespace-nowrap">
            Type the address or name of a boarding / lodging house
          </p>
        </CardHeader>
      )}
      {results?.length > 0 ? (
        <CardContent className="space-y-1 py-2 md:py-5 md:space-y-2">
          {results?.map((result, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div
                  key={result.place_id}
                  className="py-2 px-1 cursor-pointer rounded-xl hover:bg-background"
                  onClick={() => {
                    setActive(false);
                    console.log("clicked");
                  }}
                >
                  <p className="hidden md:inline-flex md:text-base font-bold whitespace-nowrap">
                    {result.name.length > 55
                      ? `${result.name.slice(0, 55)}...`
                      : result.name}
                  </p>
                  <p className="hidden md:inline-flex text-xs whitespace-nowrap">
                    {result.location.vicinity.length > 80
                      ? `${result.location.vicinity.slice(0, 80)}...`
                      : result.location.vicinity}
                  </p>
                  <p className="md:text-base font-bold whitespace-nowrap md:hidden">
                    {result.name.length > 35
                      ? `${result.name.slice(0, 35)}...`
                      : result.name}
                  </p>
                  <p className="text-xs whitespace-nowrap md:hidden">
                    {result.location.vicinity.length > 50
                      ? `${result.location.vicinity.slice(0, 50)}...`
                      : result.location.vicinity}
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto">
                <p className=" whitespace-nowrap">{result.name}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </CardContent>
      ) : (
        loading && <Spinner className="h-10 m-auto" />
      )}
    </Card>
  );
}
