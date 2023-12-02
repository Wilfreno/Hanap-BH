import EmailForm from "./EmailForm";
import Image from "next/image";
import logoImg from "../../../../../public/logo.png";
import FbLogin from "./FbLogin";
import Modal from "@/components/reusables/Modal";
export default function Login({ callback }: { callback: string }) {
  return (
    <Modal>
      <div className="flex flex-col bg-white opacity-100 rounded-lg shadow-lg w-[30%]">
        <section className="flex flex-col items-center justify-center py-4 font-bold">
          <h1 className="text-md">Sign up or Log in</h1>
          <hr className="w-full h-px my-5" />
          <div className="relative flex items-center justify-center my-10 flex-col space-y-5">
            <Image
              src={logoImg}
              alt="logo"
              className="h-20 w-auto object-contain"
            />
            <p className="text-lg">Welcome to Hanap-BH</p>
          </div>
        </section>
        <FbLogin />
      </div>
    </Modal>
  );
}
