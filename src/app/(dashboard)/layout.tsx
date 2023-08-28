"use client";

import styles from "./layout.module.css";
import Header from "@/components/layout/header/Header";
import Navigation from "@/components/layout/navigations/Navigation";
import { useEffect, useMemo } from "react";
import { setLocation } from "@/lib/redux/slices/user-location-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { Libraries } from "use-google-maps-script";
import { setAPIIsLoaded } from "@/lib/redux/slices/google -map-api-is-loaded-slice";
import { useLoadScript } from "@react-google-maps/api";
import Script from "next/script";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");

  const libraries: Libraries = useMemo(() => ["places"], []);

  const { init} = usePlacesAutocomplete({
    initOnMount: false
  })
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,

  });

  dispatch(setAPIIsLoaded({ isLoaded, loadError }));

  function getGeolocation() {
    if (!navigator.geolocation.getCurrentPosition) {
      throw new Error("Location detector is not supported in your browser");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setLocation({ coordinates: { lat: latitude, lng: longitude } })
        );
      },
      (error) => {
        throw error;
      }
    );
  }

  useEffect(() => {
    getGeolocation();
  }, []);

  return (
    <>
      <section className={styles.section}>
        <Header />
        <Navigation />
        {children}
      </section>
    </>
  );
}
