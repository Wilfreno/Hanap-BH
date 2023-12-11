import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { CldUploadButton } from "next-cloudinary";

export default function ImageUpload() {
  return (
    <button className="bg-gray-800 self-end rounded-lg flex items-center gap-2 p-2 my-2 text-white hover:scale-110 transform translate duration-300 ease-out">
      <ArrowUpTrayIcon className="h-5" />
      <CldUploadButton uploadPreset="pgxwm3ba" className=" text-base" />
    </button>
  );
}
