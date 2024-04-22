"use server";

import prisma from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";

export async function getLodging(id: string) {
  try {
    let lodging = await prisma.lodging.findFirst({
      where: { id },
      include: { photos: true, location: true },
      relationLoadStrategy: "join",
    });

    return {
      ...lodging,
      location: {
        ...lodging?.location,
        latitude: Number(lodging?.location?.latitude),
        longitude: Number(lodging?.location?.longitude),
      },
    };
  } catch (error) {
    throw error;
  }
}

export type DBLodging = Prisma.PromiseReturnType<typeof getLodging>;
