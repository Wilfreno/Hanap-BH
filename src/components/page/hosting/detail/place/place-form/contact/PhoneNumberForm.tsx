import CustomInput from "@/components/reusables/CustomInput";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormState } from "../../PlaceDetailHosting";

export default function PhoneNumberForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const [number, setNumber] = useState<string[]>([""]);

  useEffect(() => {
    setForm((prev) => {
      return { ...prev, contact: { ...prev.contact, phone_number: number } };
    });
  }, [number]);
  return (
    <div className="my-10">
      <div className="flex">
        <h2 className="text-3xl font-semibold">Phone Number</h2>
        <PlusIcon
          className="h-10 m-2  aspect-square border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg  hover:cursor-pointer hover:text-gray-200 hover:bg-gray-700"
          onClick={() => setNumber((prev) => [...prev, ""])}
        />
      </div>
      {number?.map((_, index) => (
        <div className="my-5 flex items-center">
          <CustomInput
            input_value={(value) => {
              const numbers = [...number];
              numbers[index] = value;
              setNumber(numbers);
            }}
            set_value={number[index]}
            id={`phone-number-${index}`}
            label_size="xl"
            div_width="w-[30vw]"
          >
            <p>Phone number</p>
          </CustomInput>
          <TrashIcon
            className="h-10 m-2 aspect-square  border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg hover:cursor-pointer hover:text-red-600"
            onClick={() => {
              if (number.length === 1) return;
              const numbers = [...number];
              numbers.splice(index, 1);
              console.log(numbers);
              setNumber(numbers);
            }}
          />
        </div>
      ))}
    </div>
  );
}
