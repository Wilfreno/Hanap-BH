import Image from "next/image";
import logoImg from "../../../../../public/logo.png";
import FbLogin from "./FbLogin";
import Modal from "@/components/reusables/Modal";
import GoogleLogin from "./GoogleLogin";
import { Variants, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Login({ callback }: { callback: string }) {
  const router = useRouter();
  const animation: Variants = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <Modal>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animation}
        className="flex flex-col bg-white opacity-100 rounded-lg shadow-lg w-[30%] my-[10vh]"
      >
        <section className="flex flex-col items-center justify-center py-4 font-semibold relative text-gray-900">
          <h1 className="text-lg">Sign up or Log in</h1>
          <XMarkIcon
            className="absolute h-5 right-2 top-2 cursor-pointer"
            onClick={() => router.replace(callback)}
          />
          <hr className="w-full h-px my-5" />
          <div className="relative flex items-center justify-center my-10 flex-col space-y-5">
            <Image
              src={logoImg}
              alt="logo"
              className="h-[6.5rem] w-auto object-contain"
            />
            <p className="text-lg">
              Welcome to <i className="font-bold text-xl">Hanap-BH</i>
            </p>
          </div>
        </section>
        <FbLogin callback={callback} />
        <GoogleLogin callback={callback} />
        <button onClick={() => signOut()}>Logout</button>
      </motion.div>
    </Modal>
  );
}
