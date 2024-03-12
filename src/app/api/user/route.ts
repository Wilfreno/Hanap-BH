export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import User from "@/lib/database/model/User";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const user = await request.json();
    await dbConnect();
    const user_found = await User.findOne({ "auth.email": user.email });

    if (user_found)
      return NextResponse.json(
        {
          status: "CONFLICT",
          message: "The email already used ",
        },
        { status: 409 }
      );
    const hashed_pass = await bcrypt.hash(user.password, 14);
    const new_user = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      auth: {
        name: user.email.slice(0, user.email.indexOf("@")),
        email: user.email,
        password: hashed_pass,
      },
    });
    await new_user.save();

    return NextResponse.json(
      {
        status: "OK",
        message: "New account created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
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
    await dbConnect();
    const user = await User.findOne({ _id: user_id });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await request.json();
    await dbConnect();
    const db_user = await User.findOneAndRemove({ "auth.email": user.email });
    if (!db_user)
      return NextResponse.json(
        { status: "NOT_FOUND", messsage: "The user cannot be found" },
        { status: 404 }
      );
    return NextResponse.json(
      { status: "OK", message: "User has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const {
      id,
      given_name,
      middle_name,
      family_name,
      place_owned,
      gender,
      birth_date,
      profile_pic,
      contact,
    } = await request.json();
    await dbConnect();
    await User.updateOne(
      { _id: id },
      {
        $set: {
          given_name,
          middle_name,
          family_name,
          place_owned,
          gender,
          birth_date,
          profile_pic,
          contact,
        },
      }
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
