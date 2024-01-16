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
      className="absolute w-full top-[100%] bg-secondary"
      onClick={() => (results ? setActive(true) : setActive(false))}
    >
      {!results && (
        <CardHeader className="flex flex-row items-start justify-center">
          <p className="m-1 text-sm font-bold whitespace-nowrap">
            Type the address or name of a boarding / lodging house
          </p>
        </CardHeader>
      )}
      {results?.length > 0 ? (
        <CardContent className="py-5 space-y-2">
          {results?.map((result) => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  key={result.place_id}
                  className="p-2 cursor-pointer rounded-xl hover:bg-background"
                  onClick={() => {
                    setActive(false);
                    console.log("clicked");
                  }}
                >
                  <p className="text-base font-bold whitespace-nowrap">
                    {result.name.length > 55
                      ? `${result.name.slice(0, 55)}...`
                      : result.name}
                  </p>
                  <p className="text-xs whitespace-nowrap">
                    {result.location.vicinity.length > 80
                      ? `${result.location.vicinity.slice(0, 80)}...`
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
