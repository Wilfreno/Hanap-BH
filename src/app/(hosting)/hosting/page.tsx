import AddLodging from "@/components/page/hosting/lodging/AddLodging";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import auth_options from "@/lib/next-auth/next-auth-options";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "@radix-ui/react-icons";
import LogoImg from "@/components/layout/header/logo/LogoImg";
import HeaderMenu from "@/components/layout/header/menu/HeaderMenu";
import HostingNavigation from "@/components/page/hosting/HostingNavigation";
import { getLodgings } from "@/lib/server/getLodgings";

export default async function page() {
  const data = await getServerSession(auth_options);

  const lodgings = await getLodgings(data?.user.id!);

  return (
    <>
      <header className="border-b px-5 pt-5 space-y-10">
        <div className="flex justify-between ">
          <nav className="flex items-center space-x-5">
            <Link href="/">
              <LogoImg />
            </Link>
            <span className="text-lg text-muted">/</span>
            <Link href="hosting">
              <h1 className="text-lg italic font-bold">
                Hanap-BH
                <sub className="italic text-xs text-muted-foreground">
                  Hosting
                </sub>
              </h1>
            </Link>
          </nav>
          <HeaderMenu />
        </div>
        <HostingNavigation />
      </header>
      <main className="grid grid-cols-[auto_1fr] space-x-20">
        <section className="grid grid-rows-[auto_1fr] p-10 space-y-10">
          <p className="font-bold">Recent Activity</p>
          <Card className="w-[30vw]">
            <CardContent></CardContent>
          </Card>
        </section>
        {lodgings.length! > 0 ? (
          <section className="p-10 space-y-10">
            <p className="font-bold">Lodgings</p>
            <div className="flex space-x-5">
              {lodgings!.map((lodging) => (
                <Link
                  key={lodging.id}
                  href={`/hosting/lodging/${lodging.id}`}
                  className="w-full"
                >
                  <Card
                    key={lodging.id}
                    className="hover:bg-muted hover:cursor-pointer aspect-video h-[25dvh]"
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        {lodging.name}
                        <div className="flex items-center">
                          <span className="text-xs font-bold mx-1">300</span>
                          <HeartIcon className="h-5 fill-red-500 stroke-red-500" />
                        </div>
                      </CardTitle>
                      <CardDescription>{lodging.lodging_type}</CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="place-self-center grid place-items-center space-y-5">
            <p className="text-sm text-muted-foreground">
              Add your lodging now for every on to see
            </p>
            <AddLodging>
              <Button type="button" className="focus-visible:ring-0 font-bold">
                <p className="mx-auto">Add</p>
              </Button>
            </AddLodging>
          </section>
        )}
      </main>
    </>
  );
}
