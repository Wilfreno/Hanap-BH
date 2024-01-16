import Header from "@/components/layout/header/Header";
import Navigation from "@/components/layout/mobile/Navigation";
import { useTheme } from "next-themes";

export default function layout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {children}
        {auth}
      </main>
      <Navigation />
    </>
  );
}
