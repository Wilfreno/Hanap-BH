export const dynamic = "force-dynamic";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const prisma = new PrismaClient();
    const user: User = await request.json();

    const user_found = await prisma.user.findFirst({
      where: { email: { startsWith: user.email } },
    });

    if (user_found)
      return NextResponse.json(
        {
          status: "CONFLICT",
          message: "Eemail already used ",
        },
        { status: 409 }
      );
    const hashed_pass = await bcrypt.hash(user.password!, 14);
    const new_user = await prisma.user.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
        password: hashed_pass,
      },
    });

    return NextResponse.json(
      {
        status: "OK",
        message: "New account created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const search_params = request.nextUrl.searchParams;
    const user_id = search_params.get("id");
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({ where: { id: user_id! } });

    if (!user)
      return NextResponse.json(
        { status: "NOT_FOUND", message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { status: "OK", message: "Request Succesful", data: user },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user: User = await request.json();
    const prisma = new PrismaClient();
    const db_user = await prisma.user.findFirst({ where: { id: user.id! } });
    if (!db_user)
      return NextResponse.json(
        { status: "NOT_FOUND", messsage: "User not found" },
        { status: 404 }
      );
    return NextResponse.json(
      { status: "OK", message: "User has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user: User = await request.json();
    const prisma = new PrismaClient();

    await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        gender: user.gender,
        birthday: user.birthday,
      },
    });
    return NextResponse.json(
      { status: "OK", message: "User updated" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
