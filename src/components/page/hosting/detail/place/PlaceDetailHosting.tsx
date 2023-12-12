"use client";
import PlaceAddressForm from "./place-form/PlaceAdressForm";
import PlaceContactForm from "./place-form/contact/PlaceContactForm";
import PlaceNameForm from "./place-form/PlaceNameForm";
import PLaceImageUpload from "./place-form/upload-image/PlaceImageUpload";
import PlaceSpecificationForm from "./place-form/specification/PlaceSpecificationForm";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type FormState = {
  owner: string;
  place_id: string;
  name: string;
  location: {
    vicinity: string;
    province: string;
    town: {
      city: string;
      municipality: string;
    };
    barangay: string;
    street: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  photos: string[];
  contact: {
    phone_number: string[];
    social_media: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  specifics: {
    gender_restriction: string;
    benifits: string[];
    description: string;
  };
};

export default function PlaceDetailHosting() {
  const [form, setForm] = useState<FormState>({
    owner: "",
    place_id: "",
    name: "",
    location: {
      vicinity: "",
      province: "",
      town: {
        city: "",
        municipality: "",
      },
      barangay: "",
      street: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    photos: [],
    contact: {
      phone_number: [],
      social_media: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
    },
    specifics: {
      gender_restriction: "",
      benifits: [],
      description: "",
    },
  });
  const search_params = useSearchParams();
  const page = search_params.get("page");

  return (
    <form className="flex flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg">
      {page === "1" ? <PlaceNameForm setForm={setForm} /> : null}
      {page === "2" ? <PlaceAddressForm setForm={setForm} /> : null}
      {page === "3" ? <PLaceImageUpload setForm={setForm} /> : null}
      {page === "4" ? <PlaceContactForm setForm={setForm} /> : null}
      {page === "5" ? <PlaceSpecificationForm setForm={setForm} /> : null}
    </form>
  );
}
