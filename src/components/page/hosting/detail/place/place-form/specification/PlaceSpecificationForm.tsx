import { Dispatch, SetStateAction } from "react";
import { FormState } from "../../PlaceDetailHosting";

export default function PlaceSpecificationForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <section className="bg-white border border-gray-200 shadow-lg rounded-lg p-5">
      <h1 className="text-2xl">
        <strong>Specification / Add - ons</strong>
      </h1>
    </section>
  );
}
