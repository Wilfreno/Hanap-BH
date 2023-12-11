import ImageUpload from "@/components/reusables/ImageUpload";
import UploadedImageSection from "./UploadedImageSection";
import CustomButton from "@/components/reusables/CustomButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
export default function PLaceImageUpload() {
  return (
    <>
      <div className="flex items-center justify-between">
        <CustomButton redirect="/hosting/detail/place?page=2">
          <ChevronLeftIcon className="h-5" />
          <p>Back</p>
        </CustomButton>
        <CustomButton redirect="/hosting/detail/place?page=4">
          <p>Next</p>
          <ChevronRightIcon className="h-5" />
        </CustomButton>
      </div>
      <h1 className="text-4xl font-bold mx-auto my-2">Upload Image</h1>
      <div className="flex flex-col">
        <ImageUpload />

        <UploadedImageSection></UploadedImageSection>
      </div>
    </>
  );
}
