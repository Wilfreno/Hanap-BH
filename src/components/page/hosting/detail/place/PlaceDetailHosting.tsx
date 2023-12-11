"use client";
import PlaceAddressForm from "./place-form/PlaceAdressForm";
import PlaceContactForm from "./place-form/contact/PlaceContactForm";
import PlaceNameForm from "./place-form/PlaceNameForm";
import PLaceImageUpload from "./place-form/upload-image/PlaceImageUpload";
import PlaceSpecificationForm from "./place-form/specification/PlaceSpecificationForm";
import { useSearchParams } from "next/navigation";

export default function PlaceDetailHosting() {
  const search_params = useSearchParams();
  const page = search_params.get("page");
  return (
    <form className="flex flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg">
      {page === "1" ? <PlaceNameForm /> : null}
      {page === "2" ? <PlaceAddressForm /> : null}
      {page === "3" ? <PLaceImageUpload /> : null}
      {page === "4" ? <PlaceContactForm /> : null}
      {page === "5" ? <PlaceSpecificationForm /> : null}
    </form>
  );
}
