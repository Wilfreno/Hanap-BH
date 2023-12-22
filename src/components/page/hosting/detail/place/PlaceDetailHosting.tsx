"use client";
import PlaceAddressForm from "./place-form/PlaceAdressForm";
import PlaceContactForm from "./place-form/contact/PlaceContactForm";
import PlaceNameForm from "./place-form/PlaceNameForm";
import PLaceImageUpload from "./place-form/upload-image/PlaceImageUpload";
import PlaceSpecificationForm from "./place-form/specification/PlaceSpecificationForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PlaceVerification from "./place-verification/PlaceVerification";

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
  const router = useRouter();
  const path_name = usePathname();
  const search_params = useSearchParams();
  const page = search_params.get("page");
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

  if (form.name === "") router.replace(`${path_name}?page=place-name`);
  return (
    <form className="flex top-[10vh] left-[45%] " autoComplete="off">
      <PlaceNameForm page={page!} setForm={setForm} />
      <PlaceAddressForm page={page!} setForm={setForm} />
      <PLaceImageUpload page={page!} setForm={setForm} />
      <PlaceContactForm page={page!} setForm={setForm} />
      <PlaceSpecificationForm page={page!} setForm={setForm} />
      <PlaceVerification page={page!} setForm={setForm} form={form} />
    </form>
  );
}
