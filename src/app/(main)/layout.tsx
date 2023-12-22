import MainHeader from "@/components/layout/header/MainHeader";
import Navigation from "@/components/layout/mobile/Navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <Navigation />
    </>
  );
}
