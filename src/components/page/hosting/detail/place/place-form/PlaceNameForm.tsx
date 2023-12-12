import CustomButton from "@/components/reusables/CustomButton";
import CustomInput from "@/components/reusables/CustomInput";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import { FormState } from "../PlaceDetailHosting";

export default function PlaceNameForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <>
      <h1 className="text-5xl font-bold my-[10vh] mx-[10vw] whitespace-nowrap">
        Name your place
      </h1>
      <CustomInput
        input_value={(value) =>
          setForm((prev) => {
            return { ...prev!, name: value };
          })
        }
        id="name"
        style={{ fontSize: "1.5rem" }}
      ></CustomInput>
      <CustomButton
        redirect="/hosting/detail/place?page=2"
        style={{ margin: "2rem auto" }}
      >
        <p>Next</p>
        <ChevronRightIcon className="h-8" />
      </CustomButton>
    </>
  );
}
