export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import User from "@/lib/database/model/User";
import { NextResponse, type NextRequest } from "next/server";

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
    const user_id = await request.json();
    await dbConnect();
    await User.findOneAndRemove({ _id: user_id });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
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
