import Image from "next/image";
import googleImg from "../../../../../public/google-color-svgrepo-com.svg";
import { signIn } from "next-auth/react";

export default function GoogleLogin({ callback }: { callback: string }) {
  return (
    <button
      className="flex items-center justify-center border rounded-lg w-10/12 mx-auto shadow-sm hover:shadow-md py-2 space-x-5 my-5"
      onClick={() => signIn("google")}
    >
      <div className="relative">
        <Image
          src={googleImg}
          alt="GOOGLE"
          className="h-10 w-auto text-white object-contain"
        />
      </div>
      <p>Continue with GOOGLE</p>
    </button>
  );
}
