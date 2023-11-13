"use client";

import Header from "@/components/layout/header/Header";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { setMapCenter } from "@/lib/redux/slices/map-center-slice";
import { useEffect } from "react";
import { setUserLocation } from "@/lib/redux/slices/user-location-slice";
import { setNearbyPlaceDetails } from "@/lib/redux/slices/nearby-place-detail-slice";
import { usePathname, useSearchParams } from "next/navigation";
import MenuDropDown from "@/components/layout/header/menu/dropdown/MenuDropDown";
import Navigation from "@/components/layout/mobile/Navigation";
import { setNextPageToken } from "@/lib/redux/slices/next-page-token-slice";
import { setRedirectRouter } from "@/lib/redux/slices/redirect-route-slice";

export default function layout({ children }: { children: React.ReactNode }) {
  const path_name = usePathname();

  const search_params = useSearchParams();
  const open_menu = search_params.get("open_menu");
  const dispatch = useDispatch<AppDispatch>();
  const user_location = useAppSelector(
    (state) => state.user_location_reducer.coordinates
  );
  async function getNearbyPlaces() {
    try {
      const api_response = await fetch(
        `/api/nearby-places?lat=${user_location.lat}&lng=${user_location.lng}`
      );
      const api_data = await api_response.json();

      dispatch(setNearbyPlaceDetails(api_data.data));
      dispatch(setNextPageToken(api_data.next_page_token));
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    if (!navigator.geolocation.getCurrentPosition) {
      throw new Error("Location detector is not supported in your browser");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setMapCenter({ coordinates: { lat: latitude, lng: longitude } })
        );
      },
      (error) => {
        throw error;
      }
    );

    const watch_id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setUserLocation({
            coordinates: {
              lat: latitude,
              lng: longitude,
            },
          })
        );
      },
      (error) => {
        throw error;
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watch_id);
    };
  }, []);

  useEffect(() => {
    if (user_location.lng !== undefined) getNearbyPlaces();
  }, [user_location]);
  if (!path_name.endsWith("signup") && !path_name.endsWith("login")) {
    dispatch(setRedirectRouter({ route: path_name }));
  }
  return (
    <>
      <Header />
      {open_menu === "true" ? <MenuDropDown /> : null}
      {children}
      <Navigation />
    </>
  );
}
