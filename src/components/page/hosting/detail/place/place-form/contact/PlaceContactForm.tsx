import CustomInput from "@/components/reusables/CustomInput";
import ImageUpload from "@/components/reusables/ImageUpload";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import PhoneNumber from "./PhoneNumberForm";
import SocialMediaForm from "./SocialMediaForm";
import CustomButton from "@/components/reusables/CustomButton";

export default function PlaceContactForm() {
  return (
    <>
      <div className="flex items-center justify-between">
        <CustomButton redirect="/hosting/detail/place?page=3">
          <ChevronLeftIcon className="h-5" />
          <p>Back</p>
        </CustomButton>
        <CustomButton redirect="/hosting/detail/place?page=5">
          <p>Next</p>
          <ChevronRightIcon className="h-5" />
        </CustomButton>
      </div>
      <h1 className="text-5xl font-bold mx-auto my-5">Contact</h1>
      <section className="flex flex-col">
        <SocialMediaForm />
        <PhoneNumber />
      </section>
    </>
  );
}
