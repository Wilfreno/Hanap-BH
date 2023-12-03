"use client";
import { useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function usePlaceSession() {
  return {
    savePlace: (pd: PlaceDetailsType[]) => {
      sessionStorage.setItem("NearbyPlace", JSON.stringify(pd));
    },
    getPlace: () => {
      const session_data = sessionStorage.getItem("NearbyPlace");
      if (session_data !== null) return JSON.parse(session_data);
      return session_data;
    },
  };
}
