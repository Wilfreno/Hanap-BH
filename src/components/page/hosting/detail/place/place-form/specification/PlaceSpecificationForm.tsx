import { Dispatch, SetStateAction } from "react";
import { FormState } from "../../PlaceDetailHosting";

export default function PlaceSpecificationForm({
  setForm,
  page,
}: {
  page: string;
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <div
      className={`${
        page === "specification" ? "flex" : "hidden"
      } flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg`}
      id="specification"
    >
      <h1 className="text-2xl">
        <strong>Specification / Add - ons</strong>
      </h1>
    </div>
  );
}
