import dbConnect from "@/lib/database/connect";
import User from "@/lib/database/model/User";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const form_data = await request.json();
    await dbConnect();
    const owner = await User.findOne({ _id: form_data.owner });
    const place_owned = owner.place_owned;
    await User.updateOne(
      { _id: form_data.owner },
      {
        $set: { place_owned: [...place_owned, form_data.place_id] },
      }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
