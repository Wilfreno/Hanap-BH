"use server";
import prisma from "../../prisma/client";

export async function getLodgings(user_id: string) {
  try {
    const lodgings = await prisma.lodging.findMany({
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
