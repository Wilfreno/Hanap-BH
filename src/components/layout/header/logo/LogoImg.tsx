import { useTheme } from "next-themes";
import Image from "next/image";
import logoDark from "../../../../../public/logo/hanap-bh-dark.png";
import logoLight from "../../../../../public/logo/hanap-bh-light.png";
import { usePathname } from "next/navigation";

export default function LogoImg() {
  const { theme } = useTheme();
  const path_name = usePathname();
  return (
    <>
      {theme === "light" || path_name.startsWith("/map") ? (
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
