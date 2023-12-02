import Image from "next/image";

export default function GoogleLogin() {
  return (
       <button className="flex items-center justify-center border rounded-lg w-10/12 mx-auto shadow-md py-2 space-x-5">
      <div className="relative">
        <Image
          src={fbImg}
          alt="facebook"
          className="h-10 w-auto text-white object-contain"
        />
      </div>
      <p>Log in with Facebook</p>
    </button>
  )
}