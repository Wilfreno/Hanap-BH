"use client";

import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useEffect, useState } from "react";
import FavoriteMark from "@/components/reusables/FavoriteMark";
import LodgingImage from "@/components/page/lodging/LodgingImage";
import LodgingMap from "@/components/page/lodging/LodgingMap";
import LodgingGoogleMessage from "@/components/page/lodging/LodgingGoogleMessage";

export default function page({ params }: { params: { id: string } }) {
  const http_request = useHTTPRequest();
  const { coordinates } = useCurrentPosition();
  const [place, setPlace] = useState<PlaceDetailsType>();

  async function getData() {
    const r = await http_request.get("/api/place/detail", {
      place_id: params.id,
      lat: coordinates?.lat,
      lng: coordinates?.lng,
    });
    setPlace(r.data);
  }

  useEffect(() => {
    const session_data = sessionStorage.getItem("nearby_place");

    let p = [] as PlaceDetailsType[];
    if (session_data) {
      const nearby_place = JSON.parse(session_data) as PlaceDetailsType[];
      p = nearby_place.filter((i) => i.place_id === params.id);
    }
    if (p?.length !== 0) {
      setPlace(p[0]);
      return;
    }

    getData();
  }, []);

  return (
    <main className="grid">
      <LodgingImage place={place!} />
      <section className="p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{place?.name}</h1>
            <h2 className="text-lg text-muted-foreground">
              {place?.location.vicinity}
            </h2>
          </div>
          <div className="h-8">
            <FavoriteMark place={place!} />
          </div>
        </div>
        <LodgingMap place={place!} />
      </section>
      {place?.database === "GOOGLE" && <LodgingGoogleMessage place={place} />}
    </main>
  );
}
