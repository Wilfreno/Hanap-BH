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
import { Dispatch, SetStateAction } from "react";
import { FormState } from "../../PlaceDetailHosting";
import { usePathname } from "next/navigation";

export default function PlaceContactForm({
  setForm,
  page,
}: {
  page: string;
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const path_name = usePathname();
  return (
    <div
      className={`${
        page === "contact" ? "flex" : "hidden"
      } flex-col p-5 m-5 border border-gray-200 shadow-lg rounded-lg`}
      id="contact"
    >
      <div className="flex items-center justify-between">
        <CustomButton redirect={`${path_name}?page=image-upload`}>
          <ChevronLeftIcon className="h-5" />
          <p>Back</p>
        </CustomButton>
        <CustomButton redirect={`${path_name}?page=specification`}>
          <p>Next</p>
          <ChevronRightIcon className="h-5" />
        </CustomButton>
      </div>
      <h1 className="text-5xl font-bold mx-auto my-5">Contact</h1>
      <section className="flex flex-col">
        <SocialMediaForm setForm={setForm} />
        <PhoneNumber setForm={setForm} />
      </section>
    </div>
  );
}
