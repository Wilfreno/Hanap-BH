import CustomInput from "@/components/reusables/CustomInput";
import HostinMap from "../HostinMap";
import CustomButton from "@/components/reusables/CustomButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import { FormState } from "../PlaceDetailHosting";

export default function PlaceAddressForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <CustomButton
          redirect="/hosting/detail/place?page=1"
          style={{ width: "5rem" }}
        >
          <ChevronLeftIcon className="h-5" />
          <p>Back</p>
        </CustomButton>
        <CustomButton redirect="/hosting/detail/place?page=3">
          <p>Next</p>
          <ChevronRightIcon className="h-5" />
        </CustomButton>
      </div>
      <h1 className="text-5xl font-bold my-10 mx-auto">Address</h1>
      <div className="flex flex-wrap items-center">
        <CustomInput
          input_value={(value) =>
            setForm((prev) => {
              return {
                ...prev,
                location: { ...prev.location, province: value },
              };
            })
          }
          div_width="w-[50vh] mx-10 my-5"
          id="provice"
        >
          <p>Province</p>
        </CustomInput>
        <CustomInput
          div_width="w-[40vh] mx-10 my-5"
          id="city"
          input_value={(value) =>
            setForm((prev) => {
              return {
                ...prev,
                location: {
                  ...prev.location,
                  town: { ...prev.location.town, city: value },
                },
              };
            })
          }
        >
          <p>City</p>
        </CustomInput>
        <CustomInput
          div_width="w-[40vh] mx-10 my-5"
          id="municipality"
          input_value={(value) =>
            setForm((prev) => {
              return {
                ...prev,
                location: {
                  ...prev.location,
                  town: { ...prev.location.town, municipality: value },
                },
              };
            })
          }
        >
          <p>Municipality</p>
        </CustomInput>
        <CustomInput
          div_width="w-[40vh] mx-10 my-5"
          id="barangay"
          input_value={(value) =>
            setForm((prev) => {
              return {
                ...prev,
                location: {
                  ...prev.location,
                  barangay: value,
                },
              };
            })
          }
        >
          <p>Barangay</p>
        </CustomInput>
        <CustomInput
          div_width="w-[40vh] mx-10 my-5"
          id="street"
          input_value={(value) =>
            setForm((prev) => {
              return {
                ...prev,
                location: {
                  ...prev.location,
                  street: value,
                },
              };
            })
          }
        >
          <p>Street</p>
        </CustomInput>
      </div>
      <HostinMap setForm={setForm} />
    </>
  );
}
