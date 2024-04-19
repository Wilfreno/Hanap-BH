"use client";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { useEffect, useState } from "react";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { useAppSelector } from "@/lib/redux/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LodgingDetails from "@/components/page/lodging/LodgingDetails";
import LodgingRooms from "@/components/page/lodging/LodgingRooms";
import LodgingMap from "@/components/page/lodging/LodgingMap";

export default function page({ params }: { params: { id: string } }) {
  const [lodging, setLodging] = useState<LodgingDetailsType>();
  const http_request = useHTTPRequest();
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const selected_lodging = useAppSelector(
    (state) => state.selected_lodging_reducer
  );
  const tabs_list = [
    { name: "Details", value: "details" },
    { name: "Rooms", value: "rooms" },
    { name: "Map", value: "map" },
  ];

  async function getData() {
    const r = await http_request.get("/api/lodging", {
      id: params.id,
      latitude: user_location?.latitude,
      longitude: user_location?.longitude,
    });
    setLodging(r.data as LodgingDetailsType);
  }

  useEffect(() => {
    const session_data = sessionStorage.getItem("nearby_lodging");

    let p = [] as LodgingDetailsType[];
    if (session_data) {
      const nearby_lodging = JSON.parse(session_data) as LodgingDetailsType[];
      p = nearby_lodging.filter((lodging) => lodging.id === params.id);
    }
    if (selected_lodging.id) {
      setLodging(selected_lodging);
      return;
    } else if (p?.length !== 0) {
      setLodging(p[0]);
      return;
    }

    getData();
  }, []);

  return (
    <main className="grid">
      {/* <LodgingImage database={lodging?.database!} photos={lodging?.photos!} />
      <Tabs defaultValue="details" className="min-h-[92dvh]">
        <TabsList className="grid grid-cols-3 h-auto">
          {tabs_list.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-lg">
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <LodgingDetails lodging={lodging!} />
        <LodgingRooms lodging={lodging!} />
        <LodgingMap lodging={lodging!} />
      </Tabs> */}
    </main>
  );
}
