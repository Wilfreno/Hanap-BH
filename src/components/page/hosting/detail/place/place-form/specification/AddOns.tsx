import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormState } from "../../PlaceDetailHosting";
import CustomInput from "@/components/reusables/CustomInput";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function AddOns({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const [list, setList] = useState([""]);
  useEffect(() => {
    setForm((prev) => {
      return { ...prev, specifics: { ...prev.specifics, benifits: list } };
    });
  }, []);
  return (
    <div>
      <div className="flex">
        <h2>Benifits</h2>
        <PlusIcon
          className="h-10 m-2  aspect-square border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg  hover:cursor-pointer hover:text-gray-200 hover:bg-gray-700"
          onClick={() => setList((prev) => [...prev, ""])}
        />
      </div>
      {list.map((_, index) => (
        <div>
          <CustomInput id={`list-${index}`}>
            <p>Benifits</p>
          </CustomInput>
          <TrashIcon
            className="h-10 m-2 aspect-square  border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg hover:cursor-pointer hover:text-red-600"
            onClick={() => {
              if (list.length === 1) return;
              const new_list = [...list];
              new_list.splice(index, 1);
              setList(new_list);
            }}
          />
        </div>
      ))}
    </div>
  );
}
