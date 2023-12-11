import CustomInput from "@/components/reusables/CustomInput";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function PhoneNumberForm() {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold">Phone Number</h2>
      <div className="my-5 flex items-center">
        <CustomInput id="phone-number" label_size="xl" div_width="w-[30vw]">
          <p>Phone number</p>
        </CustomInput>
        <TrashIcon className="h-10 m-2 aspect-square  border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg hover:cursor-pointer hover:text-red-600" />
        <PlusIcon className="h-10 m-2  aspect-square border border-gray-200 shadow-sm rounded-lg p-2 hover:shadow-lg  hover:cursor-pointer hover:text-gray-200 hover:bg-gray-700" />
      </div>
    </div>
  );
}
