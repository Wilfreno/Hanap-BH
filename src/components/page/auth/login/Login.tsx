"use client";
import GoogleLogin from "./GoogleLogin";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const search_params = useSearchParams();
  const url_callback = search_params.get("url_callback");

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
      y: "-100",
      opacity: 0,
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animation}
        className="my-auto"
        key={"login"}
      >
        <Card className="w-screen sm:w-auto h-screen sm:h-auto">
          <CardHeader className="relative border-b">
            <CardTitle className="text-xl flex justify-center">
              Log in
            </CardTitle>
            <XMarkIcon
              className="absolute h-7 right-2 top-0 cursor-pointer"
              onClick={() =>
                router.push(url_callback ? `/${url_callback}` : "/")
              }
            />
          </CardHeader>
          <CardContent className="space-y-5 py-10">
            <LoginForm />
            <span className="flex items-center w-full space-x-5">
              <hr className="h-[1px] w-1/2 bg-secondary" />
              <p>or</p>
              <hr className="h-[1px] w-1/2 bg-secondary" />
            </span>
            <GoogleLogin />
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <Button className="w-full" variant="secondary">
              <Link
                href={`/signup?url_callback=${
                  url_callback ? url_callback : ""
                }`}
                className="font-bold"
              >
                Create new account
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
