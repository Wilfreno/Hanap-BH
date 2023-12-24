import CustomButton from "@/components/reusables/CustomButton";
import CustomInput from "@/components/reusables/CustomInput";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { FormState } from "../PlaceDetailHosting";
import { usePathname } from "next/navigation";

export default function PlaceNameForm({
  setForm,
  page,
}: {
  page: string;
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const path_name = usePathname();
  const [empty, setEmpty] = useState(true);
  return (
    <div
      className={`${
        page === "place-name" ? "flex" : "hidden"
      } flex-col p-10 m-5 border border-gray-200 shadow-lg rounded-lg`}
      id="place-name"
    >
      <h1 className="text-5xl font-bold my-[10vh] mx-[10vw] whitespace-nowrap">
        Name your place
      </h1>
      <CustomInput
        input_value={(value) => {
          setForm((prev) => {
            return { ...prev!, name: value };
          });
          setEmpty(value === "");
        }}
        id="name"
        style={{ fontSize: "1.5rem" }}
      ></CustomInput>
      <CustomButton
        disabled={empty}
        redirect={`${path_name}?page=address`}
        style={{ margin: "2rem auto" }}
      >
        <p>Next</p>
        <ChevronRightIcon className="h-8" />
      </CustomButton>
    </div>
  );
}
