import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function MainHosting() {
  const router = useRouter();
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
      <div
        onClick={() => router.replace("/hosting?page=place-detail")}
        className="border rounded-lg text-xl bg-gray-800 text-white flex items-center hover:scale-110 hover:cursor-pointer"
      >
        <p className="m-2 ">Proceed</p>
        <ChevronRightIcon className="h-8" />
      </div>
    </section>
  );
}
