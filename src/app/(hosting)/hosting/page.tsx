import CustomButton from "@/components/reusables/CustomButton";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function page() {
  return (
    <section className="flex items-center justify-between w-screen flex-col text-gray-900 whitespace-nowrap">
      <h1 className=" text-7xl mt-20">
        Welcome to{" "}
        <strong>
          <i className="mr-5">Hanap-BH </i>
          Hosting
        </strong>
      </h1>
      <h2 className="text-2xl my-4">
        The Convenient & fast way to advertice your place for people in your
        area to see
      </h2>
      <p className="my-10 text-lg">
        Before you proceed, please read our,{" "}
        <button className=" underline text-blue-600">
          <strong>terms of service</strong>
        </button>{" "}
        &{" "}
        <button className=" underline text-blue-600">
          <strong>security policy</strong>{" "}
        </button>{" "}
        thourouhgly.{" "}
      </p>
      <CustomButton redirect="/hosting/detail/place?page=1">
        <p>Proceed</p>
        <ChevronRightIcon className="h-8" />
      </CustomButton>
    </section>
  );
}
