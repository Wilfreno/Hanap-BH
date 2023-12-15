import Image from "next/image";
import fbImg from "../../../../../public/icons/social-media/facebook-svgrepo-com.svg";
import { signIn } from "next-auth/react";

export default function FbLogin({ callback }: { callback: string }) {
  return (
    <button
      className="flex items-center justify-center border rounded-lg w-10/12 mx-auto shadow-sm hover:shadow-md py-2 space-x-5"
      onClick={() => signIn("facebook", { callbackUrl: callback })}
    >
      <div className="relative">
        <Image
          src={fbImg}
          alt="facebook"
          className="h-10 w-auto text-white object-contain"
        />
      </div>
      <p>Continue with Facebook</p>
    </button>
  );
}
