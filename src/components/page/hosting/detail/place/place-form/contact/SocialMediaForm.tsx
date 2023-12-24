import CustomInput from "@/components/reusables/CustomInput";
import fbIcon from "../../../../../../../../public/icons/social-media/facebook-com.svg";
import intsaIcon from "../../../../../../../../public/icons/social-media/instagram-svgrepo-com.svg";
import xIcon from "../../../../../../../../public/icons/social-media/icons8-twitterx.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FormState } from "../../PlaceDetailHosting";
export default function SocialMediaForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  return (
    <div className=" flex flex-col space-y-5">
      <h2 className="text-3xl font-semibold">Social Media</h2>
      <div className="flex flex-wrap gap-5 my-10">
        <div className="flex items-center">
          <label
            htmlFor="facebook"
            className="relative cursor-pointer aspect-square w-8 h-auto mx-3 overflow-hidden"
          >
            <Image className="object-contain" src={fbIcon} alt="Faceboook" />
          </label>
          <CustomInput
            id="facebook"
            div_width="w-[18vw]"
            input_value={(value) =>
              setForm((prev) => {
                return {
                  ...prev,
                  contact: {
                    ...prev.contact,
                    social_media: {
                      ...prev.contact.social_media,
                      facebook: value,
                    },
                  },
                };
              })
            }
          >
            <p>Facebook</p>
          </CustomInput>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="instagram"
            className="relative cursor-pointer aspect-square w-8 h-auto mx-3 overflow-hidden"
          >
            <Image className="object-contain" src={intsaIcon} alt="Instagram" />
          </label>
          <CustomInput
            input_value={(value) =>
              setForm((prev) => {
                return {
                  ...prev,
                  contact: {
                    ...prev.contact,
                    social_media: {
                      ...prev.contact.social_media,
                      instagram: value,
                    },
                  },
                };
              })
            }
            id="instagram"
            div_width="w-[18vw]"
          >
            <p>Instagram</p>
          </CustomInput>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="twitter"
            className="relative cursor-pointer aspect-square w-8 h-auto mx-3 overflow-hidden"
          >
            <Image className="object-contain" src={xIcon} alt="Twitter / X" />
          </label>
          <CustomInput
            id="twitter"
            div_width="w-[18vw]"
            input_value={(value) =>
              setForm((prev) => {
                return {
                  ...prev,
                  contact: {
                    ...prev.contact,
                    social_media: {
                      ...prev.contact.social_media,
                      twitter: value,
                    },
                  },
                };
              })
            }
          >
            <p>Twitter / X</p>
          </CustomInput>
        </div>
      </div>
    </div>
  );
}
