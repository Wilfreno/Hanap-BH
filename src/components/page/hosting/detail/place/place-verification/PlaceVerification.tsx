import { Dispatch, SetStateAction } from "react";
import { FormState } from "../PlaceDetailHosting";
import CustomInput from "@/components/reusables/CustomInput";

export default function PlaceVerification({
  setForm,
  form,
  page,
}: {
  form: FormState;
  page: string;
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <div
      id="verification"
      className={`${
        page === "specification" ? "flex" : "hidden"
      } flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg`}
    >
      <p>Very your the details of your Place</p>
      <div>
        <p>Name</p>
      </div>
    </div>
  );
}
