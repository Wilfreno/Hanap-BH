import Menu from "@/components/layout/header/menu/Menu";
import { Separator } from "@/components/ui/separator";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex justify-end p-5">
        <Menu />
      </header>
      <main className="grid grid-rows-[auto_auto_1fr]">
        <section className="px-10">
          <h1 className="text-xl md:text-2xl italic font-bold">
            Hanap-BH
            <sub className="italic text-xs text-muted-foreground">Hosting</sub>
          </h1>
        </section>
        <Separator className="w-[95vw] justify-self-center my-6" />
        <section className="grid grid-cols-[auto_1fr]">
          {children}
        </section>
      </main>
    </>
  );
}
