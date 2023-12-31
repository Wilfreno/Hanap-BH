import ImageUpload from "@/components/reusables/ImageUpload";
import UploadedImageSection from "./UploadedImageSection";
import CustomButton from "@/components/reusables/CustomButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormState } from "../../PlaceDetailHosting";
import { usePathname } from "next/navigation";
export default function PLaceImageUpload({
  setForm,
  page,
}: {
  page: string;
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const path_name = usePathname();
  const [id, setId] = useState([]);

  useEffect(() => {
    setForm((prev) => {
      return { ...prev, photos: id };
    });
  }, [id]);
  return (
    <div
      className={`${
        page === "image-upload" ? "flex" : "hidden"
      } flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg`}
      id="image-upload"
    >
      <div className="flex items-center justify-between">
        <CustomButton redirect={`${path_name}?page=address`}>
          <ChevronLeftIcon className="h-5" />
          <p>Back</p>
        </CustomButton>
        <CustomButton redirect={`${path_name}?page=contact`}>
          <p>Next</p>
          <ChevronRightIcon className="h-5" />
        </CustomButton>
      </div>
      <h1 className="text-4xl font-bold mx-auto my-2">Upload Image</h1>
      <div className="flex flex-col">
        <ImageUpload />

        <UploadedImageSection></UploadedImageSection>
      </div>
    </div>
  );
}
