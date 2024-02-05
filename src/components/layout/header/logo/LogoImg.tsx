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
          className="h-6  w-auto md:h-8"
          priority
        />
      ) : (
        <Image
          src={logoDark}
          alt="Logo"
          className="h-6  w-auto md:h-8"
          priority
        />
      )}
    </>
  );
}
