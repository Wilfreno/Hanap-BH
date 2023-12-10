import CustomInput from "@/components/reusables/CustomInput";
import HostinMap from "../HostinMap";

export default function PlaceAddressForm() {
  return (
    <div className="flex flex-col my-5 bg-white border border-gray-200 rounded-lg shadow-lg p-5">
      <h1 className="text-3xl my-10">
        <strong>Address</strong>
        <i className="text-red-500">*</i>
      </h1>
      <div className="flex flex-wrap items-center">
        <CustomInput div_style="mx-10 my-5" id="provice" width="w-[30vw]">
          <p>Province</p>
        </CustomInput>
        <CustomInput div_style="mx-10 my-5" id="city" width="w-[20vw]">
          <p>City</p>
        </CustomInput>
        <CustomInput div_style="mx-10 my-5" id="municipality" width="w-[20vw]">
          <p>Municiplaity</p>
        </CustomInput>
        <CustomInput div_style="mx-10 my-5" id="barangay" width="w-[30vw]">
          <p>Barangay</p>
        </CustomInput>
        <CustomInput div_style="mx-10 my-5" id="street" width="w-[30vw]">
          <p>Street</p>
        </CustomInput>
      </div>
      <HostinMap />
    </div>
  );
}
