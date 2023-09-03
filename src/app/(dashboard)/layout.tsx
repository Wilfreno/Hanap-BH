"use client";

import styles from "./layout.module.css";
import Header from "@/components/layout/header/Header";
import Navigation from "@/components/layout/navigations/Navigation";
import { useEffect, useMemo } from "react";
import { setLocation } from "@/lib/redux/slices/user-location-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

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
