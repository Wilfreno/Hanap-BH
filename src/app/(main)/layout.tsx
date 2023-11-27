import Header from "@/components/layout/header/Header";
import Navigation from "@/components/layout/mobile/Navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navigation />
    </>
  );
}
