export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma/client";
import { Photo } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import cloudinary from "cloudinary";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        {
          status: "BAD_REQUEST",
          message: 'parameter "id" is required',
        },
        { status: 404 }
      );

    const prisma_client = prisma;

    const photos = await prisma_client.photo.findMany({
      where: { lodging_id: id },
    });

    if (!photos)
      return NextResponse.json(
        { status: "NO_RESULT", message: "no photos found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        status: "OK",
        message: "request successful",
        data: photos,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const photo: Photo = await request.json();

    console.log(photo);
    if (!photo)
      return NextResponse.json({
        status: "BAD_REQUEST",
        message: "no photo data is given",
      });

    await cloudinary.v2.uploader.destroy(photo.photo_url);

    if (photo.id) {
      const prisma_client = prisma;
      await prisma_client.photo.delete({ where: { id: photo.id } });
    }

    return NextResponse.json(
      { status: "OK", message: "photo deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
