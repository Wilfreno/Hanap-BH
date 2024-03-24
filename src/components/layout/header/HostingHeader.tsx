import Logo from "./logo/Logo";
import Menu from "./menu/Menu";

export default function HostingHeader() {
  return (
    <header className="w-full flex items-center justify-between py-2 px-8 border-b border-gray-300 bg-white">
      <Logo />
      <Menu />
    </header>
  );
}
