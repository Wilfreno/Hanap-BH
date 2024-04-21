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
import prisma_client from "@/lib/prisma/client";
import CustomImage from "@/components/CustomImage";

export async function getLodgings(user_id: string) {
  try {
    const lodgings = await prisma_client.lodging.findMany({
      where: { owner_id: user_id },
      include: {
        location: true,
        photos: true,
        ratings: true,
      },
      relationLoadStrategy: "join",
    });

    return lodgings;
  } catch (error) {
    throw error;
  }
}

export default async function page() {
  const data = await getServerSession(auth_options);

  const lodgings = await getLodgings(data?.user.id!);

  return lodgings.length! > 0 ? (
    <section className="flex space-x-5 p-5 px-10 h-fit">
      {lodgings!.map((lodging) => (
        <Link key={lodging.id} href={`/hosting/${lodging.id}`}>
          <Card
            key={lodging.id}
            className="hover:bg-muted hover:cursor-pointer w-[25vw]"
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
            <CardContent>
              <div className="rounded-lg overflow-hidden aspect-video w-full">
                <CustomImage
                  url={lodging.photos?.[0]?.photo_url}
                  database="POSTGERSQL"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
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
  );
}
