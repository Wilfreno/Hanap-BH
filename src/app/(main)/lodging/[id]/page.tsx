"use client";

import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { useEffect, useState } from "react";
import FavoriteMark from "@/components/reusables/FavoriteMark";
import LodgingImage from "@/components/page/lodging/LodgingImage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import LodgingMap from "@/components/page/lodging/LodgingMap";
import LodgingGoogleMessage from "@/components/page/lodging/LodgingGoogleMessage";

export default function page({ params }: { params: { id: string } }) {
  const http_request = useHTTPRequest();
  const { coordinates } = useCurrentPosition();
  const [lodging, setLodging] = useState<LodgingDetailsType>();

  async function getData() {
    const r = await http_request.get("/api/lodging", {
      id: params.id,
      lat: coordinates?.lat,
      lng: coordinates?.lng,
    });
    setLodging(r.data);
  }

  useEffect(() => {
    const session_data = sessionStorage.getItem("nearby_lodging");

    let p = [] as LodgingDetailsType[];
    if (session_data) {
      const nearby_lodging = JSON.parse(session_data) as LodgingDetailsType[];
      p = nearby_lodging.filter((lodging) => lodging.id === params.id);
    }
    if (p?.length !== 0) {
      setLodging(p[0]);
      return;
    }

    getData();
  }, []);

  return (
    <main className="grid">
      <LodgingImage lodging={lodging!} />
      <section className="p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{lodging?.name}</h1>
            <h2 className="text-lg text-muted-foreground">
              {lodging?.address}
            </h2>
          </div>
          <div className="h-8">
            <FavoriteMark lodging={lodging!} />
          </div>
        </div>
        <LodgingMap lodging={lodging!} />
      </section>
      {lodging?.database === "GOOGLE" && (
        <LodgingGoogleMessage lodging={lodging} />
      )}
    </main>
  );
}
