"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import logoDark from "../../../../../public/logo/hanap-bh-dark.png";
import logoLight from "../../../../../public/logo/hanap-bh-light.png";

export default function LogoImg() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <Image
          src={logoLight}
          alt="Logo"
          className="h-5  w-auto md:h-6"
          priority
        />
      ) : (
        <Image
          src={logoDark}
          alt="Logo"
          className="h-5  w-auto md:h-6"
          priority
        />
      )}
    </>
  );
}
