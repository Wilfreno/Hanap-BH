import CustomInput from "@/components/reusables/CustomInput";

export default function PlaceNameForm() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-5 text-2xl space-y-5">
      <strong>Name your place</strong> <i className="text-red-500">*</i>
      <CustomInput id="name" width="w-[80vw]">
        <p>Place name</p>
      </CustomInput>
    </div>
  );
}
